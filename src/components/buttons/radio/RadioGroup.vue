<template>
  <div :class="['relative', margin]" role="radiogroup" :aria-label="label">
    <!-- Group Label -->
    <label 
      v-if="label" 
      :class="[
        'block mb-2 font-medium ui-text-primary',
        labelSizeClasses
      ]"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-0.5">*</span>
    </label>

    <!-- Radio Items Container -->
    <div 
      :class="[
        'flex',
        inline ? 'flex-row flex-wrap gap-x-6 gap-y-2' : 'flex-col gap-2'
      ]"
    >
      <slot />
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
import { computed, provide, toRef } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Object],
    default: null
  },
  label: {
    type: String,
    default: ''
  },
  inline: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
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

const emit = defineEmits(['update:modelValue', 'change'])

// Provide context to child RadioItem components
provide('radioGroup', {
  modelValue: toRef(props, 'modelValue'),
  disabled: toRef(props, 'disabled'),
  size: toRef(props, 'size'),
  color: toRef(props, 'color'),
  select: (value) => {
    emit('update:modelValue', value)
    emit('change', value)
  }
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
</script>