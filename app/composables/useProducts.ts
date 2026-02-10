import type { Product } from '~/types/product'

export const useProducts = () => {
  const config = useRuntimeConfig()
  const categoryProducts = ref<Record<string, Product[]>>({})
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

  return {
    categoryProducts,
    loading,
    error,
    fetchFeaturedProducts
  }
}
