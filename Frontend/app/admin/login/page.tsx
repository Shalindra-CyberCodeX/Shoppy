"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShieldCheck, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { useShoppy } from "@/lib/shoppy-context"

export default function AdminLoginPage() {
  const { adminSignIn } = useShoppy()
  const router = useRouter()
  const [email, setEmail] = useState("admin@shoppy.lk")
  const [password, setPassword] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    adminSignIn()
    router.push("/admin/applications")
  }

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center bg-background px-4 py-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center justify-center gap-1.5">
          <span className="flex size-7 items-center justify-center rounded-full bg-foreground text-background">
            <ShieldCheck className="size-4" />
          </span>
          <span className="text-lg font-bold text-foreground">
            Shoppy <span className="text-primary">Admin</span>
          </span>
        </Link>

        <div className="flex flex-col gap-1.5 text-center">
          <h1 className="text-xl font-bold text-foreground">Admin sign in</h1>
          <p className="text-sm text-muted-foreground">Manage vendor applications and platform users.</p>
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
        </form>

        <Button render={<Link href="/" />} nativeButton={false} variant="ghost" className="justify-center rounded-full text-muted-foreground">
          <ArrowLeft data-icon="inline-start" />
          Back to Shoppy
        </Button>
      </div>
    </div>
  )
}
