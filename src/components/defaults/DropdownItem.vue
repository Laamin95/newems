<template>
  <div
    @click="handleClick"
    :class="itemClasses"
    role="menuitem"
    :tabindex="disabled ? -1 : 0"
  >
    <!-- Prepend Icon -->
    <span v-if="($slots.prepend || prependIcon)" class="mr-2">
      <slot name="prepend">
        <Icon v-if="prependIcon" :name="prependIcon" type="outline" :size="iconSizes[props.size]" color="text-current" />
      </slot>
    </span>

    <!-- Label/Content -->
    <span class="flex-1">
      <slot>
        {{ displayLabel }}
      </slot>
    </span>

    <!-- Append Icon -->
    <span v-if="($slots.append || appendIcon)" class="ml-2">
      <slot name="append">
        <Icon
          v-if="appendIcon"
          :name="appendIcon"
          type="outline"
          :size="iconSizes[props.size]"
          stroke="currentColor"
          color="text-current"
        />
      </slot>
    </span>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'
import { sizes, iconSizes, roundedMap, colorMap, useLanguageSelected } from '../../lib/componentConfig'
const { language } = inject('i18n')

const props = defineProps({
    disabled: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    dense: { type: Boolean, default: false },
    lang: { type: String, default: '' },
    dir: { type: String, default: '' },
    rounded: { 
        type: String,
        default: 'd' // none | d (default) | sm | md | lg | xl | full
    },
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'md' // xs | sm | md | lg | xl
    },
    prependIcon: {
      type: String,
      default: ''
    },
    appendIcon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'primary'
    },
})

const emit = defineEmits(['select'])

const itemClasses = computed(() => [
  'relative flex cursor-pointer select-none items-center gap-2',
  'outline-none transition-colors',
  roundedMap[props.rounded],
  sizes[props.size],
  props.disabled 
    ? 'pointer-events-none opacity-50'
    : 'hover:bg-color-1 hover:ui-text-secondary focus:bg-color-3 focus:ui-text-secondary',
  props.active ? 'bg-color-3 ui-text-secondary' : '',
])

const handleClick = () => {
  if (!props.disabled) {
    emit('select')
  }
}

const selectLanguage = computed(() => {
    let Selected = ''
    if (props.lang != ''){
        Selected = props.lang
    }
    else if (props.dir == 'rtl') {
        Selected = 'dv'
    }
    else if (props.dir == 'ltr') {
        Selected = 'en'
    }
    else {
        Selected = language.value
    }
    console.log('selectLanguage in Card222:', Selected)
    return (Selected === 'dv') ? 'dv' : 'en'
})
const faruma = computed(() => {
    if (selectLanguage.value == 'dv') return 'faruma'
    return ''
})
// Check if label is a translation key or plain text
const displayLabel = computed(() => {
    return useLanguageSelected(props.label, selectLanguage.value, props.label)
})

</script>