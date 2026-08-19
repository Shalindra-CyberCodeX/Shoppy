"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus, Store, MessageCircle, X } from "lucide-react"
import { useShoppy } from "@/lib/shoppy-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PointsPill } from "@/components/shoppy/points-pill"
import { ShoppyIcon } from "@/components/shoppy/shoppy-logo"
import { cn } from "@/lib/utils"

function groupChats(history: { id: string; title: string; group: string }[]) {
  const groups: Record<string, typeof history> = {}
  for (const item of history) {
    groups[item.group] = groups[item.group] ? [...groups[item.group], item] : [item]
  }
  return groups
}

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { chatHistory, isSignedIn, profile, openProfilePanel } = useShoppy()
  const pathname = usePathname()
  const grouped = groupChats(chatHistory)

  return (
    <div className="flex h-full w-full flex-col gap-4 bg-sidebar px-3 py-4">
      <div className="flex items-center justify-between px-1">
        <Link href="/" onClick={onNavigate} className="flex items-center gap-1.5">
          <ShoppyIcon className="size-7" />
          <span className="text-base font-bold text-foreground">
            Shop<span className="text-primary">py</span>
          </span>
        </Link>
      </div>

      <Button
        render={<Link href="/chat" onClick={onNavigate} />}
        nativeButton={false}
        className="h-9 w-full justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <Plus data-icon="inline-start" />
        New Chat
      </Button>

      <Link
        href="/catalog"
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          pathname === "/catalog" && "bg-accent",
        )}
      >
        <Store className="size-4 text-primary" />
        Shop Catalog
      </Link>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1">
        {Object.entries(grouped).map(([group, items]) => (
          <div key={group} className="flex flex-col gap-1">
            <p className="px-3 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">{group}</p>
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/chat/${item.id}`}
                onClick={onNavigate}
                className={cn(
                  "group flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-foreground/80 transition-colors hover:bg-accent",
                  pathname === `/chat/${item.id}` && "bg-accent text-foreground",
                )}
              >
                <MessageCircle className="size-3.5 shrink-0 text-muted-foreground group-hover:text-primary" />
                <span className="truncate">{item.title}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 border-t border-border pt-3">
        {isSignedIn ? (
          <button
            type="button"
            onClick={openProfilePanel}
            className="flex items-center gap-2 rounded-xl px-2 py-2 text-left transition-colors hover:bg-accent"
          >
            <Avatar className="size-8">
              <AvatarImage src={profile.avatarUrl} alt={profile.name} />
              <AvatarFallback>{profile.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col">
              <span className="text-sm font-medium text-foreground">{profile.name}</span>
              <PointsPill points={profile.points} tier={profile.tier} className="w-fit" />
            </div>
          </button>
        ) : (
          <>
            <PointsPill points={50} tier="Bronze" className="w-fit" />
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex-1 rounded-full" onClick={openProfilePanel}>
                Feedback
              </Button>
              <Button
                size="sm"
                className="flex-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={openProfilePanel}
              >
                Sign in
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useShoppy()

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-border lg:block xl:w-72">
        <SidebarContent />
      </aside>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={closeSidebar} aria-hidden="true" />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] shadow-lg">
            <div className="flex justify-end p-2">
              <Button variant="ghost" size="icon-sm" onClick={closeSidebar} aria-label="Close menu">
                <X />
              </Button>
            </div>
            <div className="h-[calc(100%-2.5rem)]">
              <SidebarContent onNavigate={closeSidebar} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
