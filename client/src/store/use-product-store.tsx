import { create } from "zustand"
import { Product } from "@/types/product.schema"

// ─── Query params accepted by GET /products ───────────────────────────────────

export interface GetProductsParams {
  priceMin?: number
  priceMax?: number
  sizes?: number[]
  tags?: string[]
  isNew?: boolean
  ratingMin?: number
  page?: number
  limit?: number
  sort?: string
  [key: string]: unknown
}

// ─── Store ────────────────────────────────────────────────────────────────────

interface ProductStoreT {
  // simple in-memory cache: id → Product
  cache: Record<string, Product>

  getProducts: (params?: GetProductsParams) => Promise<Product[]>
  getProductById: (id: string) => Promise<Product | null>
  searchProducts: (q: string) => Promise<Product[]>
}

const useProductStore = create<ProductStoreT>((set, get) => ({
  cache: {},

  async getProducts(params = {}) {
    try {
      const base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL

      const query = new URLSearchParams()
      for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null) continue
        if (Array.isArray(value)) {
          value.forEach((v) => query.append(key, String(v)))
        } else {
          query.set(key, String(value))
        }
      }

      const qs = query.toString()
      const url = `${base}/products${qs ? `?${qs}` : ""}`

      const res = await fetch(url, {
        next: { revalidate: 60, tags: ["products"] },
      })

      if (!res.ok) return []

      const data: Product[] = await res.json()

      // populate cache while we're here
      const incoming: Record<string, Product> = {}
      data.forEach((p) => (incoming[p.id] = p))
      set((s) => ({ cache: { ...s.cache, ...incoming } }))

      return data
    } catch {
      return []
    }
  },

  async getProductById(id: string) {
    // return from cache if available
    const cached = get().cache[id]
    if (cached) return cached

    try {
      const base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
      const res = await fetch(`${base}/products/${id}`, {
        next: { revalidate: 60, tags: ["products"] },
      })

      if (!res.ok) return null

      const data: Product = await res.json()
      set((s) => ({ cache: { ...s.cache, [id]: data } }))

      return data
    } catch {
      return null
    }
  },

  async searchProducts(q: string) {
    if (!q.trim()) return []
    try {
      const base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
      const res = await fetch(
        `${base}/products/search?q=${encodeURIComponent(q.trim())}`,
        { next: { revalidate: 30, tags: ["products"] } },
      )
      if (!res.ok) return []
      const data: Product[] = await res.json()
      const incoming: Record<string, Product> = {}
      data.forEach((p) => (incoming[p.id] = p))
      set((s) => ({ cache: { ...s.cache, ...incoming } }))
      return data
    } catch {
      return []
    }
  },
}))

export default useProductStore
