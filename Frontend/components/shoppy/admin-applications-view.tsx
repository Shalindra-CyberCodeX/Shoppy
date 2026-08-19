"use client"

import { useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { Mail, MapPin, Tag, CalendarDays, Check, X, ShieldCheck, Phone } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { StatusPill } from "@/components/shoppy/status-pill"
import { useShoppy } from "@/lib/shoppy-context"
import type { VendorApplication } from "@/lib/mock-data"

export function AdminApplicationsView() {
  const { applications, approveApplication, rejectApplication } = useShoppy()
  const [selected, setSelected] = useState<VendorApplication | null>(null)
  const [open, setOpen] = useState(false)

  function handleOpen(app: VendorApplication) {
    setSelected(app)
    setOpen(true)
  }

  function handleApprove(app: VendorApplication) {
    approveApplication(app.id)
    toast.success(`${app.shopName} approved — vendor access unlocked.`)
    setOpen(false)
  }

  function handleReject(app: VendorApplication) {
    rejectApplication(app.id)
    toast.error(`${app.shopName} rejected.`)
    setOpen(false)
  }

  return (
    <div className="flex flex-1 flex-col gap-6 px-4 py-6 sm:px-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground">Vendor Applications</h1>
        <p className="text-sm text-muted-foreground">Review new shop applications and approve or reject them.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Shop</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow
                key={app.id}
                onClick={() => handleOpen(app)}
                className="cursor-pointer"
              >
                <TableCell className="font-medium text-foreground">{app.shopName}</TableCell>
                <TableCell className="text-muted-foreground">{app.ownerName}</TableCell>
                <TableCell className="text-muted-foreground">{app.location}</TableCell>
                <TableCell className="text-muted-foreground">{app.submittedAt}</TableCell>
                <TableCell>
                  <StatusPill status={app.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{selected?.shopName}</SheetTitle>
          </SheetHeader>
          {selected && (
            <div className="flex flex-col gap-5 px-4 pb-4">
              <StatusPill status={selected.status} className="w-fit" />

              <div className="relative h-32 w-full overflow-hidden rounded-2xl bg-muted">
                <Image src={selected.photoUrl || "/placeholder.svg"} alt={`${selected.shopName} storefront`} fill className="object-cover" />
              </div>

              <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 text-sm">
                <div className="flex items-center gap-2 text-foreground">
                  <Tag className="size-4 text-primary" />
                  {selected.category}
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <MapPin className="size-4 text-primary" />
                  {selected.location}
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <Mail className="size-4 text-primary" />
                  {selected.email}
                </div>
                {selected.phone && (
                  <div className="flex items-center gap-2 text-foreground">
                    <Phone className="size-4 text-primary" />
                    {selected.phone}
                  </div>
                )}
                <div className="flex items-center gap-2 text-foreground">
                  <ShieldCheck className="size-4 text-primary" />
                  BR {selected.brNumber}
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <CalendarDays className="size-4 text-primary" />
                  Submitted {selected.submittedAt}
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                Owner: <span className="text-foreground">{selected.ownerName}</span>. {selected.description}
              </p>

              {selected.status === "Pending" && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleApprove(selected)}
                    className="flex-1 justify-center rounded-full bg-success text-success-foreground hover:bg-success/90"
                  >
                    <Check data-icon="inline-start" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleReject(selected)}
                    variant="outline"
                    className="flex-1 justify-center rounded-full border-destructive text-destructive hover:bg-destructive/10"
                  >
                    <X data-icon="inline-start" />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
