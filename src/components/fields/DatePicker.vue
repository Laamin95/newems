<template>
    <div v-on-click-outside="close" :class="['relative', width, margin]">
    <Base v-bind="baseProps"
        :model-value="formattedDate"
        @update:model-value="handleUpdate"
        @click:clear="clearSelection"
        :dir="computedDir"
        :lang="computedLang"
        :label="label"
        :prepend="prepend || 'calendar'"
        :append="append"
        :isOpen="isOpen"
        :size="size"
        :disabled="disabled"
        :readonly="false"
        :required="required"
        :bg="bg"
        :border="border"
        :text-color="textColor"
        :rounded="rounded"
        :width="width"
        :hint="hint"
        :persistent-hint="!!hint"
        :rules="rules"
        :clearable="true"
    >
    <template #control="{ attrs, events }">
        <div :class="['flex-1', 'flex', 'items-center', 'gap-2', 'justify-between', 'w-full', 'h-full']">
            <!-- Editable date input -->
            <input
                ref="inputRef"
                v-model="displayValue"
                type="text"
                :placeholder="isFocused ? placeholder : ''"
                :disabled="disabled"
                :readonly="range"
                :class="[
                    'w-full bg-transparent outline-none border-none',
                    'placeholder:text-gray-400',
                    'focus:outline-none',
                    'cursor-text'
                ]"
                @click.stop
                @input="handleInputChange"
                @focus="handleFocus"
                @blur="(e) => { handleInputBlur(); events.blur(e); }"
            />
        </div>
    </template>

    <template #prepend>
        <!-- <div @click="toggleOpen" class="cursor-pointer">
            <Icon
                name="calendar"
                type="outline"
                size="16"
                class="text-input-border"
            />
        </div> -->
    </template>
    </Base>
    
    <Transition name="fade">
    <div
        v-if="isOpen"
        :class="[
            'absolute left-0 right-0 mt-1 z-50 w-fit',
            menuClass
        ]"
        :style="menuStyle"
    >
        <VueDatePicker
            v-model="internalDate"
            inline
            :placeholder="placeholder"
            :range="range"
            :auto-apply="range ? false : autoApply"
            :multi-calendars="multiCalendars"
            :enable-time-picker="enableTimePicker"
            :format="format"
            :week-picker="weekPicker"
            :month-picker="monthPicker"
            :year-picker="yearPicker"
            :min-date="minDate"
            :max-date="maxDate"
            :disabled-dates="disabledDates"
            :multi-dates="multiDates"
            :text-input="textInput"
            @update:model-value="handleDateSelect"
        />
    </div>
    </Transition>
    </div>
</template>

