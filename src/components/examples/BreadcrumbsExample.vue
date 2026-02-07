<template>
  <div class="p-6 max-w-6xl mx-auto space-y-8">
    <h1 class="text-3xl font-bold ui-text-color mb-6">Breadcrumbs Component</h1>

    <!-- Basic Breadcrumbs -->
    <Card title="Basic Breadcrumbs">
      <p class="text-sm text-ui-text-secondary mb-4">
        Simple navigation breadcrumbs with default separator.
      </p>
      <Breadcrumbs :items="basicItems" @item-click="handleItemClick" />
    </Card>

    <!-- With Home Icon -->
    <Card title="With Home Icon">
      <p class="text-sm text-ui-text-secondary mb-4">
        Include a home icon as the first item.
      </p>
      <Breadcrumbs
        :items="basicItems"
        :show-home="true"
        @item-click="handleItemClick"
      />
    </Card>

    <!-- Custom Separators -->
    <Card title="Custom Separators">
      <p class="text-sm text-ui-text-secondary mb-4">
        Use different separators between breadcrumb items.
      </p>
      <div class="space-y-4">
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Chevron separator:</p>
          <Breadcrumbs
            :items="basicItems"
            separator-icon="fas fa-chevron-right"
          />
        </div>
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Arrow separator:</p>
          <Breadcrumbs
            :items="basicItems"
            separator-icon="fas fa-arrow-right"
          />
        </div>
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Greater than separator:</p>
          <Breadcrumbs
            :items="basicItems"
            separator=">"
          />
        </div>
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Dot separator:</p>
          <Breadcrumbs
            :items="basicItems"
            separator="•"
          />
        </div>
      </div>
    </Card>

    <!-- With Icons -->
    <Card title="With Icons">
      <p class="text-sm text-ui-text-secondary mb-4">
        Add icons to breadcrumb items for better visual context.
      </p>
      <Breadcrumbs
        :items="iconItems"
        :show-home="true"
        separator-icon="fas fa-chevron-right"
        @item-click="handleItemClick"
      />
    </Card>

    <!-- Sizes -->
    <Card title="Sizes">
      <p class="text-sm text-ui-text-secondary mb-4">
        Available in three different sizes.
      </p>
      <div class="space-y-4">
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Small:</p>
          <Breadcrumbs :items="basicItems" size="sm" />
        </div>
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Medium (default):</p>
          <Breadcrumbs :items="basicItems" size="md" />
        </div>
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Large:</p>
          <Breadcrumbs :items="basicItems" size="lg" />
        </div>
      </div>
    </Card>

    <!-- Variants -->
    <Card title="Variants">
      <p class="text-sm text-ui-text-secondary mb-4">
        Different visual styles for breadcrumbs.
      </p>
      <div class="space-y-4">
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Default:</p>
          <Breadcrumbs :items="basicItems" variant="default" />
        </div>
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Muted:</p>
          <Breadcrumbs :items="basicItems" variant="muted" />
        </div>
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Bold:</p>
          <Breadcrumbs :items="basicItems" variant="bold" />
        </div>
      </div>
    </Card>

    <!-- Long Paths -->
    <Card title="Long Paths">
      <p class="text-sm text-ui-text-secondary mb-4">
        Handle long navigation paths with many items.
      </p>
      <Breadcrumbs
        :items="longPathItems"
        :show-home="true"
        separator-icon="fas fa-chevron-right"
        @item-click="handleItemClick"
      />
    </Card>

    <!-- With Truncation -->
    <Card title="With Truncation">
      <p class="text-sm text-ui-text-secondary mb-4">
        Truncate long breadcrumb labels to prevent overflow.
      </p>
      <Breadcrumbs
        :items="truncateItems"
        :show-home="true"
        :truncate="true"
        separator-icon="fas fa-chevron-right"
      />
    </Card>

    <!-- Disabled Items -->
    <Card title="Disabled Items">
      <p class="text-sm text-ui-text-secondary mb-4">
        Some breadcrumb items can be disabled and non-clickable.
      </p>
      <Breadcrumbs
        :items="disabledItems"
        separator-icon="fas fa-chevron-right"
        @item-click="handleItemClick"
      />
    </Card>

    <!-- Custom Styling -->
    <Card title="Custom Styling">
      <p class="text-sm text-ui-text-secondary mb-4">
        Add custom classes to individual breadcrumb items.
      </p>
      <Breadcrumbs
        :items="customStyleItems"
        separator-icon="fas fa-chevron-right"
        @item-click="handleItemClick"
      />
    </Card>

    <!-- Custom Slot -->
    <Card title="Custom Item Template">
      <p class="text-sm text-ui-text-secondary mb-4">
        Use slots to customize how breadcrumb items are rendered.
      </p>
      <Breadcrumbs :items="basicItems" separator-icon="fas fa-chevron-right">
        <template #item="{ item, index, isLast }">
          <span
            :class="[
              'inline-flex items-center gap-2 px-3 py-1 rounded-md transition-colors',
              isLast ? 'bg-primary text-white' : 'bg-color-2 text-ui-text-secondary hover:bg-color-3 cursor-pointer'
            ]"
            @click="!isLast && handleItemClick({ item, index })"
          >
            <i v-if="item.icon" :class="item.icon" />
            <span>{{ item.label }}</span>
          </span>
        </template>
      </Breadcrumbs>
    </Card>

    <!-- Responsive Example -->
    <Card title="Responsive Breadcrumbs">
      <p class="text-sm text-ui-text-secondary mb-4">
        Breadcrumbs automatically wrap on smaller screens.
      </p>
      <Breadcrumbs
        :items="responsiveItems"
        :show-home="true"
        separator-icon="fas fa-chevron-right"
        class="bg-color-1 p-4 rounded-lg border border-color"
      />
    </Card>

    <!-- Event Log -->
    <Card title="Event Log">
      <div class="bg-color-1 rounded-md p-4 h-32 overflow-y-auto border border-color scrollbar-thin">
        <div v-if="eventLog.length === 0" class="text-ui-text-secondary text-sm">
          Click on breadcrumb items to see events...
        </div>
        <div v-for="(log, i) in eventLog" :key="i" class="text-xs text-ui-text-secondary mb-1 font-mono">
          {{ log }}
        </div>
      </div>
      <button
        @click="eventLog = []"
        class="mt-4 px-4 py-2 text-sm bg-slate-500 text-white rounded hover:bg-slate-600"
      >
        Clear Log
      </button>
    </Card>

    <!-- API Reference -->
    <Card title="API Reference">
      <div class="space-y-6">
        <!-- Props Table -->
        <div>
          <h3 class="font-semibold text-sm mb-3 ui-text-color">Props:</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full text-xs border border-color rounded-lg overflow-hidden">
              <thead class="bg-color-1">
                <tr>
                  <th class="text-left p-3 font-semibold ui-text-color border-b border-color">Prop</th>
                  <th class="text-left p-3 font-semibold ui-text-color border-b border-color">Type</th>
                  <th class="text-left p-3 font-semibold ui-text-color border-b border-color">Default</th>
                  <th class="text-left p-3 font-semibold ui-text-color border-b border-color">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-color bg-color-2">
                <tr>
                  <td class="p-3 font-mono text-primary">items</td>
                  <td class="p-3 text-ui-text-secondary">Array</td>
                  <td class="p-3 text-ui-text-secondary">required</td>
                  <td class="p-3 text-ui-text-secondary">Array of breadcrumb items</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">separator</td>
                  <td class="p-3 text-ui-text-secondary">String</td>
                  <td class="p-3 text-ui-text-secondary">'/'</td>
                  <td class="p-3 text-ui-text-secondary">Separator character</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">separatorIcon</td>
                  <td class="p-3 text-ui-text-secondary">String</td>
                  <td class="p-3 text-ui-text-secondary">''</td>
                  <td class="p-3 text-ui-text-secondary">Icon class for separator</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">showHome</td>
                  <td class="p-3 text-ui-text-secondary">Boolean</td>
                  <td class="p-3 text-ui-text-secondary">false</td>
                  <td class="p-3 text-ui-text-secondary">Show home icon</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">homeIcon</td>
                  <td class="p-3 text-ui-text-secondary">String</td>
                  <td class="p-3 text-ui-text-secondary">'fas fa-home'</td>
                  <td class="p-3 text-ui-text-secondary">Home icon class</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">size</td>
                  <td class="p-3 text-ui-text-secondary">String</td>
                  <td class="p-3 text-ui-text-secondary">'md'</td>
                  <td class="p-3 text-ui-text-secondary">sm | md | lg</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">variant</td>
                  <td class="p-3 text-ui-text-secondary">String</td>
                  <td class="p-3 text-ui-text-secondary">'default'</td>
                  <td class="p-3 text-ui-text-secondary">default | muted | bold</td>
                </tr>
                <tr>
                  <td class="p-3 font-mono text-primary">truncate</td>
                  <td class="p-3 text-ui-text-secondary">Boolean</td>
                  <td class="p-3 text-ui-text-secondary">false</td>
                  <td class="p-3 text-ui-text-secondary">Truncate long labels</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Item Object Structure -->
        <div>
          <h3 class="font-semibold text-sm mb-3 ui-text-color">Item Object:</h3>
          <div class="p-4 bg-color-1 rounded-lg border border-color">
            <pre class="text-xs overflow-x-auto"><code>{
  label: 'Item Label',      // Required
  href: '/path',            // Optional URL
  icon: 'fas fa-icon',      // Optional icon class
  disabled: false,          // Optional disabled state
  class: 'custom-class'     // Optional custom CSS class
}</code></pre>
          </div>
        </div>

        <!-- Events -->
        <div>
          <h3 class="font-semibold text-sm mb-3 ui-text-color">Events:</h3>
          <div class="space-y-2 text-sm">
            <div class="p-3 bg-color-1 rounded border border-color">
              <code class="font-mono text-primary">@item-click</code>
              <p class="text-xs text-ui-text-secondary mt-1">Emitted when a breadcrumb item is clicked</p>
            </div>
          </div>
        </div>

        <!-- Slots -->
        <div>
          <h3 class="font-semibold text-sm mb-3 ui-text-color">Slots:</h3>
          <div class="space-y-2 text-sm">
            <div class="p-3 bg-color-1 rounded border border-color">
              <code class="font-mono text-primary">#item="{ item, index, isLast }"</code>
              <p class="text-xs text-ui-text-secondary mt-1">Custom item template</p>
            </div>
            <div class="p-3 bg-color-1 rounded border border-color">
              <code class="font-mono text-primary">#separator</code>
              <p class="text-xs text-ui-text-secondary mt-1">Custom separator template</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Breadcrumbs } from '../../'

