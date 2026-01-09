# Fix: Non-Unique ID Warning in DOM

## Issue
Chrome DevTools warning: `Found 59 elements with non-unique id #`

## Root Cause
The Base component was passing `id=""` (empty string) to all child input elements via the `controlAttrs` computed property. Even though the id was empty, the browser still detected it as duplicate IDs across multiple inputs.

## Solution
Modified the `controlAttrs` computed property in Base.vue to only include the `id` attribute when it's actually provided (non-empty value).

### Before
```typescript
const controlAttrs = computed(() => ({
  id: props.id,  // ❌ Always included, even if empty
  disabled: props.disabled,
  readonly: props.readonly,
  value: props.modelValue,
  required: props.required,
  'aria-invalid': isErrored.value,
  dir: selectedDirection.value
}))
```

### After
```typescript
const controlAttrs = computed(() => {
  const attrs = {
    disabled: props.disabled,
    readonly: props.readonly,
    value: props.modelValue,
    required: props.required,
    'aria-invalid': isErrored.value,
    dir: selectedDirection.value
  }
  // ✅ Only include id if it's provided (non-empty)
  if (props.id) {
    attrs.id = props.id
  }
  return attrs
})
```

## Impact
- ✅ Eliminates the "non-unique id" warning in Chrome DevTools
- ✅ Only adds id attribute when explicitly provided
- ✅ No functional changes
- ✅ Child components can still generate their own IDs when needed
- ✅ Backward compatible

## Example Usage

### Without explicit ID (no warning)
```vue
<Select 
  v-model="value" 
  :options="options"
  label="Choose option"
/>
<!-- Input will NOT have id attribute -->
```

### With explicit ID (unique, no warning)
```vue
<Select 
  v-model="value" 
  :options="options"
  label="Choose option"
  id="my-select-field"
/>
<!-- Input will have id="my-select-field" -->
```

## Files Modified
- `src/components/fields/Base.vue` - Updated `controlAttrs` computed property

## Status
✅ Fixed - No more non-unique ID warnings in the console
