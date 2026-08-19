import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export function PointsPill({ points, tier, className }: { points: number; tier?: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-foreground",
        className,
      )}
    >
      <Sparkles className="size-3 text-primary" />
      {points} pts{tier ? ` · ${tier}` : ""}
    </span>
  )
}
