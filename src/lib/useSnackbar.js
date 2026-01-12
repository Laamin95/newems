import { ref, h } from 'vue'
import Snackbar from '@/components/defaults/Snackbar.vue'

// Store for managing snackbar instances
const snackbars = ref([])
let instanceId = 0

/**
 * Composable for using snackbar with function API (Vuetify style)
 * Usage: const { showSnackbar } = useSnackbar()
 */
export function useSnackbar() {
  /**
   * Show a snackbar notification
   * @param {Object|String} options - Options object or message string
   * @returns {Object} - Object with close() method
   */
  const show = (options) => {
    // Handle string message shorthand
    if (typeof options === 'string') {
      options = { message: options }
    }

    const id = ++instanceId
    const isVisible = ref(true)

    const snackbar = {
      id,
      isVisible,
      options: {
        variant: 'default',
        position: 'bottom',
        timeout: 5000,
        closeable: true,
        showProgress: false,
        ...options
      },
      close: () => {
        isVisible.value = false
        // Remove from array after animation
        setTimeout(() => {
          snackbars.value = snackbars.value.filter(s => s.id !== id)
        }, 300)
      }
    }

    snackbars.value.push(snackbar)
    return snackbar
  }

  // Convenience methods matching Vuetify
  const success = (message, options = {}) => {
    return show({
      message,
      variant: 'success',
      icon: 'success',
      timeout: 5000,
      ...options
    })
  }

  const error = (message, options = {}) => {
    return show({
      message,
      variant: 'error',
      icon: 'error',
      timeout: 5000,
      ...options
    })
  }

  const warning = (message, options = {}) => {
    return show({
      message,
      variant: 'warning',
      icon: 'warning',
      timeout: 5000,
      ...options
    })
  }

  const info = (message, options = {}) => {
    return show({
      message,
      variant: 'info',
      icon: 'info',
      timeout: 5000,
      ...options
    })
  }

  return {
    show,
    success,
    error,
    warning,
    info,
    snackbars
  }
}

/**
 * Get all current snackbar instances
 */
export function getSnackbars() {
  return snackbars.value
}

/**
 * Clear all snackbars
 */
export function clearAllSnackbars() {
  snackbars.value.forEach(sb => sb.close())
}
