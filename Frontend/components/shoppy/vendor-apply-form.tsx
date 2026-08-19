"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle2, ArrowLeft, Upload, Store } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { LOCATIONS, SHOPS, type Location } from "@/lib/mock-data"
import { useShoppy } from "@/lib/shoppy-context"

const CATEGORIES = Array.from(new Set(SHOPS.map((shop) => shop.category)))
const VENDOR_LOCATIONS = LOCATIONS.filter((location) => location !== "All Locations")

interface FormState {
  shopName: string
  ownerName: string
  category: string
  location: Location | ""
  email: string
  phone: string
  brNumber: string
  description: string
  photoUrl: string
}

const INITIAL_STATE: FormState = {
  shopName: "",
  ownerName: "",
  category: "",
  location: "",
  email: "",
  phone: "",
  brNumber: "",
  description: "",
  photoUrl: "",
}

export function VendorApplyForm() {
  const { submitApplication } = useShoppy()
  const [form, setForm] = useState<FormState>(INITIAL_STATE)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") updateField("photoUrl", reader.result)
    }
    reader.readAsDataURL(file)
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof FormState, string>> = {}
    if (!form.shopName.trim()) nextErrors.shopName = "Shop name is required."
    if (!form.ownerName.trim()) nextErrors.ownerName = "Owner name is required."
    if (!form.category) nextErrors.category = "Select a category."
    if (!form.location) nextErrors.location = "Select a mall or market."
    if (!form.email.trim()) {
      nextErrors.email = "Email is required."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address."
    }
    if (!form.brNumber.trim()) nextErrors.brNumber = "Business registration (BR) number is required."
    if (!form.description.trim()) nextErrors.description = "Tell shoppers what you sell."
    if (!form.photoUrl) nextErrors.photoUrl = "Upload a photo of your shop."
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) {
      toast.error("Please fix the highlighted fields.")
      return
    }
    submitApplication({
      shopName: form.shopName,
      ownerName: form.ownerName,
      category: form.category,
      location: form.location as Location,
      email: form.email,
      phone: form.phone || undefined,
      brNumber: form.brNumber,
      description: form.description,
      photoUrl: form.photoUrl,
    })
    setSubmitted(true)
    toast.success("Application submitted!")
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-card p-8 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-success/20 text-success">
          <CheckCircle2 className="size-7" />
        </span>
        <div className="flex flex-col gap-1.5">
          <h2 className="text-lg font-semibold text-foreground">Application received</h2>
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
            Thanks for applying, {form.ownerName.split(" ")[0] || "there"}. Our team reviews new vendor
            applications within 2 business days and will reach out at {form.email}.
          </p>
        </div>
        <Button render={<Link href="/chat" />} nativeButton={false} className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
          Back to Shoppy
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-6 sm:p-8">
      <FieldGroup>
        <Field data-invalid={!!errors.shopName}>
          <FieldLabel htmlFor="shopName">Shop name</FieldLabel>
          <Input
            id="shopName"
            value={form.shopName}
            onChange={(e) => updateField("shopName", e.target.value)}
            placeholder="e.g. Cinnamon Trail Spices"
            aria-invalid={!!errors.shopName}
          />
          <FieldError>{errors.shopName}</FieldError>
        </Field>

        <Field data-invalid={!!errors.ownerName}>
          <FieldLabel htmlFor="ownerName">Owner name</FieldLabel>
          <Input
            id="ownerName"
            value={form.ownerName}
            onChange={(e) => updateField("ownerName", e.target.value)}
            placeholder="e.g. Dilani Perera"
            aria-invalid={!!errors.ownerName}
          />
          <FieldError>{errors.ownerName}</FieldError>
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.category}>
            <FieldLabel htmlFor="category">Category</FieldLabel>
            <Select value={form.category} onValueChange={(v) => updateField("category", v ?? "")}>
              <SelectTrigger id="category" aria-invalid={!!errors.category}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldError>{errors.category}</FieldError>
          </Field>

          <Field data-invalid={!!errors.location}>
            <FieldLabel htmlFor="location">Mall / market</FieldLabel>
            <Select value={form.location} onValueChange={(v) => updateField("location", v as Location)}>
              <SelectTrigger id="location" aria-invalid={!!errors.location}>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {VENDOR_LOCATIONS.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldError>{errors.location}</FieldError>
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="you@shop.lk"
              aria-invalid={!!errors.email}
            />
            <FieldError>{errors.email}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="phone">Phone (optional)</FieldLabel>
            <Input
              id="phone"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+94 77 123 4567"
            />
          </Field>
        </div>

        <Field data-invalid={!!errors.brNumber}>
          <FieldLabel htmlFor="brNumber">Business Registration (BR) number</FieldLabel>
          <Input
            id="brNumber"
            value={form.brNumber}
            onChange={(e) => updateField("brNumber", e.target.value)}
            placeholder="e.g. PV 00234567"
            aria-invalid={!!errors.brNumber}
          />
          <FieldDescription>Used by our team to verify your business before approval.</FieldDescription>
          <FieldError>{errors.brNumber}</FieldError>
        </Field>

        <Field data-invalid={!!errors.photoUrl}>
          <FieldLabel htmlFor="shopPhoto">Shop photo</FieldLabel>
          <div className="flex items-center gap-3">
            <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted">
              {form.photoUrl ? (
                <Image src={form.photoUrl} alt="Shop preview" fill className="object-cover" />
              ) : (
                <Store className="size-6 text-muted-foreground" />
              )}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload data-icon="inline-start" className="size-3.5" />
              {form.photoUrl ? "Change photo" : "Upload photo"}
            </Button>
            <input
              ref={fileInputRef}
              id="shopPhoto"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="sr-only"
              aria-invalid={!!errors.photoUrl}
            />
          </div>
          <FieldDescription>A clear photo of your storefront or products, shown to shoppers once approved.</FieldDescription>
          <FieldError>{errors.photoUrl}</FieldError>
        </Field>

        <Field data-invalid={!!errors.description}>
          <FieldLabel htmlFor="description">Tell shoppers what you sell</FieldLabel>
          <Textarea
            id="description"
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Describe your products, pricing, and what makes your shop stand out..."
            rows={4}
            aria-invalid={!!errors.description}
          />
          <FieldDescription>A couple of sentences is plenty — you can add more once approved.</FieldDescription>
          <FieldError>{errors.description}</FieldError>
        </Field>
      </FieldGroup>

      <div className="flex flex-col gap-2">
        <Button type="submit" className="w-full justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
          Submit Application
        </Button>
        <Button
          render={<Link href="/chat" />}
          nativeButton={false}
          variant="ghost"
          className="w-full justify-center rounded-full text-muted-foreground"
        >
          <ArrowLeft data-icon="inline-start" />
          Cancel and go back
        </Button>
      </div>
    </form>
  )
}
