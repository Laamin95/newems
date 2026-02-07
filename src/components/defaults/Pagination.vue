<template>
  <nav
    :aria-label="ariaLabel"
    :class="[
      'flex items-center justify-center',
      containerClass
    ]"
    :style="containerStyle"
  >
    <ul
      :class="[
        'flex items-center',
        sizeClasses,
        gapClasses
      ]"
    >
      <!-- First Page Button -->
      <li v-if="showFirstLast">
        <button
          type="button"
          :disabled="currentPage === 1 || disabled"
          @click="goToPage(1)"
          :class="[
            'inline-flex items-center justify-center transition-all',
            buttonSizeClasses,
            buttonBaseClasses,
            currentPage === 1 || disabled ? disabledClasses : hoverClasses,
            rounded && roundedClasses
          ]"
          :aria-label="firstText || 'First page'"
        >
          <Icon v-if="!firstText" name="chevron-double-left" :size="iconSize" :type="iconType" />
          <span v-else>{{ firstText }}</span>
        </button>
      </li>

      <!-- Previous Button -->
      <li v-if="showPrevNext">
        <button
          type="button"
          :disabled="currentPage === 1 || disabled"
          @click="previousPage"
          :class="[
            'inline-flex items-center justify-center transition-all',
            buttonSizeClasses,
            buttonBaseClasses,
            currentPage === 1 || disabled ? disabledClasses : hoverClasses,
            rounded && roundedClasses
          ]"
          :aria-label="prevText || 'Previous page'"
        >
          <Icon v-if="!prevText" name="chevron-left" :size="iconSize" :type="iconType" />
          <span v-else>{{ prevText }}</span>
        </button>
      </li>

      <!-- Page Numbers -->
      <li v-for="page in visiblePages" :key="page">
        <!-- Ellipsis -->
        <span
          v-if="page === '...'"
          :class="[
            'inline-flex items-center justify-center',
            buttonSizeClasses,
            'text-ui-text-secondary'
          ]"
        >
          ...
        </span>

        <!-- Page Button -->
        <button
          v-else
          type="button"
          :disabled="disabled"
          @click="goToPage(page)"
          :class="[
            'inline-flex items-center justify-center transition-all font-medium',
            buttonSizeClasses,
            buttonBaseClasses,
            page === currentPage ? activeClasses : inactiveClasses,
            rounded && roundedClasses,
            !disabled && page !== currentPage && hoverClasses
          ]"
          :aria-label="`Page ${page}`"
          :aria-current="page === currentPage ? 'page' : undefined"
        >
          {{ page }}
        </button>
      </li>

      <!-- Next Button -->
      <li v-if="showPrevNext">
        <button
          type="button"
          :disabled="currentPage === totalPages || disabled"
          @click="nextPage"
          :class="[
            'inline-flex items-center justify-center transition-all',
            buttonSizeClasses,
            buttonBaseClasses,
            currentPage === totalPages || disabled ? disabledClasses : hoverClasses,
            rounded && roundedClasses
          ]"
          :aria-label="nextText || 'Next page'"
        >
          <Icon v-if="!nextText" name="chevron-right" :size="iconSize" :type="iconType" />
          <span v-else>{{ nextText }}</span>
        </button>
      </li>

      <!-- Last Page Button -->
      <li v-if="showFirstLast">
        <button
          type="button"
          :disabled="currentPage === totalPages || disabled"
          @click="goToPage(totalPages)"
          :class="[
            'inline-flex items-center justify-center transition-all',
            buttonSizeClasses,
            buttonBaseClasses,
            currentPage === totalPages || disabled ? disabledClasses : hoverClasses,
            rounded && roundedClasses
          ]"
          :aria-label="lastText || 'Last page'"
        >
          <Icon v-if="!lastText" name="chevron-double-right" :size="iconSize" :type="iconType" />
          <span v-else>{{ lastText }}</span>
        </button>
      </li>
    </ul>

    <!-- Page Info (optional) -->
    <div
      v-if="showPageInfo"
      :class="[
        'ml-4 text-ui-text-secondary',
        sizeClasses
      ]"
    >
      Page {{ currentPage }} of {{ totalPages }}
    </div>

    <!-- Total Items Info (optional) -->
    <div
      v-if="showTotalInfo && totalItems"
      :class="[
        'ml-4 text-ui-text-secondary',
        sizeClasses
      ]"
    >
      {{ startItem }}-{{ endItem }} of {{ totalItems }}
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number,
    required: true,
    validator: (value) => value > 0
  },
  totalItems: {
    type: Number,
    default: 0
  },
  perPage: {
    type: Number,
    default: 10
  },
  maxVisiblePages: {
    type: Number,
    default: 7,
    validator: (value) => value >= 5
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'primary', 'outline'].includes(v)
  },
  rounded: {
    type: Boolean,
    default: true
  },
  showPrevNext: {
    type: Boolean,
    default: true
  },
  showFirstLast: {
    type: Boolean,
    default: false
  },
  showPageInfo: {
    type: Boolean,
    default: false
  },
  showTotalInfo: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  prevText: {
    type: String,
    default: ''
  },
  nextText: {
    type: String,
    default: ''
  },
  firstText: {
    type: String,
    default: ''
  },
  lastText: {
    type: String,
    default: ''
  },
  iconType: {
    type: String,
    default: 'solid',
    validator: (v) => ['solid', 'outline'].includes(v)
  },
  ariaLabel: {
    type: String,
    default: 'Pagination'
  },
  containerClass: {
    type: String,
    default: ''
  },
  containerStyle: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'page-change'])

