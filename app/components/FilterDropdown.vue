<template>
  <div ref="containerRef" class="relative">
    <button
      type="button"
      class="w-full flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-left bg-white hover:border-gray-400 transition-colors"
      @click="open = !open"
    >
      <template v-if="selectedOption">
        <img
          v-if="selectedOption.logo_url"
          :src="selectedOption.logo_url"
          :alt="selectedOption.name"
          class="w-5 h-5 object-contain"
        />
        <span class="flex-1 truncate">{{ selectedOption.name }}</span>
      </template>
      <span v-else class="flex-1 text-gray-400 truncate">{{ placeholder }}</span>
      <svg
        class="w-4 h-4 shrink-0 text-gray-400 transition-transform"
        :class="{ 'rotate-180': open }"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="open"
        class="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
      >
        <button
          v-if="modelValue != null"
          type="button"
          class="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:bg-gray-50 border-b border-gray-100"
          @click="select(null)"
        >
          Clear selection
        </button>
        <button
          v-for="option in options"
          :key="option.id"
          type="button"
          class="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
          :class="{ 'bg-green-50 text-green-700': modelValue === option.id }"
          @click="select(option.id)"
        >
          <img
            v-if="option.logo_url"
            :src="option.logo_url"
            :alt="option.name"
            class="w-5 h-5 object-contain"
          />
          <span>{{ option.name }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface FilterOption {
  id: number
  name: string
  logo_url?: string
}

const props = defineProps<{
  options: FilterOption[]
  modelValue: number | null
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
}>()

const open = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const selectedOption = computed(() => {
  if (props.modelValue == null) return null
  return props.options.find(o => o.id === props.modelValue)
})

const select = (id: number | null) => {
  emit('update:modelValue', id)
  open.value = false
}

const handleClickOutside = (e: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>
