"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ClipboardList, Users, LogOut, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useShoppy } from "@/lib/shoppy-context"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/admin/applications", label: "Applications", icon: ClipboardList },
  { href: "/admin/users", label: "Users", icon: Users },
]

export function AdminNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { adminSignOut } = useShoppy()

  function handleSignOut() {
    adminSignOut()
    router.push("/admin/login")
  }

  return (
    <div className="flex h-dvh w-full flex-col">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-foreground text-background">
            <ShieldCheck className="size-4" />
          </span>
          <span className="text-base font-bold text-foreground">
            Shoppy <span className="text-primary">Admin</span>
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleSignOut} className="rounded-full text-muted-foreground">
          <LogOut data-icon="inline-start" />
          Sign out
        </Button>
      </header>
      <div className="flex min-h-0 flex-1">
        <nav className="flex w-16 shrink-0 flex-col items-center gap-2 border-r border-border py-4 sm:w-56 sm:items-stretch sm:px-3">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent sm:justify-start",
                  active && "bg-accent text-primary",
                )}
              >
                <item.icon className="size-4.5 shrink-0" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            )
          })}
        </nav>
        <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
