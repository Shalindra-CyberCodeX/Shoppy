"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { MapPin, MessageCircle, Sparkles, Trophy, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShoppyIcon } from "@/components/shoppy/shoppy-logo"
import { LocationCarousel } from "@/components/shoppy/location-carousel"
import { ShopperAuthModal } from "@/components/shoppy/shopper-auth-modal"
import { useShoppy } from "@/lib/shoppy-context"
import { LOCATIONS, SUGGESTED_PROMPTS } from "@/lib/mock-data"

const FEATURES = [
  {
    icon: MessageCircle,
    title: "Describe what you need",
    description:
      "Type a plain-language request : a budget, a brand, an occasion — the way you'd ask a friend.",
  },
  {
    icon: MapPin,
    title: "Get exact directions in-mall",
    description:
      "Shoppy points you to the precise floor, unit, or street — the detail Google Maps can't see indoors.",
  },
  {
    icon: Trophy,
    title: "Earn points as you go",
    description: "Every visit and piece of feedback builds your tier, from Bronze up to Gold.",
  },
]

export function LandingView() {
  const { isSignedIn } = useShoppy()
  const router = useRouter()
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  function handleGetStarted() {
    if (isSignedIn) {
      router.push("/chat")
      return
    }
    setIsAuthOpen(true)
  }

  return (
    <>
      <div className="flex min-h-dvh w-full flex-col bg-background">
      <header className="flex items-center justify-between px-4 py-4 sm:px-8">
        <span className="flex items-center gap-1.5">
          <ShoppyIcon className="size-8" />
          <span className="text-lg font-bold text-foreground">
            Shop<span className="text-primary">py</span>
          </span>
        </span>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleGetStarted}
            size="sm"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Sign in
          </Button>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <section className="flex flex-col items-center gap-6 px-4 pt-8 pb-14 text-center sm:pt-14">
          <span className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-foreground">
            <Sparkles className="size-3.5 text-primary" />
            For the First Time in Sri Lanka
          </span>
          <h1 className="max-w-2xl text-balance text-3xl font-bold text-foreground sm:text-5xl">
            Know exactly which shop to walk into, before you leave home.
          </h1>
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            Shoppy is your ultimate AI shopping companion for Colombo&apos;s malls and markets. Describe what you&apos;re
            after and get matched shops with the exact floor, unit, or street — without endless wandering.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button
              onClick={handleGetStarted}
              className="h-11 rounded-full bg-primary px-6 text-sm text-primary-foreground hover:bg-primary/90"
            >
              Get started free
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {LOCATIONS.filter((l) => l !== "All Locations").map((location) => (
              <span
                key={location}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground"
              >
                {location}
              </span>
            ))}
          </div>
        </section>

        <section className="px-4 pb-14 sm:px-8">
          <LocationCarousel />
        </section>

        <section className="flex flex-col gap-8 px-4 pb-16 sm:px-8">
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-2xl font-bold text-foreground">How Shoppy works</h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Three simple steps between an idea and walking into the right shop.
            </p>
          </div>
          <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-accent text-primary">
                  <feature.icon className="size-4.5" />
                </span>
                <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col items-center gap-5 px-4 pb-20 text-center sm:px-8">
          <h2 className="text-xl font-bold text-foreground">Try asking Shoppy things like</h2>
          <div className="flex max-w-2xl flex-wrap items-center justify-center gap-2">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt.id}
                type="button"
                onClick={handleGetStarted}
                className="rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-accent"
              >
                {prompt.label}
              </button>
            ))}
          </div>
        </section>
      </main>

      <footer className="flex flex-col items-center gap-2 border-t border-border px-4 py-6 text-center text-xs text-muted-foreground">
        <p>Shoppy · A pre-visit navigator for physical shopping in Colombo, Sri Lanka.</p>
        <div className="flex items-center gap-3">
          <Link href="/vendor/login" className="hover:text-foreground">
            Vendor login
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/admin/login" className="hover:text-foreground">
            Admin login
          </Link>
        </div>
      </footer>
      </div>
      <ShopperAuthModal
        open={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthenticated={() => {
          setIsAuthOpen(false)
          router.push("/chat")
        }}
      />
    </>
  )
}
