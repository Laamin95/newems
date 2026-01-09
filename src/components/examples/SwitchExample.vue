<template>
  <div class="p-6 space-y-10 text-left">
    <h1 class="text-2xl font-bold ui-text-primary">Switch Component Examples</h1>

    <!-- Basic Usage -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Basic Usage</h2>
      <div class="flex flex-wrap items-center gap-6">
        <Switch v-model="basic1" label="Default switch" />
        <Switch v-model="basic2" label="Initially on" />
        <Switch v-model="basic3" />
      </div>
      <div class="text-sm ui-text-secondary">
        Values: {{ basic1 }}, {{ basic2 }}, {{ basic3 }}
      </div>
    </section>

    <!-- With Description -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">With Description</h2>
      <div class="space-y-4 max-w-md">
        <Switch 
          v-model="desc1" 
          label="Email notifications" 
          description="Receive emails about your account activity"
        />
        <Switch 
          v-model="desc2" 
          label="Marketing emails" 
          description="Receive emails about new products and features"
        />
        <Switch 
          v-model="desc3" 
          label="Security alerts" 
          description="Get notified about security events on your account"
        />
      </div>
    </section>

    <!-- Sizes -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Sizes</h2>
      <div class="flex flex-wrap items-end gap-8">
        <div class="text-center">
          <Switch v-model="sizeXs" size="xs" />
          <p class="text-xs ui-text-secondary mt-2">XS</p>
        </div>
        <div class="text-center">
          <Switch v-model="sizeSm" size="sm" />
          <p class="text-xs ui-text-secondary mt-2">SM</p>
        </div>
        <div class="text-center">
          <Switch v-model="sizeMd" size="md" />
          <p class="text-xs ui-text-secondary mt-2">MD</p>
        </div>
        <div class="text-center">
          <Switch v-model="sizeLg" size="lg" />
          <p class="text-xs ui-text-secondary mt-2">LG</p>
        </div>
        <div class="text-center">
          <Switch v-model="sizeXl" size="xl" />
          <p class="text-xs ui-text-secondary mt-2">XL</p>
        </div>
      </div>
    </section>

    <!-- Colors -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Colors</h2>
      <div class="flex flex-wrap items-center gap-6">
        <Switch v-model="colorPrimary" label="Primary" color="primary" />
        <Switch v-model="colorSuccess" label="Success" color="success" />
        <Switch v-model="colorWarning" label="Warning" color="warning" />
        <Switch v-model="colorDanger" label="Danger" color="danger" />
        <Switch v-model="colorInfo" label="Info" color="info" />
      </div>
    </section>

    <!-- With Icons -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">With Icons in Thumb</h2>
      <div class="flex flex-wrap items-center gap-6">
        <Switch v-model="icons1" label="Small" size="sm" :show-icons="true" />
        <Switch v-model="icons2" label="Medium" size="md" :show-icons="true" />
        <Switch v-model="icons3" label="Large" size="lg" :show-icons="true" />
        <Switch v-model="icons4" label="Extra Large" size="xl" :show-icons="true" />
      </div>
    </section>

    <!-- Inset Mode -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Inset Mode (Icons in Track)</h2>
      <div class="flex flex-wrap items-center gap-6">
        <Switch v-model="inset1" label="Small" size="sm" :inset="true" />
        <Switch v-model="inset2" label="Medium" size="md" :inset="true" />
        <Switch v-model="inset3" label="Large" size="lg" :inset="true" />
        <Switch v-model="inset4" label="Extra Large" size="xl" :inset="true" />
      </div>
    </section>

    <!-- Label Positions -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Label Positions</h2>
      <div class="space-y-4 max-w-md">
        <Switch v-model="pos1" label="Label on right (default)" />
        <Switch v-model="pos2" label="Label on left" label-position="left" />
        <div class="bg-color-2 p-4 rounded-lg">
          <Switch v-model="pos3" label="Reversed layout" description="Label takes full width" :reverse="true" />
        </div>
      </div>
    </section>

    <!-- States -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">States</h2>
      <div class="space-y-4">
        <div class="flex flex-wrap items-center gap-6">
          <Switch v-model="stateDisabled1" label="Disabled (off)" :disabled="true" />
          <Switch v-model="stateDisabled2" label="Disabled (on)" :disabled="true" />
        </div>
        <div class="flex flex-wrap items-center gap-6">
          <Switch v-model="stateLoading1" label="Loading (off)" :loading="true" />
          <Switch v-model="stateLoading2" label="Loading (on)" :loading="true" />
        </div>
        <div class="flex flex-wrap items-center gap-6">
          <Switch v-model="stateReadonly" label="Readonly" :readonly="true" />
        </div>
      </div>
    </section>

    <!-- Validation -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Validation</h2>
      <div class="space-y-4 max-w-md">
        <Switch 
          v-model="validationError" 
          label="Accept terms and conditions" 
          :required="true"
          :error="!validationError ? 'You must accept the terms to continue' : false"
        />
        <Switch 
          v-model="validationHint" 
          label="Subscribe to newsletter" 
          hint="We'll send you weekly updates about our products"
        />
        <Switch 
          v-model="validationBoth" 
          label="Enable two-factor authentication" 
          description="Add an extra layer of security"
          :error="!validationBoth ? 'Recommended for account security' : false"
        />
      </div>
    </section>

    <!-- Custom Values -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Custom True/False Values</h2>
      <div class="space-y-4 max-w-md">
        <Switch 
          v-model="customString" 
          label="Status" 
          true-value="active"
          false-value="inactive"
        />
        <p class="text-sm ui-text-secondary">Value: "{{ customString }}"</p>
        
        <Switch 
          v-model="customNumber" 
          label="Priority" 
          :true-value="1"
          :false-value="0"
        />
        <p class="text-sm ui-text-secondary">Value: {{ customNumber }}</p>
        
        <Switch 
          v-model="customYesNo" 
          label="Confirmed" 
          true-value="yes"
          false-value="no"
        />
        <p class="text-sm ui-text-secondary">Value: "{{ customYesNo }}"</p>
      </div>
    </section>

    <!-- With Slot Content -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">With Slot Content</h2>
      <div class="space-y-4 max-w-md">
        <Switch v-model="slot1">
          I agree to the <a href="#" class="text-primary underline hover:text-primary/80">terms of service</a>
        </Switch>
        <Switch v-model="slot2">
          Enable <span class="font-bold text-primary">premium</span> features
        </Switch>
        <Switch v-model="slot3">
          <span class="flex items-center gap-2">
            <span class="text-lg">🔔</span>
            Enable notifications
          </span>
        </Switch>
      </div>
    </section>

    <!-- Settings Panel Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Settings Panel Example</h2>
      <div class="max-w-lg bg-color-2 rounded-xl border border-color-3 overflow-hidden">
        <div class="p-4 border-b border-color-3">
          <h3 class="font-semibold ui-text-primary">Notification Settings</h3>
          <p class="text-sm ui-text-secondary">Manage how you receive notifications</p>
        </div>
        <div class="divide-y divide-color-3">
          <div class="p-4">
            <Switch 
              v-model="settings.push" 
              label="Push notifications" 
              description="Receive push notifications on your device"
              :reverse="true"
              color="primary"
            />
          </div>
          <div class="p-4">
            <Switch 
              v-model="settings.email" 
              label="Email notifications" 
              description="Receive email updates about your activity"
              :reverse="true"
              color="primary"
            />
          </div>
          <div class="p-4">
            <Switch 
              v-model="settings.sms" 
              label="SMS notifications" 
              description="Receive text messages for important alerts"
              :reverse="true"
              color="primary"
            />
          </div>
          <div class="p-4">
            <Switch 
              v-model="settings.marketing" 
              label="Marketing emails" 
              description="Receive emails about new products and offers"
              :reverse="true"
              color="primary"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Privacy Settings Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Privacy Settings Example</h2>
      <div class="max-w-lg bg-color-2 rounded-xl border border-color-3 overflow-hidden">
        <div class="p-4 border-b border-color-3">
          <h3 class="font-semibold ui-text-primary">Privacy & Security</h3>
        </div>
        <div class="divide-y divide-color-3">
          <div class="p-4">
            <Switch 
              v-model="privacy.twoFactor" 
              label="Two-factor authentication" 
              description="Add an extra layer of security to your account"
              :reverse="true"
              color="success"
              :show-icons="true"
            />
          </div>
          <div class="p-4">
            <Switch 
              v-model="privacy.activityLog" 
              label="Activity log" 
              description="Keep a log of your account activity"
              :reverse="true"
              color="success"
              :show-icons="true"
            />
          </div>
          <div class="p-4">
            <Switch 
              v-model="privacy.publicProfile" 
              label="Public profile" 
              description="Make your profile visible to everyone"
              :reverse="true"
              color="warning"
              :show-icons="true"
            />
          </div>
          <div class="p-4">
            <Switch 
              v-model="privacy.dataSharing" 
              label="Data sharing" 
              description="Share usage data to help improve our services"
              :reverse="true"
              color="info"
              :show-icons="true"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Async Toggle Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Async Toggle Example</h2>
      <div class="max-w-md space-y-4">
        <Switch 
          v-model="asyncValue" 
          label="Sync to cloud" 
          description="Toggle will simulate an API call"
          :loading="isLoading"
          @change="handleAsyncToggle"
        />
        <p v-if="asyncMessage" class="text-sm" :class="asyncSuccess ? 'text-green-500' : 'text-red-500'">
          {{ asyncMessage }}
        </p>
      </div>
    </section>

    <!-- Feature Flags Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Feature Flags Example</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
        <div 
          v-for="feature in features" 
          :key="feature.id"
          class="bg-color-2 p-4 rounded-lg border border-color-3"
        >
          <Switch 
            v-model="feature.enabled" 
            :label="feature.name" 
            :description="feature.description"
            :color="feature.enabled ? 'success' : 'primary'"
            size="sm"
          />
        </div>
      </div>
    </section>

    <!-- Compact List Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Compact List Example</h2>
      <div class="max-w-sm bg-color-2 rounded-lg border border-color-3 p-2">
        <div class="flex items-center justify-between p-2 hover:bg-color-3 rounded transition-colors">
          <span class="text-sm ui-text-primary">WiFi</span>
          <Switch v-model="compact.wifi" size="sm" />
        </div>
        <div class="flex items-center justify-between p-2 hover:bg-color-3 rounded transition-colors">
          <span class="text-sm ui-text-primary">Bluetooth</span>
          <Switch v-model="compact.bluetooth" size="sm" />
        </div>
        <div class="flex items-center justify-between p-2 hover:bg-color-3 rounded transition-colors">
          <span class="text-sm ui-text-primary">Airplane Mode</span>
          <Switch v-model="compact.airplane" size="sm" />
        </div>
        <div class="flex items-center justify-between p-2 hover:bg-color-3 rounded transition-colors">
          <span class="text-sm ui-text-primary">Location</span>
          <Switch v-model="compact.location" size="sm" />
        </div>
        <div class="flex items-center justify-between p-2 hover:bg-color-3 rounded transition-colors">
          <span class="text-sm ui-text-primary">Do Not Disturb</span>
          <Switch v-model="compact.dnd" size="sm" color="danger" />
        </div>
      </div>
    </section>

    <!-- All Props Reference -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Props Reference</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-color-2">
            <tr>
              <th class="text-left p-3 ui-text-primary font-semibold">Prop</th>
              <th class="text-left p-3 ui-text-primary font-semibold">Type</th>
              <th class="text-left p-3 ui-text-primary font-semibold">Default</th>
              <th class="text-left p-3 ui-text-primary font-semibold">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-color-3">
            <tr v-for="prop in propsReference" :key="prop.name">
              <td class="p-3 font-mono text-primary">{{ prop.name }}</td>
              <td class="p-3 ui-text-secondary">{{ prop.type }}</td>
              <td class="p-3 ui-text-secondary">{{ prop.default }}</td>
              <td class="p-3 ui-text-secondary">{{ prop.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Switch from '@/components/buttons/Switch.vue'

// Basic
const basic1 = ref(false)
const basic2 = ref(true)
const basic3 = ref(false)

// Description
const desc1 = ref(true)
const desc2 = ref(false)
const desc3 = ref(true)

// Sizes
const sizeXs = ref(true)
const sizeSm = ref(true)
const sizeMd = ref(true)
const sizeLg = ref(true)
const sizeXl = ref(true)

// Colors
const colorPrimary = ref(true)
const colorSuccess = ref(true)
const colorWarning = ref(true)
const colorDanger = ref(true)
const colorInfo = ref(true)

// Icons
const icons1 = ref(false)
const icons2 = ref(true)
const icons3 = ref(false)
const icons4 = ref(true)

// Inset
const inset1 = ref(false)
const inset2 = ref(true)
const inset3 = ref(false)
const inset4 = ref(true)

// Positions
const pos1 = ref(false)
const pos2 = ref(true)
const pos3 = ref(false)

// States
const stateDisabled1 = ref(false)
const stateDisabled2 = ref(true)
const stateLoading1 = ref(false)
const stateLoading2 = ref(true)
const stateReadonly = ref(true)

// Validation
const validationError = ref(false)
const validationHint = ref(true)
const validationBoth = ref(false)

// Custom values
const customString = ref('inactive')
const customNumber = ref(0)
const customYesNo = ref('no')

// Slots
const slot1 = ref(false)
const slot2 = ref(true)
const slot3 = ref(false)

// Settings panel
const settings = reactive({
  push: true,
  email: true,
  sms: false,
  marketing: false
})

// Privacy settings
const privacy = reactive({
  twoFactor: true,
  activityLog: true,
  publicProfile: false,
  dataSharing: false
})

// Async toggle
const asyncValue = ref(false)
const isLoading = ref(false)
const asyncMessage = ref('')
const asyncSuccess = ref(false)

const handleAsyncToggle = async (value) => {
  isLoading.value = true
  asyncMessage.value = ''
  
  try {
    // Simulate API call
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        // Randomly succeed or fail for demo
        if (Math.random() > 0.3) {
          resolve()
        } else {
          reject(new Error('Failed to sync'))
        }
      }, 1500)
    })
    
    asyncSuccess.value = true
    asyncMessage.value = value ? 'Successfully enabled cloud sync!' : 'Cloud sync disabled'
  } catch (error) {
    asyncSuccess.value = false
    asyncMessage.value = 'Failed to update. Please try again.'
    // Revert the value
    asyncValue.value = !value
  } finally {
    isLoading.value = false
  }
}

