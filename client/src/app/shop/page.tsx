"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { Navbar } from "@/app/_components/ui/navbar"
import Footer from "@/app/_components/footer"

export default function ShopPage() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const forParam = searchParams.get("for")
    const productParam = searchParams.get("product")

    if (forParam) console.log("[Shop] for:", forParam)
    if (productParam) console.log("[Shop] product:", productParam)
    if (!forParam && !productParam) console.log("[Shop] no params")
  }, [searchParams])

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground">Shop coming soon.</p>
      </div>
      <Footer />
    </div>
  )
}
