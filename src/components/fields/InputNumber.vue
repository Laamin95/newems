<template>
    <Base
        v-bind="baseProps"
        :model-value="displayValue"
        @update:model-value="handleInput"
        @click:clear="clearValue"
        :dir="computedDir"
        :lang="computedLang"
        :readonly="readonly"
        :disabled="disabled"
        :clearable="clearable"
        :focused="isFocused"
    >
        <template #prepend v-if="showControls && controlsPosition === 'sides'">
            <button
                type="button"
                :disabled="disabled || isAtMin"
                :class="[
                    'flex items-center justify-center transition-colors',
                    'hover:bg-color-3 rounded-l',
                    sizeClasses.button,
                    disabled || isAtMin ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                ]"
                @click="decrement"
                @mousedown="startHold('decrement')"
                @mouseup="stopHold"
                @mouseleave="stopHold"
                @touchstart.prevent="startHold('decrement')"
                @touchend="stopHold"
            >
                <Icon name="minus" :size="sizeClasses.icon" />
            </button>
        </template>

        <template #append v-if="showControls && controlsPosition === 'sides'">
            <button
                type="button"
                :disabled="disabled || isAtMax"
                :class="[
                    'flex items-center justify-center transition-colors',
                    'hover:bg-color-3 rounded-r',
                    sizeClasses.button,
                    disabled || isAtMax ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                ]"
                @click="increment"
                @mousedown="startHold('increment')"
                @mouseup="stopHold"
                @mouseleave="stopHold"
                @touchstart.prevent="startHold('increment')"
                @touchend="stopHold"
            >
                <Icon name="plus" :size="sizeClasses.icon" />
            </button>
        </template>

        <template #control="{ attrs, events }">
            <div class="flex items-center w-full h-full">
                <!-- Vertical controls (stacked) on left -->
                <div 
                    v-if="showControls && controlsPosition === 'stacked-left'"
                    class="flex flex-col border-r border-color-3 h-full"
                >
                    <button
                        type="button"
                        :disabled="disabled || isAtMax"
                        :class="[
                            'flex-1 flex items-center justify-center transition-colors',
                            'hover:bg-color-3 border-b border-color-3',
                            sizeClasses.stackedButton,
                            disabled || isAtMax ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                        ]"
                        @click="increment"
                        @mousedown="startHold('increment')"
                        @mouseup="stopHold"
                        @mouseleave="stopHold"
                    >
                        <Icon name="chevron-up" :size="sizeClasses.stackedIcon" />
                    </button>
                    <button
                        type="button"
                        :disabled="disabled || isAtMin"
                        :class="[
                            'flex-1 flex items-center justify-center transition-colors',
                            'hover:bg-color-3',
                            sizeClasses.stackedButton,
                            disabled || isAtMin ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                        ]"
                        @click="decrement"
                        @mousedown="startHold('decrement')"
                        @mouseup="stopHold"
                        @mouseleave="stopHold"
                    >
                        <Icon name="chevron-down" :size="sizeClasses.stackedIcon" />
                    </button>
                </div>

                <!-- Prefix -->
                <span v-if="prefix" class="ui-text-secondary select-none" :class="sizeClasses.affix">
                    {{ prefix }}
                </span>

                <!-- Input -->
                <input
                    ref="inputRef"
                    :value="displayValue"
                    type="text"
                    inputmode="decimal"
                    :placeholder="computedPlaceholder"
                    :disabled="disabled"
                    :readonly="readonly"
                    :class="[
                        'flex-1 w-full bg-transparent outline-none border-none',
                        'placeholder:text-gray-400',
                        textAlign,
                        disabled ? 'cursor-not-allowed' : '',
                        readonly ? 'cursor-default' : ''
                    ]"
                    @input="handleInput($event.target.value)"
                    @blur="(e) => { handleBlur(e); events.blur?.(e); }"
                    @focus="(e) => { handleFocus(e); events.focus?.(e); }"
                    @keydown="handleKeydown"
                    @wheel="handleWheel"
                />

                <!-- Suffix -->
                <span v-if="suffix" class="ui-text-secondary select-none" :class="sizeClasses.affix">
                    {{ suffix }}
                </span>

                <!-- Vertical controls (stacked) on right -->
                <div 
                    v-if="showControls && controlsPosition === 'stacked-right'"
                    class="flex flex-col border-l border-color-3 h-full"
                >
                    <button
                        type="button"
                        :disabled="disabled || isAtMax"
                        :class="[
                            'flex-1 flex items-center justify-center transition-colors',
                            'hover:bg-color-3 border-b border-color-3',
                            sizeClasses.stackedButton,
                            disabled || isAtMax ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                        ]"
                        @click="increment"
                        @mousedown="startHold('increment')"
                        @mouseup="stopHold"
                        @mouseleave="stopHold"
                    >
                        <Icon name="chevron-up" :size="sizeClasses.stackedIcon" />
                    </button>
                    <button
                        type="button"
                        :disabled="disabled || isAtMin"
                        :class="[
                            'flex-1 flex items-center justify-center transition-colors',
                            'hover:bg-color-3',
                            sizeClasses.stackedButton,
                            disabled || isAtMin ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                        ]"
                        @click="decrement"
                        @mousedown="startHold('decrement')"
                        @mouseup="stopHold"
                        @mouseleave="stopHold"
                    >
                        <Icon name="chevron-down" :size="sizeClasses.stackedIcon" />
                    </button>
                </div>
            </div>
        </template>
    </Base>
