"use client"

import { useState } from "react"
import Image from "next/image"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { useShoppy } from "@/lib/shoppy-context"
import { PRODUCT_IMAGES, type Product, type ProductStatus } from "@/lib/mock-data"

const emptyForm = {
  name: "",
  price: 0,
  description: "",
  status: "in-stock" as ProductStatus,
  image: PRODUCT_IMAGES[0],
}

export function VendorProductsView() {
  const { vendorProducts, addVendorProduct, updateVendorProduct, removeVendorProduct } = useShoppy()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)

  function openAdd() {
    setEditingId(null)
    setForm(emptyForm)
    setDialogOpen(true)
  }

  function openEdit(product: Product) {
    setEditingId(product.id)
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      status: product.status,
      image: product.image,
    })
    setDialogOpen(true)
  }

  function handleSubmit() {
    if (!form.name.trim()) return
    if (editingId) {
      updateVendorProduct(editingId, form)
    } else {
      addVendorProduct(form)
    }
    setDialogOpen(false)
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage what shoppers see in your catalog.</p>
        </div>
        <Button onClick={openAdd} className="rounded-full">
          <Plus data-icon="inline-start" />
          Add product
        </Button>
      </div>

      {vendorProducts.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Plus />
            </EmptyMedia>
            <EmptyTitle>No products yet</EmptyTitle>
            <EmptyDescription>Add your first product so shoppers can find it.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {vendorProducts.map((product) => (
            <div key={product.id} className="flex gap-3 rounded-2xl border border-border bg-card p-3">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-foreground">{product.name}</p>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      product.status === "in-stock"
                        ? "bg-success/20 text-success"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {product.status === "in-stock" ? "In stock" : "Out of stock"}
                  </span>
                </div>
                <p className="text-sm font-bold text-primary">Rs. {product.price.toLocaleString()}</p>
                <p className="line-clamp-1 text-xs text-muted-foreground">{product.description}</p>
                <div className="mt-auto flex items-center gap-2 pt-1">
                  <Button variant="outline" size="sm" className="h-7 rounded-full text-xs" onClick={() => openEdit(product)}>
                    <Pencil className="size-3.5" data-icon="inline-start" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 rounded-full text-xs text-destructive hover:text-destructive"
                    onClick={() => removeVendorProduct(product.id)}
                  >
                    <Trash2 className="size-3.5" data-icon="inline-start" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit product" : "Add product"}</DialogTitle>
            <DialogDescription>Details shown to shoppers on your shop page.</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="product-name">Name</Label>
              <Input
                id="product-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="product-price">Price (Rs.)</Label>
              <Input
                id="product-price"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="product-description">Description</Label>
              <Textarea
                id="product-description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Availability</Label>
              <Select
                value={form.status}
                onValueChange={(value) => setForm({ ...form, status: value as ProductStatus })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-stock">In stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>{editingId ? "Save changes" : "Add product"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
