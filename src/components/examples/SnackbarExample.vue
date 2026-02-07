<template>
  <div class="p-6 max-w-4xl mx-auto space-y-8">
    <h1 class="text-3xl font-bold ui-text-color mb-6">Snackbar Component</h1>

    <!-- Function API Examples -->
    <Card title="Function API (Vuetify Style)" class="space-y-4">
      <p class="text-sm text-ui-text-secondary mb-4">
        Use the snackbar API to show notifications programmatically.
      </p>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <button
          @click="showSuccess"
          class="px-4 py-2 bg-success text-white rounded-lg hover:bg-success/90 transition-all"
        >
          Success
        </button>
        <button
          @click="showError"
          class="px-4 py-2 bg-error text-white rounded-lg hover:bg-error/90 transition-all"
        >
          Error
        </button>
        <button
          @click="showWarning"
          class="px-4 py-2 bg-warning text-white rounded-lg hover:bg-warning/90 transition-all"
        >
          Warning
        </button>
        <button
          @click="showInfo"
          class="px-4 py-2 bg-info text-white rounded-lg hover:bg-info/90 transition-all"
        >
          Info
        </button>
        <button
          @click="showDefault"
          class="px-4 py-2 bg-color-4 text-ui-text-color rounded-lg hover:bg-color-3 transition-all"
        >
          Default
        </button>
        <button
          @click="showWithAction"
          class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
        >
          With Action
        </button>
        <button
          @click="showWithTitle"
          class="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all"
        >
          With Title
        </button>
        <button
          @click="showWithProgress"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
        >
          With Progress
        </button>
      </div>
    </Card>

    <!-- Positioning Examples -->
    <Card title="Positioning">
      <p class="text-sm text-ui-text-secondary mb-4">
        Control where snackbars appear on the screen.
      </p>
      <div class="grid grid-cols-2 gap-3">
        <button
          @click="showTop"
          class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
        >
          Show at Top
        </button>
        <button
          @click="showBottom"
          class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
        >
          Show at Bottom
        </button>
      </div>
    </Card>

    <!-- Timeout Examples -->
    <Card title="Auto-dismiss Timeout">
      <p class="text-sm text-ui-text-secondary mb-4">
        Set custom timeouts for automatic dismissal.
      </p>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <button
          @click="showQuick"
          class="px-4 py-2 bg-color-4 text-ui-text-color rounded-lg hover:bg-color-3 transition-all"
        >
          2s (Quick)
        </button>
        <button
          @click="showMedium"
          class="px-4 py-2 bg-color-4 text-ui-text-color rounded-lg hover:bg-color-3 transition-all"
        >
          5s (Medium)
        </button>
        <button
          @click="showLong"
          class="px-4 py-2 bg-color-4 text-ui-text-color rounded-lg hover:bg-color-3 transition-all"
        >
          10s (Long)
        </button>
        <button
          @click="showPersistent"
          class="px-4 py-2 bg-color-4 text-ui-text-color rounded-lg hover:bg-color-3 transition-all"
        >
          No Timeout
        </button>
      </div>
    </Card>

    <!-- Multi-line Example -->
    <Card title="Multi-line Messages">
      <p class="text-sm text-ui-text-secondary mb-4">
        Display longer messages with multiple lines.
      </p>
      <div class="space-y-3">
        <button
          @click="showMultiline"
          class="px-4 py-2 bg-info text-white rounded-lg hover:bg-info/90 transition-all"
        >
          Show Multi-line Snackbar
        </button>
        <button
          @click="showMultilineWithAction"
          class="px-4 py-2 bg-info text-white rounded-lg hover:bg-info/90 transition-all"
        >
          Multi-line with Action
        </button>
      </div>
    </Card>

    <!-- Advanced Examples -->
    <Card title="Advanced Examples">
      <p class="text-sm text-ui-text-secondary mb-4">
        Complex snackbar configurations.
      </p>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <button
          @click="showCustomIcon"
          class="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all"
        >
          Custom Icon
        </button>
        <button
          @click="showNotCloseable"
          class="px-4 py-2 bg-warning text-white rounded-lg hover:bg-warning/90 transition-all"
        >
          Not Closeable
        </button>
        <button
          @click="showComplex"
          class="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-all"
        >
          Complex
        </button>
      </div>
    </Card>

    <!-- Multiple Snackbars -->
    <Card title="Multiple Snackbars">
      <p class="text-sm text-ui-text-secondary mb-4">
        Show multiple snackbars at once - they will stack automatically.
      </p>
      <button
        @click="showMultiple"
        class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
      >
        Show 3 Snackbars
      </button>
    </Card>

    <!-- API Reference -->
    <Card title="API Reference">
      <div class="space-y-6">
        <!-- Methods -->
        <div>
          <h3 class="font-semibold text-sm mb-3 ui-text-color">Methods:</h3>
          <div class="space-y-2 text-sm">
            <div class="p-3 bg-color-1 rounded border border-color">
              <code class="font-mono text-primary">snackbar.show(options)</code>
              <p class="text-xs text-ui-text-secondary mt-1">Show snackbar with custom options</p>
            </div>
            <div class="p-3 bg-color-1 rounded border border-color">
              <code class="font-mono text-success">snackbar.success(message, options)</code>
              <p class="text-xs text-ui-text-secondary mt-1">Show success snackbar</p>
            </div>
            <div class="p-3 bg-color-1 rounded border border-color">
              <code class="font-mono text-error">snackbar.error(message, options)</code>
              <p class="text-xs text-ui-text-secondary mt-1">Show error snackbar</p>
            </div>
            <div class="p-3 bg-color-1 rounded border border-color">
              <code class="font-mono text-warning">snackbar.warning(message, options)</code>
              <p class="text-xs text-ui-text-secondary mt-1">Show warning snackbar</p>
            </div>
            <div class="p-3 bg-color-1 rounded border border-color">
              <code class="font-mono text-info">snackbar.info(message, options)</code>
              <p class="text-xs text-ui-text-secondary mt-1">Show info snackbar</p>
            </div>
          </div>
        </div>

        <!-- Options Table -->
        <div>
          <h3 class="font-semibold text-sm mb-3 ui-text-color">Options:</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full text-xs border border-color rounded-lg overflow-hidden">
              <thead class="bg-color-1">
                <tr>
                  <th class="text-left p-3 font-semibold ui-text-color border-b border-color">Property</th>
                  <th class="text-left p-3 font-semibold ui-text-color border-b border-color">Type</th>
                  <th class="text-left p-3 font-semibold ui-text-color border-b border-color">Default</th>
                  <th class="text-left p-3 font-semibold ui-text-color border-b border-color">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-color bg-color-2">
                <tr>
                  <td class="p-3 font-mono text-primary">message</td>
                  <td class="p-3 text-ui-text-secondary">String</td>
                  <td class="p-3 text-ui-text-secondary">''</td>
                  <td class="p-3 text-ui-text-secondary">Main message text</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">title</td>
                  <td class="p-3 text-ui-text-secondary">String</td>
                  <td class="p-3 text-ui-text-secondary">''</td>
                  <td class="p-3 text-ui-text-secondary">Optional title</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">variant</td>
                  <td class="p-3 text-ui-text-secondary">String</td>
                  <td class="p-3 text-ui-text-secondary">'default'</td>
                  <td class="p-3 text-ui-text-secondary">default | success | error | warning | info</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">icon</td>
                  <td class="p-3 text-ui-text-secondary">String</td>
                  <td class="p-3 text-ui-text-secondary">''</td>
                  <td class="p-3 text-ui-text-secondary">Icon name or class</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">action</td>
                  <td class="p-3 text-ui-text-secondary">String</td>
                  <td class="p-3 text-ui-text-secondary">''</td>
                  <td class="p-3 text-ui-text-secondary">Action button text</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">timeout</td>
                  <td class="p-3 text-ui-text-secondary">Number</td>
                  <td class="p-3 text-ui-text-secondary">5000</td>
                  <td class="p-3 text-ui-text-secondary">Auto-dismiss time (ms), 0 for no timeout</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">position</td>
                  <td class="p-3 text-ui-text-secondary">String</td>
                  <td class="p-3 text-ui-text-secondary">'bottom'</td>
                  <td class="p-3 text-ui-text-secondary">top | bottom</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">closeable</td>
                  <td class="p-3 text-ui-text-secondary">Boolean</td>
                  <td class="p-3 text-ui-text-secondary">true</td>
                  <td class="p-3 text-ui-text-secondary">Show close button</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">showProgress</td>
                  <td class="p-3 text-ui-text-secondary">Boolean</td>
                  <td class="p-3 text-ui-text-secondary">false</td>
                  <td class="p-3 text-ui-text-secondary">Show progress bar</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">multiline</td>
                  <td class="p-3 text-ui-text-secondary">Boolean</td>
                  <td class="p-3 text-ui-text-secondary">false</td>
                  <td class="p-3 text-ui-text-secondary">Allow multi-line layout</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">onAction</td>
                  <td class="p-3 text-ui-text-secondary">Function</td>
                  <td class="p-3 text-ui-text-secondary">null</td>
                  <td class="p-3 text-ui-text-secondary">Callback when action clicked</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Usage Examples -->
        <div>
          <h3 class="font-semibold text-sm mb-3 ui-text-color">Usage Examples:</h3>
          <div class="space-y-3">
            <div class="p-4 bg-color-1 rounded-lg border border-color">
              <p class="text-xs font-semibold mb-2 ui-text-color">Import and use anywhere:</p>
              <pre class="text-xs bg-color-2 p-3 rounded overflow-x-auto"><code>import { snackbar } from '@/lib/useSnackbar'

