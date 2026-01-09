<template>
  <div :class="['relative', margin]">
    <label
      :class="[
        'inline-flex items-start gap-3 cursor-pointer select-none',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        labelPosition === 'left' ? 'flex-row-reverse' : ''
      ]"
      @click.prevent="toggle"
    >
      <!-- Checkbox Box -->
      <div
        :class="[
          'flex-shrink-0 flex items-center justify-center border-2 transition-all duration-200',
          sizeClasses,
          roundedClasses,
          stateClasses,
          !disabled ? 'cursor-pointer' : 'cursor-not-allowed'
        ]"
      >
        <!-- Checkmark Icon -->
        <Transition name="scale">
          <svg
            v-if="isChecked && !indeterminate"
            class="text-white"
            :class="iconSizeClasses"
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

        <!-- Indeterminate Icon -->
        <Transition name="scale">
          <svg
            v-if="indeterminate"
            class="text-white"
            :class="iconSizeClasses"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M5 12h14"
            />
          </svg>
        </Transition>
      </div>

      <!-- Label & Description -->
      <div v-if="label || description || $slots.default" class="flex flex-col">
        <span
          v-if="label || $slots.default"
          :class="[
            'ui-text-primary leading-tight',
            labelSizeClasses
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
    <p v-if="error" class="mt-1 text-sm text-red-500">
      {{ typeof error === 'string' ? error : '' }}
    </p>

    <!-- Hint Message -->
    <p v-if="hint && !error" class="mt-1 text-sm ui-text-secondary">
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [Boolean, Array],
    default: false
  },
  value: {
    type: [String, Number, Boolean, Object],
    default: true
  },
  label: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  labelPosition: {
    type: String,
    default: 'right', // 'left' | 'right'
    validator: (v) => ['left', 'right'].includes(v)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  indeterminate: {
    type: Boolean,
    default: false
  },
  error: {
    type: [String, Boolean],
    default: false
  },
  hint: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(v)
  },
  rounded: {
    type: String,
    default: 'md',
    validator: (v) => ['none', 'sm', 'md', 'lg', 'full'].includes(v)
  },
  color: {
    type: String,
    default: 'primary' // 'primary' | 'success' | 'warning' | 'danger' | 'info'
  },
  margin: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

// Check if checkbox is checked
const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value)
  }
  return props.modelValue === true || props.modelValue === props.value
})

// Toggle checkbox
const toggle = () => {
  if (props.disabled) return

  let newValue

  if (Array.isArray(props.modelValue)) {
    // Array mode (multiple checkboxes)
    newValue = [...props.modelValue]
    const index = newValue.indexOf(props.value)
    if (index === -1) {
      newValue.push(props.value)
    } else {
      newValue.splice(index, 1)
    }
  } else {
    // Boolean mode (single checkbox)
    newValue = !props.modelValue
  }

  emit('update:modelValue', newValue)
  emit('change', newValue)
}

// Size classes for the checkbox box
const sizeClasses = computed(() => {
  const sizes = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  }
  return sizes[props.size] || sizes.md
})

// Icon size classes
const iconSizeClasses = computed(() => {
  const sizes = {
    xs: 'w-2.5 h-2.5',
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5'
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

// Rounded classes
const roundedClasses = computed(() => {
  const rounded = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }
  return rounded[props.rounded] || rounded.md
})

// Color classes based on state
const colorClasses = computed(() => {
  const colors = {
    primary: {
      checked: 'bg-primary border-primary',
      unchecked: 'border-color-3 hover:border-primary'
    },
    success: {
      checked: 'bg-green-500 border-green-500',
      unchecked: 'border-color-3 hover:border-green-500'
    },
    warning: {
      checked: 'bg-yellow-500 border-yellow-500',
      unchecked: 'border-color-3 hover:border-yellow-500'
    },
    danger: {
      checked: 'bg-red-500 border-red-500',
      unchecked: 'border-color-3 hover:border-red-500'
    },
    info: {
      checked: 'bg-blue-500 border-blue-500',
      unchecked: 'border-color-3 hover:border-blue-500'
    }
  }
  return colors[props.color] || colors.primary
})

// State classes combining everything
const stateClasses = computed(() => {
  if (props.error) {
    if (isChecked.value || props.indeterminate) {
      return 'bg-red-500 border-red-500'
    }
    return 'border-red-500 hover:border-red-600'
  }

  if (isChecked.value || props.indeterminate) {
    return colorClasses.value.checked
  }

  if (props.disabled) {
    return 'border-color-3 bg-color-2'
  }

  return colorClasses.value.unchecked
})
</script>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0);
  opacity: 0;
}

.scale-enter-to,
.scale-leave-from {
  transform: scale(1);
  opacity: 1;
}
</style>