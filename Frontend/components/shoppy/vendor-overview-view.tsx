"use client"

import Link from "next/link"
import { ArrowRight, Package, Star, TrendingUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useShoppy } from "@/lib/shoppy-context"
import { FEEDBACK } from "@/lib/mock-data"

function healthTone(score: number) {
  if (score >= 85) return { label: "Excellent", className: "text-success" }
  if (score >= 65) return { label: "Good", className: "text-primary" }
  return { label: "Needs attention", className: "text-destructive" }
}

export function VendorOverviewView() {
  const { vendorShop, vendorProducts } = useShoppy()
  const tone = healthTone(vendorShop.healthScore)
  const avgRating = FEEDBACK.reduce((sum, f) => sum + f.rating, 0) / FEEDBACK.length
  const inStock = vendorProducts.filter((p) => p.status === "in-stock").length

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back, {vendorShop.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Here&apos;s how your shop is performing on Shoppy.</p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Shop Health Score</p>
            <p className="mt-1 text-4xl font-bold text-foreground">{vendorShop.healthScore}</p>
          </div>
          <span className={`rounded-full bg-accent px-3 py-1 text-sm font-semibold ${tone.className}`}>
            {tone.label}
          </span>
        </div>
        <Progress value={vendorShop.healthScore} className="mt-4 h-2.5" />
        <p className="mt-3 text-sm text-muted-foreground">
          Calculated from product freshness, shopper ratings, and response activity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
            <Package className="size-5" />
          </span>
          <div>
            <p className="text-lg font-bold text-foreground">
              {inStock}/{vendorProducts.length}
            </p>
            <p className="text-xs text-muted-foreground">Products in stock</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
            <Star className="size-5" />
          </span>
          <div>
            <p className="text-lg font-bold text-foreground">{avgRating.toFixed(1)} / 5</p>
            <p className="text-xs text-muted-foreground">Average shopper rating</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
            <TrendingUp className="size-5" />
          </span>
          <div>
            <p className="text-lg font-bold text-foreground">{vendorShop.points} pts</p>
            <p className="text-xs text-muted-foreground">Loyalty points offered</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button render={<Link href="/vendor/products" />} nativeButton={false} className="rounded-full">
          Manage products
          <ArrowRight data-icon="inline-end" />
        </Button>
        <Button
          render={<Link href="/vendor/feedback" />}
          nativeButton={false}
          variant="outline"
          className="rounded-full"
        >
          View shopper feedback
        </Button>
      </div>
    </div>
  )
}
