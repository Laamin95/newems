<template>
  <label
    :class="[
      'inline-flex items-start gap-3 cursor-pointer select-none group',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      labelPosition === 'left' ? 'flex-row-reverse' : '',
      margin
    ]"
    @click.prevent="!disabled && handleClick()"
  >
    <!-- Radio Circle -->
    <div
      :class="[
        'relative flex-shrink-0 flex items-center justify-center rounded-full border-2 transition-all duration-200',
        sizeClasses,
        stateClasses
      ]"
    >
      <!-- Inner Dot -->
      <Transition name="scale">
        <div
          v-if="isChecked"
          :class="[
            'rounded-full transition-all duration-200',
            dotSizeClasses,
            dotColorClasses
          ]"
        />
      </Transition>
    </div>

    <!-- Label & Description -->
    <div v-if="label || description || $slots.default" class="flex flex-col">
      <span
        v-if="label || $slots.default"
        :class="[
          'ui-text-primary leading-tight transition-colors',
          labelSizeClasses,
          !disabled ? 'group-hover:text-primary' : ''
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
</template>

<script setup>
import { computed, inject } from 'vue'

const props = defineProps({
  value: {
    type: [String, Number, Boolean, Object],
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  labelPosition: {
    type: String,
    default: 'right'
  },
  size: {
    type: String,
    default: 'md'
  },
  color: {
    type: String,
    default: 'primary'
  },
  margin: {
    type: String,
    default: ''
  }
})

// Inject from parent RadioGroup if available
const radioGroup = inject('radioGroup', null)

const emit = defineEmits(['update:modelValue', 'change'])

// Check if this item is selected
const isChecked = computed(() => {
  if (radioGroup) {
    return radioGroup.modelValue.value === props.value
  }
  return false
})

// Handle click
const handleClick = () => {
  if (radioGroup) {
    radioGroup.select(props.value)
  }
  emit('update:modelValue', props.value)
  emit('change', props.value)
}

// Size classes
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

const dotSizeClasses = computed(() => {
  const sizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-3.5 h-3.5'
  }
  return sizes[props.size] || sizes.md
})

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
const colorClasses = computed(() => {
  const colors = {
    primary: { selected: 'border-primary', unselected: 'border-color-3 hover:border-primary' },
    success: { selected: 'border-green-500', unselected: 'border-color-3 hover:border-green-500' },
    warning: { selected: 'border-yellow-500', unselected: 'border-color-3 hover:border-yellow-500' },
    danger: { selected: 'border-red-500', unselected: 'border-color-3 hover:border-red-500' },
    info: { selected: 'border-blue-500', unselected: 'border-color-3 hover:border-blue-500' }
  }
  return colors[props.color] || colors.primary
})

const dotColorClasses = computed(() => {
  const colors = {
    primary: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500'
  }
  return colors[props.color] || colors.primary
})

const stateClasses = computed(() => {
  if (props.disabled) {
    return isChecked.value 
      ? 'border-gray-400 cursor-not-allowed' 
      : 'border-gray-300 bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
  }
  return isChecked.value 
    ? colorClasses.value.selected 
    : colorClasses.value.unselected
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