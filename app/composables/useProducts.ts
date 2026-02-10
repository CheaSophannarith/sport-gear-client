import type { Product, PaginationMeta, ProductDetail } from '~/types/product'

export const useProducts = () => {
  const config = useRuntimeConfig()
  const categoryProducts = ref<Record<string, Product[]>>({})
  const products = ref<Product[]>([])
  const productDetail = ref<ProductDetail | null>(null)
  const meta = ref<PaginationMeta | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchFeaturedProducts = async (slug: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await $fetch<Product[]>(
        `${config.public.apiBase}/api/v1/products/featured/${slug}`
      )
      categoryProducts.value[slug] = response
    } catch (err) {
      error.value = `Failed to fetch products for ${slug}`
      console.error(`Error fetching products for ${slug}:`, err)
      categoryProducts.value[slug] = []
    } finally {
      loading.value = false
    }
  }

  const fetchProductsByCategory = async (slug: string, page = 1, filters: Record<string, any> = {}) => {
    loading.value = true
    error.value = null

    try {
      const response = await $fetch<{
        data: { data: Product[] }
        meta: PaginationMeta
      }>(
        `${config.public.apiBase}/api/v1/products/${slug}`,
        { params: { page, ...filters } }
      )
      products.value = response.data.data
      meta.value = response.meta
    } catch (err) {
      error.value = `Failed to fetch products for ${slug}`
      console.error(`Error fetching products for ${slug}:`, err)
      products.value = []
      meta.value = null
    } finally {
      loading.value = false
    }
  }

  const fetchProductDetail = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await $fetch<ProductDetail>(
        `${config.public.apiBase}/api/v1/products-details/${id}`
      )
      productDetail.value = response
    } catch (err) {
      error.value = `Failed to fetch product details for ID ${id}`
      console.error(`Error fetching product details for ID ${id}:`, err)
      productDetail.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    categoryProducts,
    products,
    productDetail,
    meta,
    loading,
    error,
    fetchFeaturedProducts,
    fetchProductsByCategory,
    fetchProductDetail
  }
}
