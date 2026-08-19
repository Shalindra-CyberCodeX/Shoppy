"use client"

import { useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useShoppy } from "@/lib/shoppy-context"
import { LOCATIONS, type Location } from "@/lib/mock-data"

export function VendorShopDetailsView() {
  const { vendorShop, updateVendorShop } = useShoppy()
  const [form, setForm] = useState(vendorShop)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    updateVendorShop(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8 sm:px-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Shop Details</h1>
        <p className="mt-1 text-sm text-muted-foreground">Keep your shop information accurate for shoppers.</p>
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="shop-name">Shop name</Label>
          <Input id="shop-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="shop-category">Category</Label>
          <Input
            id="shop-category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="shop-description">Description</Label>
          <Textarea
            id="shop-description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label>Location</Label>
            <Select
              value={form.location}
              onValueChange={(value) => setForm({ ...form, location: value as Location })}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LOCATIONS.filter((l) => l !== "All Locations").map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="shop-floor">Floor / Street</Label>
            <Input
              id="shop-floor"
              value={form.floorOrStreet}
              onChange={(e) => setForm({ ...form, floorOrStreet: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="shop-contact">Contact number</Label>
            <Input
              id="shop-contact"
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="shop-points">Loyalty points per visit</Label>
            <Input
              id="shop-points"
              type="number"
              value={form.points}
              onChange={(e) => setForm({ ...form, points: Number(e.target.value) })}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button onClick={handleSave} className="rounded-full">
            <Save data-icon="inline-start" />
            Save changes
          </Button>
          {saved && <span className="text-sm font-medium text-success">Saved!</span>}
        </div>
      </div>
    </div>
  )
}
