<template>
  <div class="p-6 max-w-6xl mx-auto space-y-8">
    <h1 class="text-3xl font-bold ui-text-color mb-6">Badge Component</h1>

    <!-- Basic Badges -->
    <Card title="Basic Badges">
      <p class="text-sm text-ui-text-secondary mb-4">
        Simple badges with different content.
      </p>
      <div class="flex flex-wrap items-center gap-3">
        <Badge content="New" />
        <Badge content="Pro" />
        <Badge content="Beta" />
        <Badge content="99+" />
        <Badge content="Sale" />
      </div>
    </Card>

    <!-- Variants -->
    <Card title="Color Variants">
      <p class="text-sm text-ui-text-secondary mb-4">
        Different color variants for badges.
      </p>
      <div class="flex flex-wrap items-center gap-3">
        <Badge content="Default" variant="default" />
        <Badge content="Primary" variant="primary" />
        <Badge content="Secondary" variant="secondary" />
        <Badge content="Success" variant="success" />
        <Badge content="Error" variant="error" />
        <Badge content="Warning" variant="warning" />
        <Badge content="Info" variant="info" />
        <Badge content="Outline" variant="outline" />
      </div>
    </Card>

    <!-- Sizes -->
    <Card title="Sizes">
      <p class="text-sm text-ui-text-secondary mb-4">
        Available in five different sizes.
      </p>
      <div class="flex flex-wrap items-center gap-3">
        <Badge content="Extra Small" size="xs" variant="primary" />
        <Badge content="Small" size="sm" variant="primary" />
        <Badge content="Medium" size="md" variant="primary" />
        <Badge content="Large" size="lg" variant="primary" />
        <Badge content="Extra Large" size="xl" variant="primary" />
      </div>
    </Card>

    <!-- Rounded Styles -->
    <Card title="Rounded Styles">
      <p class="text-sm text-ui-text-secondary mb-4">
        Different border radius options.
      </p>
      <div class="flex flex-wrap items-center gap-3">
        <Badge content="None" rounded="none" variant="primary" />
        <Badge content="Small" rounded="sm" variant="primary" />
        <Badge content="Medium" rounded="md" variant="primary" />
        <Badge content="Large" rounded="lg" variant="primary" />
        <Badge content="Full" rounded="full" variant="primary" />
        <Badge content="Pill" rounded="pill" variant="primary" />
      </div>
    </Card>

    <!-- With Icons -->
    <Card title="With Icons">
      <p class="text-sm text-ui-text-secondary mb-4">
        Add icons to badges for better context.
      </p>
      <div class="flex flex-wrap items-center gap-3">
        <Badge content="Star" icon="star" variant="warning" />
        <Badge content="Check" icon="check" variant="success" />
        <Badge content="Error" icon="exclamation-triangle" variant="error" />
        <Badge content="Info" icon="information-circle" variant="info" />
        <Badge content="Fire" icon="fire" variant="error" />
        <Badge content="Heart" icon="heart" variant="error" />
      </div>
    </Card>

    <!-- Icon Positions -->
    <Card title="Icon Positions">
      <p class="text-sm text-ui-text-secondary mb-4">
        Control icon placement (left or right).
      </p>
      <div class="flex flex-wrap items-center gap-3">
        <Badge content="Left Icon" icon="star" icon-position="left" variant="primary" />
        <Badge content="Right Icon" icon="arrow-right" icon-position="right" variant="primary" />
      </div>
    </Card>

    <!-- Icon Only -->
    <Card title="Icon Only Badges">
      <p class="text-sm text-ui-text-secondary mb-4">
        Badges with only icons (no text).
      </p>
      <div class="flex flex-wrap items-center gap-3">
        <Badge icon="check" variant="success" rounded="full" />
        <Badge icon="x-mark" variant="error" rounded="full" />
        <Badge icon="exclamation-triangle" variant="warning" rounded="full" />
        <Badge icon="information-circle" variant="info" rounded="full" />
        <Badge icon="heart" variant="error" rounded="full" />
      </div>
    </Card>

    <!-- With Dot -->
    <Card title="With Status Dot">
      <p class="text-sm text-ui-text-secondary mb-4">
        Add status indicators with colored dots.
      </p>
      <div class="flex flex-wrap items-center gap-3">
        <Badge content="Online" :dot="true" variant="default" />
        <Badge content="Active" :dot="true" dot-color="success" variant="default" />
        <Badge content="Busy" :dot="true" dot-color="error" variant="default" />
        <Badge content="Away" :dot="true" dot-color="warning" variant="default" />
        <Badge content="Offline" :dot="true" dot-color="secondary" variant="default" />
      </div>
    </Card>

    <!-- With Border -->
    <Card title="With Borders">
      <p class="text-sm text-ui-text-secondary mb-4">
        Add borders to badges for emphasis.
      </p>
      <div class="flex flex-wrap items-center gap-3">
        <Badge content="Default" :bordered="true" variant="default" />
        <Badge content="Primary" :bordered="true" variant="primary" />
        <Badge content="Success" :bordered="true" variant="success" />
        <Badge content="Error" :bordered="true" variant="error" />
        <Badge content="Outline" :bordered="true" variant="outline" />
      </div>
    </Card>

    <!-- Closeable Badges -->
    <Card title="Closeable Badges">
      <p class="text-sm text-ui-text-secondary mb-4">
        Badges with close buttons (click the X to remove).
      </p>
      <div class="flex flex-wrap items-center gap-3">
        <Badge
          v-for="(badge, index) in closeableBadges"
          :key="index"
          :content="badge.text"
          :variant="badge.variant"
          :closeable="true"
          @close="removeCloseableBadge(index)"
        />
      </div>
      <button
        v-if="closeableBadges.length === 0"
        @click="resetCloseableBadges"
        class="mt-4 px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary/90"
      >
        Reset Badges
      </button>
    </Card>

    <!-- Clickable Badges -->
    <Card title="Clickable Badges">
      <p class="text-sm text-ui-text-secondary mb-4">
        Badges that respond to clicks.
      </p>
      <div class="flex flex-wrap items-center gap-3">
        <Badge
          content="Click Me"
          variant="primary"
          :clickable="true"
          @click="handleBadgeClick('Badge 1')"
        />
        <Badge
          content="Interactive"
          variant="success"
          :clickable="true"
          icon="cursor-arrow-rays"
          @click="handleBadgeClick('Badge 2')"
        />
        <Badge
          content="Hover & Click"
          variant="info"
          :clickable="true"
          @click="handleBadgeClick('Badge 3')"
        />
      </div>
    </Card>

    <!-- Uppercase -->
    <Card title="Uppercase Text">
      <p class="text-sm text-ui-text-secondary mb-4">
        Force uppercase text in badges.
      </p>
      <div class="flex flex-wrap items-center gap-3">
        <Badge content="normal text" variant="primary" />
        <Badge content="uppercase text" variant="primary" :uppercase="true" />
      </div>
    </Card>

    <!-- Use Cases -->
    <Card title="Common Use Cases">
      <p class="text-sm text-ui-text-secondary mb-4">
        Real-world examples of badge usage.
      </p>
      
      <div class="space-y-6">
        <!-- Notification badges -->
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Notification badges:</p>
          <div class="flex gap-4">
            <div class="relative">
              <Icon name="bell" :size="24" class="text-ui-text-color" />
              <Badge
                content="5"
                size="xs"
                variant="error"
                rounded="full"
                class="absolute -top-1 -right-1"
              />
            </div>
            <div class="relative">
              <Icon name="envelope" :size="24" class="text-ui-text-color" />
              <Badge
                content="12"
                size="xs"
                variant="primary"
                rounded="full"
                class="absolute -top-1 -right-1"
              />
            </div>
            <div class="relative">
              <Icon name="shopping-cart" :size="24" class="text-ui-text-color" />
              <Badge
                content="3"
                size="xs"
                variant="success"
                rounded="full"
                class="absolute -top-1 -right-1"
              />
            </div>
          </div>
        </div>

        <!-- Status badges -->
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Status indicators:</p>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="text-sm ui-text-color">Server Status:</span>
              <Badge content="Online" :dot="true" dot-color="success" size="sm" />
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm ui-text-color">Build Status:</span>
              <Badge content="Passing" variant="success" size="sm" icon="check" />
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm ui-text-color">Deployment:</span>
              <Badge content="Failed" variant="error" size="sm" icon="x-mark" />
            </div>
          </div>
        </div>

        <!-- Category tags -->
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Category tags:</p>
          <div class="flex flex-wrap gap-2">
            <Badge content="JavaScript" variant="warning" size="sm" :closeable="true" />
            <Badge content="Vue.js" variant="success" size="sm" :closeable="true" />
            <Badge content="TailwindCSS" variant="info" size="sm" :closeable="true" />
            <Badge content="TypeScript" variant="primary" size="sm" :closeable="true" />
          </div>
        </div>

        <!-- Feature badges -->
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Feature highlights:</p>
          <div class="p-4 border border-color rounded-lg">
            <div class="flex items-start gap-3">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <h4 class="font-semibold ui-text-color">Premium Plan</h4>
                  <Badge content="Popular" variant="primary" size="xs" />
                  <Badge content="Save 20%" variant="success" size="xs" />
                </div>
                <p class="text-sm text-ui-text-secondary">
                  Get access to all premium features
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>

    <!-- Event Log -->
    <Card title="Event Log">
      <div class="bg-color-1 rounded-md p-4 h-32 overflow-y-auto border border-color scrollbar-thin">
        <div v-if="eventLog.length === 0" class="text-ui-text-secondary text-sm">
          Click badges to see events...
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
              <td class="p-3 font-mono text-primary">content</td>
              <td class="p-3 text-ui-text-secondary">String/Number</td>
              <td class="p-3 text-ui-text-secondary">''</td>
              <td class="p-3 text-ui-text-secondary">Badge content</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">variant</td>
              <td class="p-3 text-ui-text-secondary">String</td>
              <td class="p-3 text-ui-text-secondary">'default'</td>
              <td class="p-3 text-ui-text-secondary">Color variant</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">size</td>
              <td class="p-3 text-ui-text-secondary">String</td>
              <td class="p-3 text-ui-text-secondary">'md'</td>
              <td class="p-3 text-ui-text-secondary">xs | sm | md | lg | xl</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">rounded</td>
              <td class="p-3 text-ui-text-secondary">String</td>
              <td class="p-3 text-ui-text-secondary">'md'</td>
              <td class="p-3 text-ui-text-secondary">Border radius</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">icon</td>
              <td class="p-3 text-ui-text-secondary">String</td>
              <td class="p-3 text-ui-text-secondary">''</td>
              <td class="p-3 text-ui-text-secondary">Heroicon name</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">iconType</td>
              <td class="p-3 text-ui-text-secondary">String</td>
              <td class="p-3 text-ui-text-secondary">'solid'</td>
              <td class="p-3 text-ui-text-secondary">solid | outline</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">iconPosition</td>
              <td class="p-3 text-ui-text-secondary">String</td>
              <td class="p-3 text-ui-text-secondary">'left'</td>
              <td class="p-3 text-ui-text-secondary">left | right</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">dot</td>
              <td class="p-3 text-ui-text-secondary">Boolean</td>
              <td class="p-3 text-ui-text-secondary">false</td>
              <td class="p-3 text-ui-text-secondary">Show status dot</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">dotColor</td>
              <td class="p-3 text-ui-text-secondary">String</td>
              <td class="p-3 text-ui-text-secondary">''</td>
              <td class="p-3 text-ui-text-secondary">Dot color variant</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">bordered</td>
              <td class="p-3 text-ui-text-secondary">Boolean</td>
              <td class="p-3 text-ui-text-secondary">false</td>
              <td class="p-3 text-ui-text-secondary">Show border</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">closeable</td>
              <td class="p-3 text-ui-text-secondary">Boolean</td>
              <td class="p-3 text-ui-text-secondary">false</td>
              <td class="p-3 text-ui-text-secondary">Show close button</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">clickable</td>
              <td class="p-3 text-ui-text-secondary">Boolean</td>
              <td class="p-3 text-ui-text-secondary">false</td>
              <td class="p-3 text-ui-text-secondary">Enable click handler</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">uppercase</td>
              <td class="p-3 text-ui-text-secondary">Boolean</td>
              <td class="p-3 text-ui-text-secondary">false</td>
              <td class="p-3 text-ui-text-secondary">Uppercase text</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Events -->
      <div class="mt-6">
        <h3 class="font-semibold text-sm mb-3 ui-text-color">Events:</h3>
        <div class="space-y-2 text-sm">
          <div class="p-3 bg-color-1 rounded border border-color">
            <code class="font-mono text-primary">@click</code>
            <p class="text-xs text-ui-text-secondary mt-1">Emitted when badge is clicked (if clickable)</p>
          </div>
          <div class="p-3 bg-color-1 rounded border border-color">
            <code class="font-mono text-primary">@close</code>
            <p class="text-xs text-ui-text-secondary mt-1">Emitted when close button is clicked</p>
          </div>
        </div>
      </div>

      <!-- Slots -->
      <div class="mt-6">
        <h3 class="font-semibold text-sm mb-3 ui-text-color">Slots:</h3>
        <div class="space-y-2 text-sm">
          <div class="p-3 bg-color-1 rounded border border-color">
            <code class="font-mono text-primary">#default</code>
            <p class="text-xs text-ui-text-secondary mt-1">Custom content (replaces content prop)</p>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Badge } from '../../'

const eventLog = ref([])

// Closeable badges
const closeableBadges = ref([
  { text: 'JavaScript', variant: 'warning' },
  { text: 'Vue.js', variant: 'success' },
  { text: 'React', variant: 'info' },
  { text: 'Angular', variant: 'error' },
  { text: 'Svelte', variant: 'primary' }
])

const initialCloseableBadges = [...closeableBadges.value]

function removeCloseableBadge(index) {
  const badge = closeableBadges.value[index]
  closeableBadges.value.splice(index, 1)
  addLog(`Badge closed: ${badge.text}`)
}

function resetCloseableBadges() {
  closeableBadges.value = [...initialCloseableBadges]
  addLog('Badges reset')
}

function handleBadgeClick(name) {
  addLog(`Badge clicked: ${name}`)
}

function addLog(message) {
  eventLog.value.unshift(`[${new Date().toLocaleTimeString()}] ${message}`)
  if (eventLog.value.length > 20) {
    eventLog.value.pop()
  }
}
</script>