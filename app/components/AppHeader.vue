<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="w-full px-4 md:px-8 h-20 flex items-center gap-8">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center shrink-0">
        <img src="/Logo.png" alt="Sport Gear" class="h-32 w-48 object-contain">
      </NuxtLink>

      <!-- Categories Navigation -->
      <nav class="flex items-center gap-8 flex-1 justify-center">
        <NuxtLink
          v-for="category in categories"
          :key="category.id"
          :to="`/${category.slug}`"
          class="text-gray-800 no-underline font-medium text-base hover:text-green-400 transition-colors whitespace-nowrap"
          active-class="text-green-600 font-semibold"
        >
          {{ category.name }}
        </NuxtLink>
      </nav>

      <!-- Search & Actions -->
      <div class="flex items-center gap-6">
        <!-- Search Bar -->
        <div class="flex items-center bg-gray-100 rounded-full px-4 py-2 min-w-75">
          <input
            type="text"
            placeholder="Search products..."
            class="flex-1 border-none bg-transparent outline-none text-sm px-2"
            v-model="searchQuery"
            @keyup.enter="handleSearch"
          />
          <button
            class="bg-transparent border-none cursor-pointer flex items-center text-gray-600 hover:text-green-400 transition-colors"
            @click="handleSearch"
          >
            <Search :size="20" />
          </button>
        </div>

        <!-- Action Icons -->
        <div class="flex items-center gap-4">
          <!-- Wishlist -->
          <NuxtLink
            to="/wishlist"
            class="flex items-center justify-center text-gray-800 hover:text-green-400 transition-colors cursor-pointer"
            title="Wishlist"
          >
            <Heart :size="24" />
          </NuxtLink>

          <!-- Cart -->
          <NuxtLink
            to="/cart"
            class="flex items-center justify-center text-gray-800 hover:text-green-400 transition-colors cursor-pointer"
            title="Cart"
          >
            <ShoppingCart :size="24" />
          </NuxtLink>

          <!-- Profile -->
          <NuxtLink
            to="/profile"
            class="flex items-center justify-center text-gray-800 hover:text-green-400 transition-colors cursor-pointer"
            title="Profile"
          >
            <User :size="24" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Search, Heart, ShoppingCart, User } from 'lucide-vue-next'

const { categories, fetchCategories } = useCategories()
const searchQuery = ref('')

// Fetch categories on mount
onMounted(() => {
  fetchCategories()
})

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`)
  }
}
</script>

