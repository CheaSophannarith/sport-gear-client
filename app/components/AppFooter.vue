<template>
  <footer class="bg-white text-gray-700 mt-auto border-t border-gray-200">
    <!-- Main Footer Content -->
    <div class="w-full px-4 md:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div>
          <div class="flex items-center mb-4 h-20">
            <img src="/Logo.png" alt="Sport Gear" class="h-32 w-48 object-contain">
          </div>
          <p class="text-sm text-gray-600 mb-4">
            Your one-stop shop for premium sports equipment and gear. Quality products for athletes of all levels.
          </p>
          <!-- Social Media -->
          <div class="flex gap-4">
            <a href="#" class="text-gray-600 hover:text-green-500 transition-colors" aria-label="Facebook">
              <Facebook :size="20" />
            </a>
            <a href="#" class="text-gray-600 hover:text-green-500 transition-colors" aria-label="Twitter">
              <Twitter :size="20" />
            </a>
            <a href="#" class="text-gray-600 hover:text-green-500 transition-colors" aria-label="Instagram">
              <Instagram :size="20" />
            </a>
            <a href="#" class="text-gray-600 hover:text-green-500 transition-colors" aria-label="YouTube">
              <Youtube :size="20" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-gray-900 font-semibold text-lg mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/" class="text-sm hover:text-green-500 transition-colors">
                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="text-sm hover:text-green-500 transition-colors">
                About Us
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products" class="text-sm hover:text-green-500 transition-colors">
                All Products
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-sm hover:text-green-500 transition-colors">
                Contact
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/faq" class="text-sm hover:text-green-500 transition-colors">
                FAQ
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h3 class="text-gray-900 font-semibold text-lg mb-4">Categories</h3>
          <ul class="space-y-2">
            <li v-for="category in categories" :key="category.id">
              <NuxtLink
                :to="`/${category.slug}`"
                class="text-sm hover:text-green-500 transition-colors"
              >
                {{ category.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact & Support -->
        <div>
          <h3 class="text-gray-900 font-semibold text-lg mb-4">Contact & Support</h3>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <Phone :size="20" class="text-green-500 shrink-0 mt-0.5" />
              <div>
                <p class="text-sm">+1 (555) 123-4567</p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <Mail :size="20" class="text-green-500 shrink-0 mt-0.5" />
              <div>
                <p class="text-sm">support@sportgear.com</p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <MapPin :size="20" class="text-green-500 shrink-0 mt-0.5" />
              <div>
                <p class="text-sm">123 Sport Street, Athletic City, AC 12345</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-gray-200">
      <div class="w-full px-4 md:px-8 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-sm text-gray-600">
            &copy; 2026 Sport Gear. All rights reserved.
          </p>
          <div class="flex gap-6">
            <NuxtLink to="/privacy" class="text-sm text-gray-600 hover:text-green-500 transition-colors">
              Privacy Policy
            </NuxtLink>
            <NuxtLink to="/terms" class="text-sm text-gray-600 hover:text-green-500 transition-colors">
              Terms of Service
            </NuxtLink>
            <NuxtLink to="/shipping" class="text-sm text-gray-600 hover:text-green-500 transition-colors">
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
