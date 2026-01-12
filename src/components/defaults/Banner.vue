<template>
  <transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="transform translate-y-[-100%] opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-[-100%] opacity-0"
  >
    <div
      v-if="isVisible"
      :class="bannerClasses"
      role="alert"
    >
      <div :class="contentContainerClasses">
        <!-- Icon/Prepend -->
        <div v-if="$slots.prepend || iconComponent" class="flex-shrink-0">
          <slot name="prepend">
            <!-- Info Icon -->
            <svg v-if="iconComponent === 'info'" fill="currentColor" viewBox="0 0 20 20" class="h-5 w-5">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            <!-- Success Icon -->
            <svg v-else-if="iconComponent === 'success'" fill="currentColor" viewBox="0 0 20 20" class="h-5 w-5">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <!-- Warning Icon -->
            <svg v-else-if="iconComponent === 'warning'" fill="currentColor" viewBox="0 0 20 20" class="h-5 w-5">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <!-- Error Icon -->
            <svg v-else-if="iconComponent === 'error'" fill="currentColor" viewBox="0 0 20 20" class="h-5 w-5">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </slot>
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <!-- Title -->
          <div v-if="title || $slots.title" :class="titleClasses">
            <slot name="title">{{ title }}</slot>
          </div>

          <!-- Message -->
          <div v-if="message || $slots.default" :class="messageClasses">
            <slot>{{ message }}</slot>
          </div>
        </div>

        <!-- Actions -->
        <div v-if="$slots.actions || closeable" class="flex items-center gap-2">
          <slot name="actions" />
          
          <!-- Close Button -->
          <button
            v-if="closeable"
            @click="close"
            :class="closeButtonClasses"
            aria-label="Close banner"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Progress Bar (for auto-dismiss) -->
      <div
        v-if="timeout && showProgress"
        :class="progressBarClasses"
        :style="progressStyle"
      ></div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { roundedMap } from '@/lib/componentConfig'

const props = defineProps({
  modelValue: { type: Boolean, default: true },
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  variant: { type: String, default: 'default' }, // default | info | success | warning | error
  icon: { type: String, default: '' }, // info | success | warning | error | custom
  closeable: { type: Boolean, default: true },
  sticky: { type: Boolean, default: false },
  position: { type: String, default: 'top' }, // top | bottom
  timeout: { type: Number, default: 0 }, // Auto-dismiss after X ms (0 = no auto-dismiss)
  showProgress: { type: Boolean, default: false },
  rounded: { type: String, default: 'd' }, // none | sm | md | lg
  elevation: { type: Boolean, default: true },
  outlined: { type: Boolean, default: false },
  dense: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'close', 'dismiss'])

const isVisible = ref(props.modelValue)
const progress = ref(100)
let timeoutId = null
let intervalId = null

// Watch modelValue changes
watch(() => props.modelValue, (val) => {
  isVisible.value = val
  if (val && props.timeout) {
    startTimeout()
  }
})

// Icon component mapping - return icon names to be rendered as SVG
const iconComponent = computed(() => {
  return props.icon
})

// Banner classes
const bannerClasses = computed(() => {
  const base = [
    'w-full relative overflow-hidden',
    props.sticky ? 'sticky z-50' : 'relative',
  ]

  // Position
  if (props.sticky) {
    base.push(props.position === 'bottom' ? 'bottom-0' : 'top-0')
  }

  // Variant colors
  const variantMap = {
    default: 'bg-background border-border text-foreground',
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    success: 'bg-green-50 border-green-200 text-green-900',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    error: 'bg-red-50 border-red-200 text-red-900',
  }

  base.push(variantMap[props.variant])

  // Border
  if (props.outlined) {
    base.push('border-t-4')
  } else {
    base.push('border-t')
  }

  // Elevation
  if (props.elevation) {
    base.push('shadow-md')
  }

  // Rounded
//   const roundedMap = {
//     none: '',
//     sm: 'rounded-sm',
//     md: 'rounded-md',
//     lg: 'rounded-lg',
//   }
  base.push(roundedMap[props.rounded])

  return base
})

// Content container classes
const contentContainerClasses = computed(() => [
  'flex items-start gap-3',
  props.dense ? 'p-3' : 'p-4',
])

// Title classes
const titleClasses = computed(() => [
  'font-semibold',
  props.dense ? 'text-sm' : 'text-base',
])

// Message classes
const messageClasses = computed(() => [
  props.dense ? 'text-xs' : 'text-sm',
  'mt-1',
])

// Close button classes
const closeButtonClasses = computed(() => [
  'flex-shrink-0 rounded-md p-1.5',
  'hover:bg-black/5 dark:hover:bg-white/10',
  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  'transition-colors',
])

// Progress bar classes
const progressBarClasses = computed(() => {
  const variantMap = {
    default: 'bg-gray-400',
    info: 'bg-blue-400',
    success: 'bg-green-400',
    warning: 'bg-yellow-400',
    error: 'bg-red-400',
  }
  
  return [
    'absolute bottom-0 left-0 h-1 transition-all duration-100',
    variantMap[props.variant]
  ]
})

const progressStyle = computed(() => ({
  width: `${progress.value}%`,
}))

// Methods
const close = () => {
  isVisible.value = false
  emit('update:modelValue', false)
  emit('close')
  clearTimers()
}

const startTimeout = () => {
  if (!props.timeout) return

  clearTimers()

  const startTime = Date.now()
  const duration = props.timeout

  if (props.showProgress) {
    intervalId = setInterval(() => {
      const elapsed = Date.now() - startTime
      progress.value = Math.max(0, 100 - (elapsed / duration) * 100)
    }, 10)
  }

  timeoutId = setTimeout(() => {
    close()
    emit('dismiss')
  }, props.timeout)
}

const clearTimers = () => {
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
  progress.value = 100
}

// Lifecycle
onMounted(() => {
  if (isVisible.value && props.timeout) {
    startTimeout()
  }
})

onBeforeUnmount(() => {
  clearTimers()
})

// Expose methods
defineExpose({ close })
</script>

<style scoped>
.sticky {
  position: sticky;
}
</style>