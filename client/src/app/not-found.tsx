import type { Metadata } from "next"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

export const metadata: Metadata = {
  title: "404 — Page Not Found | Volt",
  description: "This page doesn't exist. Head back and keep moving.",
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 px-6 py-16 sm:flex-row sm:items-center sm:px-10 lg:px-20">
      {/* 404 */}
      <div className="flex items-center justify-center">
        <span className="select-none font-heading text-[40vw] font-bold leading-none tracking-tighter text-foreground/10 sm:text-[20vw] lg:text-[18vw]">
          404
        </span>
      </div>

      {/* Copy */}
      <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-3xl font-bold lg:text-5xl">
            Oops!
          </h1>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground lg:text-base">
            Couldn&apos;t get your page. Maybe this is not available yet.
          </p>
        </div>

        <Link href="/" className={buttonVariants({ className: "h-12 w-fit gap-3 rounded-full px-6" })}>
          Back to home
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
