<template>
  <div
    :class="[
      'inline-flex items-center gap-2 transition-all duration-200 ease-in-out select-none',
      sizeClasses,
      variantClasses,
      roundedClasses,
      {
        'cursor-pointer hover:shadow-md': clickable,
        'opacity-60': disabled,
        'cursor-not-allowed': disabled
      },
      chipClass
    ]"
    :tabindex="clickable && !disabled ? 0 : -1"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <!-- Leading icon/avatar -->
    <div v-if="$slots.prepend || avatar || prependIcon" class="flex items-center">
      <slot name="prepend">
        <!-- Avatar -->
        <img
          v-if="avatar"
          :src="avatar"
          :alt="avatarAlt"
          :class="avatarClasses"
        />
        <!-- Prepend Icon -->
        <component
          v-else-if="prependIcon"
          :is="prependIcon"
          :class="iconClasses"
        />
        <!-- Default prepend icon -->
        <svg
          v-else
          :class="iconClasses"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      </slot>
    </div>

    <!-- Chip content -->
    <div class="flex items-center gap-1 min-w-0">
      <span :class="['truncate', textClasses]">
        <slot>{{ label }}</slot>
      </span>
    </div>

    <!-- Trailing icon/close button -->
    <div v-if="$slots.append || appendIcon || closable" class="flex items-center">
      <slot name="append">
        <!-- Close button -->
        <button
          v-if="closable"
          type="button"
          :class="[
            'inline-flex items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-1',
            closeButtonClasses
          ]"
          :disabled="disabled"
          @click.stop="handleClose"
          @keydown.enter.stop="handleClose"
          @keydown.space.stop.prevent="handleClose"
        >
          <svg
            :class="closeIconClasses"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <!-- Append Icon -->
        <component
          v-else-if="appendIcon"
          :is="appendIcon"
          :class="iconClasses"
        />
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Content
  label: {
    type: String,
    default: ''
  },

  // Behavior
  clickable: {
    type: Boolean,
    default: false
  },
  closable: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },

  // Styling
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'outlined', 'filled', 'tonal'].includes(value)
  },
  color: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['small', 'default', 'large'].includes(value)
  },
  rounded: {
    type: String,
    default: 'full'
  },

  // Icons and avatars
  prependIcon: {
    type: [String, Object],
    default: null
  },
  appendIcon: {
    type: [String, Object],
    default: null
  },
  avatar: {
    type: String,
    default: null
  },
  avatarAlt: {
    type: String,
    default: 'Avatar'
  },

  // Custom classes
  chipClass: {
    type: String,
    default: ''
  },
  textClass: {
    type: String,
    default: ''
  },

  // Color customization
  bgColor: {
    type: String,
    default: ''
  },
  textColor: {
    type: String,
    default: ''
  },
  borderColor: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['click', 'close'])

// Computed classes
const sizeClasses = computed(() => {
  const sizes = {
    small: 'px-2 py-1 text-xs min-h-6',
    default: 'px-3 py-1.5 text-sm min-h-8',
    large: 'px-4 py-2 text-base min-h-10'
  }
  return sizes[props.size] || sizes.default
})

const roundedClasses = computed(() => {
  if (props.rounded === 'none') return 'rounded-none'
  if (props.rounded === 'sm') return 'rounded-sm'
  if (props.rounded === 'md') return 'rounded-md'
  if (props.rounded === 'lg') return 'rounded-lg'
  if (props.rounded === 'xl') return 'rounded-xl'
  return 'rounded-full' // default
})

const variantClasses = computed(() => {
  // If custom colors are provided, use them
  if (props.bgColor || props.textColor || props.borderColor) {
    const bg = props.bgColor || 'bg-gray-100'
    const text = props.textColor || 'text-gray-800'
    const border = props.borderColor ? `border ${props.borderColor}` : ''
    
    if (props.variant === 'outlined') {
      return `bg-transparent ${text} border ${border || 'border-gray-300'}`
    }
    return `${bg} ${text} ${border}`
  }

  // Default color variants
  const colorVariants = {
    primary: {
      default: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      outlined: 'bg-transparent text-blue-600 border border-blue-300 hover:bg-blue-50',
      filled: 'bg-blue-600 text-white hover:bg-blue-700',
      tonal: 'bg-blue-50 text-blue-700 hover:bg-blue-100'
    },
    secondary: {
      default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
      outlined: 'bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-50',
      filled: 'bg-gray-600 text-white hover:bg-gray-700',
      tonal: 'bg-gray-50 text-gray-700 hover:bg-gray-100'
    },
    success: {
      default: 'bg-green-100 text-green-800 hover:bg-green-200',
      outlined: 'bg-transparent text-green-600 border border-green-300 hover:bg-green-50',
      filled: 'bg-green-600 text-white hover:bg-green-700',
      tonal: 'bg-green-50 text-green-700 hover:bg-green-100'
    },
    warning: {
      default: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      outlined: 'bg-transparent text-yellow-600 border border-yellow-300 hover:bg-yellow-50',
      filled: 'bg-yellow-600 text-white hover:bg-yellow-700',
      tonal: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
    },
    error: {
      default: 'bg-red-100 text-red-800 hover:bg-red-200',
      outlined: 'bg-transparent text-red-600 border border-red-300 hover:bg-red-50',
      filled: 'bg-red-600 text-white hover:bg-red-700',
      tonal: 'bg-red-50 text-red-700 hover:bg-red-100'
    },
    info: {
      default: 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200',
      outlined: 'bg-transparent text-cyan-600 border border-cyan-300 hover:bg-cyan-50',
      filled: 'bg-cyan-600 text-white hover:bg-cyan-700',
      tonal: 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100'
    }
  }

  const colorScheme = colorVariants[props.color] || colorVariants.primary
  return colorScheme[props.variant] || colorScheme.default
})

const textClasses = computed(() => {
  const base = 'font-medium'
  return props.textClass ? `${base} ${props.textClass}` : base
})

const iconClasses = computed(() => {
  const sizes = {
    small: 'w-3 h-3',
    default: 'w-4 h-4',
    large: 'w-5 h-5'
  }
  return sizes[props.size] || sizes.default
})

const avatarClasses = computed(() => {
  const sizes = {
    small: 'w-4 h-4',
    default: 'w-5 h-5',
    large: 'w-6 h-6'
  }
  return `${sizes[props.size] || sizes.default} rounded-full object-cover`
})

const closeButtonClasses = computed(() => {
  const sizes = {
    small: 'w-4 h-4',
    default: 'w-5 h-5',
    large: 'w-6 h-6'
  }
  return sizes[props.size] || sizes.default
})

const closeIconClasses = computed(() => {
  const sizes = {
    small: 'w-2.5 h-2.5',
    default: 'w-3 h-3',
    large: 'w-3.5 h-3.5'
  }
  return sizes[props.size] || sizes.default
})

// Event handlers
const handleClick = () => {
  if (!props.disabled && props.clickable) {
    emit('click')
  }
}

const handleClose = () => {
  if (!props.disabled) {
    emit('close')
  }
}
</script>

<style scoped>
/* Minimal styles for focus states */
.focus\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.focus\:ring-offset-1:focus {
  --tw-ring-offset-width: 1px;
}
</style>