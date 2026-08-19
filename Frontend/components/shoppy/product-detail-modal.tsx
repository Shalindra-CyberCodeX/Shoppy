"use client"

import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { StatusPill } from "@/components/shoppy/status-pill"
import type { Product } from "@/lib/mock-data"

export function ProductDetailModal({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-auto bottom-0 max-w-full translate-y-0 rounded-b-none rounded-t-3xl sm:top-1/2 sm:bottom-auto sm:max-w-md sm:-translate-y-1/2 sm:rounded-3xl">
        {product && (
          <div className="flex flex-col gap-4">
            <DialogTitle className="sr-only">{product.name}</DialogTitle>
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-8"
                crossOrigin="anonymous"
              />
            </div>
            <div className="flex flex-col gap-2 px-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold text-foreground text-balance">{product.name}</h3>
                <StatusPill status={product.status === "in-stock" ? "In Stock" : "Out of Stock"} />
              </div>
              <p className="text-xl font-bold text-primary">Rs. {product.price.toLocaleString()}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
