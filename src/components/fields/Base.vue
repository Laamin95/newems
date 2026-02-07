<template>
  <div :dir="selectedDirection !== '' ? selectedDirection : ''" :class="[faruma, margin, width, 'group/select overflow-visible ']">
    <div
      :class="[
        `relative border focus:outline-none transition cursor-pointer flex items-center justify-between gap-2 `,
        width,
        props.height || heights[size],
        sizes[size],
        isErrored ? 'border-red-500' : ` ${border}`,
        disabled ? 'bg-color-2 cursor-not-allowed' : `${bg} ${hover} ${focus}`,
        isOpen && !isErrored ? 'border-color-4' : '',
        !isOpen && !isErrored ? 'border-color-2' : '',
        rounded ? roundedMap[rounded] : '',
        textColor
      ]"
    >
      <div v-if="label" :class="labelClasses" aria-hidden="true">
        {{ selectedlabels ? selectedlabels.label : label }}
      </div>
      <!-- main -->
      <div class="flex items-center w-full gap-2">
        <div v-if="$slots.prepend || prepend" class="">
          <slot name="prepend">
            <Icon :size="iconSizes[size]" :name="prepend" :type="iconType == 'outline' ? 'outline' : 'solid'" />
          </slot>
        </div>
        <div class="flex-1 w-full">
          <slot name="control" :attrs="controlAttrs" :events="controlEvents" />
        </div>
      </div>
      <!-- Icons -->
      <div class="flex items-center gap-2">
        <button
          v-if="clearable && hasValue && !disabled"
          class="hover:text-input-focus-border text-input-text flex items-center invisible group-hover/select:visible transition-all cursor-pointer"
          title="Clear selection"
          type="button"
          @click.stop="clearSelection"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
        <div v-if="$slots.append || append" class="">
          <slot name="append">
            <Icon :size="iconSizes[size]" :name="append" :type="iconType == 'outline' ? 'outline' : 'solid'" />
          </slot>
        </div>
      </div>
    </div>
    <div v-if="messagesToShow.length" :class="['mt-1 text-xs', selectLanguage === 'dv' ? 'text-right' : 'text-left', 'ui-text-secondary']">
      <div v-for="(msg, i) in messagesToShow" :key="i" :class="isErrored ? 'text-red-500' : ''">
        {{ useLanguageSelected(msg, selectLanguage, '') }}
        <!-- {{ msg }} -->
      </div>
    </div>
  </div>
