"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useCallback, useState, Suspense } from "react"
import { SlidersHorizontal, X, Info } from "lucide-react"
import { Navbar } from "@/app/_components/ui/navbar"
import Footer from "@/app/_components/footer"
import ProductFilter, { type FilterState } from "./_components/product-filter"
import useProductStore, { type GetProductsParams } from "@/store/use-product-store"
import ProductItem from "@/shared/components/product-item"
import ProductItemSkeleton from "@/shared/components/product-item/product-item-skeleton"
import { type Product } from "@/types/product.schema"
import { cn } from "@/lib/utils"

const SKELETON_COUNT = 10

// ─── Inner component that uses useSearchParams ────────────────────────────────

function ShopContent() {
  const searchParams = useSearchParams()
  const getProducts = useProductStore((s) => s.getProducts)
  const searchProducts = useProductStore((s) => s.searchProducts)

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const fetchProducts = useCallback(
    async (params?: GetProductsParams) => {
      setLoading(true)
      const data = await getProducts(params)
      setProducts(data)
      setLoading(false)
    },
    [getProducts],
  )

  useEffect(() => {
    const tagsParam = searchParams.get("tags")
    const searchParam = searchParams.get("search")

    if (searchParam) {
      setLoading(true)
      searchProducts(searchParam).then((data: Product[]) => {
        setProducts(data)
        setLoading(false)
      })
      return
    }

    const params: GetProductsParams = {}
    if (tagsParam) params.tags = [tagsParam]
    fetchProducts(params)
  }, [searchParams, fetchProducts, searchProducts])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [drawerOpen])

  const handleFilterChange = useCallback(
    (filters: FilterState) => {
      const params: GetProductsParams = {
        priceMin: filters.priceMin,
        priceMax: filters.priceMax,
        sizes: filters.sizes.length ? filters.sizes : undefined,
        tags: filters.tags.length ? filters.tags : undefined,
        isNew: filters.isNew ?? undefined,
        ratingMin: filters.ratingMin || undefined,
      }
      fetchProducts(params)
      setDrawerOpen(false)
    },
    [fetchProducts],
  )

  return (
    <>
      {/* ── Mobile/tablet filter bar ── */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5 lg:hidden">
        <p className="text-xs text-muted-foreground">
          {loading ? "Loading…" : `${products.length} products`}
        </p>
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
        </button>
      </div>

      <div className="flex flex-1">
        <div className="flex w-full gap-6 p-4">

          {/* ── Desktop sidebar ── */}
          <div className="hidden lg:block w-72 shrink-0 self-start rounded-lg border border-border p-4 sticky top-4">
            <ProductFilter onChange={handleFilterChange} />
          </div>

          {/* ── Product grid ── */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 content-start">
            {loading
              ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                  <ProductItemSkeleton key={i} />
                ))
              : products.length > 0
                ? products.map((p) => <ProductItem key={p.id} p={p} />)
                : (
                  <div className="col-span-full flex flex-col items-center justify-center gap-2 py-24 text-muted-foreground">
                    <Info size={35} />
                    <p className="text-sm">No products found</p>
                  </div>
                )}
          </div>

        </div>
      </div>

      {/* ── Mobile/tablet filter drawer ── */}
      <div
        onClick={() => setDrawerOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      />

      <div
        className={cn(
          "fixed z-50 bg-background transition-transform duration-300 ease-in-out lg:hidden",
          "bottom-0 left-0 right-0 max-h-[85dvh] rounded-t-2xl",
          "sm:bottom-auto sm:top-0 sm:left-auto sm:right-0 sm:h-full sm:w-80 sm:max-h-none sm:rounded-none sm:rounded-l-2xl",
          drawerOpen
            ? "translate-y-0 sm:translate-y-0 sm:translate-x-0"
            : "translate-y-full sm:translate-y-0 sm:translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="font-semibold text-sm">Filters</span>
          <button
            onClick={() => setDrawerOpen(false)}
            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-accent transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-y-auto p-4" style={{ maxHeight: "calc(85dvh - 48px)" }}>
          <ProductFilter onChange={handleFilterChange} />
        </div>
      </div>
    </>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ShopPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <Suspense
        fallback={
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-4 content-start">
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <ProductItemSkeleton key={i} />
            ))}
          </div>
        }
      >
        <ShopContent />
      </Suspense>
      <Footer />
    </div>
  )
}
