<template>
  <div v-on-click-outside="handleClickOutside" :class="['relative group', width, margin]">
    <Base
      v-bind="baseProps"
      :model-value="modelValue"
      @update:model-value="handleUpdate"
      :dir="computedDir"
      :lang="computedLang"
      :label="label"
      :prepend="prepend"
      :append="append"
      :isOpen="isOpen"
      :size="size"
      @click="toggleOpen"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :bg="bg"
      :border="border"
      :text-color="textColor"
      :rounded="rounded"
      :width="width"
      :hint="hint"
      :persistent-hint="!!hint"
      :rules="rules"
      @click:clear="clear"
    >
      <template #control="{ attrs, events }">
        <div :class="['flex', 'items-center', 'gap-2', 'justify-between', 'w-full','h-full']">

          <!-- Search input -->
          <input
            v-model="searchQuery"
            :id="attrs.id"
            :disabled="attrs.disabled"
            :required="attrs.required"
            :dir="attrs.dir"
            type="text"
            :placeholder="isFocused && !searchQuery ? placeholder : ''"
            :class="inputClasses"
            @focus="handleFocus"
            @blur="handleBlur"
            @keydown.enter="handleEnter"
          />

            <!-- Single select label -->
            <div v-if="selectedLabel && !multiple && !searchQuery" 
                :class="['absolute left-0 px-3 truncate pointer-events-none',]">
                {{ selectedLabel }}
            </div>
            <!-- Multi-select badges - Show BEFORE input -->
            <div v-if="multiple && selectedValues.length > 0" class="absolute right-8 group-hover/select:right-14 flex gap-2 items-center flex-wrap">
                <!-- Show all badges when less than 2 items -->
                <template v-if="selectedValues.length < 2">
                    <div v-for="value in selectedValues" :key="value" >
                        <div
                        :class="[
                            `px-2 py-0.5 text-xs flex items-center gap-1 border border-dashed whitespace-nowrap`,
                            textColor,
                            border,
                            rounded ? roundedMap[rounded] : ''
                        ]"
                        >
                            <div class="truncate max-w-[100px]">{{ getDisplayTextForValue(value) }}</div>
                            <Icon @click.stop="removeValue(value)" name="x-mark" type="outline" size="10" color="text-current" />
                        </div>
                    </div>
                </template>
                
                <!-- Show count when 2 or more items -->
                <template v-else>
                    <div
                        :class="[
                        `px-2 py-1 text-xs flex items-center gap-1 border border-dashed whitespace-nowrap flex-shrink-0`,
                        textColor,
                        border,
                        rounded ? roundedMap[rounded] : ''
                        ]"
                    >
                        <div class="">{{ selectedValues.length }} selected</div>
                    </div>
                </template>
            </div>
        </div>
      </template>

      <template #append>
        <Icon
          v-if="!append"
          name="chevron-down"
          type="outline"
          size="16"
          :class="['transition-transform duration-200', isOpen ? 'rotate-180' : '', 'text-input-border']"
        />
        <Icon v-else :name="append" type="outline" size="16" class="text-input-border" />
      </template>
    </Base>
    <Transition name="fade">
      <div
        v-if="isOpen"
        :class="[
          'absolute left-0 right-0 mt-1 shadow-lg z-50',
          bg ?? 'bg-white',
          border ? 'border ' + border : 'border border-color-2',
          rounded ? roundedMap[rounded] : '',
          menuClass
        ]"
        :style="menuStyle"
      >
        <ul class="max-h-60 overflow-auto py-1">
          <!-- No items found -->
          <li v-if="filteredItems.length === 0" :class="['px-4 py-2 ui-text-secondary text-center text-sm']">
            <slot name="no-data">No items found</slot>
          </li>

          <!-- Items list -->
          <li
            v-for="(item, index) in filteredItems"
            :key="getItemValue(item)"
            @mousedown="(e) => { e.preventDefault(); handleSelect(item); }"
            :class="[
              'px-4 py-2 cursor-pointer transition flex items-center text-sm',
              isSelected(getItemValue(item)) ? selectedItemClass || 'bg-color-4' : itemClass || 'hover:bg-color-3',
              itemHoverClass
            ]"
          >
            <slot name="item" :item="item" :index="index" :selected="isSelected(getItemValue(item))">
              <div class="flex items-center gap-2 w-full">
                <!-- Checkbox for multi-select -->
                 <Checkbox 
                    v-if="multiple"
                    :model-value="isSelected(getItemValue(item))"
                    :value="index"
                    :label="getItemTitle(item)"
                    :required="false"
                    :error="false"
                    @click.stop
                />
                <!-- <input v-if="multiple" type="checkbox" :checked="isSelected(getItemValue(item))" class="cursor-pointer" /> -->

                <!-- Item content -->
                <span v-if="!multiple" class="flex-1">{{ getItemTitle(item) }}</span>

                <!-- Check icon for single select -->
                <svg
                  v-if="!multiple && isSelected(getItemValue(item))"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="text-input-text"
                  class="w-4 h-4"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
            </slot>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>
