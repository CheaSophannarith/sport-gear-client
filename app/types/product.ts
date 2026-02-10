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
