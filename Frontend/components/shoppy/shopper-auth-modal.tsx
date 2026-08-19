"use client"

import { useState } from "react"
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ShoppyIcon } from "@/components/shoppy/shoppy-logo"
import { useShopperAuth } from "@/lib/shopper-auth"

interface ShopperAuthModalProps {
  open: boolean
  onClose: () => void
  onAuthenticated: () => void
}

export function ShopperAuthModal({ open, onClose, onAuthenticated }: ShopperAuthModalProps) {
  const { signIn, signUp, signInWithGoogle } = useShopperAuth()
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  if (!open) return null

  function resetError() {
    setError("")
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = mode === "sign-in" ? signIn(email, password) : signUp(name, email, password)
    if (!result.success) {
      setError(result.message ?? "Unable to continue.")
      return
    }
    onAuthenticated()
  }

  function handleGoogle() {
    signInWithGoogle()
    onAuthenticated()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/45 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section role="dialog" aria-modal="true" aria-labelledby="shopper-auth-title" className="w-full max-w-md rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-2xl sm:p-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <ShoppyIcon className="size-12" />
          <div className="flex flex-col gap-1">
            <h2 id="shopper-auth-title" className="text-xl font-bold">{mode === "sign-in" ? "Welcome back to Shoppy" : "Create your Shoppy account"}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{mode === "sign-in" ? "Sign in to explore Colombo's shops and get personalized recommendations." : "Join Shoppy to discover the right shop before you leave home."}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <Button type="button" variant="outline" className="h-11 w-full rounded-full" onClick={handleGoogle}>
            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">G</span>
            Continue with Google
          </Button>
          <div className="flex items-center gap-3 text-xs text-muted-foreground"><Separator className="flex-1" /><span>or continue with email</span><Separator className="flex-1" /></div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "sign-up" && <div className="flex flex-col gap-2"><Label htmlFor="shopper-name">Name</Label><div className="relative"><UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="shopper-name" value={name} onChange={(event) => { setName(event.target.value); resetError() }} placeholder="Your name" className="h-11 rounded-xl pl-9" autoComplete="name" /></div></div>}
            <div className="flex flex-col gap-2"><Label htmlFor="shopper-email">Email</Label><div className="relative"><Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="shopper-email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); resetError() }} placeholder="you@example.com" className="h-11 rounded-xl pl-9" autoComplete="email" required /></div></div>
            <div className="flex flex-col gap-2"><Label htmlFor="shopper-password">Password</Label><div className="relative"><LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="shopper-password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => { setPassword(event.target.value); resetError() }} placeholder="At least 6 characters" className="h-11 rounded-xl px-9" autoComplete={mode === "sign-in" ? "current-password" : "new-password"} required /><button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff /> : <Eye />}</button></div></div>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="h-11 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">{mode === "sign-in" ? "Sign in" : "Create account"}</Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">{mode === "sign-in" ? "New to Shoppy?" : "Already have an account?"}{" "}<button type="button" className="font-semibold text-primary hover:underline" onClick={() => { setMode(mode === "sign-in" ? "sign-up" : "sign-in"); resetError() }}>{mode === "sign-in" ? "Create an account" : "Sign in"}</button></p>
          <button type="button" className="text-sm text-muted-foreground hover:text-foreground" onClick={onClose}>Continue browsing the landing page</button>
        </div>
      </section>
    </div>
  )
}
