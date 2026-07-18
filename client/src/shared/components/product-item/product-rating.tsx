import { Star } from "lucide-react"

type ProductRatingProps = {
  rating: number
  viewCount: number
}

const ProductRating = ({ rating, viewCount }: ProductRatingProps) => {
  return (
    <div className="flex items-center gap-1 text-yellow-400">
      {/* stars — 3×3 on mobile, 4×4 on sm+ */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1

          if (rating >= starValue) {
            return (
              <Star
                key={starValue}
                className="h-3 w-3 fill-current stroke-current sm:h-3.5 sm:w-3.5"
              />
            )
          }

          if (rating > starValue - 1 && rating < starValue) {
            const fillPercentage = Math.round((rating - (starValue - 1)) * 100)
            return (
              <div key={starValue} className="relative h-3 w-3 sm:h-3.5 sm:w-3.5">
                <Star className="absolute inset-0 h-full w-full text-neutral-700 stroke-current fill-transparent" />
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fillPercentage}%` }}
                >
                  <Star className="h-full w-full fill-current stroke-current" />
                </div>
              </div>
            )
          }

          return (
            <Star
              key={starValue}
              className="h-3 w-3 text-neutral-700 stroke-current fill-transparent sm:h-3.5 sm:w-3.5"
            />
          )
        })}
      </div>

      {/* rating value — hidden on smallest screens, shown sm+ */}
      <span className="hidden text-[10px] font-bold text-neutral-300 sm:inline">
        {rating.toFixed(1)}
      </span>

      {/* view count — always visible but compact */}
      <span className="text-[10px] text-neutral-500">
        ({viewCount >= 1000 ? `${(viewCount / 1000).toFixed(1)}k` : viewCount})
      </span>
    </div>
  )
}

export default ProductRating
