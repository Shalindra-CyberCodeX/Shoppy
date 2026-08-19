"use client"

import Link from "next/link"
import { Menu, BookOpen } from "lucide-react"
import { useShoppy } from "@/lib/shoppy-context"
import { Button } from "@/components/ui/button"
import { ShoppyIcon } from "@/components/shoppy/shoppy-logo"
import { PromptGuideDialog } from "@/components/shoppy/prompt-guide-dialog"

export function TopBar() {
  const { toggleSidebar } = useShoppy()

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          className="lg:hidden"
          onClick={toggleSidebar}
          aria-label="Open menu"
        >
          <Menu />
        </Button>
        <Link href="/" className="flex items-center gap-1.5 lg:hidden">
          <ShoppyIcon className="size-6" />
          <span className="text-base font-bold text-foreground">
            Shop<span className="text-primary">py</span>
          </span>
        </Link>
      </div>
      <PromptGuideDialog>
        <Button variant="outline" size="sm" className="gap-1.5 rounded-full text-foreground">
          <BookOpen className="size-3.5 text-primary" />
          <span className="hidden sm:inline">Prompt Guide</span>
        </Button>
      </PromptGuideDialog>
    </header>
  )
}
