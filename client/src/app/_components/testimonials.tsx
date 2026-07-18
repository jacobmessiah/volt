import { testimonials } from "@/data/testimonial.data"
import Image from "next/image"

const Testimonials = () => {
  return (
    <section className="w-full border-t px-6 py-20 lg:px-16">
      <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">

        {/* Left — sticky label */}
        <div className="flex shrink-0 flex-col justify-between lg:w-64">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Reviews
            </p>
            <h2 className="font-heading text-3xl font-bold leading-tight lg:text-4xl">
              People run
              <br />
              with Volt.
            </h2>
          </div>

          <p className="mt-8 text-sm text-muted-foreground lg:mt-0">
            4.8 across 50k+ orders.
          </p>
        </div>

        {/* Right — testimonial list */}
        <div className="flex flex-1 flex-col divide-y">
          {testimonials.map((t) => (
            <div key={t.id} className="flex flex-col gap-3 py-8 first:pt-0 last:pb-0 sm:flex-row sm:gap-8">

              {/* Author */}
              <div className="flex shrink-0 items-center gap-3 sm:w-44 sm:flex-col sm:items-start sm:gap-2">
                <div className="h-9 w-9 overflow-hidden rounded-full bg-accent sm:h-10 sm:w-10">
                  {t.avatar && (
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.handle}</p>
                </div>
              </div>

              {/* Quote */}
              <p className="flex-1 text-sm leading-relaxed text-foreground/80 sm:text-base">
                {t.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
