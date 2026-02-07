import { ref, readonly } from 'vue'

const snackbars = ref([])
let instanceId = 0

// Singleton instance
let snackbarInstance = null

export function useSnackbar() {
  // Return existing instance if already created
  if (snackbarInstance) {
    return snackbarInstance
  }

  const show = (options) => {
    const id = ++instanceId
    const isVisible = ref(true)

    const close = () => {
      isVisible.value = false
      setTimeout(() => {
        const index = snackbars.value.findIndex(s => s.id === id)
        if (index > -1) {
          snackbars.value.splice(index, 1)
        }
      }, 300)
    }

    const snackbar = {
      id,
      isVisible,
      options: {
        message: '',
        title: '',
        variant: 'default',
        icon: '',
        action: '',
        timeout: 5000,
        position: 'bottom',
        closeable: true,
        showProgress: false,
        multiline: false,
        onAction: null,
        ...options
      },
      close
    }

    snackbars.value.push(snackbar)

    // Auto close
    if (snackbar.options.timeout > 0) {
      setTimeout(() => {
        close()
      }, snackbar.options.timeout)
    }

    return snackbar
  }

  const success = (message, options = {}) => {
    return show({
      message,
      variant: 'success',
      icon: 'success',
      ...options
    })
  }

  const error = (message, options = {}) => {
    return show({
      message,
      variant: 'error',
      icon: 'error',
      ...options
    })
  }

  const warning = (message, options = {}) => {
    return show({
      message,
      variant: 'warning',
      icon: 'warning',
      ...options
    })
  }

  const info = (message, options = {}) => {
    return show({
      message,
      variant: 'info',
      icon: 'info',
      ...options
    })
  }

  // Create singleton instance
  snackbarInstance = {
    snackbars, // This must be the ref itself, not readonly
    show,
    success,
    error,
    warning,
    info
  }

  return snackbarInstance
}

// Export shortcuts for direct use
export const snackbar = {
  show: (...args) => useSnackbar().show(...args),
  success: (...args) => useSnackbar().success(...args),
  error: (...args) => useSnackbar().error(...args),
  warning: (...args) => useSnackbar().warning(...args),
  info: (...args) => useSnackbar().info(...args)
}
