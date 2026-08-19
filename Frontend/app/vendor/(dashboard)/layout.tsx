"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useShoppy } from "@/lib/shoppy-context"
import { VendorNav } from "@/components/shoppy/vendor-nav"

export default function VendorDashboardLayout({ children }: { children: React.ReactNode }) {
  const { isVendorSignedIn } = useShoppy()
  const router = useRouter()

  useEffect(() => {
    if (!isVendorSignedIn) {
      router.replace("/vendor/login")
    }
  }, [isVendorSignedIn, router])

  if (!isVendorSignedIn) return null

  return <VendorNav>{children}</VendorNav>
}
