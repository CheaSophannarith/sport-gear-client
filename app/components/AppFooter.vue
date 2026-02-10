<template>
  <footer class="bg-white text-gray-700 mt-auto border-t border-gray-200">
    <!-- Main Footer Content -->
    <div class="w-full px-3 sm:px-4 md:px-8 py-6 sm:py-8 md:py-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <!-- Company Info -->
        <div class="sm:col-span-2 lg:col-span-1">
          <div class="flex items-center mb-3 md:mb-4 h-16 md:h-20">
            <img src="/Logo.png" alt="Sport Gear" class="h-20 w-32 sm:h-24 sm:w-36 md:h-32 md:w-48 object-contain">
          </div>
          <p class="text-xs sm:text-sm text-gray-600 mb-3 md:mb-4">
            Your one-stop shop for premium sports equipment and gear. Quality products for athletes of all levels.
          </p>
          <!-- Social Media -->
          <div class="flex gap-3 md:gap-4">
            <a href="#" class="text-gray-600 hover:text-green-500 transition-colors p-1" aria-label="Facebook">
              <Facebook :size="18" class="sm:w-5 sm:h-5" />
            </a>
            <a href="#" class="text-gray-600 hover:text-green-500 transition-colors p-1" aria-label="Twitter">
              <Twitter :size="18" class="sm:w-5 sm:h-5" />
            </a>
            <a href="#" class="text-gray-600 hover:text-green-500 transition-colors p-1" aria-label="Instagram">
              <Instagram :size="18" class="sm:w-5 sm:h-5" />
            </a>
            <a href="#" class="text-gray-600 hover:text-green-500 transition-colors p-1" aria-label="YouTube">
              <Youtube :size="18" class="sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-gray-900 font-semibold text-base md:text-lg mb-3 md:mb-4">Quick Links</h3>
          <ul class="space-y-1.5 md:space-y-2">
            <li>
              <NuxtLink to="/" class="text-xs sm:text-sm hover:text-green-500 transition-colors block py-1">
                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="text-xs sm:text-sm hover:text-green-500 transition-colors block py-1">
                About Us
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products" class="text-xs sm:text-sm hover:text-green-500 transition-colors block py-1">
                All Products
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-xs sm:text-sm hover:text-green-500 transition-colors block py-1">
                Contact
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/faq" class="text-xs sm:text-sm hover:text-green-500 transition-colors block py-1">
                FAQ
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h3 class="text-gray-900 font-semibold text-base md:text-lg mb-3 md:mb-4">Categories</h3>
          <ul class="space-y-1.5 md:space-y-2">
            <li v-for="category in categories" :key="category.id">
              <NuxtLink
                :to="`/${category.slug}`"
                class="text-xs sm:text-sm hover:text-green-500 transition-colors block py-1"
              >
                {{ category.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact & Support -->
        <div class="sm:col-span-2 lg:col-span-1">
          <h3 class="text-gray-900 font-semibold text-base md:text-lg mb-3 md:mb-4">Contact & Support</h3>
          <ul class="space-y-2 md:space-y-3">
            <li class="flex items-start gap-2 md:gap-3">
              <Phone :size="18" class="text-green-500 shrink-0 mt-0.5 sm:w-5 sm:h-5" />
              <div>
                <p class="text-xs sm:text-sm">+1 (555) 123-4567</p>
              </div>
            </li>
            <li class="flex items-start gap-2 md:gap-3">
              <Mail :size="18" class="text-green-500 shrink-0 mt-0.5 sm:w-5 sm:h-5" />
              <div>
                <p class="text-xs sm:text-sm break-all">support@sportgear.com</p>
              </div>
            </li>
            <li class="flex items-start gap-2 md:gap-3">
              <MapPin :size="18" class="text-green-500 shrink-0 mt-0.5 sm:w-5 sm:h-5" />
              <div>
                <p class="text-xs sm:text-sm">123 Sport Street, Athletic City, AC 12345</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-gray-200">
      <div class="w-full px-3 sm:px-4 md:px-8 py-4 md:py-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <p class="text-xs sm:text-sm text-gray-600 text-center md:text-left">
            &copy; 2026 Sport Gear. All rights reserved.
          </p>
          <div class="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
            <NuxtLink to="/privacy" class="text-xs sm:text-sm text-gray-600 hover:text-green-500 transition-colors">
              Privacy Policy
            </NuxtLink>
            <NuxtLink to="/terms" class="text-xs sm:text-sm text-gray-600 hover:text-green-500 transition-colors">
              Terms of Service
            </NuxtLink>
            <NuxtLink to="/shipping" class="text-xs sm:text-sm text-gray-600 hover:text-green-500 transition-colors">
              Shipping Info
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-vue-next'

const { categories, fetchCategories } = useCategories()

// Fetch categories on mount
onMounted(() => {
  fetchCategories()
})
</script>