// Feature flags
const features = reactive([
  { id: 1, name: 'Dark Mode', description: 'Enable dark theme', enabled: true },
  { id: 2, name: 'Beta Features', description: 'Access experimental features', enabled: false },
  { id: 3, name: 'Analytics', description: 'Enable usage analytics', enabled: true },
  { id: 4, name: 'Animations', description: 'Enable UI animations', enabled: true },
  { id: 5, name: 'Auto-save', description: 'Automatically save changes', enabled: true },
  { id: 6, name: 'Spell Check', description: 'Enable spell checking', enabled: false }
])

// Compact list
const compact = reactive({
  wifi: true,
  bluetooth: false,
  airplane: false,
  location: true,
  dnd: false
})

// Props reference
const propsReference = [
  { name: 'modelValue', type: 'Boolean | String | Number', default: 'false', description: 'v-model binding value' },
  { name: 'trueValue', type: 'Boolean | String | Number', default: 'true', description: 'Value when switch is on' },
  { name: 'falseValue', type: 'Boolean | String | Number', default: 'false', description: 'Value when switch is off' },
  { name: 'label', type: 'String', default: "''", description: 'Label text' },
  { name: 'description', type: 'String', default: "''", description: 'Description text' },
  { name: 'labelPosition', type: "'left' | 'right'", default: "'right'", description: 'Position of the label' },
  { name: 'reverse', type: 'Boolean', default: 'false', description: 'Full width with reversed layout' },
  { name: 'disabled', type: 'Boolean', default: 'false', description: 'Disable the switch' },
  { name: 'loading', type: 'Boolean', default: 'false', description: 'Show loading spinner' },
  { name: 'readonly', type: 'Boolean', default: 'false', description: 'Make switch readonly' },
  { name: 'required', type: 'Boolean', default: 'false', description: 'Show required indicator' },
  { name: 'error', type: 'String | Boolean', default: 'false', description: 'Error message' },
  { name: 'hint', type: 'String', default: "''", description: 'Hint text' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Size of the switch' },
  { name: 'color', type: "'primary' | 'success' | 'warning' | 'danger' | 'info'", default: "'primary'", description: 'Color theme' },
  { name: 'showIcons', type: 'Boolean', default: 'false', description: 'Show check/x icons in thumb' },
  { name: 'inset', type: 'Boolean', default: 'false', description: 'Show icons inside track' },
  { name: 'margin', type: 'String', default: "''", description: 'Margin classes' }
]
</script>