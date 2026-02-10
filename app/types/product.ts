export interface Product {
  id: number
  name: string
  slug: string
  base_price: string
  featured_image: string
}

export interface PaginationMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface Brand {
  id: number
  name: string
  slug: string
  logo: string | null
  description: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface SurfaceType {
  id: number
  name: string
  slug: string
  code: string | null
  description: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  slug: string
}

export interface GalleryImage {
  url: string
  thumbnail_url: string
}

export interface ProductVariant {
  id: number
  sku: string
  size: string
  price_adjustment: string
  stock_quantity: number
  is_active: boolean
  is_available: boolean
}

export interface SimilarProduct {
  id: number
  name: string
  slug: string
  base_price: string
  featured_image: string
}

export interface ProductDetail {
  id: number
  name: string
  slug: string
  description: string
  base_price: string
  is_featured: boolean
  brand: Brand | null
  league: any | null
  team: any | null
  surface_type: SurfaceType | null
  category: Category
  featured_image: string
  gallery_images: GalleryImage[]
  variants: ProductVariant[]
  similar_products: SimilarProduct[]
}
