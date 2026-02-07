<template>
  <div
    :id="tabId"
    :dir="isRtl ? 'rtl' : 'ltr'"
    :class="[
      vertical ? 'flex flex-row gap-6' : 'flex flex-col',
      scrollable && contentHeight ? contentHeight : '',
      scrollable ? '' : 'h-auto'
    ]"
  >
    <!-- Tab List -->
    <div 
      ref="scrollContainer"
      role="tablist" 
      :aria-orientation="vertical ? 'vertical' : 'horizontal'" 
      :aria-label="ariaLabel"
      :class="[
        'relative flex-shrink-0',
        getListOverflowClasses,
        getListClasses
      ]"
    >
      <div 
        :class="[
          'flex',
          vertical 
            ? 'flex-col space-y-1' 
            : (scrollable ? 'flex-row whitespace-nowrap' : 'flex-row flex-wrap'),
          getListContainerClasses
        ]"
      >
        <button
          v-for="(tab, index) in tabsComputed"
          :id="`tab-${tabId}-${index}`"
          :key="index"
          role="tab"
          type="button"
          :aria-selected="activeTab === index"
          :aria-controls="`panel-${tabId}-${index}`"
          :tabindex="activeTab === index ? 0 : -1"
          :disabled="tab.disabled || disabled"
          :class="[
            'relative inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
            'disabled:pointer-events-none disabled:opacity-50',
            getTabSizeClasses,
            getTabVariantClasses(index)
          ]"
          @click="selectTab(index)"
          @keydown="handleKeydown($event, index)"
        >
          <!-- Icon -->
          <component 
            :is="tab.icon" 
            v-if="tab.icon" 
            :class="getIconSizeClasses"
          />

          <!-- Label -->
          <span>{{ tab.label }}</span>

          <!-- Badge -->
          <span 
            v-if="tab.badge" 
            :class="[
              'inline-flex items-center justify-center rounded-full text-xs font-medium',
              getBadgeSizeClasses,
              getBadgeClasses(tab)
            ]"
          >
            {{ tab.badge }}
          </span>

          <!-- Close button -->
          <button
            v-if="closable && !tab.disabled"
            type="button"
            :aria-label="`Close ${tab.label}`"
            class="ml-1 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            @click.stop="closeTab(index)"
          >
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </button>
      </div>

      <!-- Scroll buttons for horizontal tabs (only when scrollable) -->
      <div 
        v-if="!vertical && scrollable && showScrollButtons && (canScrollLeft || canScrollRight)" 
        class="absolute top-1/2 -translate-y-1/2 right-0 flex items-center gap-1 bg-gradient-to-l from-color-1 via-color-1 to-transparent pl-6 pr-1"
      >
        <button 
          v-if="canScrollLeft" 
          type="button" 
          class="inline-flex items-center justify-center rounded-md h-7 w-7 ui-text-secondary hover:ui-text-primary hover:bg-color-3 transition-colors"
          @click="scrollTabs(-1)"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          v-if="canScrollRight" 
          type="button" 
          class="inline-flex items-center justify-center rounded-md h-7 w-7 ui-text-secondary hover:ui-text-primary hover:bg-color-3 transition-colors"
          @click="scrollTabs(1)"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Tab Panels -->
    <div :class="getPanelContainerClasses">
      <template v-for="(tab, index) in tabsComputed" :key="index">
        <div
          v-if="!lazy || activeTab === index"
          v-show="activeTab === index"
          :id="`panel-${tabId}-${index}`"
          role="tabpanel"
          :aria-labelledby="`tab-${tabId}-${index}`"
          :tabindex="0"
          class="focus-visible:outline-none"
          :class="getPanelClasses"
        >
          <slot :name="`content-${index}`" :tab="tab">
            {{ tab.content }}
          </slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { globalRtl } from '../../lib/rtl/rtl.ts'

