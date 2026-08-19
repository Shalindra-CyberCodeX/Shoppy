"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Store, Package, MessageSquare, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShoppyIcon } from "@/components/shoppy/shoppy-logo"
import { useShoppy } from "@/lib/shoppy-context"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/vendor/overview", label: "Overview", icon: LayoutDashboard },
  { href: "/vendor/shop-details", label: "Shop Details", icon: Store },
  { href: "/vendor/products", label: "Products", icon: Package },
  { href: "/vendor/feedback", label: "Feedback", icon: MessageSquare },
]

export function VendorNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { vendorSignOut, vendorShop } = useShoppy()

  function handleSignOut() {
    vendorSignOut()
    router.push("/vendor/login")
  }

  return (
    <div className="flex h-dvh w-full flex-col">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <ShoppyIcon className="size-7" />
          <span className="text-base font-bold text-foreground">
            Shoppy <span className="text-primary">Vendor</span>
          </span>
          <span className="hidden text-sm text-muted-foreground sm:inline">· {vendorShop.name}</span>
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
