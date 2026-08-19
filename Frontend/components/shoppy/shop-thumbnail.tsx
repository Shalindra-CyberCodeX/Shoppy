import { cn } from "@/lib/utils"
import type { Shop } from "@/lib/mock-data"
import { Store } from "lucide-react"

const TONE_STYLES: Record<Shop["heroTone"], string> = {
  amber: "bg-primary",
  navy: "bg-foreground",
  sage: "bg-success",
}

const TONE_FOREGROUND: Record<Shop["heroTone"], string> = {
  amber: "text-primary-foreground",
  navy: "text-background",
  sage: "text-success-foreground",
}

export function ShopThumbnail({
  tone,
  className,
  size = "md",
}: {
  tone: Shop["heroTone"]
  className?: string
  size?: "sm" | "md" | "lg"
}) {
  return (
    <div
      className={cn(
        "relative isolate flex shrink-0 items-center justify-center overflow-hidden rounded-2xl",
        TONE_STYLES[tone],
        className,
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-15"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <circle cx="85" cy="10" r="45" fill="currentColor" className={TONE_FOREGROUND[tone]} />
        <circle cx="8" cy="95" r="30" fill="currentColor" className={TONE_FOREGROUND[tone]} />
      </svg>
      <Store
        className={cn(
          TONE_FOREGROUND[tone],
          "relative",
          size === "sm" ? "size-5" : size === "lg" ? "size-10" : "size-7",
        )}
      />
    </div>
  )
}