const eventLog = ref([])

// Basic items
const basicItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Laptops' }
]

// Items with icons
const iconItems = [
  { label: 'Dashboard', href: '/dashboard', icon: 'fas fa-tachometer-alt' },
  { label: 'Settings', href: '/settings', icon: 'fas fa-cog' },
  { label: 'Profile', href: '/settings/profile', icon: 'fas fa-user' },
  { label: 'Security', icon: 'fas fa-shield-alt' }
]

// Long path
const longPathItems = [
  { label: 'Root', href: '/' },
  { label: 'Level 1', href: '/level1' },
  { label: 'Level 2', href: '/level1/level2' },
  { label: 'Level 3', href: '/level1/level2/level3' },
  { label: 'Level 4', href: '/level1/level2/level3/level4' },
  { label: 'Current Page' }
]

// Truncate items
const truncateItems = [
  { label: 'Home', href: '/' },
  { label: 'Very Long Category Name That Should Be Truncated', href: '/category' },
  { label: 'Another Extremely Long Subcategory Name', href: '/category/subcategory' },
  { label: 'Current Item With Very Long Name' }
]

// Disabled items
const disabledItems = [
  { label: 'Home', href: '/' },
  { label: 'Disabled Section', href: '/disabled', disabled: true },
  { label: 'Active Section', href: '/active' },
  { label: 'Current Page' }
]

// Custom style items
const customStyleItems = [
  { label: 'Home', href: '/', class: 'text-primary font-bold' },
  { label: 'Important', href: '/important', class: 'text-error' },
  { label: 'Warning', href: '/warning', class: 'text-warning' },
  { label: 'Current' }
]

// Responsive items
const responsiveItems = [
  { label: 'Home', href: '/' },
  { label: 'Documentation', href: '/docs' },
  { label: 'Components', href: '/docs/components' },
  { label: 'Navigation', href: '/docs/components/navigation' },
  { label: 'Breadcrumbs' }
]

// Event handlers
function handleItemClick(event) {
  addLog(`Breadcrumb clicked: ${event.item.label} (index: ${event.index})`)
}

function addLog(message) {
  eventLog.value.unshift(`[${new Date().toLocaleTimeString()}] ${message}`)
  if (eventLog.value.length > 20) {
    eventLog.value.pop()
  }
}
</script>