<script setup>
    import { ref, computed, watch, nextTick, inject } from 'vue'
    import { roundedMap } from '@/lib/componentConfig'
    import { VueDatePicker } from '@vuepic/vue-datepicker'
    import '@vuepic/vue-datepicker/dist/main.css'
    import Base from '@/components/fields/Base.vue'
    import Icon from '@/components/icons/Icon.vue'
    import { vOnClickOutside } from '@vueuse/components'

    const emit = defineEmits(['update:modelValue', 'change', 'clear', 'open', 'close']);

    const props = defineProps({
        modelValue: {
            type: [String, Date, Number, Array],
            default: null
        },
        label: { type: [Object, String], default: '' },
        dir: { type: String, default: '' },
        placeholder: { type: String, default: '' },
        prepend: { type: String, default: '' },
        append: { type: String, default: '' },
        disabled: { type: Boolean, default: false },
        errorMessages: { type: Array, default: () => [] },
        rounded: { type: String, default: 'd' },
        size: { type: String },
        border: { type: String },
        textColor: { type: String },
        menuClass: { type: String, default: '' },
        menuStyle: { type: Object, default: () => ({}) },
        bg: { type: String },
        readonly: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
        width: { type: String, default: '' },
        hint: { type: String, default: '' },
        lang: { type: String },
        rules: { type: Array, default: () => [] },
        format: { type: String, default: 'dd/MM/yyyy' },
        range: { type: Boolean, default: false },
        autoApply: { type: Boolean, default: true },
        multiCalendars: { type: Number },
        enableTimePicker: { type: Boolean, default: true },
        weekPicker: { type: Boolean, default: false },
        monthPicker: { type: Boolean, default: false },
        yearPicker: { type: Boolean, default: false },
        minDate: { type: Date, default: null },
        maxDate: { type: Date, default: null },
        disabledDates: { default: undefined },
        multiDates: { type: Boolean, default: false },
        textInput: { type: Boolean, default: true },
        margin: { type: String, default: '' },
    });

    // Inject dir from parent Card (if exists)
    const cardDir = inject('parentDir', '')
    const cardLang = inject('parentLang', '')
    const formContext = inject('formContext', null)

    // Use component's dir if provided, otherwise use card's dir
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

    const isOpen = ref(false)
    const internalDate = ref(props.modelValue)
    const displayValue = ref('')
    const inputRef = ref(null)
    const isTyping = ref(false)
    const isFocused = ref(false)

    // Date formatter function
    const formatDate = (date, format) => {
        if (!date) return ''
        
        const d = new Date(date)
        if (isNaN(d.getTime())) return ''
        
        const year = d.getFullYear()
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        const hours = String(d.getHours()).padStart(2, '0')
        const minutes = String(d.getMinutes()).padStart(2, '0')
        const seconds = String(d.getSeconds()).padStart(2, '0')
        
        let formatted = format
            .replace('yyyy', year)
            .replace('MM', month)
            .replace('dd', day)
        
        // Add time if enableTimePicker is true
        if (props.enableTimePicker) {
            formatted += ` ${hours}:${minutes}`
        }
        
        return formatted
    }

    // Parse date from string based on format
    const parseDate = (dateString, format) => {
        if (!dateString) return null
        
        const parts = dateString.split(' ')
        const datePart = parts[0]
        const timePart = parts[1]
        
        let date = null
        
        // Parse based on separator in format
        const separator = format.includes('/') ? '/' : format.includes('-') ? '-' : '/'
        const dateParts = datePart.split(separator)
        
        if (format.startsWith('dd')) {
            // dd-MM-yyyy or dd/MM/yyyy
            if (dateParts.length >= 3) {
                date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
            }
        } else if (format.startsWith('MM')) {
            // MM/dd/yyyy
            if (dateParts.length >= 3) {
                date = new Date(dateParts[2], dateParts[0] - 1, dateParts[1])
            }
        } else if (format.startsWith('yyyy')) {
            // yyyy-MM-dd
            if (dateParts.length >= 3) {
                date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
            }
        }
        
        // Parse time if present
        if (date && timePart && props.enableTimePicker) {
            const timeParts = timePart.split(':')
            if (timeParts.length >= 2) {
                date.setHours(parseInt(timeParts[0], 10) || 0)
                date.setMinutes(parseInt(timeParts[1], 10) || 0)
                if (timeParts.length === 3) {
                    date.setSeconds(parseInt(timeParts[2], 10) || 0)
                }
            }
        }
        
        return date
    }
    // Format date for display
    const formattedDate = computed(() => {
    if (!props.modelValue) return ''

    if (props.range) {
        if (!Array.isArray(props.modelValue)) return ''
        const [start, end] = props.modelValue
        if (!start || !end) return ''
        return `${formatDate(start, props.format)} - ${formatDate(end, props.format)}`
    }

    return formatDate(props.modelValue, props.format)
    })

    // Watch for external modelValue changes
    watch(() => props.modelValue, (val) => {
        internalDate.value = val
        displayValue.value = formattedDate.value
    }, { immediate: true })

    watch(internalDate, (newVal) => {
        if (newVal && !isNaN(new Date(newVal).getTime()) && !isTyping.value) {  // Only update if not typing
            nextTick(() => {
                displayValue.value = formatDate(newVal, props.format)
            })
        }
    })

    const handleUpdate = (val) => {
        // This handles Base component updates (not used for DatePicker)
    }
    const handleInput = (e) => {
        emit('update:modelValue', e.target.value)
    }

    const handleInputChange = (e) => {
        isTyping.value = true  // Set typing flag
        displayValue.value = e.target.value
        
        // Only parse and update calendar when we have a complete date
        const separator = props.format.includes('/') ? '/' : props.format.includes('-') ? '-' : '/'
        const parts = displayValue.value.split(' ')[0].split(separator)
        
        // Wait for complete date with full year (4 digits)
        if (parts.length === 3 && parts.every(part => part.length > 0)) {
            // Find which part is the year based on format
            let yearPart
            if (props.format.startsWith('dd')) {
                yearPart = parts[2] // dd/MM/yyyy
            } else if (props.format.startsWith('MM')) {
                yearPart = parts[2] // MM/dd/yyyy
            } else if (props.format.startsWith('yyyy')) {
                yearPart = parts[0] // yyyy-MM-dd
            }
            
            // Only update if year has 4 digits
            if (yearPart && yearPart.length === 4) {
                const parsedDate = parseDate(displayValue.value, props.format)
                if (parsedDate && !isNaN(parsedDate.getTime())) {
                    // Create new Date to force reactivity
                    internalDate.value = new Date(parsedDate.getTime())
                }
            }
        }
    }

    const handleFocus = () => {
        isFocused.value = true
        // Open picker when focusing on input
        if (!isOpen.value) {
            isOpen.value = true
            emit('open')
        }
    }

    const handleInputBlur = () => {
        isFocused.value = false
        isTyping.value = false  // Reset typing flag on blur
        
        if (!displayValue.value) {
            clearSelection()
            return
        }
        
        const parsedDate = parseDate(displayValue.value, props.format)
        if (parsedDate && !isNaN(parsedDate.getTime())) {
            // JavaScript Date auto-corrects invalid dates (e.g., month 13 becomes month 1 of next year)
            // Update displayValue to show the corrected date
            displayValue.value = formatDate(parsedDate, props.format)
            emit('update:modelValue', parsedDate)
            emit('change', parsedDate)
            internalDate.value = parsedDate
        } else {
            // Invalid date, reset to previous value
            displayValue.value = formattedDate.value
        }
    }

const handleDateSelect = (date) => {
  internalDate.value = date
  emit('update:modelValue', date)
  emit('change', date)

  if (props.range) {
    if (Array.isArray(date) && date[0] && date[1]) {
      displayValue.value =
        `${formatDate(date[0], props.format)} - ${formatDate(date[1], props.format)}`
      isOpen.value = false
    }
  } else {
    displayValue.value = formatDate(date, props.format)
    isOpen.value = false
  }
}

    const toggleOpen = () => {
        if (!props.disabled) {
            isOpen.value = !isOpen.value

            if (isOpen.value) {
                emit('open')
            } else {
                emit('close')
            }
        }
    }

    const close = () => {
        isOpen.value = false
        emit('close')
    }

    const clearSelection = () => {
        internalDate.value = null
        displayValue.value = ''
        isTyping.value = false
        emit('update:modelValue', null)
        emit('change', null)
        emit('clear')
    }

    // Expose methods
    defineExpose({
        close,
        open: () => toggleOpen(),
        clear: clearSelection,
    })
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