</template>
<script setup>
  import { computed, inject, ref, watch, onMounted, nextTick, onBeforeUnmount, getCurrentInstance, useSlots } from 'vue'
  import { useLanguageSelected, roundedMap, sizes, iconSizes, heights } from '../../lib/componentConfig'
  // import Icon from '@/components/icons/Icon.vue'
  import { vOnClickOutside } from '@vueuse/components'
  const { language } = inject('i18n')
  const slots = useSlots() 

  const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'change', 'click:prepend', 'click:append', 'click:clear'])

  const props = defineProps({
    modelValue: [String, Number, Boolean, Object, Array, null],
    label: { type: [Object, String], default: '' },
    items: { type: Array, default: () => [] },
    itemText: { type: String, default: 'text' },
    itemValue: { type: String, default: 'value' },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true },
    dir: { type: String, default: '' },
    lang: { type: String, default: '' },
    error: { type: Boolean, default: false },
    errorMessage: { type: [String, Array], default: '' },
    errorMessages: { type: Array, default: () => [] },
    rules: { type: Array, default: () => [] },
    messages: { type: [String, Array], default: '' },
    hint: { type: String, default: '' },
    persistentHint: { type: Boolean, default: false },
    hideDetails: { type: Boolean, default: false },
    isOpen: { type: Boolean, default: false },
    prepend: { type: String, default: '' },
    append: { type: String, default: '' },
    size: { type: String, default: 'md' }, // xs | sm | md | lg | xl
    id: { type: String, default: '' },
    width: { type: String, default: 'w-full' },
    border: { type: String, default: 'border-color-2' },
    textColor: { type: String, default: 'ui-text-secondary ' },
    margin: { type: String, default: '' },
    bg: { type: String, default: 'bg-color-1' },
    hover: { type: String, default: 'hover:border-color-3' },
    focus: { type: String, default: 'focus:border-color-4' },
    rounded: { type: String, default: 'd' },
    multiple: { type: Boolean, default: false },
    searchable: { type: Boolean, default: false },
    bgColorVariant: { type: String, default: '' },
    borderColorVariant: { type: String, default: '' },
    textColorVariant: { type: String, default: '' },
    labelTextSize: { type: String, default: 'text-base' },
    iconType: { type: String, default: 'outline' },
    labelTextColor: { type: String, default: 'ui-text-secondary' },
    height: { type: String, default: '' },
    focused: { type: Boolean, default: undefined } // External focus control
  })

  // Form integration
  const formContext = inject('formContext', null)
  const instance = getCurrentInstance()
  const uid = instance?.uid

  const focused = ref(false)
  const dirty = ref(false)
  const internalErrorMessages = ref([])
  const hasBlurred = ref(false)

  // Computed to handle both internal and external focus state
  const isFocused = computed(() => {
    // Use prop if provided, otherwise use internal state
    return props.focused !== undefined ? props.focused : focused.value
  })

  /**
   * MAIN LOGIC
   */
  const isErrored = computed(() => {
    if (props.error === true) return true
    if (props.errorMessages && Array.isArray(props.errorMessages) && props.errorMessages.length > 0) return true
    if (props.errorMessage && props.errorMessage !== '') {
      if (Array.isArray(props.errorMessage)) {
        return props.errorMessage.length > 0
      }
      if (typeof props.errorMessage === 'string') {
        return props.errorMessage.trim() !== ''
      }
    }
    // Only show internal errors after field has been blurred
    if (hasBlurred.value && internalErrorMessages.value && internalErrorMessages.value.length > 0) return true
    return false
  })

  // FIXED: Better hasValue logic to handle empty arrays and empty strings
  const hasValue = computed(() => {
    if (props.modelValue === null || props.modelValue === undefined) return false
    if (props.modelValue === '') return false
    if (Array.isArray(props.modelValue)) return props.modelValue.length > 0
    if (typeof props.modelValue === 'boolean') return true // booleans are always considered having value
    return true
  })

  const validationMessages = computed(() => {
    const messages = []
    if (props.errorMessages && Array.isArray(props.errorMessages) && props.errorMessages.length > 0) {
      messages.push(...props.errorMessages)
    }
    if (props.errorMessage) {
      if (Array.isArray(props.errorMessage) && props.errorMessage.length > 0) {
        messages.push(...props.errorMessage)
      } else if (typeof props.errorMessage === 'string' && props.errorMessage.trim() !== '') {
        messages.push(props.errorMessage)
      }
    }
    // CHANGED: Only include internal errors after field has been blurred
    if (hasBlurred.value && internalErrorMessages.value && internalErrorMessages.value.length > 0) {
      messages.push(...internalErrorMessages.value)
    }
    return messages
  })

  function validate() {
    internalErrorMessages.value = []
    if (!props.rules || props.rules.length === 0) return true

    for (const rule of props.rules) {
      const res = rule(props.modelValue)
      if (res !== true) {
        internalErrorMessages.value.push(res)
      }
    }

    return internalErrorMessages.value.length === 0
  }

  const selectedDirection = computed(() => {
    let selected = ''
    if (props.dir == 'rtl') selected = 'rtl'
    else if (props.lang == 'dv') selected = 'rtl'
    else if (props.dir == 'ltr') selected = 'ltr'
    else if (props.lang == 'en') selected = 'ltr'
    else selected = ''
    return selected
  })

  const selectLanguage = computed(() => {
    let Selected = ''
    if (props.lang != '') {
      Selected = props.lang
    } else if (props.dir == 'rtl') {
      Selected = 'dv'
    } else if (props.dir == 'ltr') {
      Selected = 'en'
    } else {
      Selected = language.value
    }
    return Selected === 'dv' ? 'dv' : 'en'
  })

  const faruma = computed(() => {
    if (selectLanguage.value == 'dv') return 'faruma'
    return ''
  })

  const selectedlabels = computed(() => {
    // console.log('selectLanguage in Base:', useLanguageSelected(props.label, selectLanguage.value, ''))
    let selected = useLanguageSelected(props.label, selectLanguage.value, '')
    // console.log('selected in Base:', selected)
    if (typeof selected === 'object' && selected !== null && 'label' in selected) {
      return selected
    }
    return null
  })

  function clear() {
    emit('update:modelValue', '')
    dirty.value = true
    validate()
    emit('click:clear')
  }

  /**
   * CONTROL BINDING
   * These attributes and events are passed to the #control slot
   * to be used by child components like InputText, Select, etc.
   */
  const controlAttrs = computed(() => {
    const attrs = {
      disabled: props.disabled,
      readonly: props.readonly,
      value: props.modelValue,
      required: props.required,
      'aria-invalid': isErrored.value,
      dir: selectedDirection.value
    }
    // Only include id if it's provided (non-empty)
    if (props.id) {
      attrs.id = props.id
    }
    return attrs
  })

  const controlEvents = {
    input: e => onInput(e.target ? e.target.value : e),
    focus: onFocus,
    blur: onBlur,
    change: e => emit('change', e.target ? e.target.value : e)
  }

  // FIXED: Label positioning logic - use isFocused instead of focused
  const labelY = computed(() => {
    // Label should be at top if focused, has value, or is open
    if (isFocused.value || hasValue.value || props.isOpen) {
      return '-top-[1px]'
    } else {
      return 'top-[48%]'
    }
  })

  const LabelX = computed(() => {
    let positionX = ''
    let fontSize = ''

    if (props.size === 'xs') {
      fontSize = 'text-xs'
      positionX = props.prepend || slots.prepend ? 'inset-4' : 'inset-3'
    } else if (props.size === 'sm') {
      fontSize = 'text-sm'
      positionX = props.prepend || slots.prepend ? 'inset-8' : 'inset-3'
    } else if (props.size === 'md') {
      fontSize = 'text-md'
      positionX = props.prepend || slots.prepend ? 'inset-10' : 'inset-3'
    } else if (props.size === 'lg') {
      fontSize = 'text-lg'
      positionX = props.prepend || slots.prepend ? 'inset-12' : 'inset-3'
    } else if (props.size === 'xl') {
      fontSize = 'text-lg'
      positionX = props.prepend || slots.prepend ? 'inset-14' : 'inset-3'
    } else {
      fontSize = 'text-sm'
      positionX = props.prepend || slots.prepend ? 'inset-8' : 'inset-3'
    }

    // When label is floating (focused, has value, or is open) - use isFocused
    if (isFocused.value || hasValue.value || props.isOpen) {
      if (selectLanguage.value === 'dv') {
        positionX = 'right-8'
      } else {
        positionX = 'left-8'
      }
      fontSize = 'text-xs'
    }

    return positionX + ' ' + fontSize
  })

  const labelClasses = computed(() => {
    const classes = ['absolute flex px-2 items-center transition-all pointer-events-none h-[1px]', LabelX.value, labelY.value]

    // Add background only when label is floating - use isFocused
    if (isFocused.value || hasValue.value || props.isOpen) {
      classes.push('bg-inherit')
    } else {
      classes.push('bg-transparent')
    }

    // Color based on error state - use isFocused
    if (isErrored.value) {
      classes.push('text-error')
    } else if (isFocused.value) {
      classes.push('border-input-focus-border')
    } else {
      classes.push('text-input-text')
    }

    return classes
  })

  const messagesToShow = computed(() => {
    if (props.hideDetails) return []
    if (isErrored.value) return validationMessages.value
    if (props.messages) {
      if (Array.isArray(props.messages)) {
        return props.messages.filter(msg => msg && msg.trim && msg.trim() !== '')
      }
      if (typeof props.messages === 'string' && props.messages.trim() !== '') {
        return [props.messages]
      }
    }
    // Use isFocused for hint visibility
    if (props.hint && props.hint.trim() !== '' && (props.persistentHint || isFocused.value)) {
      return [props.hint]
    }
    return []
  })

  function onFocus(e) {
    focused.value = true
    emit('focus', e)
  }

  function onBlur(e) {
    focused.value = false
    hasBlurred.value = true

    // console.log('onBlur called, hasBlurred:', hasBlurred.value)

    if (formContext?.validateOn?.value) {
      const validateOn = formContext.validateOn.value
      const shouldValidate = validateOn === 'blur' || (Array.isArray(validateOn) && validateOn.includes('blur'))

      if (shouldValidate) {
        const isValid = validate()
        if (formContext.validate) {
          formContext.validate(uid, isValid, internalErrorMessages.value)
        }
      }
    } else {
      const isValid = validate()
    }

    emit('blur', e)
  }

  function onInput(val) {
    emit('update:modelValue', val)
  }

  function reset() {
    const newValue = props.multiple ? [] : ''
    emit('update:modelValue', newValue)
    internalErrorMessages.value = []
    dirty.value = false
    hasBlurred.value = false // ADD THIS LINE
  }

  function resetValidation() {
    internalErrorMessages.value = []
    dirty.value = false
    hasBlurred.value = false // ADD THIS LINE
  }

  // FIXED: Clear selection function
  const clearSelection = () => {
    const newValue = props.multiple ? [] : ''
    emit('update:modelValue', newValue)
    emit('change', newValue)
    emit('click:clear')
  }
  const registration = {
    validate,
    reset,
    resetValidation
  }

  // Register with form on mount
  onMounted(() => {
    if (formContext) {
      formContext.register(uid, {
        validate: () => {
          const isValid = validate()
          const errors = isValid ? [] : internalErrorMessages.value
          if (formContext.validate) {
            formContext.validate(uid, isValid, errors)
          }
          return isValid
        },
        reset: () => {
          emit('update:modelValue', props.multiple ? [] : '')
          resetValidation()
        },
        resetValidation: () => {
          internalErrorMessages.value = []
          dirty.value = false
        }
      })
    }
  })

  watch(
    () => props.isOpen,
    (newVal, oldVal) => {
      if (oldVal === true && newVal === false && formContext) {
        // Dropdown closed, act as blur
        hasBlurred.value = true
        const isValid = validate()
        if (formContext.validate) {
          formContext.validate(uid, isValid, internalErrorMessages.value)
        }
      }
    }
  )

  // Unregister on unmount
  onBeforeUnmount(() => {
    if (formContext) {
      formContext.unregister(uid)
    }
  })
</script>
