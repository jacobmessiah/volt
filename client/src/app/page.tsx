import Hero from "@/app/_components/hero"
import { Navbar } from "./_components/ui/navbar"
import RecommendedProducts from "@/app/_components/recommended-products"
import AboutUs from "@/app/_components/about-us"
import Testimonials from "@/app/_components/testimonials"
import Footer from "@/app/_components/footer"

export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <Hero />
      <RecommendedProducts />
      <AboutUs />
      <Testimonials />
      <Footer />
    </div>
  )
}
