"use client"

import { Product } from "@/types/product.schema"
import Image from "next/image"
import { ArrowUpRight, Heart, Plus } from "lucide-react"
import ProductRating from "@/shared/components/product-item/product-rating"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { shimmer, toBase64 } from "@/lib/utils"
import { useState } from "react"

type ProductItemT = {
  p: Product
}

const ProductItem = ({ p }: ProductItemT) => {
  return (
    <Link
      href={`/shop/${p.id}`}
      className="group flex w-full flex-col gap-2 rounded-xl p-2 transition-shadow hover:border hover:shadow-md"
    >
      {/* Image */}
      <div
        className="relative w-full overflow-hidden rounded-md bg-accent"
        style={{ aspectRatio: "1 / 1" }}
      >
        <Image
          src={p.images[0]?.url ?? "/image-fail.svg"}
          alt={p.images[0]?.altText ?? p.name}
          fill
          className="rounded-xl object-center transition-all duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(400, 400))}`}
          onError={(e) => { e.currentTarget.src = "/image-fail.svg" }}
        />

        <button
          onClick={(e) => e.preventDefault()}
          className="absolute top-2 right-2 rounded-full bg-background/60 p-1.5 backdrop-blur-sm transition-colors hover:bg-background/80"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      {/* Details */}
      <div className="flex w-full flex-1 flex-col gap-1">
        <p className="truncate font-heading text-sm font-bold">{p.name}</p>
        <div className="flex items-center gap-1.5">
          {p.discountPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ₦{p.price.toLocaleString()}
            </span>
          )}
          <span className="text-sm font-bold">
            ₦{(p.discountPrice ?? p.price).toLocaleString()}
          </span>
        </div>

        <div className="flex w-full items-center justify-between">
          <ProductRating viewCount={p.viewCount} rating={p.rating} />
          <Button
            onClick={(e) => e.preventDefault()}
            className="h-7 w-7 rounded-full"
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
