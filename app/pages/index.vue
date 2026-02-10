<template>
  <div class="bg-white">
    <!-- Hero Carousel -->
    <section class="w-full relative">
      <Carousel class="w-full" :opts="{
        align: 'start',
        loop: true,
      }" :plugins="[autoplay]" @init-api="(api) => (emblaApi = api ?? null)">
        <CarouselContent>
          <CarouselItem v-for="carousel in carousels" :key="carousel.id">
            <div class="relative w-full h-112.5 md:h-137.5 lg:h-162.5">
              <NuxtLink v-if="carousel.link" :to="carousel.link" class="block w-full h-full">
                <img :src="carousel.image_url" :alt="carousel.title" class="w-full h-full object-cover" />
                <div class="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-6">
                  <h2 class="text-white text-2xl md:text-3xl lg:text-4xl font-bold">
                    {{ carousel.title }}
                  </h2>
                  <p v-if="carousel.description" class="text-white/90 mt-2 text-sm md:text-base">
                    {{ carousel.description }}
                  </p>
                </div>
              </NuxtLink>
              <div v-else class="block w-full h-full">
                <img :src="carousel.image_url" :alt="carousel.title" class="w-full h-full object-cover" />
                <div class="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-6">
                  <h2 class="text-white text-2xl md:text-3xl lg:text-4xl font-bold">
                    {{ carousel.title }}
                  </h2>
                  <p v-if="carousel.description" class="text-white/90 mt-2 text-sm md:text-base">
                    {{ carousel.description }}
                  </p>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <!-- Dot Indicators -->
      <div class="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 z-10">
        <button v-for="(carousel, index) in carousels" :key="carousel.id"
          class="transition-all duration-300 rounded-full" :class="currentIndex === index
            ? 'w-8 h-2 bg-white'
            : 'w-2 h-2 bg-white/50 hover:bg-white/75'
            " :aria-label="`Go to slide ${index + 1}`" @click="scrollTo(index)" />
      </div>
    </section>

    <!-- Categories Section -->
    <section class="w-full px-4 md:px-8 py-6">
      <h2 class="text-3xl font-bold text-green-400 mb-6 uppercase">
        WELCOME TO FII GEAR
      </h2>
      <!-- Popular Categories -->
      <div>
        <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wider">
          Popular Categories
        </h3>
        <div class="space-y-2">
          <NuxtLink v-for="category in categories" :key="category.id" :to="`/items/${category.slug}`"
            class="group flex items-center gap-3 py-2">
            <span
              class="text-xl md:text-2xl lg:text-3xl font-black text-black uppercase transition-all duration-300 group-hover:bg-linear-to-r group-hover:from-green-400 group-hover:via-blue-500 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent">
              {{ category.name }}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-black transition-all duration-300 group-hover:text-transparent" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color: rgb(74, 222, 128); stop-opacity: 1" />
                  <stop offset="50%" style="stop-color: rgb(59, 130, 246); stop-opacity: 1" />
                  <stop offset="100%" style="stop-color: rgb(147, 51, 234); stop-opacity: 1" />
                </linearGradient>
              </defs>
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"
                class="group-hover:stroke-[url(#gradient)]" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Products by Category -->
    <section v-for="category in categories" :key="`featured-${category.id}`" class="w-full px-4 md:px-8 py-8">
      <div v-if="categoryProducts[category.slug]?.length">
        <h2 class="text-xl md:text-2xl font-bold text-green-400 mb-6 uppercase">
          Featured {{ category.name }}
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <ProductCard v-for="product in categoryProducts[category.slug]" :key="product.id" :product="product" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel";
  import Autoplay from "embla-carousel-autoplay";
  import type { EmblaCarouselType } from "embla-carousel";

  const { carousels, fetchCarousels } = useCarousels();
  const { categories, fetchCategories } = useCategories();
  const { categoryProducts, fetchFeaturedProducts } = useProducts();

  // Embla API and current index
  const emblaApi = ref<EmblaCarouselType | null>(null);
  const currentIndex = ref(0);

  // Auto-scroll plugin with 3 seconds delay
  const autoplay = Autoplay({
    delay: 3000,
    stopOnInteraction: false,
  });

  // Watch for slide changes
  watch(emblaApi, (api) => {
    if (!api) return;

    api.on("select", () => {
      currentIndex.value = api.selectedScrollSnap();
    });
  });

  // Scroll to specific slide
  const scrollTo = (index: number) => {
    if (emblaApi.value) {
      emblaApi.value.scrollTo(index);
    }
  };

  // Watch categories and fetch products when they're loaded
  watch(
    categories,
    async (newCategories) => {
      if (newCategories && newCategories.length > 0) {
        // Fetch featured products for each category
        await Promise.all(
          newCategories.map((category) => fetchFeaturedProducts(category.slug))
        );
      }
    },
    { immediate: true }
  );

  // Fetch data on mount
  onMounted(() => {
    fetchCarousels();
    fetchCategories();
  });
</script>
