<template>
  <div
    :class="[
      'inline-flex items-center justify-center flex-shrink-0 relative',
      'font-medium select-none overflow-hidden',
      sizeClasses,
      variantClasses,
      roundedClasses,
      bordered && 'ring-2 ring-offset-2',
      borderColorClasses,
      clickable && 'cursor-pointer hover:opacity-80 transition-opacity',
      containerClass
    ]"
    :style="containerStyle"
    @click="handleClick"
  >
    <!-- Image -->
    <img
      v-if="src && !imageError"
      :src="src"
      :alt="alt"
      :class="['w-full h-full object-cover', imageClass]"
      @error="handleImageError"
    />

    <!-- Icon -->
    <i
      v-else-if="icon"
      :class="[icon, iconSizeClasses, 'text-current']"
    />

    <!-- Initials -->
    <span
      v-else-if="initials || name"
      :class="['uppercase font-semibold', textSizeClasses]"
    >
      {{ displayInitials }}
    </span>

    <!-- Fallback Icon -->
    <i
      v-else
      :class="['fas fa-user', iconSizeClasses, 'text-current']"
    />

    <!-- Badge/Dot (status indicator) -->
    <span
      v-if="dot || badge"
      :class="[
        'absolute rounded-full',
        dotPositionClasses,
        dotSizeClasses,
        dotColorClasses,
        badge && 'flex items-center justify-center text-xs font-bold text-white'
      ]"
      :style="dotStyle"
    >
      <span v-if="badge">{{ badge }}</span>
    </span>

    <!-- Slot for custom content -->
    <slot />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: 'Avatar'
  },
  name: {
    type: String,
    default: ''
  },
  initials: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['xs', 'sm', 'md', 'lg', 'xl', '2xl'].includes(v)
  },
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'primary', 'secondary', 'success', 'error', 'warning', 'info', 'gradient'].includes(v)
  },
  rounded: {
    type: String,
    default: 'full',
    validator: (v) => ['none', 'sm', 'md', 'lg', 'full', 'square'].includes(v)
  },
  bordered: {
    type: Boolean,
    default: false
  },
  borderColor: {
    type: String,
    default: 'primary'
  },
  dot: {
    type: Boolean,
    default: false
  },
  dotColor: {
    type: String,
    default: 'success',
    validator: (v) => ['success', 'error', 'warning', 'info', 'primary', 'secondary'].includes(v)
  },
  dotPosition: {
    type: String,
    default: 'bottom-right',
    validator: (v) => ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(v)
  },
  badge: {
    type: [String, Number],
    default: ''
  },
  clickable: {
    type: Boolean,
    default: false
  },
  containerClass: {
    type: String,
    default: ''
  },
  containerStyle: {
    type: Object,
    default: () => ({})
  },
  imageClass: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['click', 'image-error'])

const imageError = ref(false)

// Size classes
const sizeClasses = computed(() => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl'
  }
  return sizes[props.size] || sizes.md
})

// Text size for initials
const textSizeClasses = computed(() => {
  const sizes = {
    xs: 'text-[10px]',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
    '2xl': 'text-xl'
  }
  return sizes[props.size] || sizes.md
})

// Icon size
const iconSizeClasses = computed(() => {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  }
  return sizes[props.size] || sizes.md
})

// Variant classes
const variantClasses = computed(() => {
  const variants = {
    default: 'bg-color-3 text-ui-text-color',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    success: 'bg-success text-white',
    error: 'bg-error text-white',
    warning: 'bg-warning text-white',
    info: 'bg-info text-white',
    gradient: 'bg-gradient-to-br from-primary to-secondary text-white'
  }
  return variants[props.variant] || variants.default
})

// Rounded classes
const roundedClasses = computed(() => {
  const rounded = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
    square: 'rounded-none'
  }
  return rounded[props.rounded] || rounded.full
})

// Border color classes
const borderColorClasses = computed(() => {
  if (!props.bordered) return ''
  
  const colors = {
    primary: 'ring-primary',
    secondary: 'ring-secondary',
    success: 'ring-success',
    error: 'ring-error',
    warning: 'ring-warning',
    info: 'ring-info',
    default: 'ring-color-4'
  }
  return colors[props.borderColor] || colors.primary
})

// Dot size classes
const dotSizeClasses = computed(() => {
  const sizes = {
    xs: 'w-2 h-2',
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
    xl: 'w-4 h-4',
    '2xl': 'w-5 h-5'
  }
  
  if (props.badge) {
    const badgeSizes = {
      xs: 'w-4 h-4 min-w-[16px]',
      sm: 'w-5 h-5 min-w-[20px]',
      md: 'w-6 h-6 min-w-[24px]',
      lg: 'w-7 h-7 min-w-[28px]',
      xl: 'w-8 h-8 min-w-[32px]',
      '2xl': 'w-9 h-9 min-w-[36px]'
    }
    return badgeSizes[props.size] || badgeSizes.md
  }
  
  return sizes[props.size] || sizes.md
})

// Dot position classes
const dotPositionClasses = computed(() => {
  const positions = {
    'top-left': '-top-0.5 -left-0.5',
    'top-right': '-top-0.5 -right-0.5',
    'bottom-left': '-bottom-0.5 -left-0.5',
    'bottom-right': '-bottom-0.5 -right-0.5'
  }
  return positions[props.dotPosition] || positions['bottom-right']
})

// Dot color classes
const dotColorClasses = computed(() => {
  const colors = {
    success: 'bg-success',
    error: 'bg-error',
    warning: 'bg-warning',
    info: 'bg-info',
    primary: 'bg-primary',
    secondary: 'bg-secondary'
  }
  return colors[props.dotColor] || colors.success
})

// Dot style (for border)
const dotStyle = computed(() => {
  return {
    border: '2px solid var(--bg-color)'
  }
})

// Display initials
const displayInitials = computed(() => {
  if (props.initials) return props.initials.slice(0, 2)
  
  if (props.name) {
    const names = props.name.trim().split(' ')
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase()
    }
    return names[0].slice(0, 2).toUpperCase()
  }
  
  return ''
})

// Methods
const handleImageError = (event) => {
  imageError.value = true
  emit('image-error', event)
}

const handleClick = (event) => {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>

<style scoped>
/* Smooth transitions */
div {
  transition: opacity 0.2s ease;
}

img {
  transition: transform 0.3s ease;
}

/* Hover effect for clickable avatars */
.cursor-pointer:hover img {
  transform: scale(1.05);
}
</style>