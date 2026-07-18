"use client"

import { Product } from "@/types/product.schema"
import Image from "next/image"
import { ArrowUpRight, Heart } from "lucide-react"
import ProductRating from "@/shared/components/product-item/product-rating"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { shimmer, toBase64 } from "@/lib/utils"
import { useState } from "react"

type ProductItemT = {
  p: Product
}

const ProductItem = ({ p }: ProductItemT) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <Link
      href={`/shop?product=${p.id}`}
      className="group flex w-full flex-col gap-2 rounded-xl p-2 transition-shadow hover:border hover:shadow-md"
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden rounded-md bg-accent" style={{ aspectRatio: "1 / 1" }}>
        {/* shimmer shown until image loads */}
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-accent" />
        )}

        <Image
          src={p.images[0].url}
          alt={p.images[0].altText}
          fill
          className={`object-contain object-center p-2 transition-all duration-300 group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(400, 400))}`}
          onLoad={() => setLoaded(true)}
        />

        <button
          onClick={(e) => e.preventDefault()}
          className="absolute right-2 top-2 rounded-full bg-background/60 p-1.5 backdrop-blur-sm transition-colors hover:bg-background/80"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      {/* Details */}
      <div className="flex w-full flex-1 flex-col gap-1">
        <p className="truncate font-heading text-sm font-bold">{p.name}</p>
        <div className="flex items-center gap-1.5">
          {p.discountPrice && (
            <span className="text-xs text-muted-foreground line-through">${p.price}</span>
          )}
          <span className="text-sm font-bold">${p.discountPrice ?? p.price}</span>
        </div>

        <div className="flex w-full items-center justify-between">
          <ProductRating viewCount={p.viewCount} rating={p.rating} />
          <Button
            onClick={(e) => e.preventDefault()}
            className="h-7 w-7 rounded-full"
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
