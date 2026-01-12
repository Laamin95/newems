<template>
  <button :class="buttonClasses" :disabled="disabled || loading" @click="handleClick">
    <!-- Loader -->
    <span v-if="loading" class="loader mr-2" />

    <!-- Prepend Icon -->
    <span v-if="($slots.prepend || prependIcon) && !loading" class="mr-2">
      <slot name="prepend">
        <Icon v-if="prependIcon" :name="prependIcon" type="outline" :size="iconSizes[props.size]" color="text-current" />
      </slot>
    </span>

    <!-- Label -->
    <span v-if="!loading">
      <slot>
        <Icon v-if="icon" :name="icon" type="mini" :size="iconSizes[props.size]" color="text-current" />
        <div v-if="!icon">
          {{ displayLabel }}
        </div>
      </slot>
    </span>

    <!-- Append Icon -->
    <span v-if="($slots.append || appendIcon) && !loading" class="ml-2">
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
  </button>
</template>

<script setup>
  import { computed, inject, provide, ref } from 'vue'
   import Icon from '@/components/icons/Icon.vue'
  import { sizes, iconSizes, roundedMap, colorMap } from '@/lib/componentConfig'

  const { t, setLanguage } = inject('i18n')

  const emit = defineEmits(['click'])

    const injectedLang = inject('parentLang', '')
    const currentLang = computed(() => {
      return props.lang ? props.lang : injectedLang
    })

    // provide('parentLang', currentLang.value)
  // console.log("languge in Button.vue", injectedLang)
  // const lang = inject('lang')

  const props = defineProps({
    variant: {
      type: String,
      default: 'contained' // contained | outlined | text | tonal | plain
    },
    color: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'md' // xs | sm | md | lg | xl
    },
    rounded: {
      type: String,
      default: 'd' // none | d (default) | sm | md | lg | xl | full
    },
    block: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    prependIcon: {
      type: String,
      default: ''
    },
    appendIcon: {
      type: String,
      default: ''
    },
    padding: {
      type: Boolean,
      default: false
    },
    lang: {
      type: String,
      default: '' // Component-level language override
    }
  })

  const variantClasses = computed(() => {
    // Classes only for layout/structure, colors handled by buttonThemeStyles
    return colorMap[props.color] ? colorMap[props.color][props.variant] : colorMap['primary'][props.variant]
    // return 'transition-all'
  })

  const buttonClasses = computed(() => [
    'inline-flex items-center justify-center font-medium transition-all select-none',
    props.icon && !props.padding ? '' : sizes[props.size],
    roundedMap[props.rounded],
    variantClasses.value,
    props.block ? 'w-full' : '',
    currentLang.value === 'dv' ? 'faruma' : '',
    props.disabled || props.loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  ])

  const handleClick = event => {
    if (!props.disabled && !props.loading) emit('click', event)
  }
  // Check if label is a translation key like 'buttons.submit'
  const displayLabel = computed(() => {
    if (!props.label) {
      return t('buttons.submit', currentLang.value)
    }

    // Check if label starts with 'buttons.' and try to translate it
    if (props.label.startsWith('buttons.')) {
      const translatedValue = t(props.label, currentLang.value)
      // If translation exists and is different from the key, use it
      if (translatedValue !== props.label) {
        return translatedValue
      }
    }

    // Otherwise, use the label as-is
    return props.label
  })
</script>

<style scoped>
  /* Simple Loader */
  .loader {
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
