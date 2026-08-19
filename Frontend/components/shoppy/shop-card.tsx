import Link from "next/link"
import { MapPin } from "lucide-react"
import type { Shop } from "@/lib/mock-data"
import { ShopThumbnail } from "@/components/shoppy/shop-thumbnail"
import { PointsPill } from "@/components/shoppy/points-pill"
import { cn } from "@/lib/utils"

export function ShopCard({ shop, className }: { shop: Shop; className?: string }) {
  return (
    <Link
      href={`/shop/${shop.id}`}
      className={cn(
        "group flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
    >
      <ShopThumbnail tone={shop.heroTone} className="h-28 w-full" />
      <div className="flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-foreground text-balance">{shop.name}</h3>
          <PointsPill points={shop.points} />
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{shop.description}</p>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3.5 text-primary" />
          <span className="truncate">{shop.location}</span>
        </div>
      </div>
    </Link>
  )
}
