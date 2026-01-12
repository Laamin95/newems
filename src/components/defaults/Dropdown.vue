<template>
  <!-- Trigger -->
  <div ref="triggerRef" @click="toggle" class="inline-block">
    <slot name="trigger">
      <button :class="triggerClasses">
        <slot name="label">{{ label }}</slot>
        <svg
          class="ml-2 h-4 w-4 transition-transform"
          :class="{ 'rotate-180': isOpen }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </slot>
  </div>

  <!-- Menu (Teleported) -->
  <teleport to="body">
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        ref="menuRef"
        :style="menuStyle"
        :class="menuClasses"
      >
        <slot>
          <!-- Default items rendering -->
          <div
            v-for="(item, index) in items"
            :key="index"
            @click="selectItem(item)"
            :class="itemClasses"
          >
            {{ item.label || item }}
          </div>
        </slot>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
// import { colorMap } from '@/lib/componentConfig'
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { sizes, iconSizes, roundedMap, colorMap } from '@/lib/componentConfig'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  label: { type: String, default: 'Menu' },
  items: { type: Array, default: () => [] },
  width: { type: [String, Number], default: 'auto' },
  minWidth: { type: [String, Number], default: '200' },
  maxHeight: { type: [String, Number], default: '400' },
  align: { type: String, default: 'left' }, // left | right | center
  offsetX: { type: Number, default: 0 },
  offsetY: { type: Number, default: 8 },
  openOnHover: { type: Boolean, default: false },
  closeOnContentClick: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  elevation: { type: Number, default: 8 },
  rounded: { type: String, default: 'd' }, // none | sm | md | lg | xl
  dense: { type: Boolean, default: false },
  color: { type: String, default: 'primary' },
  variant: { type: String, default: 'contained' }, // contained | outlined | text | tonal | plain
  size: { type: String, default: 'md' }, // xs | sm | md | lg | xl
  icon: {type: String, default: '' },
})

const emit = defineEmits(['update:modelValue', 'select', 'opened', 'closed'])

const isOpen = ref(props.modelValue)
const triggerRef = ref(null)
const menuRef = ref(null)
const menuStyle = ref({})

// Classes
const variantClasses = computed(() => {
    const c = colorMap[props.color] || colorMap.gray
    return c[props.variant] || c.contained
})
const triggerClasses = computed(() => [
  'inline-flex items-center justify-center font-medium transition-all cursor-pointer select-none',
  props.icon ? '' : sizes[props.size],
  roundedMap[props.rounded],
  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  'disabled:pointer-events-none disabled:opacity-50',
  variantClasses.value,
  props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
])

const menuClasses = computed(() => [
  'fixed z-50 bg-white text-gray-700',
  'border border-gray-200 shadow-lg',
  'animate-in fade-in-0 zoom-in-95',
  roundedMap[props.rounded],
  props.dense ? 'p-1' : 'p-2',
  'overflow-auto'
])

const itemClasses = computed(() => [
  'relative flex cursor-pointer select-none items-center',
  'rounded-sm px-2 outline-none transition-colors',
  'hover:bg-color-1 hover:ui-text-secondary',
  'focus:bg-color-2 focus:ui-text-secondary',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  props.dense ? 'py-1 text-sm' : 'py-2 text-sm'
])

// Watch modelValue
watch(() => props.modelValue, (val) => {
  isOpen.value = val
  if (val) {
    nextTick(() => updatePosition())
  }
})

// Toggle menu
const toggle = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  emit('update:modelValue', isOpen.value)
  
  if (isOpen.value) {
    emit('opened')
    nextTick(() => updatePosition())
  } else {
    emit('closed')
  }
}

// Open menu
const open = () => {
  if (props.disabled || isOpen.value) return
  isOpen.value = true
  emit('update:modelValue', true)
  emit('opened')
  nextTick(() => updatePosition())
}

// Close menu
const close = () => {
  if (!isOpen.value) return
  isOpen.value = false
  emit('update:modelValue', false)
  emit('closed')
}

// Select item
const selectItem = (item) => {
  emit('select', item)
  if (props.closeOnContentClick) {
    close()
  }
}

// Update menu position
const updatePosition = () => {
  if (!triggerRef.value || !menuRef.value) return

  const trigger = triggerRef.value.getBoundingClientRect()
  const menu = menuRef.value.getBoundingClientRect()
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  let top = trigger.bottom + props.offsetY
  let left = trigger.left + props.offsetX

  // Check if menu would overflow viewport
  const wouldOverflowBottom = top + menu.height > viewport.height
  const wouldOverflowRight = left + menu.width > viewport.width

  // Open upwards if would overflow bottom
  if (wouldOverflowBottom) {
    top = trigger.top - menu.height - props.offsetY
  }

  // Align based on prop
  if (props.align === 'right') {
    left = trigger.right - menu.width + props.offsetX
  } else if (props.align === 'center') {
    left = trigger.left + (trigger.width / 2) - (menu.width / 2) + props.offsetX
  }

  // Adjust if would overflow right
  if (wouldOverflowRight) {
    left = viewport.width - menu.width - 8
  }

  // Adjust if would overflow left
  if (left < 8) {
    left = 8
  }

  const width = props.width === 'auto' 
    ? `${Math.max(trigger.width, parseInt(props.minWidth))}px`
    : typeof props.width === 'number'
    ? `${props.width}px`
    : props.width

  menuStyle.value = {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`,
    width: width,
    minWidth: `${props.minWidth}px`,
    maxHeight: `${props.maxHeight}px`,
    zIndex: 50 + props.elevation
  }
}

// Click outside handler
const handleClickOutside = (e) => {
  if (
    triggerRef.value && !triggerRef.value.contains(e.target) &&
    menuRef.value && !menuRef.value.contains(e.target)
  ) {
    close()
  }
}

// Hover handlers
const handleMouseEnter = () => {
  if (props.openOnHover) {
    open()
  }
}

const handleMouseLeave = () => {
  if (props.openOnHover) {
    close()
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', updatePosition, true)
  window.addEventListener('resize', updatePosition)
  
  if (props.openOnHover && triggerRef.value) {
    triggerRef.value.addEventListener('mouseenter', handleMouseEnter)
    triggerRef.value.addEventListener('mouseleave', handleMouseLeave)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', updatePosition, true)
  window.removeEventListener('resize', updatePosition)
  
  if (props.openOnHover && triggerRef.value) {
    triggerRef.value.removeEventListener('mouseenter', handleMouseEnter)
    triggerRef.value.removeEventListener('mouseleave', handleMouseLeave)
  }
})

// Expose methods
defineExpose({ open, close, toggle })
</script>

<style scoped>
.animate-in {
  animation-duration: 150ms;
  animation-fill-mode: both;
}

.fade-in-0 {
  animation-name: fadeIn;
}

.zoom-in-95 {
  animation-name: zoomIn;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes zoomIn {
  from { transform: scale(0.95); }
  to { transform: scale(1); }
}
</style>