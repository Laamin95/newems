<template>
  <div 
    ref="containerRef"
    :class="['relative', containerClass, width]"
  >
    <Base
        v-bind="baseProps"
        :model-value="modelValue"
        :label="label"
        :hint="hint"
        :persistent-hint="!!hint"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :error="!!error || errorMessages.length > 0"
        :error-messages="errorMessages"
        :clearable="clearable && !loading"
        :size="size"
        :id="inputId"
        :prepend="prepend"
        :append="append"
        :is-open="isFocused"
        @click:clear="clear"
        :bg="bg"
        :border="border"
        :text-color="textColor"
        :rounded="rounded"
        :dir="computedDir" 
        :lang="computedLang"
        :width="width"
        :rules="rules"
    >
      <template #control="{ attrs, events }">
        <div class="flex items-center w-full gap-0">
          <!-- Prefix text -->
          <span v-if="prefix" class="text-sm ui-text-secondary whitespace-nowrap px-2">{{ prefix }}</span>
          <!-- Input -->
          <input
            ref="inputRef"
            v-bind="attrs"
            v-on="events"
            type="text"
            :value="modelValue"
            :placeholder="isFocused && !modelValue ? placeholder : ''"
            :class="inputClasses"
            @input="handleInput"
            @keydown.enter="handleEnter"
            @focus="handleFocus"
            @blur="handleBlur"
          />
          <!-- Suffix text -->
          <span v-if="suffix" class="text-sm ui-text-secondary whitespace-nowrap px-2">{{ suffix }}</span>
        </div>
      </template>

      <!-- Loading spinner in append slot -->
      <template v-if="loading" #append>
        <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </template>
    </Base>
  </div>
</template>

<script setup>
import { ref, computed, inject, onBeforeUnmount } from 'vue'
import Base from '@/components/fields/Base.vue'
import { roundedMap, sizes, iconSizes } from '@/lib/componentConfig'

const props = defineProps({
    modelValue: { type: [String, Number], default: '' },
    label: { type: [String, Object], default: '' },
    placeholder: { type: String, default: 'text ...' },
    hint: { type: String, default: '' },
    error: { type: String, default: '' },
    errorMessages: { type: Array, default: () => [] },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true },
    loading: { type: Boolean, default: false },
    prepend: { type: String, default: '' },
    append: { type: String, default: '' },
    prefix: { type: String, default: '' },
    suffix: { type: String, default: '' },
    rules: { type: Array, default: () => [] },  // ADD THIS
    
    // Search behavior
    // debounce: { type: Number, default: 300 },
    
    // Appearance
    size: { type: String },
    rounded: { type: String },
    border: { type: String},
    textColor: { type: String },
    bg: { type: String },
    containerClass: { type: String, default: '' },
    id: { type: String, default: '' },
    width: { type: String, default: 'w-full' },
    
    // RTL/Lang support
    dir: { type: String, default: '' },
    lang: { type: String, default: '' },

    // Props that might be passed but not used (to avoid warnings)
    items: { type: Array, default: () => [] },
    itemText: { type: String, default: 'text' },
    itemValue: { type: String, default: 'value' },
})

// Inject dir from parent Card (if exists)
const cardDir = inject('parentDir', '')
const cardLang = inject('parentLang', '')

// Use component's dir if provided, otherwise use card's dir
const computedDir = computed(() => props.dir || cardDir)
const computedLang = computed(() => props.lang || cardLang)

// Filter props to only pass Base-compatible props to Base component
const baseProps = computed(() => {
    const basePropsKeys = ['label', 'hint', 'persistentHint', 'disabled', 'readonly', 'required', 'error', 'errorMessages', 'clearable', 'size', 'id', 'prepend', 'append', 'isOpen', 'bg', 'border', 'textColor', 'rounded', 'dir', 'lang', 'width', 'rules', 'errorMessage', 'messages', 'hideDetails', 'height', 'margin', 'hover', 'focus', 'bgColorVariant', 'borderColorVariant', 'textColorVariant', 'labelTextSize', 'iconType', 'labelTextColor']
    const result = {}
    basePropsKeys.forEach(key => {
        if (key in props) result[key] = props[key]
    })
    return result
})

const emit = defineEmits([
  'update:modelValue', 
  'input', 
  'change', 
  'focus', 
  'blur',
  'clear',
  // 'search',
  'enter'
])

const inputRef = ref(null)
const containerRef = ref(null)
const isFocused = ref(false)
// let debounceTimeout = null

// Generate unique ID
const inputId = computed(() => props.id || `input-${Math.random().toString(36).substr(2, 9)}`)

// Input classes
const inputClasses = computed(() => [
  'w-full bg-transparent outline-none border-none',
  'placeholder:text-gray-400',
  'focus:outline-none'
])

// Handlers
const handleInput = (e) => {
  const value = e.target.value
  
  // Update immediately for label animation
  emit('update:modelValue', value)
  
  // clearTimeout(debounceTimeout)
  // debounceTimeout = setTimeout(() => {
  //   emit('input', value)
  //   emit('search', value)
  // }, props.debounce)
}

const handleFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event) => {
  isFocused.value = false
  emit('blur', event)
}

const handleEnter = (event) => {
  emit('enter', props.modelValue)
  // emit('search', props.modelValue)
}

const clear = () => {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}

// Focus method
const focus = () => {
  inputRef.value?.focus()
}

// Lifecycle
// onBeforeUnmount(() => {
//   clearTimeout(debounceTimeout)
// })

// Expose methods
defineExpose({ focus, clear })
</script>

<style scoped>
/* Remove default search input styling */
/* input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  display: none;
} */
</style>