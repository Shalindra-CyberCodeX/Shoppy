"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, MapPin, Phone, Search, Sparkles, Store } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { ShopThumbnail } from "@/components/shoppy/shop-thumbnail"
import { PointsPill } from "@/components/shoppy/points-pill"
import { ProductCard } from "@/components/shoppy/product-card"
import { ProductDetailModal } from "@/components/shoppy/product-detail-modal"
import { AiSummaryCard } from "@/components/shoppy/ai-summary-card"
import { FEEDBACK, generateFeedbackSummary, type Product, type Shop } from "@/lib/mock-data"

export function ShopView({ shop, products }: { shop: Shop; products: Product[] }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [query, setQuery] = useState("")

  function handleSelectProduct(product: Product) {
    setSelectedProduct(product)
    setModalOpen(true)
  }

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return products
    const q = query.toLowerCase()
    return products.filter(
      (product) => product.name.toLowerCase().includes(q) || product.description.toLowerCase().includes(q),
    )
  }, [products, query])

  return (
    <div className="flex flex-1 flex-col gap-6 px-4 py-6 sm:px-8">
      <Link
        href="/catalog"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Shop Catalog
      </Link>

      <div className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-5 sm:flex-row sm:items-start sm:p-6">
        <ShopThumbnail tone={shop.heroTone} size="lg" className="h-28 w-28 shrink-0 sm:h-32 sm:w-32" />
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-bold text-foreground text-balance sm:text-2xl">{shop.name}</h1>
              <p className="text-sm font-medium text-primary">{shop.category}</p>
            </div>
            <PointsPill points={shop.points} />
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{shop.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4 text-primary" />
              {shop.location} · {shop.floorOrStreet}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="size-4 text-primary" />
              {shop.contact}
            </span>
          </div>
        </div>
      </div>

      <AiSummaryCard summary={generateFeedbackSummary(FEEDBACK, shop.name)} label="AI Feedback Summary" />

      <div className="flex flex-col gap-4">
        <h2 className="flex items-center gap-1.5 text-base font-semibold text-foreground">
          <Sparkles className="size-4 text-primary" />
          Products
        </h2>

        <div className="relative max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products by name or category..."
            className="h-10 rounded-full pl-9"
          />
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onSelect={handleSelectProduct} />
            ))}
          </div>
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Store />
              </EmptyMedia>
              <EmptyTitle>No products match &quot;{query}&quot;</EmptyTitle>
              <EmptyDescription>Try a different product name or category.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </div>

      <ProductDetailModal product={selectedProduct} open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  )
}
