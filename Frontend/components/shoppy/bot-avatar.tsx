import { ShoppyIcon } from "@/components/shoppy/shoppy-logo"
import { cn } from "@/lib/utils"

export function BotAvatar({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <span className="absolute -top-1.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-primary" />
      <ShoppyIcon className="size-full" />
    </div>
  )
}