</template>

<script setup>
import { ref, computed, watch, inject } from 'vue'
import Base from '@/components/fields/Base.vue'
import Icon from '@/components/icons/Icon.vue'

const emit = defineEmits(['update:modelValue', 'change', 'blur', 'focus'])

const props = defineProps({
    modelValue: {
        type: [Number, String, null],
        default: null
    },
    label: { type: [Object, String], default: '' },
    dir: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    prepend: { type: String, default: '' },
    append: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    errorMessages: { type: Array, default: () => [] },
    rounded: { type: String, default: 'd' },
    size: { type: String, default: 'md' },
    border: { type: String },
    textColor: { type: String },
    bg: { type: String },
    width: { type: String, default: '' },
    hint: { type: String, default: '' },
    lang: { type: String },
    rules: { type: Array, default: () => [] },
    
    // Number-specific props
    min: { type: Number, default: -Infinity },
    max: { type: Number, default: Infinity },
    step: { type: Number, default: 1 },
    precision: { type: Number, default: undefined },
    showControls: { type: Boolean, default: true },
    controlsPosition: { 
        type: String, 
        default: 'sides', // 'sides', 'stacked-left', 'stacked-right'
        validator: (v) => ['sides', 'stacked-left', 'stacked-right'].includes(v)
    },
    prefix: { type: String, default: '' },
    suffix: { type: String, default: '' },
    thousandSeparator: { type: [Boolean, String], default: false },
    decimalSeparator: { type: String, default: '.' },
    allowNegative: { type: Boolean, default: true },
    align: { 
        type: String, 
        default: 'left',
        validator: (v) => ['left', 'center', 'right'].includes(v)
    },
    mouseWheel: { type: Boolean, default: false },
})

// Inject direction from parent
const cardDir = inject('parentDir', '')
const cardLang = inject('parentLang', '')

const computedDir = computed(() => props.dir || cardDir)
const computedLang = computed(() => props.lang || cardLang)

// Filter props to only pass Base-compatible props to Base component
const baseProps = computed(() => {
    const basePropsKeys = ['modelValue', 'label', 'dir', 'placeholder', 'prepend', 'append', 'disabled', 'readonly', 'required', 'clearable', 'errorMessages', 'rounded', 'size', 'border', 'textColor', 'bg', 'width', 'hint', 'lang', 'rules', 'error', 'errorMessage', 'messages', 'hideDetails', 'id', 'height', 'margin', 'hover', 'focus', 'bgColorVariant', 'borderColorVariant', 'textColorVariant', 'labelTextSize', 'iconType', 'labelTextColor']
    const result = {}
    basePropsKeys.forEach(key => {
        if (key in props) result[key] = props[key]
    })
    return result
})

const inputRef = ref(null)
const isFocused = ref(false)
const holdInterval = ref(null)
const holdTimeout = ref(null)

// Computed values
const internalValue = computed(() => {
    if (props.modelValue === null || props.modelValue === '' || props.modelValue === undefined) {
        return null
    }
    const num = parseFloat(props.modelValue)
    return isNaN(num) ? null : num
})

const isAtMin = computed(() => internalValue.value !== null && internalValue.value <= props.min)
const isAtMax = computed(() => internalValue.value !== null && internalValue.value >= props.max)

const textAlign = computed(() => {
    const alignMap = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
    }
    return alignMap[props.align] || 'text-left'
})

const sizeClasses = computed(() => {
    const sizes = {
        xs: { button: 'w-6 h-6', icon: '12', stackedButton: 'px-1.5', stackedIcon: '10', affix: 'text-xs px-1' },
        sm: { button: 'w-7 h-7', icon: '14', stackedButton: 'px-2', stackedIcon: '12', affix: 'text-sm px-1.5' },
        md: { button: 'w-8 h-8', icon: '16', stackedButton: 'px-2.5', stackedIcon: '14', affix: 'text-sm px-2' },
        lg: { button: 'w-9 h-9', icon: '18', stackedButton: 'px-3', stackedIcon: '16', affix: 'text-base px-2' },
        xl: { button: 'w-10 h-10', icon: '20', stackedButton: 'px-3.5', stackedIcon: '18', affix: 'text-lg px-2.5' },
    }
    return sizes[props.size] || sizes.md
})

// Format number for display
const displayValue = computed(() => {
    if (internalValue.value === null) return ''
    
    let value = internalValue.value
    
    // Apply precision
    if (props.precision !== undefined) {
        value = value.toFixed(props.precision)
    } else {
        value = String(value)
    }
    
    // Apply thousand separator
    if (props.thousandSeparator) {
        const separator = props.thousandSeparator === true ? ',' : props.thousandSeparator
        const parts = value.split('.')
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
        value = parts.join(props.decimalSeparator)
    } else if (props.decimalSeparator !== '.') {
        value = value.replace('.', props.decimalSeparator)
    }
    
    return value
})

