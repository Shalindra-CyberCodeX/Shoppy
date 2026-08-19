import { notFound } from "next/navigation"
import { ChatView } from "@/components/shoppy/chat-view"
import { CHAT_HISTORY, matchShopsForPrompt } from "@/lib/mock-data"

export default async function ResumedChatPage({ params }: { params: Promise<{ chatId: string }> }) {
  const { chatId } = await params
  const entry = CHAT_HISTORY.find((c) => c.id === chatId)

  if (!entry) notFound()

  const shops = matchShopsForPrompt(entry.title, "All Locations")

  const initialMessages = [
    { id: `${chatId}-user`, role: "user" as const, content: entry.title },
    { id: `${chatId}-assistant`, role: "assistant" as const, shops },
  ]

  return <ChatView initialMessages={initialMessages} />
}
