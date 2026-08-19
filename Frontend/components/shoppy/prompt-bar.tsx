"use client"

import { useState } from "react"
import { ArrowUp } from "lucide-react"
import { LocationSelector } from "@/components/shoppy/location-selector"
import { Button } from "@/components/ui/button"
import { useShoppy } from "@/lib/shoppy-context"
import type { Location } from "@/lib/mock-data"

export function PromptBar({
  onSubmit,
  disabled,
}: {
  onSubmit: (value: string) => void
  disabled?: boolean
}) {
  const { location, setLocation } = useShoppy()
  const [value, setValue] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSubmit(trimmed)
    setValue("")
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.nativeEvent.isComposing && e.nativeEvent.keyCode !== 229) {
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full min-w-0 flex-col gap-2">
      <div className="flex w-full min-w-0 items-center gap-1.5 rounded-full border border-border bg-card px-2 py-1.5 shadow-sm sm:gap-2">
        <LocationSelector
          value={location}
          onValueChange={(v: Location) => setLocation(v)}
          className="max-w-[104px] shrink-0 truncate sm:max-w-none"
        />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Shoppy anything..."
          aria-label="Ask Shoppy anything"
          className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <Button
          type="submit"
          size="icon-sm"
          disabled={!value.trim() || disabled}
          className="shrink-0 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          aria-label="Send message"
        >
          <ArrowUp />
        </Button>
      </div>
      <div className="flex items-center gap-2 px-2">
        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] font-semibold text-background">
          EN
        </span>
        <span className="text-[11px] text-muted-foreground">Shoppy can make mistakes. Verify prices in-store.</span>
      </div>
    </form>
  )
}
