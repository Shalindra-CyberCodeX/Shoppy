"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { Store, LogOut, Camera, Pencil, Check } from "lucide-react"
import { useShoppy } from "@/lib/shoppy-context"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { PointsPill } from "@/components/shoppy/points-pill"
import { ThemeToggle } from "@/components/shoppy/theme-toggle"
import { ShopFeedbackForm } from "@/components/shoppy/shop-feedback-form"
import { SEASONAL_ENTRIES } from "@/lib/mock-data"

const TIER_BANDS = [
  { tier: "Bronze", min: 0, max: 100 },
  { tier: "Silver", min: 100, max: 300 },
  { tier: "Gold", min: 300, max: 600 },
] as const

function getTierProgress(points: number) {
  const band = TIER_BANDS.find((b) => points < b.max) ?? TIER_BANDS[TIER_BANDS.length - 1]
  const progress = Math.min(100, Math.round(((points - band.min) / (band.max - band.min)) * 100))
  const pointsToNext = Math.max(0, band.max - points)
  return { progress, pointsToNext, nextTier: TIER_BANDS[TIER_BANDS.indexOf(band) + 1]?.tier }
}

function ProfileNameField() {
  const { profile, updateProfileName } = useShoppy()
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(profile.name)

  function commit() {
    if (value.trim()) updateProfileName(value.trim())
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          commit()
        }}
        className="flex items-center gap-1.5"
      >
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          className="h-8 rounded-full text-sm"
        />
        <Button type="submit" size="icon-sm" variant="ghost" aria-label="Save name">
          <Check />
        </Button>
      </form>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setIsEditing(true)}
      className="group flex items-center gap-1.5 text-left"
    >
      <p className="text-sm font-semibold text-foreground">{profile.name}</p>
      <Pencil className="size-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  )
}

export function ProfilePanel() {
  const { isProfilePanelOpen, closeProfilePanel, isSignedIn, signIn, signOut, profile, updateProfileAvatar } =
    useShoppy()
  const { progress, pointsToNext, nextTier } = getTierProgress(profile.points)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") updateProfileAvatar(reader.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <Sheet open={isProfilePanelOpen} onOpenChange={(open) => !open && closeProfilePanel()}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>{isSignedIn ? "Your profile" : "Sign in to Shoppy"}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-4 pb-6">
          {isSignedIn ? (
            <>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar size="lg">
                    <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                    <AvatarFallback>{profile.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Change profile photo"
                    className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground"
                  >
                    <Camera className="size-3" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="sr-only"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <ProfileNameField />
                  <p className="text-xs text-muted-foreground">{profile.email}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <PointsPill points={profile.points} tier={profile.tier} className="w-fit" />
                  {nextTier && (
                    <span className="text-xs font-medium text-muted-foreground">
                      {pointsToNext} pts to {nextTier}
                    </span>
                  )}
                </div>
                <Progress value={progress} />
              </div>

              <ThemeToggle />

              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold text-foreground">Seasonal Trip Planner</p>
                <div className="flex flex-col gap-2">
                  {SEASONAL_ENTRIES.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3"
                    >
                      <span className="text-lg">{entry.emoji}</span>
                      <div className="flex flex-1 flex-col">
                        <span className="text-sm font-medium text-foreground">{entry.title}</span>
                        <span className="text-xs text-muted-foreground">{entry.subtitle}</span>
                      </div>
                      {!entry.seen && (
                        <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                          New
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold text-foreground">Leave shop feedback</p>
                <ShopFeedbackForm />
              </div>

              <Separator />

              <Button
                render={<Link href="/vendor/apply" onClick={closeProfilePanel} />}
                nativeButton={false}
                variant="outline"
                className="justify-center rounded-full"
              >
                <Store data-icon="inline-start" />
                Add Your Shop
              </Button>

              <Button
                variant="ghost"
                onClick={signOut}
                className="justify-center rounded-full text-xs text-muted-foreground"
              >
                <LogOut data-icon="inline-start" className="size-3.5" />
                Sign out
              </Button>
            </>
          ) : (
            <>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Sign in to save your points, follow shops, and get personalized recommendations.
              </p>
              <Button onClick={signIn} className="justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                Sign in
              </Button>
              <Button
                render={<Link href="/vendor/apply" onClick={closeProfilePanel} />}
                nativeButton={false}
                variant="outline"
                className="justify-center rounded-full"
              >
                <Store data-icon="inline-start" />
                Become a Vendor
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
