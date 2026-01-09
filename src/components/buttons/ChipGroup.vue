<template>
 <div class="flex items-center ">
     <div
    :class="[
      'inline-flex ',
      gapClasses,
      justifyClasses,
      containerClass
    ]"
    role="group"
    :aria-label="ariaLabel"
  >
    <Chip
      v-for="(chip, index) in chips"
      :key="getChipKey(chip, index)"
      :label="getChipLabel(chip)"
      :variant="chip.variant || variant"
      :color="chip.color || color"
      :size="chip.size || size"
      :rounded="chip.rounded || rounded"
      :clickable="chip.clickable !== undefined ? chip.clickable : clickable"
      :closable="chip.closable !== undefined ? chip.closable : closable"
      :disabled="chip.disabled || disabled"
      :avatar="chip.avatar"
      :avatar-alt="chip.avatarAlt"
      :prepend-icon="chip.prependIcon"
      :append-icon="chip.appendIcon"
      :chip-class="chip.chipClass || chipClass"
      :text-class="chip.textClass || textClass"
      :bg-color="chip.bgColor || bgColor"
      :text-color="chip.textColor || textColor"
      :border-color="chip.borderColor || borderColor"
      @click="handleChipClick(chip, index)"
      @close="handleChipClose(chip, index)"
    >
      <template v-if="$slots.chip" #default="slotProps">
        <slot name="chip" v-bind="{ ...slotProps, chip, index }" />
      </template>
      <template v-if="$slots.prepend" #prepend="slotProps">
        <slot name="prepend" v-bind="{ ...slotProps, chip, index }" />
      </template>
      <template v-if="$slots.append" #append="slotProps">
        <slot name="append" v-bind="{ ...slotProps, chip, index }" />
      </template>
    </Chip>
  </div>
 </div>
</template>

<script setup>
import { computed } from 'vue'
import Chip from './Chip.vue'

const props = defineProps({
  // Data
  chips: {
    type: Array,
    default: () => []
  },
  
  // Default properties for all chips
  variant: {
    type: String,
    default: 'default'
  },
  color: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'default'
  },
  rounded: {
    type: String,
    default: 'full'
  },
  
  // Default behavior
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
  
  // Layout
  gap: {
    type: String,
    default: 'md'
  },
  justify: {
    type: String,
    default: 'start'
  },
  
  // Custom classes
  containerClass: {
    type: String,
    default: ''
  },
  chipClass: {
    type: String,
    default: ''
  },
  textClass: {
    type: String,
    default: ''
  },
  
  // Default color customization
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
  },
  
  // Accessibility
  ariaLabel: {
    type: String,
    default: 'Chip group'
  },
  
  // Key field for tracking chips
  itemKey: {
    type: String,
    default: 'id'
  },
  itemText: {
    type: String,
    default: 'text'
  },
  groupName: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['chip-click', 'chip-close', 'update:chips', 'update:modelValue'])

// Computed classes
const gapClasses = computed(() => {
  const gaps = {
    none: 'gap-0',
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3',
    xl: 'gap-4'
  }
  return gaps[props.gap] || gaps.md
})

const justifyClasses = computed(() => {
  const justifications = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  }
  return justifications[props.justify] || justifications.start
})

// Helper functions
const getChipKey = (chip, index) => {
  if (typeof chip === 'object' && chip[props.itemKey]) {
    return chip[props.itemKey]
  }
  if (typeof chip === 'object' && chip.id) {
    return chip.id
  }
  return index
}

const getChipLabel = (chip) => {
  if (typeof chip === 'string') {
    return chip
  }
  if (typeof chip === 'object') {
    return chip[props.itemText] || chip.text || chip.label || chip.name || ''
  }
  return String(chip)
}

// Event handlers
// const handleChipClick = (chip, index) => {
//   emit('chip-click', { groupName: props.groupName, chip, index })
// }

const handleChipClick = (chip) => {
    emit('chip-click', chip) // Emits { value: 'active', label: 'Active' }
    // OR if you want to emit just the value:
    emit('update:modelValue', chip.value)
}

const handleChipClose = (chip, index) => {
  const updatedChips = [...props.chips]
  updatedChips.splice(index, 1)
  
  emit('chip-close', { chip, index })
  emit('update:chips', updatedChips)
}
</script>

<style scoped>
/* Ensure proper wrapping */
/* .flex-wrap {
  flex-wrap: wrap;
} */
</style>