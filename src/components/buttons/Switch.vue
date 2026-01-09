<template>
  <div :class="['relative', margin]">
    <label
      :class="[
        'inline-flex items-center gap-3 cursor-pointer select-none group',
        disabled || loading ? 'opacity-50 cursor-not-allowed' : '',
        labelPosition === 'left' ? 'flex-row-reverse' : '',
        reverse ? 'justify-between w-full' : ''
      ]"
      @click.prevent="toggle"
    >
      <!-- Switch Track -->
      <div
        :class="[
          'relative inline-flex flex-shrink-0 transition-colors duration-200 ease-in-out rounded-full',
          trackSizeClasses,
          trackClasses,
          !disabled && !loading ? 'cursor-pointer' : 'cursor-not-allowed'
        ]"
      >
        <!-- Switch Thumb -->
        <span
          :class="[
            'absolute inline-flex items-center justify-center bg-white rounded-full shadow-md transition-all duration-200 ease-in-out',
            thumbSizeClasses,
            thumbPositionClasses
          ]"
        >
          <!-- Loading Spinner -->
          <svg
            v-if="loading"
            class="animate-spin text-gray-400"
            :class="iconSizeClasses"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>

          <!-- Checked Icon -->
          <Transition name="fade">
            <svg
              v-if="isChecked && !loading && showIcons"
              :class="[iconSizeClasses, checkedIconColor]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </Transition>

          <!-- Unchecked Icon -->
          <Transition name="fade">
            <svg
              v-if="!isChecked && !loading && showIcons"
              :class="[iconSizeClasses, 'text-gray-400']"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Transition>
        </span>

        <!-- Track Icons (inside track) -->
        <span v-if="inset" class="flex items-center justify-between w-full h-full px-1">
          <span :class="['transition-opacity duration-200', isChecked ? 'opacity-100' : 'opacity-0']">
            <svg
              :class="insetIconSizeClasses"
              class="text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span :class="['transition-opacity duration-200', !isChecked ? 'opacity-100' : 'opacity-0']">
            <svg
              :class="insetIconSizeClasses"
              class="text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </span>
      </div>

      <!-- Label & Description -->
      <div v-if="label || description || $slots.default" class="flex flex-col">
        <span
          v-if="label || $slots.default"
          :class="[
            'ui-text-primary leading-tight transition-colors',
            labelSizeClasses,
            !disabled && !loading ? 'group-hover:text-primary' : ''
          ]"
        >
          <slot>{{ label }}</slot>
          <span v-if="required" class="text-red-500 ml-0.5">*</span>
        </span>
        <span
          v-if="description"
          :class="[
            'ui-text-secondary mt-0.5',
            descriptionSizeClasses
          ]"
        >
          {{ description }}
        </span>
      </div>
    </label>

    <!-- Error Message -->
    <p v-if="error" class="mt-1.5 text-sm text-red-500 flex items-center gap-1">
      <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {{ typeof error === 'string' ? error : '' }}
    </p>

    <!-- Hint Message -->
    <p v-if="hint && !error" class="mt-1.5 text-sm ui-text-secondary">
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // v-model value
  modelValue: {
    type: [Boolean, String, Number],
    default: false
  },
  // Values for checked/unchecked states
  trueValue: {
    type: [Boolean, String, Number],
    default: true
  },
  falseValue: {
    type: [Boolean, String, Number],
    default: false
  },
  // Label and description
  label: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  // Label position
  labelPosition: {
    type: String,
    default: 'right', // 'left' | 'right'
    validator: (v) => ['left', 'right'].includes(v)
  },
  // Reverse (label on far side)
  reverse: {
    type: Boolean,
    default: false
  },
  // States
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  // Validation
  error: {
    type: [String, Boolean],
    default: false
  },
  hint: {
    type: String,
    default: ''
  },
  // Styling
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(v)
  },
  color: {
    type: String,
    default: 'primary', // 'primary' | 'success' | 'warning' | 'danger' | 'info'
  },
  // Show icons in thumb
  showIcons: {
    type: Boolean,
    default: false
  },
  // Inset mode (icons inside track)
  inset: {
    type: Boolean,
    default: false
  },
  margin: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'focus', 'blur'])

