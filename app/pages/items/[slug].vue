<template>
  <div class="bg-white min-h-screen">
    <!-- Breadcrumb -->
    <div class="w-full px-4 md:px-8 py-4 border-b border-gray-200">
      <nav class="flex items-center gap-2 text-sm text-gray-500">
        <NuxtLink to="/" class="hover:text-green-400 transition-colors">Home</NuxtLink>
        <span>/</span>
        <span class="text-gray-800 font-medium capitalize">{{ slug?.replace(/-/g, ' ') }}</span>
      </nav>
    </div>

    <div class="w-full px-4 md:px-8 py-6">
      <div class="flex gap-8">
        <!-- Filter Sidebar -->
        <aside class="hidden lg:block w-64 shrink-0">
          <div class="sticky top-24 space-y-5">
            <h3 class="text-lg font-bold text-gray-800 uppercase">Filters</h3>

            <!-- Name Search -->
            <div>
              <label class="text-sm font-medium text-gray-700 mb-1.5 block">Search</label>
              <input
                v-model="searchName"
                type="text"
                placeholder="Search products..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-green-400 transition-colors"
              />
            </div>

            <!-- Brand Filter -->
            <div v-if="hasFilter('brand')">
              <label class="text-sm font-medium text-gray-700 mb-1.5 block">Brand</label>
              <FilterDropdown v-model="selectedBrand" :options="brands" placeholder="All Brands" />
            </div>

            <!-- League Filter -->
            <div v-if="hasFilter('league')">
              <label class="text-sm font-medium text-gray-700 mb-1.5 block">League</label>
              <FilterDropdown v-model="selectedLeague" :options="leagues" placeholder="All Leagues" />
            </div>

            <!-- Team Filter -->
            <div v-if="hasFilter('league') || hasFilter('team')">
              <label class="text-sm font-medium text-gray-700 mb-1.5 block">Team</label>
              <FilterDropdown v-model="selectedTeam" :options="teams" placeholder="All Teams" />
            </div>

            <!-- Surface Type Filter -->
            <div v-if="hasFilter('surface_type')">
              <label class="text-sm font-medium text-gray-700 mb-1.5 block">Surface Type</label>
              <FilterDropdown v-model="selectedSurface" :options="surfaceTypes" placeholder="All Surface Types" />
            </div>
          </div>
        </aside>

        <!-- Products Section -->
        <div class="flex-1">
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <div>
              <h1 class="text-2xl md:text-3xl font-bold text-gray-800 capitalize">
                {{ slug?.replace(/-/g, ' ') }}
              </h1>
              <span v-if="meta" class="text-sm text-gray-500">
                {{ meta.total }} {{ meta.total === 1 ? 'product' : 'products' }}
              </span>
            </div>
            <select
              v-model="sortValue"
              class="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-green-400 bg-white"
            >
              <option value="created_at:desc">Newest</option>
              <option value="base_price:asc">Price: Low to High</option>
              <option value="base_price:desc">Price: High to Low</option>
              <option value="name:asc">Name: A-Z</option>
              <option value="name:desc">Name: Z-A</option>
              <option value="view_count:desc">Most Popular</option>
            </select>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <div v-for="i in 6" :key="i" class="bg-gray-100 rounded-lg animate-pulse">
              <div class="aspect-square bg-gray-200 rounded-t-lg" />
              <div class="p-4 space-y-2">
                <div class="h-4 bg-gray-200 rounded w-3/4" />
                <div class="h-5 bg-gray-200 rounded w-1/3" />
              </div>
            </div>
          </div>

          <!-- Products Grid -->
          <div v-else-if="products.length" class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <ProductCard v-for="product in products" :key="product.id" :product="product" />
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-16">
            <p class="text-gray-500 text-lg">No products found.</p>
            <NuxtLink to="/" class="text-green-400 hover:text-green-500 mt-4 inline-block font-medium">
              Back to Home
            </NuxtLink>
          </div>

          <!-- Pagination -->
          <div v-if="meta && meta.last_page > 1" class="flex justify-center gap-2 mt-8">
            <button
              v-for="page in meta.last_page"
              :key="page"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              :class="page === meta.current_page
                ? 'bg-green-400 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { products, meta, loading, fetchProductsByCategory } = useProducts()
const { brands, leagues, teams, surfaceTypes, hasFilter, fetchFilterConfig, fetchTeams } = useFilters()

const slug = computed(() => route.params.slug as string)

// Filter state
const searchName = ref('')
const selectedBrand = ref<number | null>(null)
const selectedLeague = ref<number | null>(null)
const selectedTeam = ref<number | null>(null)
const selectedSurface = ref<number | null>(null)
const sortValue = ref('created_at:desc')

const filters = computed(() => {
  const f: Record<string, string | number> = {}
  if (searchName.value) f.name = searchName.value
  if (selectedBrand.value) f.brand_id = selectedBrand.value
  if (selectedLeague.value) f.league_id = selectedLeague.value
  if (selectedTeam.value) f.team_id = selectedTeam.value
  if (selectedSurface.value) f.surface_type_id = selectedSurface.value
  const [sortBy = 'created_at', sortDir = 'desc'] = sortValue.value.split(':')
  f.sort_by = sortBy
  f.sort_dir = sortDir
  return f
})

const initializing = ref(false)

let applyTimeout: ReturnType<typeof setTimeout>
const applyFilters = () => {
  clearTimeout(applyTimeout)
  clearTimeout(searchTimeout)
  applyTimeout = setTimeout(() => {
    fetchProductsByCategory(slug.value, 1, filters.value)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, 50)
}

let searchTimeout: ReturnType<typeof setTimeout>

// Slug change: reset everything and fetch
watch(slug, async (newSlug) => {
  initializing.value = true
  searchName.value = ''
  selectedBrand.value = null
  selectedLeague.value = null
  selectedTeam.value = null
  selectedSurface.value = null
  sortValue.value = 'created_at:desc'

  await fetchFilterConfig(newSlug)
  await fetchProductsByCategory(newSlug)
  initializing.value = false
}, { immediate: true })

// Dropdown filters
watch([selectedBrand, selectedSurface, selectedTeam, sortValue], () => {
  if (initializing.value) return
  applyFilters()
})

// League change: reset team + refetch teams
watch(selectedLeague, (val) => {
  if (initializing.value) return
  selectedTeam.value = null
  if (hasFilter('team') || hasFilter('league')) {
    fetchTeams(val || undefined)
  }
  applyFilters()
})

// Name search (debounced)
watch(searchName, () => {
  if (initializing.value) return
  clearTimeout(searchTimeout)
  clearTimeout(applyTimeout)
  searchTimeout = setTimeout(() => {
    fetchProductsByCategory(slug.value, 1, filters.value)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, 300)
})

const goToPage = (page: number) => {
  fetchProductsByCategory(slug.value, page, filters.value)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