const props = defineProps({
  // Data
  tabs: { type: Array, required: true },
  modelValue: { type: Number, default: 0 },

  // Styling / variants
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'outline', 'pills', 'underline'].includes(v)
  },
  size: {
    type: String,
    default: 'default',
    validator: (v) => ['sm', 'default', 'lg'].includes(v)
  },

  // Behavior
  vertical: { type: Boolean, default: false },
  closable: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  lazy: { type: Boolean, default: false },
  showScrollButtons: { type: Boolean, default: true },
  fullWidth: { type: Boolean, default: false },

  // Scrolling - only scroll when this is true AND contentHeight is provided
  scrollable: { type: Boolean, default: false },

  // Layout - height for scrollable content (e.g., 'h-[500px]', 'h-screen', 'max-h-[80vh]')
  contentHeight: { type: String, default: '' },

  // Accessibility
  ariaLabel: { type: String, default: 'Tabs' }
})

const emit = defineEmits(['update:modelValue', 'change', 'close', 'keydown'])

// Work around template type inference for tab items
const tabsComputed = computed(() => /** @type {any[]} */ (props.tabs))

// Generate unique ID for this tab component
const tabId = ref(`tabs-${Math.random().toString(36).substr(2, 9)}`)

// Active tab state
const activeTab = ref(props.modelValue)

