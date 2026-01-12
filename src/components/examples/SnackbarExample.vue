<template>
  <div class="p-6 max-w-4xl mx-auto space-y-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Snackbar Component</h1>

    <!-- Function API Examples -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-gray-700">Function API (Vuetify Style)</h2>
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-1">
        <button
          @click="showSuccess"
          class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Success Message
        </button>
        <button
          @click="showError"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Error Message
        </button>
        <button
          @click="showWarning"
          class="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
        >
          Warning Message
        </button>
        <button
          @click="showInfo"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Info Message
        </button>
        <button
          @click="showDefault"
          class="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
        >
          Default Message
        </button>
        <button
          @click="showWithAction"
          class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          With Action Button
        </button>
      </div>
    </div>

    <!-- Component API Examples -->
    <Card title="Component API (v-model)">
      <div class="space-y-4">
        <!-- Default Snackbar -->
        <div>
          <button
            @click="showDefault1 = true"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mb-2"
          >
            Show Default Snackbar
          </button>
          <Snackbar
            v-model="showDefault1"
            message="This is a default snackbar message"
            variant="default"
            position="bottom"
            :timeout="5000"
            closeable
          />
        </div>

        <!-- Success Snackbar -->
        <div>
          <button
            @click="showSuccess1 = true"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition mb-2"
          >
            Show Success Snackbar
          </button>
          <Snackbar
            v-model="showSuccess1"
            title="Success!"
            message="Your action was completed successfully."
            variant="success"
            icon="success"
            position="bottom"
            :timeout="5000"
            closeable
          />
        </div>

        <!-- Error Snackbar with Action -->
        <div>
          <button
            @click="showError1 = true"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition mb-2"
          >
            Show Error with Action
          </button>
          <Snackbar
            v-model="showError1"
            title="Error"
            message="Something went wrong. Please try again."
            variant="error"
            icon="error"
            action="Retry"
            position="bottom"
            closeable
            @action="handleRetry"
          />
        </div>

        <!-- Warning with Progress -->
        <div>
          <button
            @click="showWarning1 = true"
            class="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition mb-2"
          >
            Show Warning with Progress
          </button>
          <Snackbar
            v-model="showWarning1"
            title="Warning"
            message="This notification will auto-dismiss in 10 seconds."
            variant="warning"
            icon="warning"
            position="bottom"
            :timeout="10000"
            show-progress
            closeable
          />
        </div>
      </div>
    </Card>

    <!-- Positioning Examples -->
    <Card title="Positioning">
      <div class="grid grid-cols-2 gap-3">
        <button
          @click="showTop"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Show at Top
        </button>
        <button
          @click="showBottom"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Show at Bottom
        </button>
      </div>
    </Card>

    <!-- Multi-line Example -->
    <Card title="Multi-line Message">
      <div>
        <button
          @click="showMultiline = true"
          class="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition mb-2"
        >
          Show Multi-line Snackbar
        </button>
        <Snackbar
          v-model="showMultiline"
          title="Long Message"
          message="This is a longer message that spans multiple lines. It can contain more detailed information about what happened and what the user should do next."
          variant="info"
          icon="info"
          position="bottom"
          :timeout="8000"
          multiline
          closeable
        />
      </div>
    </Card>

    <!-- API Reference -->
    <Card title="API Reference">
      <div class="space-y-4">
        <div>
          <h3 class="font-semibold text-sm mb-2">useSnackbar() Methods:</h3>
          <div class="space-y-2 text-sm">
            <div class="p-2 bg-gray-100 rounded">
              <code class="font-mono">show(options)</code> - Show snackbar with custom options
            </div>
            <div class="p-2 bg-gray-100 rounded">
              <code class="font-mono">success(message, options)</code> - Show success snackbar
            </div>
            <div class="p-2 bg-gray-100 rounded">
              <code class="font-mono">error(message, options)</code> - Show error snackbar
            </div>
            <div class="p-2 bg-gray-100 rounded">
              <code class="font-mono">warning(message, options)</code> - Show warning snackbar
            </div>
            <div class="p-2 bg-gray-100 rounded">
              <code class="font-mono">info(message, options)</code> - Show info snackbar
            </div>
          </div>
        </div>

        <div>
          <h3 class="font-semibold text-sm mb-2">Options:</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full text-xs">
              <thead class="border-b">
                <tr>
                  <th class="text-left p-2">Property</th>
                  <th class="text-left p-2">Type</th>
                  <th class="text-left p-2">Default</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                <tr>
                  <td class="p-2 font-mono">message</td>
                  <td>String</td>
                  <td>''</td>
                </tr>
                <tr>
                  <td class="p-2 font-mono">title</td>
                  <td>String</td>
                  <td>''</td>
                </tr>
                <tr>
                  <td class="p-2 font-mono">variant</td>
                  <td>String</td>
                  <td>'default'</td>
                </tr>
                <tr>
                  <td class="p-2 font-mono">icon</td>
                  <td>String</td>
                  <td>''</td>
                </tr>
                <tr>
                  <td class="p-2 font-mono">action</td>
                  <td>String</td>
                  <td>''</td>
                </tr>
                <tr>
                  <td class="p-2 font-mono">timeout</td>
                  <td>Number (ms)</td>
                  <td>5000</td>
                </tr>
                <tr>
                  <td class="p-2 font-mono">position</td>
                  <td>String</td>
                  <td>'bottom'</td>
                </tr>
                <tr>
                  <td class="p-2 font-mono">closeable</td>
                  <td>Boolean</td>
                  <td>true</td>
                </tr>
                <tr>
                  <td class="p-2 font-mono">showProgress</td>
                  <td>Boolean</td>
                  <td>false</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Card from '@/components/defaults/Card.vue'
import Snackbar from '@/components/defaults/Snackbar.vue'
import { useSnackbar } from '@/lib/useSnackbar'

const { show, success, error, warning, info } = useSnackbar()

// Component API refs
const showDefault1 = ref(false)
const showSuccess1 = ref(false)
const showError1 = ref(false)
const showWarning1 = ref(false)
const showMultiline = ref(false)

// Function API methods
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

const showWithAction = () => {
  show({
    message: 'Undo your last action?',
    action: 'Undo',
    timeout: 10000,
    showProgress: true,
    onAction: () => {
      console.log('Undo clicked!')
    }
  })
}

const showTop = () => {
  show({
    message: 'Snackbar at the top',
    position: 'top',
    timeout: 5000
  })
}

const showBottom = () => {
  show({
    message: 'Snackbar at the bottom',
    position: 'bottom',
    timeout: 5000
  })
}

const handleRetry = () => {
  console.log('Retry clicked!')
}
</script>
