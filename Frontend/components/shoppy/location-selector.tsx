"use client"

import { MapPin } from "lucide-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LOCATIONS, type Location } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function LocationSelector({
  value,
  onValueChange,
  className,
}: {
  value: Location
  onValueChange: (value: Location) => void
  className?: string
}) {
  return (
    <Select value={value} onValueChange={(v) => onValueChange(v as Location)}>
      <SelectTrigger
        className={cn(
          "h-8 rounded-full border-border bg-secondary px-3 text-xs font-medium text-foreground",
          className,
        )}
      >
        <MapPin className="size-3.5 text-primary" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {LOCATIONS.map((location) => (
            <SelectItem key={location} value={location}>
              {location}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
