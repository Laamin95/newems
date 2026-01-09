<template>
  <div :class="['relative', margin]">
    <!-- Radio Group Label -->
    <label 
      v-if="groupLabel" 
      :class="[
        'block mb-2 font-medium ui-text-primary',
        groupLabelSizeClasses
      ]"
    >
      {{ groupLabel }}
      <span v-if="required" class="text-red-500 ml-0.5">*</span>
    </label>

    <!-- Radio Items Container -->
    <div 
      :class="[
        'flex',
        inline ? 'flex-row flex-wrap gap-x-6 gap-y-2' : 'flex-col gap-2'
      ]"
      role="radiogroup"
      :aria-label="groupLabel"
    >
      <label
        v-for="(item, index) in normalizedItems"
        :key="item.value"
        :class="[
          'inline-flex items-start gap-3 cursor-pointer select-none group',
          item.disabled || disabled ? 'opacity-50 cursor-not-allowed' : '',
          labelPosition === 'left' ? 'flex-row-reverse' : ''
        ]"
        @click.prevent="!item.disabled && !disabled && selectItem(item.value)"
      >
        <!-- Radio Circle -->
        <div
          :class="[
            'relative flex-shrink-0 flex items-center justify-center rounded-full border-2 transition-all duration-200',
            sizeClasses,
            getStateClasses(item.value, item.disabled)
          ]"
        >
          <!-- Inner Dot -->
          <Transition name="scale">
            <div
              v-if="isSelected(item.value)"
              :class="[
                'rounded-full bg-current transition-all duration-200',
                dotSizeClasses,
                getDotColorClasses(item.disabled)
              ]"
            />
          </Transition>

          <!-- Focus Ring -->
          <div 
            v-if="focusedValue === item.value"
            class="absolute inset-0 rounded-full ring-2 ring-primary/30 ring-offset-2 ring-offset-transparent"
          />
        </div>

        <!-- Label & Description -->
        <div v-if="item.label || item.description" class="flex flex-col">
          <span
            v-if="item.label"
            :class="[
              'ui-text-primary leading-tight transition-colors',
              labelSizeClasses,
              !item.disabled && !disabled ? 'group-hover:text-primary' : ''
            ]"
          >
            {{ item.label }}
          </span>
          <span
            v-if="item.description"
            :class="[
              'ui-text-secondary mt-0.5',
              descriptionSizeClasses
            ]"
          >
            {{ item.description }}
          </span>
        </div>
      </label>
    </div>

    <!-- Error Message -->
    <p v-if="error" class="mt-2 text-sm text-red-500 flex items-center gap-1">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {{ typeof error === 'string' ? error : 'Please select an option' }}
    </p>

    <!-- Hint Message -->
    <p v-if="hint && !error" class="mt-2 text-sm ui-text-secondary">
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  // v-model value
  modelValue: {
    type: [String, Number, Boolean, Object],
    default: null
  },
  // Items array - can be simple values or objects
  items: {
    type: Array,
    default: () => []
  },
  // Keys for object items
  itemLabel: {
    type: String,
    default: 'label'
  },
  itemValue: {
    type: String,
    default: 'value'
  },
  itemDescription: {
    type: String,
    default: 'description'
  },
  itemDisabled: {
    type: String,
    default: 'disabled'
  },
  // Group label
  groupLabel: {
    type: String,
    default: ''
  },
  // Layout
  inline: {
    type: Boolean,
    default: false
  },
  labelPosition: {
    type: String,
    default: 'right', // 'left' | 'right'
    validator: (v) => ['left', 'right'].includes(v)
  },
  // States
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  readonly: {
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
  margin: {
    type: String,
    default: ''
  },
  // Validation
  rules: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'focus', 'blur'])

// Track focused item for keyboard navigation
const focusedValue = ref(null)