// Check if switch is checked
const isChecked = computed(() => {
  return props.modelValue === props.trueValue
})

// Toggle switch
const toggle = () => {
  if (props.disabled || props.loading || props.readonly) return

  const newValue = isChecked.value ? props.falseValue : props.trueValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

// Track size classes
const trackSizeClasses = computed(() => {
  if (props.inset) {
    const sizes = {
      xs: 'w-8 h-4',
      sm: 'w-10 h-5',
      md: 'w-12 h-6',
      lg: 'w-14 h-7',
      xl: 'w-16 h-8'
    }
    return sizes[props.size] || sizes.md
  }
  
  const sizes = {
    xs: 'w-7 h-4',
    sm: 'w-9 h-5',
    md: 'w-11 h-6',
    lg: 'w-13 h-7',
    xl: 'w-15 h-8'
  }
  return sizes[props.size] || sizes.md
})

// Thumb size classes
const thumbSizeClasses = computed(() => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  }
  return sizes[props.size] || sizes.md
})

// Thumb position classes
const thumbPositionClasses = computed(() => {
  const offsets = {
    xs: isChecked.value ? 'translate-x-3.5' : 'translate-x-0.5',
    sm: isChecked.value ? 'translate-x-4.5' : 'translate-x-0.5',
    md: isChecked.value ? 'translate-x-5.5' : 'translate-x-0.5',
    lg: isChecked.value ? 'translate-x-6.5' : 'translate-x-0.5',
    xl: isChecked.value ? 'translate-x-7.5' : 'translate-x-0.5'
  }
  
  const topOffset = {
    xs: 'top-0.5',
    sm: 'top-0.5',
    md: 'top-0.5',
    lg: 'top-0.5',
    xl: 'top-0.5'
  }
  
  return `${offsets[props.size] || offsets.md} ${topOffset[props.size] || topOffset.md}`
})

// Icon size classes
const iconSizeClasses = computed(() => {
  const sizes = {
    xs: 'w-2 h-2',
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
    xl: 'w-4 h-4'
  }
  return sizes[props.size] || sizes.md
})

// Inset icon size
const insetIconSizeClasses = computed(() => {
  const sizes = {
    xs: 'w-2 h-2',
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
    xl: 'w-4 h-4'
  }
  return sizes[props.size] || sizes.md
})

// Label size classes
const labelSizeClasses = computed(() => {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  }
  return sizes[props.size] || sizes.md
})

// Description size classes
const descriptionSizeClasses = computed(() => {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm',
    xl: 'text-base'
  }
  return sizes[props.size] || sizes.md
})

// Color classes
const colorMap = computed(() => {
  const colors = {
    primary: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500'
  }
  return colors[props.color] || colors.primary
})

// Checked icon color
const checkedIconColor = computed(() => {
  const colors = {
    primary: 'text-primary',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    danger: 'text-red-500',
    info: 'text-blue-500'
  }
  return colors[props.color] || colors.primary
})

// Track classes
const trackClasses = computed(() => {
  // Error state
  if (props.error) {
    return isChecked.value 
      ? 'bg-red-500' 
      : 'bg-red-200 dark:bg-red-900/30'
  }

  // Disabled state
  if (props.disabled || props.loading) {
    return isChecked.value 
      ? 'bg-gray-400 dark:bg-gray-600' 
      : 'bg-gray-200 dark:bg-gray-700'
  }

  // Normal state
  if (isChecked.value) {
    return colorMap.value
  }

  return 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom translate values for thumb positioning */
.translate-x-3\.5 {
  transform: translateX(0.875rem);
}

.translate-x-4\.5 {
  transform: translateX(1.125rem);
}

.translate-x-5\.5 {
  transform: translateX(1.375rem);
}

.translate-x-6\.5 {
  transform: translateX(1.625rem);
}

.translate-x-7\.5 {
  transform: translateX(1.875rem);
}

/* Width utilities */
.w-13 {
  width: 3.25rem;
}

.w-15 {
  width: 3.75rem;
}
</style>