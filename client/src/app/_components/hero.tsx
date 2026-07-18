import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Hero = () => {
  const whoItsFor = ["Men", "Women", "Kids", "Sports", "Brands", "Promo"]

  return (
    <>
      {/* ── Mobile hero (< md) ── */}
      <div className="relative flex min-h-[90dvh] w-full flex-col justify-end overflow-hidden md:hidden">
        {/* Background image */}
        <Image
          src="/legs-on-sneakers.webp"
          alt="Hero background"
          fill
          className="object-cover object-center"
          draggable={false}
          priority
        />

        {/* Dark gradient scrim */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-4 px-6 pb-10">
          <div className="flex flex-col font-heading text-4xl font-bold text-white">
            <h1>Break Records</h1>
            <h2 className="font-normal">With Best-In-Class Cushioning</h2>
          </div>

          <p className="text-sm leading-relaxed text-white/70">
            Whether you're training for a marathon or just going on your daily jog.
          </p>

          <Link
            href="/shop"
            className="flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Shop now
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* ── Desktop hero (≥ md) ── */}
      <div className="hidden min-h-[80dvh] border-y md:flex">
        {/* Left Part */}
        <div className="flex w-1/2 flex-col justify-center gap-3.5 px-10">
          <div className="mb-3 flex h-10 w-full gap-1.5 rounded-full bg-accent p-1">
            {whoItsFor.map((item) => (
              <Link
                key={item}
                href={`/shop/${item.toLowerCase()}`}
                className="flex h-full w-full items-center justify-center rounded-full bg-background text-sm shadow-xs transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex flex-col font-heading text-5xl font-bold">
            <h1>Crafted Comfort</h1>
            <h2 className="font-normal">Just for you</h2>
          </div>

          <p>
            Zero drag, pure electric speed. Built to move faster than the flash.
          </p>

          <Button className="h-12 w-35 gap-4 rounded-full px-4">
            Explore
            <div className="rounded-full bg-primary-foreground/20 p-1">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </Button>
        </div>

        {/* Right Part */}
        <div className="flex w-1/2 items-center justify-center">
          <Image
            draggable={false}
            alt="Hero shoe"
            src="/hero-shoe.png"
            width={1100}
            height={500}
          />
        </div>
      </div>
    </>
  )
}

export default Hero
