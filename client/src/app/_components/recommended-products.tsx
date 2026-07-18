import ProductItem from "@/shared/components/product-item"
import { Product } from "@/types/product.schema"

async function fetchRecommended(): Promise<Product[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products?limit=10`,
      { next: { revalidate: 60, tags: ["products"] } },
    )
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

const RecommendedProducts = async () => {
  const products = await fetchRecommended()

  if (!products.length) return null

  return (
    <section className="flex min-h-dvh gap-2 w-full flex-col px-10 py-5">
      <h1 className="font-heading text-lg font-bold">Recommended for you</h1>

      <div className="grid grid-cols-2 gap-3 w-full sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductItem p={product} key={product.id} />
        ))}
      </div>
    </section>
  )
}

export default RecommendedProducts
