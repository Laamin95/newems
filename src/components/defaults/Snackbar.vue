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
      v-if="modelValue"
      :class="[
        'min-w-[300px] max-w-md rounded-lg shadow-lg border',
        'flex items-start gap-3 pointer-events-auto',
        variantClasses,
        multiline ? 'flex-col p-4' : 'items-center px-4 py-3'
      ]"
      role="alert"
    >
      <!-- Icon -->
      <div v-if="icon || variant !== 'default'" class="flex-shrink-0">
        <i :class="[iconClass, 'text-xl']" />
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <h3 v-if="title" class="font-semibold text-sm mb-1">
          {{ title }}
        </h3>
        <p class="text-sm" :class="multiline ? '' : 'truncate'">
          {{ message }}
        </p>
      </div>

      <!-- Action Button -->
      <button
        v-if="action"
        @click="handleAction"
        class="flex-shrink-0 px-3 py-1 text-sm font-medium rounded hover:bg-black/10 transition-colors"
      >
        {{ action }}
      </button>

      <!-- Close Button -->
      <button
        v-if="closeable"
        @click="close"
        class="flex-shrink-0 p-1 rounded hover:bg-black/10 transition-colors"
      >
        <i class="fas fa-times text-sm" />
      </button>

      <!-- Progress Bar -->
      <div
        v-if="showProgress && timeout > 0"
        class="absolute bottom-0 left-0 right-0 h-1 bg-black/20 rounded-b overflow-hidden"
      >
        <div
          class="h-full bg-current transition-all ease-linear"
          :style="{ width: progress + '%' }"
        />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'success', 'error', 'warning', 'info'].includes(v)
  },
  icon: {
    type: String,
    default: ''
  },
  action: {
    type: String,
    default: ''
  },
  timeout: {
    type: Number,
    default: 5000
  },
  position: {
    type: String,
    default: 'bottom',
    validator: (v) => ['top', 'bottom'].includes(v)
  },
  closeable: {
    type: Boolean,
    default: true
  },
  showProgress: {
    type: Boolean,
    default: false
  },
  multiline: {
    type: Boolean,
    default: false
  },
  onAction: {
    type: Function,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'close', 'action'])

const progress = ref(100)
let progressInterval = null

const variantClasses = computed(() => {
  const variants = {
    default: 'bg-color-2 text-ui-text-color border-color',
    success: 'bg-green-50 text-success border-green-200',
    error: 'bg-red-50 text-error border-red-200',
    warning: 'bg-yellow-50 text-warning border-yellow-200',
    info: 'bg-blue-50 text-info border-blue-200'
  }
  return variants[props.variant] || variants.default
})

const iconClass = computed(() => {
  if (props.icon && props.icon !== 'success' && props.icon !== 'error' && props.icon !== 'warning' && props.icon !== 'info') {
    return props.icon
  }

  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    warning: 'fas fa-exclamation-triangle',
    info: 'fas fa-info-circle',
    default: 'fas fa-bell'
  }
  return icons[props.variant] || icons.default
})

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleAction = () => {
  emit('action')
  if (props.onAction) {
    props.onAction()
  }
}

// Progress bar logic
watch(() => props.modelValue, (newVal) => {
  if (newVal && props.showProgress && props.timeout > 0) {
    progress.value = 100
    const interval = 50 // Update every 50ms
    const decrement = (100 / props.timeout) * interval

    progressInterval = setInterval(() => {
      progress.value -= decrement
      if (progress.value <= 0) {
        clearInterval(progressInterval)
        progress.value = 0
      }
    }, interval)
  }
}, { immediate: true })

onBeforeUnmount(() => {
  if (progressInterval) {
    clearInterval(progressInterval)
  }
})
</script>

<style scoped>
.snackbar-enter-active,
.snackbar-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.snackbar-enter-from,
.snackbar-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Position relative for progress bar */
div[role="alert"] {
  position: relative;
}
</style>