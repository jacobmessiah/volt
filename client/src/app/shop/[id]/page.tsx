"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Heart, ShoppingCart, Truck } from "lucide-react"
import { Navbar } from "@/app/_components/ui/navbar"
import Footer from "@/app/_components/footer"
import useProductStore from "@/store/use-product-store"
import { type Product, type ProductImage } from "@/types/product.schema"
import { shimmer, toBase64, cn } from "@/lib/utils"
import ProductRating from "@/shared/components/product-item/product-rating"

const BLUR_URL = `data:image/svg+xml;base64,${toBase64(shimmer(800, 800))}`
const THUMB_BLUR = `data:image/svg+xml;base64,${toBase64(shimmer(120, 120))}`

// ─── Gallery ──────────────────────────────────────────────────────────────────

function ImageGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0)

  return (
    <div className="flex flex-col gap-3 w-full">
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-accent"
        style={{ aspectRatio: "1 / 1" }}
      >
        <Image
          key={images[active].url}
          src={images[active].url}
          alt={images[active].altText}
          fill
          priority
          className="object-contain object-center p-8"
          sizes="(max-width: 768px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL={BLUR_URL}
          onError={(e) => { e.currentTarget.src = "/image-fail.svg" }}
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-0.5">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "relative shrink-0 h-20 w-20 overflow-hidden rounded-xl bg-accent border-2 transition-all duration-150",
                i === active ? "border-primary" : "border-transparent opacity-50 hover:opacity-90",
              )}
            >
              <Image
                src={img.url}
                alt={img.altText}
                fill
                className="object-contain p-1.5"
                sizes="80px"
                placeholder="blur"
                blurDataURL={THUMB_BLUR}
                onError={(e) => { e.currentTarget.src = "/image-fail.svg" }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Gallery skeleton ─────────────────────────────────────────────────────────

function GallerySkeleton() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="relative w-full overflow-hidden rounded-2xl bg-accent" style={{ aspectRatio: "1 / 1" }}>
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-linear-to-r from-transparent via-white/5 to-transparent" />
      </div>
      <div className="flex gap-2.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-accent">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-linear-to-rrom-transparent via-white/5 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Details ──────────────────────────────────────────────────────────────────

function ProductDetails({ p }: { p: Product }) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-6">

      {/* name + id */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">
            {p.tags[0] ?? "Footwear"}
          </span>
          {p.isNew && (
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
              New
            </span>
          )}
        </div>
        <h1 className="font-heading text-2xl font-bold leading-snug tracking-tight lg:text-3xl">
          {p.name}
        </h1>
      </div>

      {/* rating */}
      <ProductRating rating={p.rating} viewCount={p.viewCount} />

      {/* price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold tracking-tight">
          ₦{(p.discountPrice ?? p.price).toLocaleString()}
        </span>
        {p.discountPrice && (
          <span className="text-base text-muted-foreground line-through">
            ₦{p.price.toLocaleString()}
          </span>
        )}
      </div>

      {/* description */}
      <p className="text-sm leading-7 text-muted-foreground max-w-sm">
        {p.description}
      </p>

      {/* sizes */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Size</span>
          <button className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors">
            Size guide
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {p.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(selectedSize === size ? null : size)}
              className={cn(
                "h-10 min-w-11 rounded-lg border px-3 text-sm font-medium transition-all",
                selectedSize === size
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border bg-background hover:border-foreground/30",
              )}
            >
              {size % 1 === 0 ? size : size.toFixed(1)}
            </button>
          ))}
        </div>
      </div>

      {/* CTA row */}
      <div className="flex items-center gap-3 pt-1">
        <button className="flex flex-1 h-12 items-center justify-center gap-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold transition-opacity hover:opacity-85 active:opacity-70">
          <ShoppingCart className="h-4 w-4" />
          Add to cart
        </button>
        <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border transition-colors hover:border-foreground/30 hover:bg-accent">
          <Heart className="h-4 w-4" />
        </button>
      </div>

      {/* delivery note */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Truck className="h-3.5 w-3.5 shrink-0" />
        <span>Free delivery on orders over ₦50,000</span>
      </div>

    </div>
  )
}

// ─── Details skeleton ─────────────────────────────────────────────────────────

function DetailsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="relative h-3.5 w-20 overflow-hidden rounded-full bg-accent">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-linear-to-rrom-transparent via-white/5 to-transparent" />
        </div>
        <div className="relative h-8 w-3/4 overflow-hidden rounded-lg bg-accent">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-linear-to-r from-transparent via-white/5 to-transparent" />
        </div>
      </div>
      <div className="relative h-4 w-36 overflow-hidden rounded-full bg-accent">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-linear-to-rrom-transparent via-white/5 to-transparent" />
      </div>
      <div className="relative h-9 w-40 overflow-hidden rounded-full bg-accent">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-linear-to-rrom-transparent via-white/5 to-transparent" />
      </div>
      <div className="flex flex-col gap-2">
        {[null, null, null].map((_, i) => (
          <div key={i} className={cn("relative h-3.5 overflow-hidden rounded-full bg-accent", i === 2 ? "w-2/3" : "w-full")}>
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-linear-to-r from-transparent via-white/5 to-transparent" />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="relative h-10 w-11 overflow-hidden rounded-lg bg-accent">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-linear-to-rrom-transparent via-white/5 to-transparent" />
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <div className="relative h-12 flex-1 overflow-hidden rounded-xl bg-accent">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-linear-to-r from-transparent via-white/5 to-transparent" />
        </div>
        <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-accent">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-linear-to-rrom-transparent via-white/5 to-transparent" />
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const getProductById = useProductStore((s) => s.getProductById)
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    getProductById(id).then((data) => {
      console.log("[Product]", data)
      setProduct(data)
    })
  }, [id, getProductById])

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-8 lg:flex-row lg:gap-16 lg:py-12">
        {/* gallery */}
        <div className="w-full lg:max-w-120 lg:shrink-0">
          {product ? <ImageGallery images={product.images} /> : <GallerySkeleton />}
        </div>

        {/* details */}
        <div className="flex flex-1 flex-col justify-start">
          {product ? <ProductDetails p={product} /> : <DetailsSkeleton />}
        </div>
      </div>

      <Footer />
    </div>
  )
}
