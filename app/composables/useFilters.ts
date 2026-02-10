import type { FilterConfig, Brand, League, Team, SurfaceType } from '~/types/filter'

export const useFilters = () => {
  const config = useRuntimeConfig()

  const filterConfig = ref<FilterConfig[]>([])
  const brands = ref<Brand[]>([])
  const leagues = ref<League[]>([])
  const teams = ref<Team[]>([])
  const surfaceTypes = ref<SurfaceType[]>([])
  const loading = ref(false)

  const hasFilter = (type: string) => {
    return filterConfig.value.some(f => f.filter_type === type)
  }

  const fetchBrands = async () => {
    const response = await $fetch<Brand[]>(`${config.public.apiBase}/api/v1/filters/brands`)
    brands.value = response
  }

  const fetchLeagues = async () => {
    const response = await $fetch<League[]>(`${config.public.apiBase}/api/v1/filters/leagues`)
    leagues.value = response
  }

  const fetchTeams = async (leagueId?: number) => {
    const params: Record<string, number | undefined> = {}
    if (leagueId) params.league_id = leagueId
    const response = await $fetch<Team[]>(`${config.public.apiBase}/api/v1/filters/teams`, { params })
    teams.value = response
  }

  const fetchSurfaceTypes = async () => {
    const response = await $fetch<SurfaceType[]>(`${config.public.apiBase}/api/v1/filters/surface-types`)
    surfaceTypes.value = response
  }

  const fetchFilterConfig = async (categorySlug: string) => {
    loading.value = true
    try {
      const response = await $fetch<{ filters: FilterConfig[] }>(
        `${config.public.apiBase}/api/v1/products/${categorySlug}/filters`
      )
      filterConfig.value = response.filters

      const hasType = (type: string) => response.filters.some(f => f.filter_type === type)
      const promises: Promise<void>[] = []

      if (hasType('brand')) promises.push(fetchBrands())
      if (hasType('league')) promises.push(fetchLeagues())
      if (hasType('team') || hasType('league')) promises.push(fetchTeams())
      if (hasType('surface_type')) promises.push(fetchSurfaceTypes())

      await Promise.all(promises)
    } catch (err) {
      console.error('Error fetching filter config:', err)
      filterConfig.value = []
    } finally {
      loading.value = false
    }
  }

  return {
    filterConfig,
    brands,
    leagues,
    teams,
    surfaceTypes,
    loading,
    hasFilter,
    fetchFilterConfig,
    fetchTeams
  }
}
