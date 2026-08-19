"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted && theme === "dark"

  return (
    <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3">
      <div className="flex items-center gap-2">
        {isDark ? <Moon className="size-4 text-primary" /> : <Sun className="size-4 text-primary" />}
        <Label htmlFor="theme-toggle" className="text-sm font-medium text-foreground">
          Dark mode
        </Label>
      </div>
      <Switch id="theme-toggle" checked={isDark} onCheckedChange={(v) => setTheme(v ? "dark" : "light")} />
    </div>
  )
}
