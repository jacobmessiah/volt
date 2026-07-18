const ProductItemSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-xl p-2">

      {/* Image */}
      <div
        className="relative w-full overflow-hidden rounded-md bg-accent"
        style={{ aspectRatio: "1 / 1" }}
      >
        <div className="absolute inset-0 animate-pulse bg-accent" />
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-linear-to-r from-transparent via-white/5 to-transparent" />
      </div>

      {/* Details */}
      <div className="flex w-full flex-1 flex-col gap-2 px-0.5">

        {/* Name */}
        <div className="relative h-3.5 w-3/4 overflow-hidden rounded-full bg-accent">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-linear-to-rrom-transparent via-white/5 to-transparent" />
        </div>

        {/* Price */}
        <div className="relative h-3.5 w-1/3 overflow-hidden rounded-full bg-accent">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-linear-to-r from-transparent via-white/5 to-transparent" />
        </div>

        {/* Rating row + button */}
        <div className="flex w-full items-center justify-between">
          {/* Single rating bar instead of 5 stars + 2 text bars */}
          <div className="relative h-3 w-24 overflow-hidden rounded-full bg-accent">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-linear-to-r from-transparent via-white/5 to-transparent" />
          </div>

          {/* Arrow button */}
          <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full bg-accent">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-linear-to-r from-transparent via-white/5 to-transparent" />
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProductItemSkeleton
