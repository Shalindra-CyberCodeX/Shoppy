import { cn } from "@/lib/utils"

type Status = "Pending" | "Approved" | "Rejected" | "In Stock" | "Out of Stock" | "Active" | "Draft"

const STATUS_STYLES: Record<Status, string> = {
  Pending: "bg-warning/40 text-foreground",
  Approved: "bg-success/20 text-success",
  Rejected: "bg-destructive/10 text-destructive",
  "In Stock": "bg-success/20 text-success",
  "Out of Stock": "bg-muted text-muted-foreground",
  Active: "bg-success/20 text-success",
  Draft: "bg-muted text-muted-foreground",
}

export function StatusPill({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        STATUS_STYLES[status],
        className,
      )}
    >
      {status}
    </span>
  )
}