// Normalize items to consistent format
const normalizedItems = computed(() => {
  return props.items.map((item) => {
    // If item is a primitive value (string, number, etc.)
    if (typeof item !== 'object' || item === null) {
      return {
        label: String(item),
        value: item,
        description: '',
        disabled: false
      }
    }
    
    // If item is an object
    return {
      label: item[props.itemLabel] || '',
      value: item[props.itemValue] ?? item,
      description: item[props.itemDescription] || '',
      disabled: item[props.itemDisabled] || false
    }
  })
})

// Check if item is selected
const isSelected = (value) => {
  if (props.modelValue === null || props.modelValue === undefined) {
    return false
  }
  // Handle object comparison
  if (typeof value === 'object' && typeof props.modelValue === 'object') {
    return JSON.stringify(value) === JSON.stringify(props.modelValue)
  }
  return props.modelValue === value
}

// Select an item
const selectItem = (value) => {
  if (props.readonly) return
  
  emit('update:modelValue', value)
  emit('change', value)
}

// Size classes for the radio circle
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

// Dot size classes
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

// Group label size classes
const groupLabelSizeClasses = computed(() => {
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

// Color classes based on color prop
const colorClasses = computed(() => {
  const colors = {
    primary: {
      selected: 'border-primary text-primary',
      unselected: 'border-color-3 hover:border-primary',
      dot: 'text-primary'
    },
    success: {
      selected: 'border-green-500 text-green-500',
      unselected: 'border-color-3 hover:border-green-500',
      dot: 'text-green-500'
    },
    warning: {
      selected: 'border-yellow-500 text-yellow-500',
      unselected: 'border-color-3 hover:border-yellow-500',
      dot: 'text-yellow-500'
    },
    danger: {
      selected: 'border-red-500 text-red-500',
      unselected: 'border-color-3 hover:border-red-500',
      dot: 'text-red-500'
    },
    info: {
      selected: 'border-blue-500 text-blue-500',
      unselected: 'border-color-3 hover:border-blue-500',
      dot: 'text-blue-500'
    }
  }
  return colors[props.color] || colors.primary
})

// Get state classes for radio circle
const getStateClasses = (value, itemDisabled) => {
  const isDisabled = itemDisabled || props.disabled
  
  // Error state
  if (props.error) {
    if (isSelected(value)) {
      return 'border-red-500 text-red-500'
    }
    return 'border-red-500 hover:border-red-600'
  }

  // Disabled state
  if (isDisabled) {
    if (isSelected(value)) {
      return 'border-gray-400 text-gray-400 cursor-not-allowed'
    }
    return 'border-gray-300 bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
  }

  // Selected state
  if (isSelected(value)) {
    return colorClasses.value.selected
  }

  // Default unselected state
  return colorClasses.value.unselected
}

// Get dot color classes
const getDotColorClasses = (itemDisabled) => {
  if (props.error) return 'bg-red-500'
  if (itemDisabled || props.disabled) return 'bg-gray-400'
  
  const colors = {
    primary: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500'
  }
  return colors[props.color] || colors.primary
}

// Keyboard navigation
const handleKeydown = (e, index) => {
  const enabledItems = normalizedItems.value.filter(item => !item.disabled)
  const currentIndex = enabledItems.findIndex(item => item.value === props.modelValue)
  
  let newIndex = currentIndex
  
  switch (e.key) {
    case 'ArrowDown':
    case 'ArrowRight':
      e.preventDefault()
      newIndex = currentIndex < enabledItems.length - 1 ? currentIndex + 1 : 0
      break
    case 'ArrowUp':
    case 'ArrowLeft':
      e.preventDefault()
      newIndex = currentIndex > 0 ? currentIndex - 1 : enabledItems.length - 1
      break
    case ' ':
    case 'Enter':
      e.preventDefault()
      if (focusedValue.value !== null) {
        selectItem(focusedValue.value)
      }
      return
  }
  
  if (newIndex !== currentIndex && enabledItems[newIndex]) {
    selectItem(enabledItems[newIndex].value)
    focusedValue.value = enabledItems[newIndex].value
  }
}
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