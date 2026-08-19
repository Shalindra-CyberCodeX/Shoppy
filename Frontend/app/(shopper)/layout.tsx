import { Sidebar } from "@/components/shoppy/sidebar"
import { TopBar } from "@/components/shoppy/top-bar"
import { ProfilePanel } from "@/components/shoppy/profile-panel"

export default function ShopperLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">{children}</main>
      </div>
      <ProfilePanel />
    </div>
  )
}
