import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export function AiSummaryCard({
  summary,
  className,
  label = "AI Summary",
}: {
  summary: string
  className?: string
  label?: string
}) {
  return (
    <div className={cn("flex items-start gap-3 rounded-2xl border border-accent bg-accent/60 p-4", className)}>
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Sparkles className="size-4" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold text-foreground">{label}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">{summary}</p>
      </div>
    </div>
  )
}