<script setup>
  import { ref, computed, watch, nextTick, inject, onMounted } from 'vue'
  import { roundedMap } from '../../lib/componentConfig'
  import { Base, Checkbox } from '../../'
  // import Base from '@/components/fields/Base.vue'
  // import Icon from '@/components/icons/Icon.vue'
  import { vOnClickOutside } from '@vueuse/components'
  // import Checkbox from '@/components/fields/Checkbox.vue'


  const emit = defineEmits(['update:modelValue', 'change', 'select', 'clear', 'open', 'close', 'focus', 'blur', 'enter', 'search'])

  const searchQuery = ref('')
  const searchInputRef = ref(null)
  const localValue = ref('')
  const isFocused = ref(false)
  const loading = ref(false)
  const error = ref(null)
  const fetchedItems = ref([])
  const checkbox = ref([])

  const props = defineProps({
    modelValue: {
      type: [String, Number, Array], // Added Array back for multiple selection
      default: ''
    },
    label: { type: [Object, String], default: '' },
    dir: { type: String, default: '' },
    placeholder: { type: String, default: 'Search...' },
    prepend: { type: String, default: '' },
    append: { type: String, default: '' },
    url: { type: String, default: '' },
    items: { type: Array, default: () => [] },
    itemTitle: { type: [String], default: 'title' }, // Changed default from 'title' to 'text' to match your data
    itemValue: { type: String, default: 'value' },
    multiple: { type: Boolean, default: false },
    searchable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    errorMessages: { type: Array, default: () => [] },
    rounded: { type: String, default: 'd' },
    size: { type: String },
    border: { type: String },
    textColor: { type: String },
    menuClass: { type: String, default: '' },
    menuStyle: { type: Object, default: () => ({}) },
    itemClass: { type: String, default: '' },
    itemHoverClass: { type: String, default: '' },
    selectedItemClass: { type: String, default: '' },
    bg: { type: String },
    returnObject: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    width: { type: String, default: 'w-full' },
    margin: { type: String, default: '' },
    hint: { type: String, default: '' },
    lang: { type: String },
    rules: { type: Array, default: () => [] }, 
    eager: { type: Boolean, default: false },
    cacheItems: { type: Boolean, default: true }
  })

  // Inject dir from parent Card (if exists)
  const cardDir = inject('parentDir', '')
  const cardLang = inject('parentLang', '')
  const formContext = inject('formContext', null)
  const api = inject('api', null)

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
  const computedItems = computed(() => {
    if (props.url && fetchedItems.value.length > 0) {
      return fetchedItems.value
    }
    return props.items
  })

  const fetchItems = async () => {
    if (!props.url) return
    if (props.cacheItems && fetchedItems.value.length > 0) return

    loading.value = true
    error.value = null

    try {
      let response
      
      if (api) {
        response = await api.get(props.url)
      } else {
        const res = await fetch(props.url)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        response = { data: await res.json() }
      }

      const data = response.data

      // Auto-detect array in response
      let items = null
      
      if (Array.isArray(data)) {
        items = data
      } else if (data.data && Array.isArray(data.data)) {
        items = data.data
      } else if (data.items && Array.isArray(data.items)) {
        items = data.items
      } else if (data.results && Array.isArray(data.results)) {
        items = data.results
      } else {
        // Find first array property
        for (const key in data) {
          if (Array.isArray(data[key])) {
            items = data[key]
            break
          }
        }
      }

      if (!items) {
        throw new Error('No array found in response')
      }

      fetchedItems.value = items
      
    } catch (err) {
      console.error('Error fetching items:', err)
      error.value = err.message || 'Failed to load items'
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    if (props.eager && props.url) {
      fetchItems()
    }
  })


    const handleFocus = (event) => {
        isFocused.value = true
        emit('focus', event)
    }

    const handleBlur = (event) => {
        isFocused.value = false
        emit('blur', event)
    }

  const handleUpdate = val => {
    emit('update:modelValue', val)
  }

  const handleInput = e => {
    emit('update:modelValue', e.target.value)
  }

    const handleEnter = (event) => {
        emit('enter', props.modelValue)
        emit('search', props.modelValue)
    }

    const clear = () => {
        emit('update:modelValue', '')
        emit('clear')
        searchInputRef.value?.focus()
    }

  // Input classes
  const inputClasses = computed(() => [
    'bg-transparent outline-none border-none flex-1 min-w-0 max-w-auto',
    'placeholder:text-gray-400',
    'focus:outline-none',
    // For multiple select with badges, make input flexible to fit remaining space
    props.multiple && selectedValues.value.length > 0 ? 'flex-1 min-w-0' : 'w-full',
    !props.multiple && selectedLabel.value && !searchQuery.value ? 'text-transparent' : '',
    !props.searchable ? 'no-caret invisible cursor-pointer' : 'cursor-text',
  ])

  const selectedValues = computed(() => {
    if (props.multiple) {
      return Array.isArray(props.modelValue) ? props.modelValue : []
    }
    return props.modelValue ? [props.modelValue] : []
  })

  const selectedLabel = computed(() => {
    const selected = computedItems.value.find(item => String(getItemValue(item)) === String(props.modelValue))
    return selected ? getItemTitle(selected) : ''
  })

  const displayValue = computed(() => {
    if (props.multiple) {
      return selectedValues.value.length > 0 ? `${selectedValues.value.length} selected` : ''
    }
    return selectedLabel.value
  })

  const filteredItems = computed(() => {
    if (!searchQuery.value) {
      return computedItems.value
    }
    return computedItems.value.filter(item => {
      const title = getItemTitle(item)
      return title.toLowerCase().includes(searchQuery.value.toLowerCase())
    })
  })

  const getItemTitle = item => {
    if (!item) return ''
    if (typeof item === 'string' || typeof item === 'number') return item.toString()
    if (typeof props.itemTitle === 'function') return props.itemTitle(item)
    return item[props.itemTitle] || ''
  }

  const getItemValue = item => {
    if (!item) return ''
    if (typeof item === 'string' || typeof item === 'number') return item
    if (typeof props.itemValue === 'function') return props.itemValue(item)
    return item[props.itemValue] || item
  }

  const getDisplayTextForValue = value => {
    const item = computedItems.value.find(item => String(getItemValue(item)) === String(value))
    return item ? getItemTitle(item) : value.toString()
  }

  const isSelected = value => {
    return selectedValues.value.some(v => String(v) === String(value))
  }

  const handleSelect = item => {
    const value = props.returnObject ? item : getItemValue(item)

    if (props.multiple) {
      let newValues = [...selectedValues.value]
      const itemValue = getItemValue(item)

      const index = newValues.findIndex(v => String(v) === String(itemValue))

      if (index > -1) {
        newValues.splice(index, 1)
      } else {
        newValues.push(itemValue)
      }

      emit('update:modelValue', newValues)
    } else {
      emit('update:modelValue', value)
      emit('change', value)
      emit('select', item)
      isOpen.value = false
      searchQuery.value = ''
    }
  }

  const handleClickOutside = (event) => {
    if (!props.multiple) {
      close()
      return
    }
    close()
  }

  const removeValue = value => {
    if (props.multiple) {
      const newValues = selectedValues.value.filter(v => String(v) !== String(value))
      emit('update:modelValue', newValues)
      emit('change', newValues)
    }
  }

  const clearSelection = () => {
    const newValue = props.multiple ? [] : ''
    emit('update:modelValue', newValue)
    emit('change', newValue)
    emit('clear')
  }

  const toggleOpen = async () => {
    if (!props.disabled) {
      isOpen.value = !isOpen.value

      if (isOpen.value) {
        if (props.url && !props.eager) {
          await fetchItems()
        }

        emit('open')
        if (props.searchable) {
          nextTick(() => {
            searchInputRef.value?.focus()
          })
        }
      } else {
        emit('close')
        searchQuery.value = ''
      }
    }
  }

  const close = () => {
    isOpen.value = false
    searchQuery.value = ''

    if (formContext?.validateOn?.value) {
      const validateOn = formContext.validateOn.value
      const shouldValidate = validateOn === 'blur' || (Array.isArray(validateOn) && validateOn.includes('blur'))

      if (shouldValidate) {
        nextTick(() => {})
      }
    }

    emit('close')
  }

  watch(isOpen, newVal => {
    if (!newVal) {
      searchQuery.value = ''
    }
  })

  defineExpose({
    close,
    open: () => toggleOpen(),
    clear: clearSelection,
    refresh: fetchItems,
    focus: () => {
      if (props.searchable && isOpen.value) {
        searchInputRef.value?.focus()
      }
    }
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
  .no-caret {
    caret-color: transparent;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .animate-spin {
    animation: spin 1s linear infinite;
  }
</style>