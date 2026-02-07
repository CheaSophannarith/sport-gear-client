<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Tailwind CSS + shadcn/ui Test
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Testing Tailwind utilities and shadcn Button components
        </p>
        <p class="text-sm text-blue-600 dark:text-blue-400 mt-2 font-semibold">
          Using Montserrat Font Family
        </p>
      </div>

      <!-- Button Variants Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
          Button Variants
        </h2>
        <div class="flex flex-wrap gap-4">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <!-- Button Sizes Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
          Button Sizes
        </h2>
        <div class="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <!-- Montserrat Font Showcase -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
          Montserrat Font Weights
        </h2>
        <div class="space-y-3">
          <p class="text-2xl font-light text-gray-700 dark:text-gray-200">Light (300) - The quick brown fox</p>
          <p class="text-2xl font-normal text-gray-700 dark:text-gray-200">Regular (400) - The quick brown fox</p>
          <p class="text-2xl font-medium text-gray-700 dark:text-gray-200">Medium (500) - The quick brown fox</p>
          <p class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Semibold (600) - The quick brown fox</p>
          <p class="text-2xl font-bold text-gray-700 dark:text-gray-200">Bold (700) - The quick brown fox</p>
          <p class="text-2xl font-extrabold text-gray-700 dark:text-gray-200">Extrabold (800) - The quick brown fox</p>
          <p class="text-xl italic text-gray-600 dark:text-gray-300 mt-4">Italic variant is also available</p>
        </div>
      </div>

      <!-- Tailwind Utilities Demo -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
          Tailwind CSS Utilities
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Colors -->
          <div>
            <h3 class="text-lg font-medium mb-3 text-gray-700 dark:text-gray-200">Colors</h3>
            <div class="space-y-2">
              <div class="bg-blue-500 text-white p-3 rounded">Blue Background</div>
              <div class="bg-green-500 text-white p-3 rounded">Green Background</div>
              <div class="bg-purple-500 text-white p-3 rounded">Purple Background</div>
            </div>
          </div>

          <!-- Spacing & Typography -->
          <div>
            <h3 class="text-lg font-medium mb-3 text-gray-700 dark:text-gray-200">Typography</h3>
            <div class="space-y-2">
              <p class="text-xs">Extra Small Text</p>
              <p class="text-sm">Small Text</p>
              <p class="text-base">Base Text</p>
              <p class="text-lg">Large Text</p>
              <p class="text-xl font-bold">Extra Large Bold</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
          Interactive Elements
        </h2>
        <div class="flex flex-col gap-4">
          <div class="flex gap-4">
            <Button @click="() => alert('Button clicked!')">
              Click Me!
            </Button>
            <Button variant="outline" disabled>
              Disabled Button
            </Button>
          </div>

          <div class="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg">
            <p class="font-semibold">Gradient Box</p>
            <p class="text-sm opacity-90">With hover effect</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-8 text-center text-gray-600 dark:text-gray-400">
        <p class="text-sm">
          ✅ Tailwind CSS is working! ✅ shadcn/ui Button is working! ✅ Montserrat Font is applied globally!
        </p>
      </div>
    </div>
  </div>
</template>
