<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div
      class="w-full px-3 sm:px-4 md:px-8 h-16 sm:h-18 md:h-20 flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center shrink-0">
        <img src="/Logo.png" alt="Sport Gear" class="h-20 w-32 sm:h-24 sm:w-36 md:h-32 md:w-48 object-contain -ml-6">
      </NuxtLink>

      <!-- Desktop Categories Navigation -->
      <nav class="hidden lg:flex items-center gap-4 xl:gap-8 flex-1 justify-center">
        <NuxtLink v-for="category in categories" :key="category.id" :to="`/items/${category.slug}`"
          class="text-gray-800 no-underline font-medium text-sm xl:text-base hover:text-green-400 transition-colors whitespace-nowrap"
          active-class="text-green-600 font-semibold">
          {{ category.name }}
        </NuxtLink>
      </nav>

      <!-- Right Side Actions -->
      <div class="flex items-center gap-2 sm:gap-3 md:gap-6">
        <!-- Desktop Search Bar -->
        <div class="hidden lg:flex items-center bg-gray-100 rounded-full px-3 md:px-4 py-1.5 md:py-2 w-48 lg:min-w-75">
          <input v-model="searchQuery" type="text" placeholder="Search..."
            class="flex-1 border-none bg-transparent outline-none text-xs md:text-sm px-1 md:px-2 w-full"
            @keyup.enter="handleSearch">
          <button
            class="bg-transparent border-none cursor-pointer flex items-center text-gray-600 hover:text-green-400 transition-colors"
            @click="handleSearch">
            <Search :size="16" class="md:w-5 md:h-5" />
          </button>
        </div>

        <!-- Mobile Search Icon -->
        <button
          class="lg:hidden flex items-center justify-center text-gray-800 hover:text-green-400 transition-colors p-2"
          title="Search" @click="mobileSearchOpen = !mobileSearchOpen">
          <Search :size="20" class="sm:w-5 sm:h-5" />
        </button>

        <!-- Desktop Action Icons -->
        <div class="hidden lg:flex items-center gap-3 md:gap-4">
          <!-- Wishlist -->
          <NuxtLink to="/wishlist"
            class="flex items-center justify-center text-gray-800 hover:text-green-400 transition-colors cursor-pointer"
            title="Wishlist">
            <Heart :size="20" class="md:w-6 md:h-6" />
          </NuxtLink>

          <!-- Cart -->
          <NuxtLink to="/cart"
            class="flex items-center justify-center text-gray-800 hover:text-green-400 transition-colors cursor-pointer"
            title="Cart">
            <ShoppingCart :size="20" class="md:w-6 md:h-6" />
          </NuxtLink>

          <!-- Profile -->
          <NuxtLink to="/profile"
            class="flex items-center justify-center text-gray-800 hover:text-green-400 transition-colors cursor-pointer"
            title="Profile">
            <User :size="20" class="md:w-6 md:h-6" />
          </NuxtLink>
        </div>

        <!-- Mobile Cart Icon -->
        <NuxtLink to="/cart"
          class="lg:hidden flex items-center justify-center text-gray-800 hover:text-green-400 transition-colors cursor-pointer p-2"
          title="Cart">
          <ShoppingCart :size="20" class="sm:w-5 sm:h-5" />
        </NuxtLink>

        <!-- Mobile Menu Button -->
        <button
          class="lg:hidden flex items-center justify-center text-gray-800 hover:text-green-400 transition-colors p-2"
          aria-label="Toggle menu" @click="mobileMenuOpen = !mobileMenuOpen">
          <Menu v-if="!mobileMenuOpen" :size="24" />
          <X v-else :size="24" />
        </button>
      </div>
    </div>

    <!-- Mobile Search Bar -->
    <div v-if="mobileSearchOpen" class="sm:hidden border-t border-gray-200 px-3 py-3 bg-white">
      <div class="flex items-center bg-gray-100 rounded-full px-4 py-2">
        <input v-model="searchQuery" type="text" placeholder="Search products..."
          class="flex-1 border-none bg-transparent outline-none text-sm px-2" @keyup.enter="handleSearch">
        <button
          class="bg-transparent border-none cursor-pointer flex items-center text-gray-600 hover:text-green-400 transition-colors"
          @click="handleSearch">
          <Search :size="18" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu Dropdown -->
    <Transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="-translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100" leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="translate-y-0 opacity-100" leave-to-class="-translate-y-full opacity-0">
      <div v-if="mobileMenuOpen"
        class="lg:hidden fixed left-0 right-0 top-16 sm:top-18 md:top-20 bg-white z-40 overflow-y-auto shadow-lg border-b border-gray-200 max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-4.5rem)] md:max-h-[calc(100vh-5rem)]">
        <nav class="flex flex-col p-4 space-y-1">
          <!-- Categories -->
          <NuxtLink v-for="category in categories" :key="category.id" :to="`/items/${category.slug}`"
            class="text-gray-800 no-underline font-medium text-base hover:text-green-400 hover:bg-gray-50 transition-colors py-3 px-4 rounded-lg"
            active-class="text-green-600 font-semibold bg-green-50" @click="mobileMenuOpen = false">
            {{ category.name }}
          </NuxtLink>

          <!-- Divider -->
          <div class="border-t border-gray-200 my-2" />

          <!-- Wishlist Link -->
          <NuxtLink to="/wishlist"
            class="lg:hidden text-gray-800 no-underline font-medium text-base hover:text-green-400 hover:bg-gray-50 transition-colors py-3 px-4 rounded-lg"
            @click="mobileMenuOpen = false">
            <div class="flex items-center gap-3">
              <Heart :size="20" />
              <span>Wishlist</span>
            </div>
          </NuxtLink>

          <!-- Profile Link -->
          <NuxtLink to="/profile"
            class="lg:hidden text-gray-800 no-underline font-medium text-base hover:text-green-400 hover:bg-gray-50 transition-colors py-3 px-4 rounded-lg"
            @click="mobileMenuOpen = false">
            <div class="flex items-center gap-3">
              <User :size="20" />
              <span>My Profile</span>
            </div>
          </NuxtLink>
        </nav>
      </div>
    </Transition>

    <!-- Overlay for mobile menu -->
    <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition-opacity duration-300" leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="mobileMenuOpen" class="lg:hidden fixed inset-0 bg-black/50 z-30" @click="mobileMenuOpen = false" />
    </Transition>
  </header>
</template>

<script setup lang="ts">
  import { Search, Heart, ShoppingCart, User, Menu, X } from 'lucide-vue-next'

  const { categories, fetchCategories } = useCategories()
  const searchQuery = ref('')
  const mobileMenuOpen = ref(false)
  const mobileSearchOpen = ref(false)

  // Fetch categories on mount
  onMounted(() => {
    fetchCategories()
  })

  const handleSearch = () => {
    if (searchQuery.value.trim()) {
      navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`)
      mobileSearchOpen.value = false
    }
  }

  // Close mobile menu when route changes
  watch(() => useRoute().path, () => {
    mobileMenuOpen.value = false
    mobileSearchOpen.value = false
  })
</script>
