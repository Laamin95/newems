<template>
  <div
    :class="[
      'flex items-center',
      orientationClasses,
      spacingClasses,
      containerClass
    ]"
    :style="containerStyle"
    role="separator"
    :aria-orientation="orientation"
  >
    <!-- Leading Content (only for horizontal with content) -->
    <div
      v-if="hasContent && orientation === 'horizontal' && position === 'left'"
      :class="['flex-shrink-0', contentClasses]"
    >
      <slot>{{ text }}</slot>
    </div>

    <!-- Leading Line -->
    <div
      :class="[
        'flex-grow',
        lineClasses,
        thicknessClasses,
        variantClasses,
        orientation === 'vertical' && 'h-full'
      ]"
      :style="lineStyle"
    />

    <!-- Center Content -->
    <div
      v-if="hasContent && orientation === 'horizontal' && position === 'center'"
      :class="['flex-shrink-0', contentClasses]"
    >
      <slot>{{ text }}</slot>
    </div>

    <!-- Trailing Line (only if there's content) -->
    <div
      v-if="hasContent && orientation === 'horizontal'"
      :class="[
        'flex-grow',
        lineClasses,
        thicknessClasses,
        variantClasses
      ]"
      :style="lineStyle"
    />

    <!-- Trailing Content -->
    <div
      v-if="hasContent && orientation === 'horizontal' && position === 'right'"
      :class="['flex-shrink-0', contentClasses]"
    >
      <slot>{{ text }}</slot>
    </div>
  </div>
</template>

<script setup>
import { computed, useSlots } from 'vue'

const props = defineProps({
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (v) => ['horizontal', 'vertical'].includes(v)
  },
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'dashed', 'dotted', 'thick', 'gradient'].includes(v)
  },
  thickness: {
    type: String,
    default: 'thin',
    validator: (v) => ['thin', 'medium', 'thick'].includes(v)
  },
  spacing: {
    type: String,
    default: 'md',
    validator: (v) => ['none', 'xs', 'sm', 'md', 'lg', 'xl'].includes(v)
  },
  position: {
    type: String,
    default: 'center',
    validator: (v) => ['left', 'center', 'right'].includes(v)
  },
  text: {
    type: String,
    default: ''
  },
  textSize: {
    type: String,
    default: 'sm',
    validator: (v) => ['xs', 'sm', 'base', 'lg'].includes(v)
  },
  color: {
    type: String,
    default: ''
  },
  inset: {
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

const slots = useSlots()

// Check if there's content
const hasContent = computed(() => {
  return !!(props.text || slots.default)
})

// Orientation classes
const orientationClasses = computed(() => {
  return props.orientation === 'vertical' 
    ? 'flex-col h-full' 
    : 'flex-row w-full'
})

// Spacing classes
const spacingClasses = computed(() => {
  if (props.orientation === 'vertical') {
    const spacings = {
      none: '',
      xs: 'mx-1',
      sm: 'mx-2',
      md: 'mx-4',
      lg: 'mx-6',
      xl: 'mx-8'
    }
    return spacings[props.spacing] || spacings.md
  } else {
    const spacings = {
      none: '',
      xs: 'my-1',
      sm: 'my-2',
      md: 'my-4',
      lg: 'my-6',
      xl: 'my-8'
    }
    return spacings[props.spacing] || spacings.md
  }
})

// Line base classes
const lineClasses = computed(() => {
  const insetClass = props.inset 
    ? (props.orientation === 'vertical' ? 'my-4' : 'mx-4')
    : ''
  
  return `${insetClass}`
})

// Thickness classes
const thicknessClasses = computed(() => {
  if (props.orientation === 'vertical') {
    const thickness = {
      thin: 'w-px',
      medium: 'w-0.5',
      thick: 'w-1'
    }
    return thickness[props.thickness] || thickness.thin
  } else {
    const thickness = {
      thin: 'h-px',
      medium: 'h-0.5',
      thick: 'h-1'
    }
    return thickness[props.thickness] || thickness.thin
  }
})

// Variant classes
const variantClasses = computed(() => {
  const variants = {
    default: 'bg-color-3 border-color-3',
    dashed: 'border-color-3 border-dashed',
    dotted: 'border-color-3 border-dotted',
    thick: 'bg-color-3 border-color-3',
    gradient: 'bg-gradient-to-r from-transparent via-color-3 to-transparent'
  }
  
  const base = variants[props.variant] || variants.default
  
  // Add border styles for dashed/dotted
  if (props.variant === 'dashed' || props.variant === 'dotted') {
    const borderSize = props.orientation === 'vertical' ? 'border-l' : 'border-t'
    return `${base} ${borderSize}`
  }
  
  return base
})

// Line custom style
const lineStyle = computed(() => {
  if (props.color) {
    if (props.variant === 'dashed' || props.variant === 'dotted') {
      return { borderColor: props.color }
    }
    return { backgroundColor: props.color }
  }
  return {}
})

// Content classes
const contentClasses = computed(() => {
  const padding = props.orientation === 'vertical' ? 'py-2' : 'px-4'
  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg'
  }
  
  return `${padding} ${textSizes[props.textSize] || textSizes.sm} text-ui-text-secondary font-medium`
})
</script>

<style scoped>
/* Ensure proper flex behavior */
.flex-grow {
  flex: 1 1 0%;
}

.flex-shrink-0 {
  flex-shrink: 0;
}
</style>