<template>
  <div class="p-6 space-y-10 text-left">
    <h1 class="text-2xl font-bold ui-text-primary">Checkbox Component Examples</h1>

    <!-- Basic Usage -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Basic Usage</h2>
      <div class="flex flex-wrap items-center gap-6">
        <Checkbox v-model="basic1" label="Default checkbox" />
        <Checkbox v-model="basic2" label="Initially checked" />
        <Checkbox v-model="basic3" />
      </div>
      <div class="text-sm ui-text-secondary">
        Values: {{ basic1 }}, {{ basic2 }}, {{ basic3 }}
      </div>
    </section>

    <!-- With Description -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">With Description</h2>
      <div class="space-y-4 max-w-md">
        <Checkbox 
          v-model="desc1" 
          label="Email notifications" 
          description="Receive emails about your account activity"
        />
        <Checkbox 
          v-model="desc2" 
          label="Marketing emails" 
          description="Receive emails about new products and features"
        />
        <Checkbox 
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
          <Checkbox v-model="sizeXs" size="xs" />
          <p class="text-xs ui-text-secondary mt-2">XS</p>
        </div>
        <div class="text-center">
          <Checkbox v-model="sizeSm" size="sm" />
          <p class="text-xs ui-text-secondary mt-2">SM</p>
        </div>
        <div class="text-center">
          <Checkbox v-model="sizeMd" size="md" />
          <p class="text-xs ui-text-secondary mt-2">MD</p>
        </div>
        <div class="text-center">
          <Checkbox v-model="sizeLg" size="lg" />
          <p class="text-xs ui-text-secondary mt-2">LG</p>
        </div>
        <div class="text-center">
          <Checkbox v-model="sizeXl" size="xl" />
          <p class="text-xs ui-text-secondary mt-2">XL</p>
        </div>
      </div>
    </section>

    <!-- Colors -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Colors</h2>
      <div class="flex flex-wrap items-center gap-6">
        <Checkbox v-model="colorPrimary" label="Primary" color="primary" />
        <Checkbox v-model="colorSuccess" label="Success" color="success" />
        <Checkbox v-model="colorWarning" label="Warning" color="warning" />
        <Checkbox v-model="colorDanger" label="Danger" color="danger" />
        <Checkbox v-model="colorInfo" label="Info" color="info" />
      </div>
    </section>

    <!-- Rounded Variants -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Rounded Variants</h2>
      <div class="flex flex-wrap items-center gap-6">
        <Checkbox v-model="roundedNone" label="None" rounded="none" />
        <Checkbox v-model="roundedSm" label="Small" rounded="sm" />
        <Checkbox v-model="roundedMd" label="Medium" rounded="md" />
        <Checkbox v-model="roundedLg" label="Large" rounded="lg" />
        <Checkbox v-model="roundedFull" label="Full (Circle)" rounded="full" />
      </div>
    </section>

    <!-- Indeterminate State -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Indeterminate State</h2>
      <div class="space-y-4 max-w-md">
        <Checkbox 
          v-model="parentCheck"
          :indeterminate="isIndeterminate"
          label="Select all items"
          @change="handleParentChange"
        />
        <div class="ml-6 space-y-2">
          <Checkbox v-model="childItems[0]" label="Item 1" @change="updateParent" />
          <Checkbox v-model="childItems[1]" label="Item 2" @change="updateParent" />
          <Checkbox v-model="childItems[2]" label="Item 3" @change="updateParent" />
        </div>
      </div>
    </section>

    <!-- Label Positions -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Label Positions</h2>
      <div class="space-y-4 max-w-md">
        <Checkbox v-model="pos1" label="Label on right (default)" />
        <Checkbox v-model="pos2" label="Label on left" label-position="left" />
      </div>
    </section>

    <!-- States -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">States</h2>
      <div class="space-y-4">
        <div class="flex flex-wrap items-center gap-6">
          <Checkbox v-model="stateDisabled1" label="Disabled (off)" :disabled="true" />
          <Checkbox v-model="stateDisabled2" label="Disabled (on)" :disabled="true" />
        </div>
        <div class="flex flex-wrap items-center gap-6">
          <Checkbox v-model="stateReadonly" label="Readonly" :readonly="true" />
        </div>
      </div>
    </section>

    <!-- Validation -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Validation</h2>
      <div class="space-y-4 max-w-md">
        <Checkbox 
          v-model="validationError" 
          label="Accept terms and conditions" 
          :required="true"
          :error="!validationError ? 'You must accept the terms to continue' : false"
        />
        <Checkbox 
          v-model="validationHint" 
          label="Subscribe to newsletter" 
          hint="We'll send you weekly updates about our products"
        />
        <Checkbox 
          v-model="validationBoth" 
          label="Enable notifications" 
          description="Get notified about important updates"
          :error="!validationBoth ? 'Recommended for best experience' : false"
        />
      </div>
    </section>

    <!-- Custom Values -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Custom True/False Values</h2>
      <div class="space-y-4 max-w-md">
        <Checkbox 
          v-model="customString" 
          label="Status" 
          true-value="active"
          false-value="inactive"
        />
        <p class="text-sm ui-text-secondary">Value: "{{ customString }}"</p>
        
        <Checkbox 
          v-model="customNumber" 
          label="Priority" 
          :true-value="1"
          :false-value="0"
        />
        <p class="text-sm ui-text-secondary">Value: {{ customNumber }}</p>
        
        <Checkbox 
          v-model="customYesNo" 
          label="Confirmed" 
          true-value="yes"
          false-value="no"
        />
        <p class="text-sm ui-text-secondary">Value: "{{ customYesNo }}"</p>
      </div>
    </section>

    <!-- Array Binding (Multiple Selection) -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Multiple Selection (Array Binding)</h2>
      <div class="space-y-4 max-w-md">
        <p class="text-sm ui-text-secondary mb-2">Select your interests:</p>
        <div class="space-y-2">
          <Checkbox v-model="interests" value="sports" label="Sports" />
          <Checkbox v-model="interests" value="music" label="Music" />
          <Checkbox v-model="interests" value="movies" label="Movies" />
          <Checkbox v-model="interests" value="gaming" label="Gaming" />
          <Checkbox v-model="interests" value="reading" label="Reading" />
          <Checkbox v-model="interests" value="travel" label="Travel" />
        </div>
        <p class="text-sm ui-text-secondary mt-2">
          Selected: {{ interests.length ? interests.join(', ') : 'None' }}
        </p>
      </div>
    </section>

    <!-- With Slot Content -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">With Slot Content</h2>
      <div class="space-y-4 max-w-md">
        <Checkbox v-model="slot1">
          I agree to the <a href="#" class="text-primary underline hover:text-primary/80">terms of service</a>
        </Checkbox>
        <Checkbox v-model="slot2">
          Enable <span class="font-bold text-primary">premium</span> features
        </Checkbox>
        <Checkbox v-model="slot3">
          <span class="flex items-center gap-2">
            <span class="text-lg">🔔</span>
            Enable notifications
          </span>
        </Checkbox>
      </div>
    </section>

    <!-- Permissions Panel Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Permissions Panel Example</h2>
      <div class="max-w-lg bg-color-2 rounded-xl border border-color-3 overflow-hidden">
        <div class="p-4 border-b border-color-3">
          <h3 class="font-semibold ui-text-primary">User Permissions</h3>
          <p class="text-sm ui-text-secondary">Configure access levels for this user</p>
        </div>
        <div class="divide-y divide-color-3">
          <div class="p-4">
            <Checkbox 
              v-model="permissions.read" 
              label="Read access" 
              description="Can view all resources"
              color="info"
            />
          </div>
          <div class="p-4">
            <Checkbox 
              v-model="permissions.write" 
              label="Write access" 
              description="Can create and edit resources"
              color="success"
            />
          </div>
          <div class="p-4">
            <Checkbox 
              v-model="permissions.delete" 
              label="Delete access" 
              description="Can remove resources permanently"
              color="danger"
            />
          </div>
          <div class="p-4">
            <Checkbox 
              v-model="permissions.admin" 
              label="Admin access" 
              description="Full control over all settings"
              color="warning"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Todo List Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Todo List Example</h2>
      <div class="max-w-md bg-color-2 rounded-xl border border-color-3 overflow-hidden">
        <div class="p-4 border-b border-color-3 flex items-center justify-between">
          <h3 class="font-semibold ui-text-primary">Today's Tasks</h3>
          <span class="text-sm ui-text-secondary">
            {{ completedTodos }}/{{ todos.length }} completed
          </span>
        </div>
        <div class="divide-y divide-color-3">
          <div 
            v-for="todo in todos" 
            :key="todo.id"
            class="p-4 flex items-start gap-3 hover:bg-color-3/50 transition-colors"
          >
            <Checkbox 
              v-model="todo.done" 
              size="sm"
              :color="todo.done ? 'success' : 'primary'"
            />
            <div class="flex-1">
              <p 
                class="text-sm"
                :class="todo.done ? 'line-through ui-text-secondary' : 'ui-text-primary'"
              >
                {{ todo.text }}
              </p>
              <p class="text-xs ui-text-secondary mt-1">{{ todo.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Panel Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Filter Panel Example</h2>
      <div class="max-w-sm bg-color-2 rounded-xl border border-color-3 p-4">
        <h3 class="font-semibold ui-text-primary mb-4">Filter by Category</h3>
        <div class="space-y-2">
          <Checkbox 
            v-for="category in categories" 
            :key="category.id"
            v-model="selectedCategories"
            :value="category.id"
            size="sm"
          >
            <span class="flex items-center justify-between w-full">
              <span>{{ category.name }}</span>
              <span class="text-xs bg-color-3 px-2 py-0.5 rounded-full ui-text-secondary">
                {{ category.count }}
              </span>
            </span>
          </Checkbox>
        </div>
        <div class="mt-4 pt-4 border-t border-color-3">
          <p class="text-xs ui-text-secondary">
            {{ selectedCategories.length }} categories selected
          </p>
        </div>
      </div>
    </section>

    <!-- Form Group Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Form Group Example</h2>
      <div class="max-w-md space-y-6">
        <div class="space-y-3">
          <label class="text-sm font-medium ui-text-primary">Preferred contact method:</label>
          <div class="grid grid-cols-2 gap-2">
            <Checkbox v-model="contactMethods" value="email" label="Email" size="sm" />
            <Checkbox v-model="contactMethods" value="phone" label="Phone" size="sm" />
            <Checkbox v-model="contactMethods" value="sms" label="SMS" size="sm" />
            <Checkbox v-model="contactMethods" value="whatsapp" label="WhatsApp" size="sm" />
          </div>
        </div>
        <div class="space-y-3">
          <label class="text-sm font-medium ui-text-primary">Newsletter preferences:</label>
          <div class="space-y-2">
            <Checkbox v-model="newsletter" value="weekly" label="Weekly digest" size="sm" />
            <Checkbox v-model="newsletter" value="monthly" label="Monthly newsletter" size="sm" />
            <Checkbox v-model="newsletter" value="promotions" label="Promotional offers" size="sm" />
          </div>
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
import { ref, reactive, computed } from 'vue'
import { Checkbox } from '../../'

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

// Rounded
const roundedNone = ref(true)
const roundedSm = ref(true)
const roundedMd = ref(true)
const roundedLg = ref(true)
const roundedFull = ref(true)

// Indeterminate
const parentCheck = ref(false)
const childItems = ref([false, true, false])
const isIndeterminate = computed(() => {
  const checked = childItems.value.filter(Boolean).length
  return checked > 0 && checked < childItems.value.length
})

const handleParentChange = (value) => {
  childItems.value = childItems.value.map(() => value)
}

const updateParent = () => {
  const checked = childItems.value.filter(Boolean).length
  parentCheck.value = checked === childItems.value.length
}

// Positions
const pos1 = ref(false)
const pos2 = ref(true)

// States
const stateDisabled1 = ref(false)
const stateDisabled2 = ref(true)
const stateReadonly = ref(true)

// Validation
const validationError = ref(false)
const validationHint = ref(true)
const validationBoth = ref(false)

// Custom values
const customString = ref('inactive')
const customNumber = ref(0)
const customYesNo = ref('no')

// Array binding
const interests = ref(['music', 'gaming'])

// Slots
const slot1 = ref(false)
const slot2 = ref(true)
const slot3 = ref(false)

// Permissions panel
const permissions = reactive({
  read: true,
  write: true,
  delete: false,
  admin: false
})

// Todo list
const todos = reactive([
  { id: 1, text: 'Review pull requests', time: '9:00 AM', done: true },
  { id: 2, text: 'Team standup meeting', time: '10:00 AM', done: true },
  { id: 3, text: 'Update documentation', time: '11:30 AM', done: false },
  { id: 4, text: 'Code review session', time: '2:00 PM', done: false },
  { id: 5, text: 'Deploy to staging', time: '4:00 PM', done: false }
])

const completedTodos = computed(() => todos.filter(t => t.done).length)

// Filter panel
const categories = [
  { id: 'electronics', name: 'Electronics', count: 245 },
  { id: 'clothing', name: 'Clothing', count: 189 },
  { id: 'books', name: 'Books', count: 92 },
  { id: 'home', name: 'Home & Garden', count: 156 },
  { id: 'sports', name: 'Sports', count: 78 }
]
const selectedCategories = ref(['electronics', 'clothing'])

// Form groups
const contactMethods = ref(['email'])
const newsletter = ref(['weekly'])

// Props reference
const propsReference = [
  { name: 'modelValue', type: 'Boolean | Array | String | Number', default: 'false', description: 'v-model binding value' },
  { name: 'value', type: 'String | Number | Boolean', default: 'undefined', description: 'Value for array binding' },
  { name: 'trueValue', type: 'Boolean | String | Number', default: 'true', description: 'Value when checked' },
  { name: 'falseValue', type: 'Boolean | String | Number', default: 'false', description: 'Value when unchecked' },
  { name: 'label', type: 'String', default: "''", description: 'Label text' },
  { name: 'description', type: 'String', default: "''", description: 'Description text below label' },
  { name: 'labelPosition', type: "'left' | 'right'", default: "'right'", description: 'Position of the label' },
  { name: 'indeterminate', type: 'Boolean', default: 'false', description: 'Show indeterminate state' },
  { name: 'disabled', type: 'Boolean', default: 'false', description: 'Disable the checkbox' },
  { name: 'readonly', type: 'Boolean', default: 'false', description: 'Make checkbox readonly' },
  { name: 'required', type: 'Boolean', default: 'false', description: 'Show required indicator' },
  { name: 'error', type: 'String | Boolean', default: 'false', description: 'Error message' },
  { name: 'hint', type: 'String', default: "''", description: 'Hint text' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Size of the checkbox' },
  { name: 'color', type: "'primary' | 'success' | 'warning' | 'danger' | 'info'", default: "'primary'", description: 'Color theme' },
  { name: 'rounded', type: "'none' | 'sm' | 'md' | 'lg' | 'full'", default: "'sm'", description: 'Border radius' },
  { name: 'margin', type: 'String', default: "''", description: 'Margin classes' }
]
</script>