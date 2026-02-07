import type { Category } from '~/types/category'

export const useCategories = () => {
  const config = useRuntimeConfig()
  const categories = ref<Category[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchCategories = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await $fetch<Category[]>(`${config.public.apiBase}/api/v1/categories`)
      categories.value = response
    } catch (err) {
      error.value = 'Failed to fetch categories'
      console.error('Error fetching categories:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    categories,
    loading,
    error,
    fetchCategories
  }
}