snackbar.success('File uploaded successfully!')
snackbar.error('Failed to save changes')
snackbar.warning('Storage is running low')
snackbar.info('New update available')</code></pre>
            </div>

            <div class="p-4 bg-color-1 rounded-lg border border-color">
              <p class="text-xs font-semibold mb-2 ui-text-color">Using inject in components:</p>
              <pre class="text-xs bg-color-2 p-3 rounded overflow-x-auto"><code>import { inject } from 'vue'

const { success, error } = inject('useSnackbar')

success('Operation completed!')</code></pre>
            </div>

            <div class="p-4 bg-color-1 rounded-lg border border-color">
              <p class="text-xs font-semibold mb-2 ui-text-color">With custom options:</p>
              <pre class="text-xs bg-color-2 p-3 rounded overflow-x-auto"><code>snackbar.show({
  title: 'File Uploaded',
  message: 'Your file has been uploaded successfully',
  variant: 'success',
  action: 'View',
  timeout: 10000,
  showProgress: true,
  onAction: () => {
    console.log('View clicked')
  }
})</code></pre>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { inject } from 'vue'
// import Card from '@/components/defaults/Card.vue'

const { show, success, error, warning, info } = inject('useSnackbar')

// Basic variants
const showSuccess = () => {
  success('Action completed successfully!', {
    timeout: 5000
  })
}

