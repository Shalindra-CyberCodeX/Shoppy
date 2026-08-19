"use client"

import { Star } from "lucide-react"
import { AiSummaryCard } from "@/components/shoppy/ai-summary-card"
import { useShoppy } from "@/lib/shoppy-context"
import { FEEDBACK, generateFeedbackSummary } from "@/lib/mock-data"

export function VendorFeedbackView() {
  const { vendorShop } = useShoppy()
  const summary = generateFeedbackSummary(FEEDBACK, vendorShop.name)

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8 sm:px-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Shopper Feedback</h1>
        <p className="mt-1 text-sm text-muted-foreground">See what shoppers are saying about {vendorShop.name}.</p>
      </div>

      <AiSummaryCard summary={summary} label="AI Feedback Summary" />

      <div className="flex flex-col gap-3">
        {FEEDBACK.map((entry) => (
          <div key={entry.id} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-foreground">{entry.shopperName}</p>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`size-3.5 ${i < entry.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
                  />
                ))}
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{entry.comment}</p>
            <p className="mt-2 text-xs text-muted-foreground/70">{entry.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
