"use client"

import Link from "next/link"
import { BookOpen, Sparkles } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SUGGESTED_PROMPTS } from "@/lib/mock-data"

const TIPS = [
  { title: "Set a budget", example: "Gifts under Rs. 5K" },
  { title: "Name the category", example: "Electronics in Pettah" },
  { title: "Mention the occasion", example: "Wedding shopping" },
  { title: "Ask where to find it", example: "Best food court near Havelock City" },
]

/**
 * Wraps its child trigger in a dialog explaining how to write good prompts,
 * with quick-start chips that jump straight into a matching chat.
 */
export function PromptGuideDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger render={children as React.ReactElement} nativeButton />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="size-4 text-primary" />
            Prompt Guide
          </DialogTitle>
          <DialogDescription>
            Shoppy works best with a little detail. Mention a budget, category, or occasion.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {TIPS.map((tip) => (
            <div key={tip.title} className="rounded-xl border border-border bg-card p-3">
              <p className="text-sm font-semibold text-foreground">{tip.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{'"' + tip.example + '"'}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            Try one now
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <Button
                key={prompt.id}
                render={<Link href={`/chat?prompt=${encodeURIComponent(prompt.label)}`} />}
                nativeButton={false}
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                {prompt.label}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
