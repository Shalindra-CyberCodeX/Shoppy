"use client"

import Image from "next/image"
import type { Product } from "@/lib/mock-data"
import { StatusPill } from "@/components/shoppy/status-pill"
import { cn } from "@/lib/utils"

export function ProductCard({
  product,
  onSelect,
  className,
}: {
  product: Product
  onSelect: (product: Product) => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(product)}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition-all hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-contain p-6 transition-transform group-hover:scale-105"
          crossOrigin="anonymous"
        />
        {product.status === "out-of-stock" && (
          <StatusPill status="Out of Stock" className="absolute top-2 right-2" />
        )}
      </div>
      <div className="flex flex-col gap-1 p-3">
        <h4 className="text-sm font-medium text-foreground text-balance line-clamp-1">{product.name}</h4>
        <p className="text-sm font-semibold text-primary">Rs. {product.price.toLocaleString()}</p>
      </div>
    </button>
  )
}