const showError = () => {
  error('An error occurred. Please try again.', {
    timeout: 5000
  })
}

const showWarning = () => {
  warning('Please review this information carefully.', {
    timeout: 5000
  })
}

const showInfo = () => {
  info('This is an informational message.', {
    timeout: 5000
  })
}

const showDefault = () => {
  show({
    message: 'Default snackbar notification',
    variant: 'default',
    timeout: 5000
  })
}

// With features
const showWithAction = () => {
  show({
    message: 'Undo your last action?',
    action: 'Undo',
    timeout: 10000,
    showProgress: true,
    onAction: () => {
      info('Undo action triggered!')
    }
  })
}

const showWithTitle = () => {
  show({
    title: 'Update Available',
    message: 'A new version is available. Please update.',
    variant: 'info',
    icon: 'info',
    action: 'Update',
    timeout: 8000,
    onAction: () => {
      success('Starting update...')
    }
  })
}

const showWithProgress = () => {
  show({
    message: 'This notification has a progress bar',
    variant: 'default',
    timeout: 8000,
    showProgress: true
  })
}

// Positioning
const showTop = () => {
  show({
    message: 'Snackbar at the top of the screen',
    position: 'top',
    timeout: 5000
  })
}

const showBottom = () => {
  show({
    message: 'Snackbar at the bottom of the screen',
    position: 'bottom',
    timeout: 5000
  })
}

// Timeouts
const showQuick = () => {
  info('Quick notification (2 seconds)', {
    timeout: 2000
  })
}

const showMedium = () => {
  info('Medium notification (5 seconds)', {
    timeout: 5000
  })
}

const showLong = () => {
  info('Long notification (10 seconds)', {
    timeout: 10000,
    showProgress: true
  })
}

const showPersistent = () => {
  warning('This notification will not auto-dismiss', {
    timeout: 0,
    action: 'Dismiss',
    onAction: () => {
      info('Dismissed!')
    }
  })
}

// Multi-line
const showMultiline = () => {
  show({
    title: 'Long Message',
    message: 'This is a longer message that spans multiple lines. It can contain more detailed information about what happened and what the user should do next.',
    variant: 'info',
    icon: 'info',
    timeout: 8000,
    multiline: true
  })
}

const showMultilineWithAction = () => {
  show({
    title: 'Confirmation Required',
    message: 'Are you sure you want to delete this item? This action cannot be undone and will permanently remove the data.',
    variant: 'warning',
    icon: 'warning',
    action: 'Delete',
    timeout: 0,
    multiline: true,
    onAction: () => {
      error('Item deleted')
    }
  })
}

// Advanced
const showCustomIcon = () => {
  show({
    message: 'Custom icon snackbar',
    icon: 'fas fa-rocket',
    variant: 'success',
    timeout: 5000
  })
}

const showNotCloseable = () => {
  show({
    message: 'This snackbar cannot be manually closed',
    variant: 'warning',
    closeable: false,
    timeout: 5000
  })
}

const showComplex = () => {
  show({
    title: 'Complex Snackbar',
    message: 'This combines multiple features: title, icon, action, and progress bar',
    variant: 'secondary',
    icon: 'fas fa-star',
    action: 'Learn More',
    timeout: 10000,
    showProgress: true,
    multiline: true,
    onAction: () => {
      info('Opening documentation...')
    }
  })
}

// Multiple
const showMultiple = () => {
  setTimeout(() => success('First snackbar'), 0)
  setTimeout(() => warning('Second snackbar'), 500)
  setTimeout(() => info('Third snackbar'), 1000)
}
</script>
