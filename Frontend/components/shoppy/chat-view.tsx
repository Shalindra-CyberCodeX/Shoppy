"use client"

import { useEffect, useRef, useState } from "react"
import { BookOpen } from "lucide-react"
import { BotAvatar } from "@/components/shoppy/bot-avatar"
import { PromptBar } from "@/components/shoppy/prompt-bar"
import { PromptGuideDialog } from "@/components/shoppy/prompt-guide-dialog"
import { ShopCard } from "@/components/shoppy/shop-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useShoppy } from "@/lib/shoppy-context"
import { SUGGESTED_PROMPTS, matchShopsForPrompt, type Shop } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content?: string
  shops?: Shop[]
  loading?: boolean
}

export function ChatView({
  initialMessages = [],
  initialPrompt,
}: {
  initialMessages?: ChatMessage[]
  initialPrompt?: string
}) {
  const { location, profile } = useShoppy()
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [isThinking, setIsThinking] = useState(false)
  const hasAutoSubmitted = useRef(false)

  function handleSubmit(text: string) {
    const userMessage: ChatMessage = { id: `u-${Date.now()}`, role: "user", content: text }
    const loadingMessage: ChatMessage = { id: `a-${Date.now()}`, role: "assistant", loading: true }
    setMessages((prev) => [...prev, userMessage, loadingMessage])
    setIsThinking(true)

    setTimeout(() => {
      const shops = matchShopsForPrompt(text, location)
      setMessages((prev) =>
        prev.map((m) => (m.id === loadingMessage.id ? { ...m, loading: false, shops } : m)),
      )
      setIsThinking(false)
    }, 1100)
  }

  useEffect(() => {
    if (initialPrompt && !hasAutoSubmitted.current) {
      hasAutoSubmitted.current = true
      handleSubmit(initialPrompt)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt])

  const hasMessages = messages.length > 0

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto">
      {!hasMessages ? (
        <div className="flex min-h-full flex-col items-center justify-center gap-6 px-4 py-8 text-center sm:py-10">
          <BotAvatar className="size-16" />
          <div className="flex flex-col gap-2">
            <h1 className="text-balance text-2xl font-bold text-foreground sm:text-3xl">
              Hi, I&apos;m Shoppy 👋 Where would you like to shop today?
            </h1>
            <p className="text-pretty text-sm text-muted-foreground sm:text-base">
              Ask me anything — I&apos;ll find the right shop, at the right price, in Colombo.
            </p>
          </div>
          <PromptGuideDialog>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent/70"
            >
              <BookOpen className="size-3.5 text-primary" />
              New here? See the Prompt Guide
            </button>
          </PromptGuideDialog>
          <div className="flex max-w-xl flex-wrap items-center justify-center gap-2">
            <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">✨ Try:</span>
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt.id}
                type="button"
                onClick={() => handleSubmit(prompt.label)}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:bg-accent"
              >
                {prompt.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex min-h-full flex-col gap-6 px-4 py-6 sm:px-8">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex w-full gap-3", message.role === "user" ? "justify-end" : "justify-start")}
            >
              {message.role === "assistant" && <BotAvatar className="mt-1 size-8 shrink-0" />}
              {message.role === "user" ? (
                <div className="flex items-start gap-2">
                  <div className="max-w-md rounded-2xl bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                    {message.content}
                  </div>
                  <Avatar className="mt-0.5 size-8">
                    <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                    <AvatarFallback>{profile.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                </div>
              ) : message.loading ? (
                <div className="flex w-full max-w-3xl gap-3 overflow-hidden">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-40 w-56 shrink-0 rounded-2xl" />
                  ))}
                </div>
              ) : (
                <div className="flex w-full max-w-3xl flex-col gap-3">
                  <p className="text-sm text-foreground">
                    Here are a few shops in {location === "All Locations" ? "Colombo" : location} that match:
                  </p>
                  <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
                    {message.shops?.map((shop) => (
                      <ShopCard key={shop.id} shop={shop} className="w-64 shrink-0 sm:w-full" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      </div>

      <div className="mx-auto w-full max-w-3xl shrink-0 px-4 pb-4 sm:pb-6">
        <PromptBar onSubmit={handleSubmit} disabled={isThinking} />
      </div>
    </div>
  )
}
