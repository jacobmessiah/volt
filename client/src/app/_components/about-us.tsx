import Image from "next/image"

const AboutUs = () => {
  return (
    <div className="flex min-h-[70dvh] w-full flex-col border-t lg:flex-row">
      {/* Left */}
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <Image
          src="/hero-shoe.png"
          alt="About Volt"
          width={600}
          height={500}
          draggable={false}
          className="w-full max-w-md object-contain lg:max-w-full"
        />
      </div>

      {/* Right */}
      <div className="flex w-full flex-col justify-center gap-6 px-6 py-12 lg:w-1/2 lg:px-16 lg:py-0">
        <h2 className="font-heading text-2xl font-bold lg:text-4xl">
          The Volt Philosophy
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground lg:text-base">
          We don&apos;t just build sneakers; we construct momentum. Volt was born
          from a single track-tested obsession: engineering footwear that fuses
          explosive velocity with absolute, cloud-like comfort. Every contour,
          every foam composite, and every silhouette we drop is precision-tuned
          to strip away friction and unleash pure, unadulterated speed.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground lg:text-base">
          We believe you shouldn&apos;t have to sacrifice your feet to break
          records. With Volt, you get the responsive cushioning your legs demand
          and the raw kinetic energy your pace deserves. Slip them on, lock in,
          and leave the baseline behind.
        </p>
      </div>
    </div>
  )
}

export default AboutUs
