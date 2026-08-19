"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Store } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { ShopCard } from "@/components/shoppy/shop-card"
import { LocationSelector } from "@/components/shoppy/location-selector"
import { useShoppy } from "@/lib/shoppy-context"
import { SHOPS } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const CATEGORIES = ["All", ...Array.from(new Set(SHOPS.map((shop) => shop.category)))]

export function CatalogView() {
  const { location, setLocation } = useShoppy()
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")

  const shops = useMemo(() => {
    return SHOPS.filter((shop) => {
      const matchesQuery =
        query.trim().length === 0 ||
        shop.name.toLowerCase().includes(query.toLowerCase()) ||
        shop.category.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === "All" || shop.category === category
      const matchesLocation = location === "All Locations" || shop.location === location
      return matchesQuery && matchesCategory && matchesLocation
    })
  }, [query, category, location])

  return (
    <div className="flex flex-1 flex-col gap-6 px-4 py-6 sm:px-8">
      <div className="flex flex-col gap-3">
        <Button
          render={<Link href="/chat" />}
          nativeButton={false}
          variant="ghost"
          size="sm"
          className="w-fit gap-1.5 rounded-full px-3 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft data-icon="inline-start" className="size-3.5" />
          Back to chat
        </Button>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-foreground">Shop Catalog</h1>
          <p className="text-sm text-muted-foreground">
            Browse every shop Shoppy knows about in Colombo, or narrow it down by category and mall.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shops or categories..."
            className="h-10 rounded-full pl-9"
          />
        </div>
        <LocationSelector value={location} onValueChange={setLocation} className="h-10 shrink-0" />
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              category === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:border-primary hover:bg-accent",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {shops.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      ) : (
        <Empty className="flex-1">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Store />
            </EmptyMedia>
            <EmptyTitle>No shops match your filters</EmptyTitle>
            <EmptyDescription>Try a different search term, category, or mall.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </div>
  )
}
