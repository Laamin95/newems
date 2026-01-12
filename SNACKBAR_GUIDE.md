# Snackbar Component Usage Guide

## Two Ways to Use Snackbar

### 1. Function API (Recommended - Vuetify Style)

The function API allows you to show snackbars from anywhere in your component without needing to manage state.

#### Setup
First, make sure `SnackbarContainer` is added to your App.vue (already done):

```vue
<template>
  <SnackbarContainer />
  <!-- rest of your app -->
</template>
```

#### Usage Examples

```vue
<script setup>
import { useSnackbar } from '@/lib/useSnackbar'

const { show, success, error, warning, info } = useSnackbar()

// Simple success message
const handleSave = () => {
  success('Your changes have been saved!')
}

// Error with custom options
const handleError = () => {
  error('Something went wrong', {
    timeout: 7000,
    action: 'Retry',
    onAction: () => {
      // Handle retry
    }
  })
}

// Custom message with icon and action
const handleUndo = () => {
  show({
    message: 'Item deleted',
    title: 'Undo?',
    action: 'Undo',
    variant: 'warning',
    icon: 'warning',
    timeout: 8000,
    showProgress: true,
    position: 'bottom',
    onAction: () => {
      console.log('Undo clicked!')
    }
  })
}
</script>

<template>
  <button @click="handleSave">Save</button>
  <button @click="handleError">Show Error</button>
  <button @click="handleUndo">Delete Item</button>
</template>
```

### 2. Component API (v-model)

Use the component directly with v-model for more control.

```vue
<script setup>
import { ref } from 'vue'
import Snackbar from '@/components/defaults/Snackbar.vue'

const showSnackbar = ref(false)

const handleAction = () => {
  console.log('Action clicked!')
  showSnackbar.value = false
}
</script>

<template>
  <button @click="showSnackbar = true">Show Snackbar</button>
  
  <Snackbar
    v-model="showSnackbar"
    title="Success!"
    message="Your action was completed successfully."
    variant="success"
    icon="success"
    action="Close"
    :timeout="5000"
    closeable
    @action="handleAction"
  />
</template>
```

## API Reference

### useSnackbar() Methods

```javascript
const { show, success, error, warning, info } = useSnackbar()

// Generic show method
show(options)

// Convenience methods
success(message, options)  // variant: 'success', icon: 'success'
error(message, options)    // variant: 'error', icon: 'error'
warning(message, options)  // variant: 'warning', icon: 'warning'
info(message, options)     // variant: 'info', icon: 'info'
```

### Options Object

```javascript
{
  // Content
  message: 'Notification message',    // String, required
  title: 'Title',                     // String, optional
  action: 'Undo',                     // String for action button
  
  // Styling
  variant: 'success',                 // 'default' | 'info' | 'success' | 'warning' | 'error'
  icon: 'success',                    // 'info' | 'success' | 'warning' | 'error'
  
  // Behavior
  timeout: 5000,                      // ms, 0 = no auto-dismiss
  position: 'bottom',                 // 'top' | 'bottom'
  closeable: true,                    // Show close button
  showProgress: false,                // Show progress bar
  
  // Callback
  onAction: () => {}                  // Called when action button clicked
}
```

## Variants & Icons

### Variants
- **default**: Dark background (slate-900)
- **info**: Light blue background
- **success**: Light green background
- **warning**: Light amber background
- **error**: Light red background

### Icons
- **info**: Info circle icon
- **success**: Checkmark icon
- **warning**: Warning triangle icon
- **error**: Error X icon

## Examples

### Basic Success
```javascript
success('Your file has been uploaded')
```

### Error with Retry
```javascript
error('Upload failed', {
  action: 'Retry',
  timeout: 10000,
  onAction: () => retryUpload()
})
```

### Undo Action
```javascript
show({
  message: 'Email deleted',
  action: 'Undo',
  timeout: 10000,
  showProgress: true,
  onAction: () => undoDelete()
})
```

### Top Position with Long Timeout
```javascript
info('Your session is about to expire', {
  position: 'top',
  timeout: 15000,
  showProgress: true
})
```

### Multi-line Message
```javascript
warning(
  'This is a longer message that can span multiple lines. It provides more detailed information about what happened.',
  { timeout: 8000 }
)
```

## Styling

The snackbar uses shadcn-inspired styling with:
- Clean, minimal design
- Backdrop blur effect
- Smooth transitions
- Color-coded variants
- Responsive layout

## Tips

1. **Auto-dismiss**: Set `timeout: 0` to prevent auto-dismiss
2. **Progress Bar**: Enable with `showProgress: true` to show remaining time
3. **Position**: Use `position: 'top'` for important alerts
4. **Multiple Snackbars**: Multiple snackbars stack nicely at the bottom
5. **Accessibility**: Icons help users quickly identify message type
