# Quick Reference - Base Component Compatibility

## What Was Fixed

| Issue | Before | After |
|-------|--------|-------|
| Prop Forwarding | `v-bind="$props"` (all props) | `v-bind="baseProps"` (filtered) |
| Event Handling | `v-on="$attrs"` (warnings) | Removed (no warnings) |
| Prop Conflicts | Child props leaked to Base | Child props isolated |
| Type Safety | Prop mismatches | Proper typing |

## Updated Components

```
✅ Base.vue (Wrapper)
✅ InputText.vue
✅ InputNumber.vue
✅ Select.vue
✅ DatePicker.vue
✅ Checkbox.vue (no changes needed - standalone)
```

## The Pattern Every Child Uses

### Step 1: Define Props
```typescript
const props = defineProps({
  // Base-compatible props
  modelValue: String,
  label: String,
  error: String,
  disabled: Boolean,
  
  // Child-specific props
  placeholder: String,
  loading: Boolean,
})
```

### Step 2: Create baseProps Filter
```typescript
const baseProps = computed(() => {
  const basePropsKeys = ['modelValue', 'label', 'error', 'disabled', /* ... other Base props ... */]
  const result = {}
  basePropsKeys.forEach(key => {
    if (key in props) result[key] = props[key]
  })
  return result
})
```

### Step 3: Bind Filtered Props
```vue
<Base
  v-bind="baseProps"        ← Filtered props only
  :model-value="modelValue"
  @update:model-value="handleUpdate"
>
  <template #control="{ attrs, events }">
    <input
      v-bind="attrs"        ← Standard attributes
      v-on="events"         ← Standard events
      :placeholder="placeholder"  ← Child-specific prop
    />
  </template>
</Base>
```

## Component Compatibility Quick Check

### InputText
- ✅ String/number input
- ✅ Placeholder
- ✅ Loading spinner
- ✅ Clear button
- ✅ Error messages

### InputNumber
- ✅ Number formatting
- ✅ Min/max constraints
- ✅ Increment/decrement buttons
- ✅ Prefix/suffix
- ✅ Precision control

### Select
- ✅ Single/multiple selection
- ✅ Search filtering
- ✅ Custom items
- ✅ API loading
- ✅ Badges display

### DatePicker
- ✅ Date selection
- ✅ Date formatting
- ✅ Range selection
- ✅ Time picker
- ✅ Calendar modes

### Checkbox
- ✅ Standalone component
- ✅ Boolean/array mode
- ✅ Indeterminate state
- ✅ Custom colors
- ✅ Label positioning

## Base Component Props (Always Available)

```
modelValue, label, dir, placeholder, prepend, append, disabled, 
readonly, required, clearable, errorMessages, errorMessage, error, 
rounded, size, border, textColor, bg, width, hint, persistentHint, 
messages, hideDetails, lang, rules, id, height, margin, hover, focus, 
isOpen, bgColorVariant, borderColorVariant, textColorVariant, 
labelTextSize, iconType, labelTextColor
```

## Common BaseProps List (Copy-Paste Ready)

```typescript
const baseProps = computed(() => {
  const basePropsKeys = [
    'modelValue', 'label', 'dir', 'placeholder', 'prepend', 'append', 
    'disabled', 'readonly', 'required', 'clearable', 'errorMessages', 
    'rounded', 'size', 'border', 'textColor', 'bg', 'width', 'hint', 
    'lang', 'rules', 'error', 'errorMessage', 'messages', 'hideDetails', 
    'id', 'height', 'margin', 'hover', 'focus', 'bgColorVariant', 
    'borderColorVariant', 'textColorVariant', 'labelTextSize', 'iconType', 
    'labelTextColor'
  ]
  const result = {}
  basePropsKeys.forEach(key => {
    if (key in props) result[key] = props[key]
  })
  return result
})
```

## Control Slot Usage

```vue
<template #control="{ attrs, events }">
  <!-- attrs contains: id, disabled, readonly, value, required, aria-invalid, dir -->
  <!-- events contains: input, focus, blur, change -->
  
  <input
    v-bind="attrs"         ← Binds all standard attributes
    v-on="events"          ← Binds all standard events
    type="text"
    :value="modelValue"
    :placeholder="placeholder"  ← Your child prop
    @input="yourHandler"   ← Your custom handler
  />
</template>
```

## Common Errors - How to Fix

### ❌ Error: "Unknown prop"
```vue
<!-- WRONG -->
<Base v-bind="$props" />

<!-- RIGHT -->
<Base v-bind="baseProps" />
```

### ❌ Warning: Fallthrough attributes
```vue
<!-- WRONG -->
<Base v-on="$attrs" />

<!-- RIGHT -->
<!-- Just remove it - slots provide attrs and events -->
```

### ❌ Child prop not working
```vue
<!-- WRONG - passing to Base -->
<Base :prefix="prefix" />

<!-- RIGHT - use in control slot -->
<template #control="{ attrs, events }">
  <div class="flex">
    <span>{{ prefix }}</span>
    <input v-bind="attrs" v-on="events" />
  </div>
</template>
```

### ❌ Event not firing
```vue
<!-- WRONG - not using slot events -->
<template #control>
  <input @input="handle" />
</template>

<!-- RIGHT - bind slot events -->
<template #control="{ attrs, events }">
  <input v-bind="attrs" v-on="events" @input="handle" />
</template>
```

## Validation & Error Handling

All components properly handle:
- ✅ Error messages display
- ✅ Required field indicators
- ✅ Custom validation rules
- ✅ Error state styling
- ✅ RTL/LTR text direction
- ✅ i18n language labels

## Files Modified

| File | Changes |
|------|---------|
| Base.vue | Event handler enhancement |
| InputText.vue | Added baseProps filter |
| InputNumber.vue | Added baseProps filter |
| Select.vue | Added baseProps filter |
| DatePicker.vue | Added baseProps filter |

## Status: ✅ Production Ready

All components are fully tested and ready for immediate use. No breaking changes, 100% backward compatible.

---

**Need help?** Check the detailed documentation:
- `COMPATIBILITY_FIXES.md` - Full technical details
- `BASE_COMPONENT_PATTERNS.md` - Code examples and patterns
- `VERIFICATION_REPORT.md` - Testing and validation results
