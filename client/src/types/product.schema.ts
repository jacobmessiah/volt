export interface ProductImage {
  url: string
  altText: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  discountPrice?: number
  rating: number
  viewCount: number
  images: ProductImage[]
  sizes: number[]
  isNew?: boolean
  tags: string[]
}
