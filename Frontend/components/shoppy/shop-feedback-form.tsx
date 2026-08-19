"use client"

import { useMemo, useState } from "react"
import { Star, Store, Search } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { SHOPS, type Shop } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function ShopFeedbackForm() {
  const [query, setQuery] = useState("")
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")

  const matches = useMemo(() => {
    if (query.trim().length === 0) return SHOPS.slice(0, 5)
    return SHOPS.filter((shop) => shop.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
  }, [query])

  function handleSelect(shop: Shop) {
    setSelectedShop(shop)
    setQuery(shop.name)
    setIsSearchOpen(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedShop) {
      toast.error("Choose a shop to leave feedback for.")
      return
    }
    if (rating === 0) {
      toast.error("Give the shop a star rating.")
      return
    }
    if (!comment.trim()) {
      toast.error("Add a short comment.")
      return
    }
    toast.success(`Feedback sent to ${selectedShop.name}!`)
    setSelectedShop(null)
    setQuery("")
    setRating(0)
    setComment("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="shop-search" className="text-xs font-semibold text-foreground">
          Which shop is this about?
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="shop-search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedShop(null)
              setIsSearchOpen(true)
            }}
            onFocus={() => setIsSearchOpen(true)}
            onBlur={() => setTimeout(() => setIsSearchOpen(false), 100)}
            placeholder="Search shop name..."
            className="h-10 rounded-full pl-9"
            autoComplete="off"
          />
          {isSearchOpen && matches.length > 0 && (
            <div className="absolute z-10 mt-1.5 w-full overflow-hidden rounded-2xl border border-border bg-popover shadow-md">
              {matches.map((shop) => (
                <button
                  key={shop.id}
                  type="button"
                  onClick={() => handleSelect(shop)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-accent"
                >
                  <Store className="size-3.5 shrink-0 text-primary" />
                  <span className="flex-1 truncate">{shop.name}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{shop.location}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-foreground">Your rating</span>
        <div className="flex items-center gap-1" role="radiogroup" aria-label="Star rating">
          {Array.from({ length: 5 }, (_, i) => i + 1).map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={rating === value}
              aria-label={`${value} star${value > 1 ? "s" : ""}`}
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-0.5"
            >
              <Star
                className={cn(
                  "size-6 transition-colors",
                  (hoverRating || rating) >= value ? "fill-primary text-primary" : "text-muted-foreground",
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="feedback-comment" className="text-xs font-semibold text-foreground">
          Your feedback
        </label>
        <Textarea
          id="feedback-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What went well, or what could be better?"
          rows={3}
        />
      </div>

      <Button type="submit" className="justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
        Submit feedback
      </Button>
    </form>
  )
}
