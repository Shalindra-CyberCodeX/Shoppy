"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import { useShopperAuth } from "@/lib/shopper-auth"
import {
  CHAT_HISTORY,
  VENDOR_APPLICATIONS,
  getProductsByShop,
  getShopById,
  type ChatHistoryEntry,
  type Location,
  type Product,
  type Shop,
  type VendorApplication,
} from "@/lib/mock-data"

export interface ShopperProfile {
  name: string
  email: string
  points: number
  tier: "Bronze" | "Silver" | "Gold"
  avatarUrl: string
}

export const VENDOR_DEMO_SHOP_ID = "shop-wellwithin"

interface ShoppyContextValue {
  isSignedIn: boolean
  signIn: () => void
  signOut: () => void
  profile: ShopperProfile
  updateProfileName: (name: string) => void
  updateProfileAvatar: (avatarUrl: string) => void
  chatHistory: ChatHistoryEntry[]
  location: Location
  setLocation: (location: Location) => void
  isProfilePanelOpen: boolean
  openProfilePanel: () => void
  closeProfilePanel: () => void
  isSidebarOpen: boolean
  toggleSidebar: () => void
  closeSidebar: () => void
  // Admin
  isAdminSignedIn: boolean
  adminSignIn: () => void
  adminSignOut: () => void
  applications: VendorApplication[]
  submitApplication: (application: Omit<VendorApplication, "id" | "status" | "submittedAt">) => void
  approveApplication: (id: string) => void
  rejectApplication: (id: string) => void
  // Vendor
  isVendorSignedIn: boolean
  vendorSignIn: () => boolean
  vendorSignOut: () => void
  hasApprovedVendor: boolean
  vendorShop: Shop
  updateVendorShop: (patch: Partial<Shop>) => void
  vendorProducts: Product[]
  addVendorProduct: (product: Omit<Product, "id" | "shopId">) => void
  updateVendorProduct: (id: string, patch: Partial<Product>) => void
  removeVendorProduct: (id: string) => void
}

const ShoppyContext = createContext<ShoppyContextValue | null>(null)

export function ShoppyProvider({ children }: { children: ReactNode }) {
  const shopperAuth = useShopperAuth()
  const [name, setName] = useState("Nadeesha Perera")
  const [avatarUrl, setAvatarUrl] = useState("/images/avatar.png")
  const [location, setLocation] = useState<Location>("All Locations")
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isAdminSignedIn, setIsAdminSignedIn] = useState(false)
  const [isVendorSignedIn, setIsVendorSignedIn] = useState(false)
  const [applications, setApplications] = useState<VendorApplication[]>(VENDOR_APPLICATIONS)
  const [vendorShop, setVendorShop] = useState<Shop>(() => getShopById(VENDOR_DEMO_SHOP_ID)!)
  const [vendorProducts, setVendorProducts] = useState<Product[]>(() => getProductsByShop(VENDOR_DEMO_SHOP_ID))

  const profile: ShopperProfile = useMemo(
    () => ({
      name: shopperAuth.session?.name ?? name,
      email: shopperAuth.session?.email ?? "nadeesha.perera@mail.com",
      points: 50,
      tier: "Bronze",
      avatarUrl,
    }),
    [name, avatarUrl],
  )

  const hasApprovedVendor = applications.some((app) => app.status === "Approved")

  const value: ShoppyContextValue = {
    isSignedIn: shopperAuth.isAuthenticated,
    signIn: () => undefined,
    signOut: shopperAuth.signOut,
    profile,
    updateProfileName: setName,
    updateProfileAvatar: setAvatarUrl,
    chatHistory: CHAT_HISTORY,
    location,
    setLocation,
    isProfilePanelOpen,
    openProfilePanel: () => setIsProfilePanelOpen(true),
    closeProfilePanel: () => setIsProfilePanelOpen(false),
    isSidebarOpen,
    toggleSidebar: () => setIsSidebarOpen((v) => !v),
    closeSidebar: () => setIsSidebarOpen(false),
    isAdminSignedIn,
    adminSignIn: () => setIsAdminSignedIn(true),
    adminSignOut: () => setIsAdminSignedIn(false),
    applications,
    submitApplication: (application) =>
      setApplications((prev) => [
        ...prev,
        {
          ...application,
          id: `app-${Date.now()}`,
          status: "Pending",
          submittedAt: new Date().toISOString().slice(0, 10),
        },
      ]),
    approveApplication: (id) =>
      setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status: "Approved" } : app))),
    rejectApplication: (id) =>
      setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status: "Rejected" } : app))),
    isVendorSignedIn,
    vendorSignIn: () => {
      if (!hasApprovedVendor) return false
      setIsVendorSignedIn(true)
      return true
    },
    vendorSignOut: () => setIsVendorSignedIn(false),
    hasApprovedVendor,
    vendorShop,
    updateVendorShop: (patch) => setVendorShop((prev) => ({ ...prev, ...patch })),
    vendorProducts,
    addVendorProduct: (product) =>
      setVendorProducts((prev) => [
        ...prev,
        { ...product, id: `${VENDOR_DEMO_SHOP_ID}-product-${Date.now()}`, shopId: VENDOR_DEMO_SHOP_ID },
      ]),
    updateVendorProduct: (id, patch) =>
      setVendorProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p))),
    removeVendorProduct: (id) => setVendorProducts((prev) => prev.filter((p) => p.id !== id)),
  }

  return <ShoppyContext.Provider value={value}>{children}</ShoppyContext.Provider>
}

export function useShoppy() {
  const ctx = useContext(ShoppyContext)
  if (!ctx) throw new Error("useShoppy must be used within ShoppyProvider")
  return ctx
}
