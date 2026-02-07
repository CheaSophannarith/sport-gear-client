import type { Carousel } from '~/types/carousel'

export const useCarousels = () => {
  const config = useRuntimeConfig()
  const carousels = ref<Carousel[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchCarousels = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await $fetch<Carousel[]>(`${config.public.apiBase}/api/v1/carousels`)
      carousels.value = response.sort((a, b) => a.order - b.order)
    } catch (err) {
      error.value = 'Failed to fetch carousels'
      console.error('Error fetching carousels:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    carousels,
    loading,
    error,
    fetchCarousels
  }
}
