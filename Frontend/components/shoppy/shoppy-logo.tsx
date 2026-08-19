import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * The Shoppy robot mascot, cropped to a square icon. Use for compact
 * badges — nav bars, sidebars, avatars — anywhere the wordmark is set
 * separately in text.
 */
export function ShoppyIcon({ className }: { className?: string }) {
  return (
    <span className={cn("relative block shrink-0 overflow-hidden rounded-full bg-foreground", className)}>
      <Image
        src="/images/shoppy-icon.png"
        alt=""
        fill
        sizes="64px"
        className="scale-110 object-cover"
        crossOrigin="anonymous"
      />
    </span>
  )
}

/**
 * The full Shoppy logo lockup (mascot + wordmark + tagline). Use for hero
 * moments — landing page, auth screens — where the logo stands alone.
 */
export function ShoppyLogoMark({
  className,
  showTagline = true,
}: {
  className?: string
  showTagline?: boolean
}) {
  return (
    <span className={cn("relative block aspect-[1172/1000]", className)}>
      <Image
        src="/images/shoppy-logo.jpg"
        alt="Shoppy — Shop smarter with your AI friend"
        fill
        sizes="320px"
        className={cn("object-contain object-top", !showTagline && "scale-125 object-center")}
        crossOrigin="anonymous"
      />
    </span>
  )
}
