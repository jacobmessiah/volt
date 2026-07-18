import { Star } from "lucide-react"

type ProductRatingProps = {
  rating: number
  viewCount: number
}

const ProductRating = ({ rating, viewCount }: ProductRatingProps) => {
  return (
    <div className="flex items-center gap-1.5 text-yellow-400">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1

          if (rating >= starValue) {
            return <Star key={starValue} className="h-4 w-4 fill-current stroke-current" />
          }

          if (rating > starValue - 1 && rating < starValue) {
            const fillPercentage = Math.round((rating - (starValue - 1)) * 100)
            return (
              <div key={starValue} className="relative h-4 w-4">
                <Star className="absolute top-0 left-0 h-4 w-4 text-neutral-700 stroke-current fill-transparent" />
                <div
                  className="absolute top-0 left-0 h-4 w-4 overflow-hidden"
                  style={{ width: `${fillPercentage}%` }}
                >
                  <Star className="h-4 w-4 fill-current stroke-current" />
                </div>
              </div>
            )
          }

          return <Star key={starValue} className="h-4 w-4 text-neutral-700 stroke-current fill-transparent" />
        })}
      </div>

      <span className="text-xs font-bold text-neutral-300 ml-0.5">
        {rating.toFixed(1)}
      </span>
      <span className="text-xs text-neutral-500">
        ({viewCount})
      </span>
    </div>
  )
}

export default ProductRating
