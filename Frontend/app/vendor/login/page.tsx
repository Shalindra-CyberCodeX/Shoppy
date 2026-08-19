"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Store, ArrowLeft, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { useShoppy } from "@/lib/shoppy-context"

export default function VendorLoginPage() {
  const { vendorSignIn, hasApprovedVendor } = useShoppy()
  const router = useRouter()
  const [email, setEmail] = useState("care@wellwithin.lk")
  const [password, setPassword] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const ok = vendorSignIn()
    if (ok) router.push("/vendor/overview")
  }

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center bg-background px-4 py-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center justify-center gap-1.5">
          <span className="flex size-7 items-center justify-center rounded-full bg-primary text-sm">
            <Store className="size-3.5" />
          </span>
          <span className="text-lg font-bold text-foreground">
            Shoppy <span className="text-primary">Vendor</span>
          </span>
        </Link>

        <div className="flex flex-col gap-1.5 text-center">
          <h1 className="text-xl font-bold text-foreground">Vendor sign in</h1>
          <p className="text-sm text-muted-foreground">Manage your shop, products, and shopper feedback.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </Field>
          </FieldGroup>
          <Button type="submit" className="justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            Sign in
          </Button>
          {!hasApprovedVendor && (
            <p className="flex items-start gap-1.5 rounded-xl bg-accent/60 p-2.5 text-xs text-muted-foreground">
              <Info className="mt-0.5 size-3.5 shrink-0 text-primary" />
              No vendor applications have been approved yet. Ask an admin to approve one first.
            </p>
          )}
        </form>

        <Button render={<Link href="/" />} nativeButton={false} variant="ghost" className="justify-center rounded-full text-muted-foreground">
          <ArrowLeft data-icon="inline-start" />
          Back to Shoppy
        </Button>
      </div>
    </div>
  )
}
