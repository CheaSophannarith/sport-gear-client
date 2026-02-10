<template>
  <div
    class="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
    <!-- Product Image with Aspect Ratio -->
    <NuxtLink :to="`/item-detail/${product.id}`" class="block relative overflow-hidden bg-gray-100">
      <div class="w-full aspect-square">
        <img :src="product.featured_image" :alt="product.name"
          class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
      </div>
    </NuxtLink>

    <!-- Wishlist Button -->
    <button
      class="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-all duration-300 hover:scale-110"
      aria-label="Add to wishlist">
      <svg xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 transition-colors duration-300 fill-none text-gray-600 hover:text-red-500" viewBox="0 0 24 24"
        stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>

    <!-- Product Details -->
    <div class="p-4">
      <NuxtLink :to="`/item-detail/${product.id}`">
        <h3
          class="text-sm md:text-base font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-green-400 transition-colors min-h-[2.5rem]">
          {{ product.name }}
        </h3>
      </NuxtLink>
      <p class="text-lg md:text-xl font-bold text-black">
        €{{ parseFloat(product.base_price).toFixed(2) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Product } from '~/types/product'

  defineProps<{
    product: Product
  }>()
</script>
