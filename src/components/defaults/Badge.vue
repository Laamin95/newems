<template>
  <span
    :class="[
      'inline-flex items-center justify-center font-medium transition-all',
      sizeClasses,
      variantClasses,
      roundedClasses,
      bordered && 'ring-1 ring-offset-1',
      borderColorClasses,
      clickable && 'cursor-pointer hover:opacity-80',
      dot && 'pl-1.5',
      containerClass
    ]"
    :style="containerStyle"
    @click="handleClick"
  >
    <!-- Dot Indicator -->
    <span
      v-if="dot"
      :class="[
        'rounded-full mr-1.5',
        dotSizeClasses,
        dotColorClasses
      ]"
    />

    <!-- Icon (left) -->
    <Icon
      v-if="icon && iconPosition === 'left'"
      :name="icon"
      :type="iconType"
      :size="iconSize"
      :class="['flex-shrink-0', content && 'mr-1']"
    />

    <!-- Content -->
    <span v-if="content || $slots.default" :class="contentClasses">
      <slot>{{ content }}</slot>
    </span>

    <!-- Icon (right) -->
    <Icon
      v-if="icon && iconPosition === 'right'"
      :name="icon"
      :type="iconType"
      :size="iconSize"
      :class="['flex-shrink-0', content && 'ml-1']"
    />

    <!-- Close Button -->
    <button
      v-if="closeable"
      type="button"
      @click.stop="handleClose"
      :class="[
        'ml-1 flex-shrink-0 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors',
        closeButtonSizeClasses
      ]"
      aria-label="Remove badge"
    >
      <Icon name="x-mark" :type="iconType" :size="iconSize" />
    </button>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  content: {
    type: [String, Number],
    default: ''
  },
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'primary', 'secondary', 'success', 'error', 'warning', 'info', 'outline'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(v)
  },
  rounded: {
    type: String,
    default: 'md',
    validator: (v) => ['none', 'sm', 'md', 'lg', 'full', 'pill'].includes(v)
  },
  icon: {
    type: String,
    default: ''
  },
  iconType: {
    type: String,
    default: 'solid',
    validator: (v) => ['solid', 'outline'].includes(v)
  },
  iconPosition: {
    type: String,
    default: 'left',
    validator: (v) => ['left', 'right'].includes(v)
  },
  dot: {
    type: Boolean,
    default: false
  },
  dotColor: {
    type: String,
    default: '',
    validator: (v) => ['', 'primary', 'secondary', 'success', 'error', 'warning', 'info'].includes(v)
  },
  bordered: {
    type: Boolean,
    default: false
  },
  closeable: {
    type: Boolean,
    default: false
  },
  clickable: {
    type: Boolean,
    default: false
  },
  uppercase: {
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
  }
})

const emit = defineEmits(['click', 'close'])

// Size classes
const sizeClasses = computed(() => {
  // For full rounded (circular) badges, use equal dimensions
  if (props.rounded === 'full') {
    const sizes = {
      xs: 'w-[18px] h-[18px] text-[10px] p-0',
      sm: 'w-[20px] h-[20px] text-[10px] p-0',
      md: 'w-[24px] h-[24px] text-xs p-0',
      lg: 'w-[28px] h-[28px] text-sm p-0',
      xl: 'w-[32px] h-[32px] text-base p-0'
    }
    return sizes[props.size] || sizes.md
  }
  
  // For pill and other shapes, use normal padding
  const sizes = {
    xs: 'px-1.5 py-0.5 text-[10px] gap-0.5',
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-sm gap-1',
    lg: 'px-3 py-1.5 text-base gap-1.5',
    xl: 'px-4 py-2 text-lg gap-2'
  }
  return sizes[props.size] || sizes.md
})

// Icon size based on badge size
const iconSize = computed(() => {
  const sizes = {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20
  }
  return sizes[props.size] || sizes.md
})

// Dot size classes
const dotSizeClasses = computed(() => {
  const sizes = {
    xs: 'w-1 h-1',
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
    xl: 'w-3 h-3'
  }
  return sizes[props.size] || sizes.md
})

// Close button size
const closeButtonSizeClasses = computed(() => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
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
    outline: 'bg-transparent text-ui-text-color border border-color'
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
    pill: 'rounded-full'
  }
  return rounded[props.rounded] || rounded.md
})

// Border color classes
const borderColorClasses = computed(() => {
  if (!props.bordered) return ''
  
  const colors = {
    default: 'ring-color-4',
    primary: 'ring-primary',
    secondary: 'ring-secondary',
    success: 'ring-success',
    error: 'ring-error',
    warning: 'ring-warning',
    info: 'ring-info',
    outline: 'ring-color'
  }
  return colors[props.variant] || colors.default
})

// Dot color classes
const dotColorClasses = computed(() => {
  if (props.dotColor) {
    const colors = {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      success: 'bg-success',
      error: 'bg-error',
      warning: 'bg-warning',
      info: 'bg-info'
    }
    return colors[props.dotColor] || 'bg-current'
  }
  return 'bg-current'
})

// Content classes
const contentClasses = computed(() => {
  return props.uppercase ? 'uppercase' : ''
})

// Methods
const handleClick = (event) => {
  if (props.clickable) {
    emit('click', event)
  }
}

const handleClose = (event) => {
  emit('close', event)
}
</script>

<style scoped>
/* Smooth transitions */
span {
  transition-property: opacity, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Focus states for closeable badges */
button:focus-visible {
  @apply outline-none ring-2 ring-primary ring-offset-1;
}
</style>