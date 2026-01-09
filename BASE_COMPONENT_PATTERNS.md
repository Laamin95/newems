# Base Component Usage Examples

## Overview
These examples demonstrate the proper way child components now integrate with the Base component after the compatibility improvements.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   Child Component (e.g., InputText)         │
│                                                             │
│  Props: [modelValue, label, placeholder, size, error,      │
│          loading, clearable, prepend, append, ...]         │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ baseProps (filtered) → [label, size, error, ...]     │ │
│  │ childProps (local) → [placeholder, loading, ...]     │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                    Base Component                           │
│  Props: [label, size, error, placeholder, disabled, ...]  │
│  Provides: #control slot with attrs & events             │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                   Control Slot Content                      │
│  (e.g., <input>, <select>, or custom control)             │
└─────────────────────────────────────────────────────────────┘
```

## Pattern Implementation

### 1. InputText Pattern

**Template:**
```vue
<template>
  <Base
    v-bind="baseProps"           <!-- Filtered props only -->
    :model-value="modelValue"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    @update:model-value="(val) => emit('update:modelValue', val)"
    @click:clear="clear"
  >
    <!-- Using attrs and events from slot -->
    <template #control="{ attrs, events }">
      <input
        v-bind="attrs"           <!-- Bind id, disabled, required, dir, aria-invalid -->
        v-on="events"            <!-- Bind input, focus, blur, change -->
        type="text"
        :value="modelValue"
        :placeholder="placeholder"  <!-- Child-specific prop -->
        @input="handleInput"
      />
    </template>

    <!-- Child-specific slot for loading spinner -->
    <template v-if="loading" #append>
      <Spinner />
    </template>
  </Base>
</template>

<script setup>
import { computed } from 'vue'
import Base from '@/components/fields/Base.vue'

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,      <!-- Child-specific -->
  loading: Boolean,         <!-- Child-specific -->
  error: String,
  disabled: Boolean,
  // ... Base and child props mixed
})

// Filter to only pass Base-compatible props
const baseProps = computed(() => {
  const basePropsKeys = ['label', 'error', 'disabled', 'required', 'hint', 'rules', /* ... */]
  const result = {}
  basePropsKeys.forEach(key => {
    if (key in props) result[key] = props[key]
  })
  return result
})
</script>
```

### 2. InputNumber Pattern

**Key Differences:**
- Handles number-specific formatting
- Manages increment/decrement buttons
- Supports prefix/suffix display
- Handles precision and ranges

```vue
<template>
  <Base
    v-bind="baseProps"
    :model-value="displayValue"    <!-- Formatted display value -->
    @update:model-value="handleInput"
    @click:clear="clearValue"
  >
    <!-- Number-specific prepend (left button) -->
    <template #prepend v-if="showControls && controlsPosition === 'sides'">
      <button @click="decrement">-</button>
    </template>

    <!-- Number-specific control content -->
    <template #control="{ attrs, events }">
      <div class="flex items-center">
        <span v-if="prefix">{{ prefix }}</span>
        <input
          v-bind="attrs"
          :value="displayValue"
          type="text"
          @input="handleInput($event.target.value)"
          @focus="(e) => { handleFocus(e); events.focus?.(e); }"
          @blur="(e) => { handleBlur(e); events.blur?.(e); }"
        />
        <span v-if="suffix">{{ suffix }}</span>
      </div>
    </template>

    <!-- Number-specific append (right button) -->
    <template #append v-if="showControls && controlsPosition === 'sides'">
      <button @click="increment">+</button>
    </template>
  </Base>
</template>

<script setup>
import { computed } from 'vue'
import Base from '@/components/fields/Base.vue'

const props = defineProps({
  modelValue: Number,
  label: String,
  // Child-specific props:
  min: { type: Number, default: -Infinity },
  max: { type: Number, default: Infinity },
  step: { type: Number, default: 1 },
  prefix: String,        <!-- Number-specific -->
  suffix: String,        <!-- Number-specific -->
  // ... Base props ...
})

