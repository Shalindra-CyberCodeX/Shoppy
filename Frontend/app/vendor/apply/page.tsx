import { VendorApplyForm } from "@/components/shoppy/vendor-apply-form"
import { ShoppyIcon } from "@/components/shoppy/shoppy-logo"
import Link from "next/link"

export default function VendorApplyPage() {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center bg-background px-4 py-10 sm:py-16">
      <div className="flex w-full max-w-lg flex-col gap-6">
        <Link href="/chat" className="flex items-center justify-center gap-1.5">
          <ShoppyIcon className="size-8" />
          <span className="text-lg font-bold text-foreground">
            Shop<span className="text-primary">py</span>
          </span>
        </Link>

        <div className="flex flex-col gap-1.5 text-center">
          <h1 className="text-2xl font-bold text-foreground text-balance">Become a Shoppy Vendor</h1>
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
            List your shop on Shoppy and get discovered by shoppers across Colombo. Tell us a bit about your
            business and we&apos;ll be in touch.
          </p>
        </div>

        <VendorApplyForm />
      </div>
    </div>
  )
}