// Compute placeholder visibility
// Hide placeholder if label exists and (input is focused or has a value)
const computedPlaceholder = computed(() => {
    if (props.label && (!isFocused.value || displayValue.value)) {
        return ''
    }
    return props.placeholder
})

// Parse input string to number
const parseInput = (value) => {
    if (value === '' || value === null || value === undefined) return null
    
    let str = String(value)
    
    // Remove thousand separators
    if (props.thousandSeparator) {
        const separator = props.thousandSeparator === true ? ',' : props.thousandSeparator
        str = str.split(separator).join('')
    }
    
    // Replace decimal separator
    if (props.decimalSeparator !== '.') {
        str = str.replace(props.decimalSeparator, '.')
    }
    
    // Parse number
    const num = parseFloat(str)
    return isNaN(num) ? null : num
}

// Clamp value within min/max bounds
const clampValue = (value) => {
    if (value === null) return null
    return Math.min(Math.max(value, props.min), props.max)
}

// Round to step
const roundToStep = (value) => {
    if (value === null) return null
    const steps = Math.round((value - props.min) / props.step)
    return props.min + steps * props.step
}

// Apply precision
const applyPrecision = (value) => {
    if (value === null || props.precision === undefined) return value
    return parseFloat(value.toFixed(props.precision))
}

// Handle input changes
const handleInput = (value) => {
    // Allow typing in progress (negative sign, decimal point, etc.)
    if (value === '-' || value === props.decimalSeparator || value === '-' + props.decimalSeparator) {
        return
    }
    
    const parsed = parseInput(value)
    
    // Don't emit during typing, wait for blur
    if (isFocused.value) {
        return
    }
    
    updateValue(parsed)
}

// Handle blur - finalize value
const handleBlur = (e) => {
    isFocused.value = false
    
    const value = e.target.value
    let parsed = parseInput(value)
    
    if (parsed !== null) {
        parsed = clampValue(parsed)
        parsed = applyPrecision(parsed)
    }
    
    emit('update:modelValue', parsed)
    emit('blur', e)
    emit('change', parsed)
}

const handleFocus = (e) => {
    isFocused.value = true
    emit('focus', e)
}

// Handle keyboard navigation
const handleKeydown = (e) => {
    if (props.disabled || props.readonly) return
    
    if (e.key === 'ArrowUp') {
        e.preventDefault()
        increment()
    } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        decrement()
    } else if (e.key === 'Enter') {
        handleBlur(e)
    }
    
    // Block non-numeric characters
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End']
    const isNumber = /^[0-9]$/.test(e.key)
    const isDecimal = e.key === props.decimalSeparator || e.key === '.'
    const isMinus = e.key === '-' && props.allowNegative
    const isCtrlCmd = e.ctrlKey || e.metaKey
    
    if (!allowedKeys.includes(e.key) && !isNumber && !isDecimal && !isMinus && !isCtrlCmd) {
        e.preventDefault()
    }
}

// Handle mouse wheel
const handleWheel = (e) => {
    if (!props.mouseWheel || props.disabled || props.readonly || !isFocused.value) return
    
    e.preventDefault()
    
    if (e.deltaY < 0) {
        increment()
    } else {
        decrement()
    }
}

// Update value and emit
const updateValue = (value) => {
    if (value !== null) {
        value = clampValue(value)
        value = applyPrecision(value)
    }
    
    emit('update:modelValue', value)
    emit('change', value)
}

// Increment value
const increment = () => {
    if (props.disabled || props.readonly || isAtMax.value) return
    
    let newValue = (internalValue.value ?? 0) + props.step
    newValue = clampValue(newValue)
    newValue = applyPrecision(newValue)
    
    emit('update:modelValue', newValue)
    emit('change', newValue)
}

// Decrement value
const decrement = () => {
    if (props.disabled || props.readonly || isAtMin.value) return
    
    let newValue = (internalValue.value ?? 0) - props.step
    newValue = clampValue(newValue)
    newValue = applyPrecision(newValue)
    
    emit('update:modelValue', newValue)
    emit('change', newValue)
}

// Hold to repeat increment/decrement
const startHold = (action) => {
    if (props.disabled || props.readonly) return
    
    // Initial delay before repeating
    holdTimeout.value = setTimeout(() => {
        holdInterval.value = setInterval(() => {
            if (action === 'increment') {
                increment()
            } else {
                decrement()
            }
        }, 75)
    }, 400)
}

const stopHold = () => {
    if (holdTimeout.value) {
        clearTimeout(holdTimeout.value)
        holdTimeout.value = null
    }
    if (holdInterval.value) {
        clearInterval(holdInterval.value)
        holdInterval.value = null
    }
}

// Clear value
const clearValue = () => {
    emit('update:modelValue', null)
    emit('change', null)
}

// Expose methods
defineExpose({
    focus: () => inputRef.value?.focus(),
    blur: () => inputRef.value?.blur(),
    select: () => inputRef.value?.select(),
    increment,
    decrement,
})
</script>