const baseProps = computed(() => {
  const basePropsKeys = ['label', 'error', 'disabled', 'required', 'hint', 'rules', /* ... */]
  const result = {}
  basePropsKeys.forEach(key => {
    if (key in props) result[key] = props[key]
  })
  return result
})

// Number-specific computed properties and methods
const displayValue = computed(() => {
  // Format the number for display
  // Apply precision, thousand separator, etc.
})

const handleInput = (value) => {
  // Validate number range
  // Emit update:modelValue
}
</script>
```

### 3. Select Pattern

**Key Differences:**
- Manages dropdown state
- Handles item filtering and searching
- Renders items list
- Supports single and multiple selection

```vue
<template>
  <div class="relative group">
    <Base
      v-bind="baseProps"
      :model-value="modelValue"
      @update:model-value="handleUpdate"
      :isOpen="isOpen"
      @click="toggleOpen"
    >
      <!-- Select-specific control content -->
      <template #control="{ attrs, events }">
        <input
          v-model="searchQuery"
          :id="attrs.id"
          :disabled="attrs.disabled"
          type="text"
          :placeholder="isFocused ? placeholder : ''"
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown.enter="handleEnter"
        />
        <!-- Display selected label -->
        <div v-if="selectedLabel && !multiple">{{ selectedLabel }}</div>
        <!-- Display badges for multiple selection -->
        <div v-if="multiple" class="flex gap-2">
          <div v-for="val in selectedValues" :key="val" class="badge">
            {{ getDisplayText(val) }}
          </div>
        </div>
      </template>

      <!-- Select-specific append (chevron) -->
      <template #append>
        <Icon name="chevron-down" :class="{ 'rotate-180': isOpen }" />
      </template>
    </Base>

    <!-- Select-specific items dropdown -->
    <Transition name="fade">
      <div v-if="isOpen" class="absolute z-50 mt-1 w-full shadow-lg">
        <ul class="max-h-60 overflow-auto">
          <li
            v-for="item in filteredItems"
            :key="getItemValue(item)"
            @click="handleSelect(item)"
            :class="{ 'bg-selected': isSelected(getItemValue(item)) }"
          >
            <span>{{ getItemTitle(item) }}</span>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Base from '@/components/fields/Base.vue'

const props = defineProps({
  modelValue: [String, Number, Array],
  label: String,
  // Child-specific props:
  items: { type: Array, default: () => [] },
  itemText: { type: String, default: 'text' },
  itemValue: { type: String, default: 'value' },
  multiple: { type: Boolean, default: false },
  searchable: { type: Boolean, default: false },
  // ... Base props ...
})

const baseProps = computed(() => {
  const basePropsKeys = ['label', 'error', 'disabled', 'required', 'hint', 'rules', /* ... */]
  const result = {}
  basePropsKeys.forEach(key => {
    if (key in props) result[key] = props[key]
  })
  return result
})

// Select-specific state and methods
const isOpen = ref(false)
const searchQuery = ref('')

