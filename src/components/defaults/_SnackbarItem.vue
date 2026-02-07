<template>
  <transition
    enter-active-class="transition-all duration-300"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition-all duration-200"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-if="snackbar.isVisible.value"
      :class="snackbarClasses"
      role="alert"
    >
      <!-- Content Container -->
      <div class="flex items-start gap-3 w-full">
        <!-- Icon -->
        <div v-if="options.icon" class="flex-shrink-0 mt-0.5">
          <!-- Info Icon -->
          <svg v-if="options.icon === 'info'" class="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
          <!-- Success Icon -->
          <svg v-else-if="options.icon === 'success'" class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <!-- Warning Icon -->
          <svg v-else-if="options.icon === 'warning'" class="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <!-- Error Icon -->
          <svg v-else-if="options.icon === 'error'" class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>

        <!-- Message Content -->
        <div class="flex-1 min-w-0">
          <p v-if="options.title" class="font-semibold text-sm mb-1">
            {{ options.title }}
          </p>
          <p class="text-sm opacity-90">
            {{ options.message }}
          </p>
        </div>

        <!-- Action Button or Close Button -->
        <div class="flex-shrink-0 ml-2 flex items-center gap-2">
          <!-- Action Button -->
          <button
            v-if="options.action"
            @click="handleAction"
            class="text-xs font-semibold px-3 py-1.5 rounded transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2"
            :class="actionButtonClasses"
          >
            {{ options.action }}
          </button>

          <!-- Close Button -->
          <button
            v-if="options.closeable"
            @click="snackbar.close()"
            class="text-opacity-60 hover:text-opacity-100 transition-opacity focus:outline-none p-1"
            aria-label="Close snackbar"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Progress Bar -->
      <div
        v-if="options.timeout && options.showProgress"
        :class="progressClasses"
        :style="progressStyle"
      />
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  snackbar: {
    type: Object,
    required: true
  }
})

const options = computed(() => props.snackbar.options)
const progress = ref(100)
let timeoutId = null
let intervalId = null

// Snackbar Classes
const snackbarClasses = computed(() => {
  const base = [
    'w-full max-w-md',
    'px-4 py-3 rounded-lg shadow-lg',
    'border backdrop-blur-sm',
  ]

  // Variant colors - shadcn style
  const variantMap = {
    default: 'bg-slate-900 border-slate-800 text-white',
    info: 'bg-blue-50 border-blue-200 text-slate-900',
    success: 'bg-green-50 border-green-200 text-slate-900',
    warning: 'bg-amber-50 border-amber-200 text-slate-900',
    error: 'bg-red-50 border-red-200 text-slate-900',
  }

  base.push(variantMap[options.value.variant])

  return base
})

// Action Button Classes
const actionButtonClasses = computed(() => {
  const variantMap = {
    default: 'bg-white text-slate-900 hover:bg-slate-100',
    info: 'bg-blue-600 text-white hover:bg-blue-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
    warning: 'bg-amber-600 text-white hover:bg-amber-700',
    error: 'bg-red-600 text-white hover:bg-red-700',
  }

  return variantMap[options.value.variant]
})

// Progress Bar Classes
const progressClasses = computed(() => {
  const variantMap = {
    default: 'bg-white/30',
    info: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
  }

  return [
    'absolute bottom-0 left-0 h-1 transition-all duration-100',
    variantMap[options.value.variant]
  ]
})

const progressStyle = computed(() => ({
  width: `${progress.value}%`,
}))

// Methods
const handleAction = () => {
  props.snackbar.options.onAction?.()
  props.snackbar.close()
}

const startTimeout = () => {
  if (!options.value.timeout) return

  clearTimers()

  const startTime = Date.now()
  const duration = options.value.timeout

  if (options.value.showProgress) {
    intervalId = setInterval(() => {
      const elapsed = Date.now() - startTime
      progress.value = Math.max(0, 100 - (elapsed / duration) * 100)
    }, 10)
  }

  timeoutId = setTimeout(() => {
    props.snackbar.close()
  }, options.value.timeout)
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
  if (options.value.timeout) {
    startTimeout()
  }
})

onBeforeUnmount(() => {
  clearTimers()
})
</script>