// Scroll state for horizontal tabs
const scrollContainer = ref(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

// RTL support
const isRtl = computed(() => globalRtl.value)

// Only enable scrolling when BOTH scrollable prop is true
const shouldScroll = computed(() => props.scrollable)

// Overflow classes for tab list
const getListOverflowClasses = computed(() => {
  if (!shouldScroll.value) {
    // No scrolling - hide any overflow completely
    return 'overflow-visible'
  }
  // Scrolling enabled
  return props.vertical ? 'overflow-y-auto' : 'overflow-x-auto'
})

// List container classes (the wrapper around tabs)
const getListClasses = computed(() => {
  const base = []
  
  if (props.variant === 'default') {
    if (props.vertical) {
      base.push('inline-flex flex-col h-auto items-stretch rounded-lg bg-color-2 p-1 ui-text-secondary')
    } else {
      base.push('inline-flex h-10 items-center justify-center rounded-lg bg-color-2 p-1 ui-text-secondary')
    }
  } else if (props.variant === 'outline') {
    if (props.vertical) {
      base.push('flex flex-col space-y-1 border-r border-color-3 pr-4')
    } else {
      base.push('border-b border-color-3')
    }
  } else if (props.variant === 'pills') {
    base.push('flex gap-2')
    if (props.vertical) {
      base.push('flex-col')
    }
  } else if (props.variant === 'underline') {
    if (props.vertical) {
      base.push('flex flex-col space-y-1 border-r-2 border-color-3 pr-4')
    } else {
      base.push('border-b-2 border-color-3')
    }
  }
  
  if (props.fullWidth && !props.vertical) {
    base.push('w-full')
  }
  
  return base.join(' ')
})

// List inner container classes
const getListContainerClasses = computed(() => {
  if (props.variant === 'default') {
    return props.fullWidth ? 'w-full' : ''
  }
  if (props.variant === 'outline' || props.variant === 'underline') {
    if (props.vertical) {
      return ''
    }
    return props.fullWidth ? 'w-full' : 'inline-flex'
  }
  return ''
})

// Panel container classes - only add overflow when scrollable with height
const getPanelContainerClasses = computed(() => {
  if (shouldScroll.value && props.contentHeight) {
    return 'flex-1 min-w-0 min-h-0 overflow-auto'
  }
  // No scrolling - content grows naturally, no overflow
  return 'flex-1 min-w-0'
})

// Tab size classes
const getTabSizeClasses = computed(() => {
  const sizeMap = {
    sm: 'text-xs px-2.5 py-1.5',
    default: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-2.5'
  }
  return sizeMap[props.size] || sizeMap.default
})

// Icon size classes
const getIconSizeClasses = computed(() => {
  const sizeMap = {
    sm: 'h-3.5 w-3.5',
    default: 'h-4 w-4',
    lg: 'h-5 w-5'
  }
  return sizeMap[props.size] || sizeMap.default
})

// Badge size classes
const getBadgeSizeClasses = computed(() => {
  const sizeMap = {
    sm: 'h-4 min-w-4 px-1 text-[10px]',
    default: 'h-5 min-w-5 px-1.5 text-xs',
    lg: 'h-6 min-w-6 px-2 text-xs'
  }
  return sizeMap[props.size] || sizeMap.default
})

// Tab variant classes (dynamic based on active state)
const getTabVariantClasses = (index) => {
  const isActive = activeTab.value === index
  const tab = tabsComputed.value[index]
  const isDisabled = tab?.disabled || props.disabled
  
  let classes = 'font-medium '
  
  if (props.fullWidth && !props.vertical) {
    classes += 'flex-1 '
  }
  
  if (props.vertical) {
    classes += 'w-full justify-start '
  }
  
  if (props.variant === 'default') {
    classes += 'rounded-md '
    if (isActive) {
      classes += 'bg-color-1 ui-text-color shadow-sm '
    } else if (!isDisabled) {
      classes += 'hover:bg-color-3 hover:ui-text-color '
    }
  } else if (props.variant === 'outline') {
    if (props.vertical) {
      classes += 'rounded-md border border-transparent '
      if (isActive) {
        classes += 'border-color-3 bg-color-1 ui-text-color shadow-sm '
      } else if (!isDisabled) {
        classes += 'ui-text-secondary hover:ui-text-color hover:bg-color-2 '
      }
    } else {
      classes += 'border-b-2 -mb-[2px] rounded-none '
      if (isActive) {
        classes += 'border-primary ui-text-color '
      } else if (!isDisabled) {
        classes += 'border-transparent ui-text-secondary hover:ui-text-color hover:border-color-4 '
      }
    }
  } else if (props.variant === 'pills') {
    classes += 'rounded-full '
    if (isActive) {
      classes += 'bg-primary text-white shadow-sm '
    } else if (!isDisabled) {
      classes += 'ui-text-secondary hover:ui-text-color hover:bg-color-2 '
    }
  } else if (props.variant === 'underline') {
    if (props.vertical) {
      classes += 'border-r-2 -mr-[2px] rounded-none pr-4 '
      if (isActive) {
        classes += 'border-primary ui-text-color '
      } else if (!isDisabled) {
        classes += 'border-transparent ui-text-secondary hover:ui-text-color hover:border-color-4 '
      }
    } else {
      classes += 'border-b-2 -mb-[2px] rounded-none '
      if (isActive) {
        classes += 'border-primary ui-text-color '
      } else if (!isDisabled) {
        classes += 'border-transparent ui-text-secondary hover:ui-text-color '
      }
    }
  }
  
  return classes
}

// Badge classes
const getBadgeClasses = (tab) => {
  const variant = String(tab?.badgeVariant || '').toLowerCase()
  
  if (variant.includes('error') || variant.includes('danger') || variant.includes('red')) {
    return 'bg-red-500 text-white'
  }
  if (variant.includes('success') || variant.includes('green')) {
    return 'bg-green-500 text-white'
  }
  if (variant.includes('warning') || variant.includes('yellow')) {
    return 'bg-yellow-500 text-white'
  }
  if (variant.includes('info') || variant.includes('blue')) {
    return 'bg-blue-500 text-white'
  }
  if (variant.includes('secondary')) {
    return 'bg-color-3 ui-text-color'
  }
  
  return 'bg-primary text-white'
}

// Panel padding classes
const getPanelClasses = computed(() => {
  const sizeMap = {
    sm: 'mt-3',
    default: 'mt-4',
    lg: 'mt-6'
  }
  
  if (props.vertical) {
    return 'pl-0'
  }
  
  return sizeMap[props.size] || sizeMap.default
})

// Methods
const selectTab = (index) => {
  const tab = tabsComputed.value[index]
  if (tab?.disabled || props.disabled) return

  activeTab.value = index
  emit('update:modelValue', index)
  emit('change', index)

  // auto-scroll selected tab into view if scrollable
  if (shouldScroll.value) {
    nextTick(() => {
      const el = document.getElementById(`tab-${tabId.value}-${index}`)
      const container = scrollContainer.value
      if (el && container) {
        const elLeft = el.offsetLeft
        const elRight = elLeft + el.offsetWidth
        const viewLeft = container.scrollLeft
        const viewRight = viewLeft + container.clientWidth

        if (elLeft < viewLeft) {
          container.scrollTo({ left: elLeft - 8, behavior: 'smooth' })
        } else if (elRight > viewRight) {
          container.scrollTo({ left: elRight - container.clientWidth + 8, behavior: 'smooth' })
        }
      }
    })
  }
}

const closeTab = (index) => {
  emit('close', index)
}

const handleKeydown = (event, index) => {
  emit('keydown', event, index)

  const tabsCount = tabsComputed.value.length
  let newIndex = index

  const findNextTab = (startIndex, direction) => {
    let i = startIndex
    for (let count = 0; count < tabsCount; count++) {
      i = (i + direction + tabsCount) % tabsCount
      if (!tabsComputed.value[i]?.disabled) {
        return i
      }
    }
    return startIndex
  }

  switch (event.key) {
    case 'ArrowDown':
      if (props.vertical) {
        event.preventDefault()
        newIndex = findNextTab(index, 1)
      }
      break
    case 'ArrowUp':
      if (props.vertical) {
        event.preventDefault()
        newIndex = findNextTab(index, -1)
      }
      break
    case 'ArrowRight':
      if (!props.vertical) {
        event.preventDefault()
        newIndex = findNextTab(index, isRtl.value ? -1 : 1)
      }
      break
    case 'ArrowLeft':
      if (!props.vertical) {
        event.preventDefault()
        newIndex = findNextTab(index, isRtl.value ? 1 : -1)
      }
      break
    case 'Home':
      event.preventDefault()
      newIndex = findNextTab(-1, 1)
      break
    case 'End':
      event.preventDefault()
      newIndex = findNextTab(tabsCount, -1)
      break
  }

  if (newIndex !== index) {
    selectTab(newIndex)
    const newTabElement = document.getElementById(`tab-${tabId.value}-${newIndex}`)
    newTabElement?.focus()
  }
}

const scrollTabs = (direction) => {
  if (!scrollContainer.value || !shouldScroll.value) return
  const scrollAmount = Math.max(200, scrollContainer.value.clientWidth * 0.5)
  scrollContainer.value.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' })
}

const updateScrollButtons = () => {
  if (!scrollContainer.value || !shouldScroll.value) {
    canScrollLeft.value = false
    canScrollRight.value = false
    return
  }

  const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value
  canScrollLeft.value = scrollLeft > 0
  canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 10
}

watch(
  () => props.modelValue,
  (newValue) => {
    activeTab.value = newValue
  }
)

let scrollObserver = null

const attachScrollListeners = () => {
  if (!scrollContainer.value || !shouldScroll.value) return
  nextTick(updateScrollButtons)
  scrollContainer.value.addEventListener('scroll', updateScrollButtons)
  if (typeof ResizeObserver !== 'undefined') {
    scrollObserver = new ResizeObserver(updateScrollButtons)
    scrollObserver.observe(scrollContainer.value)
  }
}

const detachScrollListeners = () => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener('scroll', updateScrollButtons)
  }
  if (scrollObserver) {
    scrollObserver.disconnect()
    scrollObserver = null
  }
}

watch(shouldScroll, (val) => {
  detachScrollListeners()
  if (val) attachScrollListeners()
})

onMounted(() => {
  if (shouldScroll.value) attachScrollListeners()
})

onBeforeUnmount(() => {
  detachScrollListeners()
})
</script>
