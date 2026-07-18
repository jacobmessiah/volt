import type { Metadata } from "next"
import { Product } from "@/types/product.schema"

async function fetchProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products/${id}`,
      { next: { revalidate: 60, tags: ["products"] } },
    )
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = await fetchProduct(id)

  if (!product) {
    return {
      title: "Product | Volt",
      description: "Shop the latest footwear at Volt.",
    }
  }

  const image = product.images[0]
  const price = (product.discountPrice ?? product.price).toLocaleString()

  return {
    title: `${product.name} | Volt`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      siteName: "Volt",
      type: "website",
      images: image
        ? [{ url: image.url, alt: image.altText, width: 800, height: 800 }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: image ? [image.url] : [],
    },
    other: {
      "product:price:amount": price,
      "product:price:currency": "NGN",
    },
  }
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