const currentPage = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Size classes
const sizeClasses = computed(() => {
  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }
  return sizes[props.size] || sizes.md
})

const buttonSizeClasses = computed(() => {
  const sizes = {
    sm: 'w-8 h-8 min-w-[32px]',
    md: 'w-10 h-10 min-w-[40px]',
    lg: 'w-12 h-12 min-w-[48px]'
  }
  return sizes[props.size] || sizes.md
})

const iconSize = computed(() => {
  const sizes = {
    sm: 14,
    md: 16,
    lg: 20
  }
  return sizes[props.size] || sizes.md
})

const gapClasses = computed(() => {
  const gaps = {
    sm: 'gap-1',
    md: 'gap-1.5',
    lg: 'gap-2'
  }
  return gaps[props.size] || gaps.md
})

const roundedClasses = computed(() => {
  const rounded = {
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg'
  }
  return rounded[props.size] || rounded.md
})

// Button base classes
const buttonBaseClasses = computed(() => {
  return 'border focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
})

// Active button classes
const activeClasses = computed(() => {
  const variants = {
    default: 'bg-primary text-white border-primary',
    primary: 'bg-primary text-white border-primary',
    outline: 'bg-primary text-white border-primary'
  }
  return variants[props.variant] || variants.default
})

// Inactive button classes
const inactiveClasses = computed(() => {
  const variants = {
    default: 'bg-color-2 text-ui-text-color border-color',
    primary: 'bg-transparent text-ui-text-color border-color',
    outline: 'bg-transparent text-ui-text-color border-color'
  }
  return variants[props.variant] || variants.default
})

// Hover classes
const hoverClasses = computed(() => {
  return 'hover:bg-color-3 hover:border-color-3'
})

// Disabled classes
const disabledClasses = computed(() => {
  return 'opacity-50 cursor-not-allowed'
})

// Calculate visible pages
const visiblePages = computed(() => {
  const pages = []
  const total = props.totalPages
  const current = currentPage.value
  const max = props.maxVisiblePages

  if (total <= max) {
    // Show all pages
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)

    // Calculate start and end of middle section
    const middle = Math.floor(max / 2)
    let start = current - middle
    let end = current + middle

    // Adjust if near the beginning
    if (start < 2) {
      start = 2
      end = max - 1
    }

    // Adjust if near the end
    if (end > total - 1) {
      end = total - 1
      start = total - max + 2
    }

    // Add ellipsis after first page if needed
    if (start > 2) {
      pages.push('...')
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // Add ellipsis before last page if needed
    if (end < total - 1) {
      pages.push('...')
    }

    // Always show last page
    pages.push(total)
  }

  return pages
})

// Calculate start and end items
const startItem = computed(() => {
  return (currentPage.value - 1) * props.perPage + 1
})

const endItem = computed(() => {
  const end = currentPage.value * props.perPage
  return end > props.totalItems ? props.totalItems : end
})

// Methods
const goToPage = (page) => {
  if (page === currentPage.value || page < 1 || page > props.totalPages || props.disabled) {
    return
  }
  
  currentPage.value = page
  emit('change', page)
  emit('page-change', page)
}

const previousPage = () => {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1)
  }
}

const nextPage = () => {
  if (currentPage.value < props.totalPages) {
    goToPage(currentPage.value + 1)
  }
}

const firstPage = () => {
  goToPage(1)
}

const lastPage = () => {
  goToPage(props.totalPages)
}

// Expose methods
defineExpose({
  goToPage,
  previousPage,
  nextPage,
  firstPage,
  lastPage
})
</script>

<style scoped>
/* Smooth transitions */
button {
  transition-property: background-color, border-color, color, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Focus states */
button:focus-visible {
  @apply outline-none ring-2 ring-primary ring-offset-2;
}

/* Disabled state */
button:disabled {
  @apply cursor-not-allowed opacity-50;
}
</style>