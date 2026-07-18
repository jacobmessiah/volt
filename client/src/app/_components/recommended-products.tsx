import productsData from "@/data/products.json"
import ProductItem from "@/shared/components/product-item"

const RecommendedProducts = () => {
  return (
    <section className="flex min-h-dvh gap-2 w-full flex-col  px-10 py-5">
      <h1 className="font-heading text-lg font-bold">Recommended for you</h1>

      <div className="grid grid-cols-2 gap-3 w-full sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {productsData.map((product) => (
          <ProductItem p={product} key={product.id} />
        ))}
      </div>
    </section>
  )
}

export default RecommendedProducts
