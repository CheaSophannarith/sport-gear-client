<template>
  <div class="min-h-screen bg-white">
    <div v-if="loading" class="container mx-auto px-4 py-12">
      <div class="flex items-center justify-center min-h-125">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          <p class="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="container mx-auto px-4 py-12">
      <div class="text-center text-red-600">
        <p>{{ error }}</p>
      </div>
    </div>

    <div v-else-if="product" class="container mx-auto px-4 py-6">
      <!-- Product Details Section -->
      <div class="grid grid-cols-1 lg:grid-cols-[35%_1fr] gap-8">
        <!-- Left Column: Images -->
        <div class="space-y-4">
          <!-- Main Image -->
          <div class="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              :src="selectedImage"
              :alt="product.name"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Thumbnail Gallery -->
          <div v-if="product.gallery_images.length > 0" class="grid grid-cols-4 gap-2">
            <button
              @click="selectedImage = product.featured_image"
              :class="[
                'aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all',
                selectedImage === product.featured_image
                  ? 'border-green-500 ring-2 ring-green-200'
                  : 'border-gray-200 hover:border-gray-300'
              ]"
            >
              <img
                :src="product.featured_image"
                :alt="product.name"
                class="w-full h-full object-contain"
              />
            </button>
            <button
              v-for="(image, index) in product.gallery_images"
              :key="index"
              @click="selectedImage = image.url"
              :class="[
                'aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all',
                selectedImage === image.url
                  ? 'border-green-500 ring-2 ring-green-200'
                  : 'border-gray-200 hover:border-gray-300'
              ]"
            >
              <img
                :src="image.thumbnail_url"
                :alt="`${product.name} - Image ${index + 1}`"
                class="w-full h-full object-contain"
              />
            </button>
          </div>
        </div>

        <!-- Right Column: Product Info -->
        <div class="space-y-6">
          <!-- Brand -->
          <div v-if="product.brand" class="text-sm text-gray-600">
            <span class="font-semibold">{{ product.brand.name }}</span>
          </div>

          <!-- Product Name -->
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900">
            {{ product.name }}
          </h1>

          <!-- Category & Surface Type -->
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {{ product.category.name }}
            </span>
            <span v-if="product.surface_type" class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {{ product.surface_type.name }}
            </span>
          </div>

          <!-- Price -->
          <div class="space-y-2">
            <div class="text-3xl font-bold text-gray-900">
              €{{ calculatePrice() }}
            </div>
            <p v-if="selectedVariant && parseFloat(selectedVariant.price_adjustment) > 0" class="text-sm text-gray-600">
              Base price: €{{ parseFloat(product.base_price).toFixed(2) }}
              <span class="text-green-600">(+€{{ parseFloat(selectedVariant.price_adjustment).toFixed(2) }})</span>
            </p>
          </div>

          <!-- Description -->
          <div class="prose prose-sm max-w-none">
            <p class="text-gray-700 leading-relaxed">{{ product.description }}</p>
          </div>

          <!-- Size Selection -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900">Select Size</h3>
              <button class="text-sm text-green-600 hover:text-green-700 font-medium">
                Size Guide
              </button>
            </div>

            <div class="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
              <button
                v-for="variant in product.variants"
                :key="variant.id"
                @click="selectSize(variant)"
                :disabled="!variant.is_available"
                :class="[
                  'relative rounded-full border-2 transition-all duration-200',
                  'flex items-center justify-center text-xs font-medium',
                  'w-12 h-12 sm:w-14 sm:h-14',
                  selectedVariant?.id === variant.id
                    ? 'border-green-500 bg-green-50 text-green-700 ring-2 ring-green-200'
                    : variant.is_available
                    ? 'border-gray-300 bg-white text-gray-900 hover:border-green-400 hover:bg-gray-50'
                    : 'border-red-500 bg-white text-gray-900 cursor-not-allowed'
                ]"
              >
                <!-- Size Label -->
                <span>
                  {{ variant.size }}
                </span>

                <!-- Selected Checkmark -->
                <svg
                  v-if="selectedVariant?.id === variant.id"
                  class="absolute top-0.5 right-0.5 w-3 h-3 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>

                <!-- Out of Stock Badge -->
                <span
                  v-if="!variant.is_available"
                  class="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm"
                >
                  OUT
                </span>

                <!-- Low Stock Warning -->
                <span
                  v-if="variant.is_available && variant.stock_quantity > 0 && variant.stock_quantity < 5"
                  class="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse"
                  :title="`Only ${variant.stock_quantity} left`"
                ></span>
              </button>
            </div>

            <!-- Size Message -->
            <div>
              <p
                v-if="selectedVariant && selectedVariant.stock_quantity > 0 && selectedVariant.stock_quantity < 5"
                class="text-sm text-orange-600 font-medium flex items-center gap-1"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                Only {{ selectedVariant.stock_quantity }} left!
              </p>
              <p v-else-if="!selectedVariant" class="text-sm text-gray-600">
                Please select a size
              </p>
            </div>
          </div>

          <!-- Buttons Row: Add to Cart & Wishlist -->
          <div class="flex items-center gap-3">
            <!-- Add to Cart Button -->
            <button
              :disabled="!selectedVariant"
              :class="[
                'flex-2 py-2.5 rounded-lg font-semibold text-white transition-all duration-200',
                selectedVariant
                  ? 'bg-green-600 hover:bg-green-700 active:scale-[0.98]'
                  : 'bg-gray-300 cursor-not-allowed'
              ]"
            >
              {{ selectedVariant ? 'Add to Cart' : 'Select Size' }}
            </button>

            <!-- Wishlist Button -->
            <button
              class="px-4 py-2.5 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center"
              title="Add to Wishlist"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          <!-- Product Features -->
          <div class="border-t pt-6 space-y-3">
            <div class="flex items-center gap-3 text-sm text-gray-700">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Free shipping on orders over €50</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-gray-700">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>30-day return policy</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-gray-700">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Similar Products Section -->
      <div v-if="product.similar_products.length > 0" class="mt-12 pt-8 border-t">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Similar Products</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          <ProductCard
            v-for="similarProduct in product.similar_products"
            :key="similarProduct.id"
            :product="similarProduct"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductVariant } from '~/types/product'

const route = useRoute()
const productId = computed(() => Number(route.params.id))

const { productDetail, loading, error, fetchProductDetail } = useProducts()

const selectedImage = ref<string>('')
const selectedVariant = ref<ProductVariant | null>(null)

const product = computed(() => productDetail.value)

// Initialize selected image when product loads
watch(product, (newProduct) => {
  if (newProduct) {
    selectedImage.value = newProduct.featured_image
  }
}, { immediate: true })

// Calculate final price
const calculatePrice = () => {
  if (!product.value) return '0.00'

  const basePrice = parseFloat(product.value.base_price)
  const adjustment = selectedVariant.value
    ? parseFloat(selectedVariant.value.price_adjustment)
    : 0

  return (basePrice + adjustment).toFixed(2)
}

// Select size
const selectSize = (variant: ProductVariant) => {
  if (variant.is_available) {
    selectedVariant.value = variant
  }
}

// Fetch product details on mount
onMounted(async () => {
  await fetchProductDetail(productId.value)
})

// SEO Meta tags
useHead(() => ({
  title: product.value ? `${product.value.name} - Sport Gear` : 'Product Details',
  meta: [
    {
      name: 'description',
      content: product.value?.description || 'View product details'
    }
  ]
}))
</script>