const filteredItems = computed(() => {
  if (!props.searchable) return props.items
  return props.items.filter(item =>
    getItemTitle(item).toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const handleSelect = (item) => {
  emit('update:modelValue', getItemValue(item))
  isOpen.value = false
}
</script>
```

### 4. DatePicker Pattern

**Key Differences:**
- Manages date picker calendar UI
- Handles date parsing and formatting
- Supports range selection
- Provides inline date picker

```vue
<template>
  <div class="relative">
    <Base
      v-bind="baseProps"
      :model-value="formattedDate"
      @update:model-value="handleUpdate"
      :isOpen="isOpen"
    >
      <!-- DatePicker-specific input -->
      <template #control="{ attrs, events }">
        <input
          v-model="displayValue"
          type="text"
          :placeholder="isFocused ? placeholder : ''"
          :readonly="range"
          @input="handleInputChange"
          @focus="handleFocus"
          @blur="handleInputBlur"
        />
      </template>

      <!-- DatePicker-specific prepend (calendar icon) -->
      <template #prepend>
        <!-- Handled automatically by base prepend="calendar" -->
      </template>
    </Base>

    <!-- DatePicker-specific inline calendar picker -->
    <Transition name="fade">
      <div v-if="isOpen" class="absolute mt-1 z-50">
        <VueDatePicker
          v-model="internalDate"
          inline
          :format="format"
          :range="range"
          :enable-time-picker="enableTimePicker"
          @update:model-value="handleDateSelect"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Base from '@/components/fields/Base.vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'

const props = defineProps({
  modelValue: [String, Date, Number, Array],
  label: String,
  // Child-specific props:
  format: { type: String, default: 'dd/MM/yyyy' },
  range: { type: Boolean, default: false },
  enableTimePicker: { type: Boolean, default: true },
  minDate: { type: Date, default: null },
  maxDate: { type: Date, default: null },
  // ... Base props ...
})

const baseProps = computed(() => {
  const basePropsKeys = ['label', 'error', 'disabled', 'required', 'hint', 'rules', /* ... */]
  const result = {}
  basePropsKeys.forEach(key => {
    if (key in props) result[key] = props[key]
  })
  return result
})

// DatePicker-specific state and methods
const isOpen = ref(false)
const internalDate = ref(props.modelValue)
const displayValue = ref('')

const formattedDate = computed(() => {
  if (!props.modelValue) return ''
  return formatDate(props.modelValue, props.format)
})

const handleDateSelect = (date) => {
  emit('update:modelValue', date)
  if (!props.range) isOpen.value = false
}

const formatDate = (date, format) => {
  // Format date according to format string
}

const parseDate = (dateString, format) => {
  // Parse date from string according to format
}
</script>
```

## Key Principles

### 1. **Prop Filtering**
```typescript
// ✅ Correct
const baseProps = computed(() => {
  const keys = ['label', 'error', 'disabled', 'required', 'hint', 'rules']
  const result = {}
  keys.forEach(key => {
    if (key in props) result[key] = props[key]
  })
  return result
})
```

### 2. **Explicit Props**
```vue
<!-- ✅ Correct - explicit props -->
<Base
  v-bind="baseProps"
  :model-value="modelValue"
  :disabled="disabled"
  :required="required"
/>

<!-- ❌ Wrong - uses v-bind="$props" -->
<Base
  v-bind="$props"
  :model-value="modelValue"
/>
```

### 3. **Slot Attributes and Events**
```vue
<!-- ✅ Correct - use provided attrs and events -->
<template #control="{ attrs, events }">
  <input
    v-bind="attrs"      <!-- Provides id, disabled, required, dir, aria-invalid -->
    v-on="events"       <!-- Provides input, focus, blur, change -->
    :value="modelValue"
    @input="handleInput"
  />
</template>

<!-- ❌ Wrong - not using slot context -->
<template #control>
  <input
    :value="modelValue"
    @input="handleInput"
  />
</template>
```

### 4. **Child-Specific Props**
```vue
<!-- ✅ Correct - isolated in child component -->
<template #control="{ attrs, events }">
  <div class="flex">
    <span v-if="prefix">{{ prefix }}</span>  <!-- Child-specific -->
    <input v-bind="attrs" v-on="events" />
    <span v-if="suffix">{{ suffix }}</span>  <!-- Child-specific -->
  </div>
</template>

<!-- ❌ Wrong - passing to Base -->
<Base
  :prefix="prefix"     <!-- Base doesn't know about this -->
  :suffix="suffix"     <!-- Base doesn't know about this -->
/>
```

## Testing These Components

### InputText Test
```vue
<InputText
  v-model="text"
  label="Full Name"
  placeholder="Enter your name"
  :error="validation.text"
  :loading="isLoading"
  :rules="[required, minLength(3)]"
/>
```

### InputNumber Test
```vue
<InputNumber
  v-model="quantity"
  label="Quantity"
  :min="1"
  :max="100"
  prefix="$"
  suffix="USD"
  show-controls
/>
```

### Select Test
```vue
<Select
  v-model="selected"
  label="Choose an option"
  :items="options"
  searchable
  multiple
/>
```

### DatePicker Test
```vue
<DatePicker
  v-model="date"
  label="Select date"
  format="dd/MM/yyyy"
  enable-time-picker
  :min-date="new Date()"
/>
```

---

All components follow this pattern and are compatible with the Base component!
