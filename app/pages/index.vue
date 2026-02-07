<template>
  <div class="bg-white">
    <!-- Hero Carousel -->
    <section class="w-full relative">
      <Carousel
        class="w-full"
        :opts="{
          align: 'start',
          loop: true,
        }"
        :plugins="[autoplay]"
        @init-api="(api) => (emblaApi = api ?? null)"
      >
        <CarouselContent>
          <CarouselItem v-for="carousel in carousels" :key="carousel.id">
            <div class="relative w-full h-112.5 md:h-137.5 lg:h-162.5">
              <NuxtLink
                v-if="carousel.link"
                :to="carousel.link"
                class="block w-full h-full"
              >
                <img
                  :src="carousel.image_url"
                  :alt="carousel.title"
                  class="w-full h-full object-cover"
                />
                <div
                  class="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-6"
                >
                  <h2
                    class="text-white text-2xl md:text-3xl lg:text-4xl font-bold"
                  >
                    {{ carousel.title }}
                  </h2>
                  <p
                    v-if="carousel.description"
                    class="text-white/90 mt-2 text-sm md:text-base"
                  >
                    {{ carousel.description }}
                  </p>
                </div>
              </NuxtLink>
              <div v-else class="block w-full h-full">
                <img
                  :src="carousel.image_url"
                  :alt="carousel.title"
                  class="w-full h-full object-cover"
                />
                <div
                  class="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-6"
                >
                  <h2
                    class="text-white text-2xl md:text-3xl lg:text-4xl font-bold"
                  >
                    {{ carousel.title }}
                  </h2>
                  <p
                    v-if="carousel.description"
                    class="text-white/90 mt-2 text-sm md:text-base"
                  >
                    {{ carousel.description }}
                  </p>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <!-- Dot Indicators -->
      <div
        class="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 z-10"
      >
        <button
          v-for="(carousel, index) in carousels"
          :key="carousel.id"
          class="transition-all duration-300 rounded-full"
          :class="
            currentIndex === index
              ? 'w-8 h-2 bg-white'
              : 'w-2 h-2 bg-white/50 hover:bg-white/75'
          "
          :aria-label="`Go to slide ${index + 1}`"
          @click="scrollTo(index)"
        />
      </div>
    </section>

    <!-- Rest of the content -->
    <section class="w-full px-4 md:px-8 py-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">
        Welcome to Sport Gear
      </h2>
      <p class="text-gray-600">
        Your one-stop shop for premium sports equipment and gear.
      </p>
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

// Fetch carousels on mount
onMounted(() => {
  fetchCarousels();
});
</script>
