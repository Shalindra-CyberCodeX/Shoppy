"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminNav } from "@/components/shoppy/admin-nav"
import { useShoppy } from "@/lib/shoppy-context"

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAdminSignedIn } = useShoppy()
  const router = useRouter()

  useEffect(() => {
    if (!isAdminSignedIn) router.replace("/admin/login")
  }, [isAdminSignedIn, router])

  if (!isAdminSignedIn) return null

  return <AdminNav>{children}</AdminNav>
}
