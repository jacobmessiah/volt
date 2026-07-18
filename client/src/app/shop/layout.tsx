import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop | Volt",
  description:
    "Browse the full Volt collection — running, basketball, lifestyle, hiking, and limited-edition sneakers. Filter by size, price, and category.",
  openGraph: {
    title: "Shop | Volt",
    description:
      "Browse the full Volt collection. Filter by size, price, and category.",
    siteName: "Volt",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop | Volt",
    description: "Browse the full Volt collection.",
  },
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
