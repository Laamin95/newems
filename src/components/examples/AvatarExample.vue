<template>
  <div class="p-6 max-w-6xl mx-auto space-y-8">
    <h1 class="text-3xl font-bold ui-text-color mb-6">Avatar Component</h1>

    <!-- Basic Avatars -->
    <Card title="Basic Avatars">
      <p class="text-sm text-ui-text-secondary mb-4">
        Simple avatars with images, icons, and initials.
      </p>
      <div class="flex flex-wrap items-center gap-4">
        <Avatar src="https://i.pravatar.cc/150?img=1" alt="User 1" />
        <Avatar src="https://i.pravatar.cc/150?img=2" alt="User 2" />
        <Avatar name="John Doe" />
        <Avatar name="Jane Smith" />
        <Avatar icon="fas fa-user" />
        <Avatar icon="fas fa-robot" variant="primary" />
      </div>
    </Card>

    <!-- Sizes -->
    <Card title="Sizes">
      <p class="text-sm text-ui-text-secondary mb-4">
        Available in 6 different sizes from xs to 2xl.
      </p>
      <div class="flex flex-wrap items-center gap-4">
        <Avatar src="https://i.pravatar.cc/150?img=3" size="xs" />
        <Avatar src="https://i.pravatar.cc/150?img=3" size="sm" />
        <Avatar src="https://i.pravatar.cc/150?img=3" size="md" />
        <Avatar src="https://i.pravatar.cc/150?img=3" size="lg" />
        <Avatar src="https://i.pravatar.cc/150?img=3" size="xl" />
        <Avatar src="https://i.pravatar.cc/150?img=3" size="2xl" />
      </div>
    </Card>

    <!-- Variants -->
    <Card title="Color Variants">
      <p class="text-sm text-ui-text-secondary mb-4">
        Different color variants for avatars without images.
      </p>
      <div class="flex flex-wrap items-center gap-4">
        <Avatar name="Default" variant="default" />
        <Avatar name="Primary" variant="primary" />
        <Avatar name="Secondary" variant="secondary" />
        <Avatar name="Success" variant="success" />
        <Avatar name="Error" variant="error" />
        <Avatar name="Warning" variant="warning" />
        <Avatar name="Info" variant="info" />
        <Avatar name="Gradient" variant="gradient" />
      </div>
    </Card>

    <!-- Rounded Styles -->
    <Card title="Rounded Styles">
      <p class="text-sm text-ui-text-secondary mb-4">
        Different border radius options.
      </p>
      <div class="flex flex-wrap items-center gap-4">
        <Avatar src="https://i.pravatar.cc/150?img=4" rounded="square" size="lg" />
        <Avatar src="https://i.pravatar.cc/150?img=4" rounded="sm" size="lg" />
        <Avatar src="https://i.pravatar.cc/150?img=4" rounded="md" size="lg" />
        <Avatar src="https://i.pravatar.cc/150?img=4" rounded="lg" size="lg" />
        <Avatar src="https://i.pravatar.cc/150?img=4" rounded="full" size="lg" />
      </div>
    </Card>

    <!-- With Borders -->
    <Card title="With Borders">
      <p class="text-sm text-ui-text-secondary mb-4">
        Avatars with colored borders.
      </p>
      <div class="flex flex-wrap items-center gap-4">
        <Avatar src="https://i.pravatar.cc/150?img=5" size="lg" :bordered="true" border-color="primary" />
        <Avatar name="JS" size="lg" :bordered="true" border-color="success" variant="success" />
        <Avatar name="AB" size="lg" :bordered="true" border-color="error" variant="error" />
        <Avatar icon="fas fa-star" size="lg" :bordered="true" border-color="warning" variant="warning" />
      </div>
    </Card>

    <!-- With Status Dots -->
    <Card title="Status Indicators">
      <p class="text-sm text-ui-text-secondary mb-4">
        Avatars with status dots in different positions.
      </p>
      <div class="flex flex-wrap items-center gap-6">
        <Avatar src="https://i.pravatar.cc/150?img=6" size="lg" :dot="true" dot-color="success" />
        <Avatar src="https://i.pravatar.cc/150?img=7" size="lg" :dot="true" dot-color="error" dot-position="top-right" />
        <Avatar name="JD" size="lg" :dot="true" dot-color="warning" dot-position="bottom-left" />
        <Avatar name="AS" size="lg" :dot="true" dot-color="info" dot-position="top-left" />
      </div>
    </Card>

    <!-- With Badges -->
    <Card title="With Badges">
      <p class="text-sm text-ui-text-secondary mb-4">
        Avatars with notification badges.
      </p>
      <div class="flex flex-wrap items-center gap-6">
        <Avatar src="https://i.pravatar.cc/150?img=8" size="lg" badge="3" dot-color="error" />
        <Avatar name="JD" size="lg" badge="9+" dot-color="primary" />
        <Avatar icon="fas fa-bell" size="lg" badge="99" dot-color="warning" variant="info" />
        <Avatar src="https://i.pravatar.cc/150?img=9" size="xl" badge="5" dot-color="success" />
      </div>
    </Card>

    <!-- Clickable Avatars -->
    <Card title="Clickable Avatars">
      <p class="text-sm text-ui-text-secondary mb-4">
        Avatars with click handlers (hover to see effect).
      </p>
      <div class="flex flex-wrap items-center gap-4">
        <Avatar
          src="https://i.pravatar.cc/150?img=10"
          size="lg"
          :clickable="true"
          @click="handleAvatarClick('User 1')"
        />
        <Avatar
          name="John Doe"
          size="lg"
          variant="primary"
          :clickable="true"
          @click="handleAvatarClick('John Doe')"
        />
        <Avatar
          icon="fas fa-cog"
          size="lg"
          variant="secondary"
          :clickable="true"
          @click="handleAvatarClick('Settings')"
        />
      </div>
    </Card>

    <!-- Avatar Groups -->
    <Card title="Avatar Groups">
      <p class="text-sm text-ui-text-secondary mb-4">
        Stack avatars to show multiple users.
      </p>
      <div class="flex -space-x-4">
        <Avatar src="https://i.pravatar.cc/150?img=11" size="lg" :bordered="true" />
        <Avatar src="https://i.pravatar.cc/150?img=12" size="lg" :bordered="true" />
        <Avatar src="https://i.pravatar.cc/150?img=13" size="lg" :bordered="true" />
        <Avatar name="+5" size="lg" variant="primary" :bordered="true" />
      </div>
    </Card>

    <!-- Error Handling -->
    <Card title="Image Error Handling">
      <p class="text-sm text-ui-text-secondary mb-4">
        Fallback to initials when image fails to load.
      </p>
      <div class="flex flex-wrap items-center gap-4">
        <Avatar src="https://invalid-url.com/image.jpg" name="Fallback User" size="lg" />
        <Avatar src="" name="No Image" size="lg" variant="primary" />
      </div>
    </Card>

    <!-- Event Log -->
    <Card title="Event Log">
      <div class="bg-color-1 rounded-md p-4 h-32 overflow-y-auto border border-color scrollbar-thin">
        <div v-if="eventLog.length === 0" class="text-ui-text-secondary text-sm">
          No events yet...
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
              <td class="p-3 font-mono text-primary">src</td>
              <td class="p-3 text-ui-text-secondary">String</td>
              <td class="p-3 text-ui-text-secondary">''</td>
              <td class="p-3 text-ui-text-secondary">Image URL</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">name</td>
              <td class="p-3 text-ui-text-secondary">String</td>
              <td class="p-3 text-ui-text-secondary">''</td>
              <td class="p-3 text-ui-text-secondary">Name for initials</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">initials</td>
              <td class="p-3 text-ui-text-secondary">String</td>
              <td class="p-3 text-ui-text-secondary">''</td>
              <td class="p-3 text-ui-text-secondary">Custom initials</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">icon</td>
              <td class="p-3 text-ui-text-secondary">String</td>
              <td class="p-3 text-ui-text-secondary">''</td>
              <td class="p-3 text-ui-text-secondary">Icon class</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">size</td>
              <td class="p-3 text-ui-text-secondary">String</td>
              <td class="p-3 text-ui-text-secondary">'md'</td>
              <td class="p-3 text-ui-text-secondary">xs | sm | md | lg | xl | 2xl</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">variant</td>
              <td class="p-3 text-ui-text-secondary">String</td>
              <td class="p-3 text-ui-text-secondary">'default'</td>
              <td class="p-3 text-ui-text-secondary">Color variant</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">rounded</td>
              <td class="p-3 text-ui-text-secondary">String</td>
              <td class="p-3 text-ui-text-secondary">'full'</td>
              <td class="p-3 text-ui-text-secondary">Border radius</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">bordered</td>
              <td class="p-3 text-ui-text-secondary">Boolean</td>
              <td class="p-3 text-ui-text-secondary">false</td>
              <td class="p-3 text-ui-text-secondary">Show border</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">dot</td>
              <td class="p-3 text-ui-text-secondary">Boolean</td>
              <td class="p-3 text-ui-text-secondary">false</td>
              <td class="p-3 text-ui-text-secondary">Show status dot</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">badge</td>
              <td class="p-3 text-ui-text-secondary">String/Number</td>
              <td class="p-3 text-ui-text-secondary">''</td>
              <td class="p-3 text-ui-text-secondary">Badge content</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">clickable</td>
              <td class="p-3 text-ui-text-secondary">Boolean</td>
              <td class="p-3 text-ui-text-secondary">false</td>
              <td class="p-3 text-ui-text-secondary">Enable click handler</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Avatar } from '../../'

const eventLog = ref([])

function handleAvatarClick(name) {
  addLog(`Avatar clicked: ${name}`)
}

function addLog(message) {
  eventLog.value.unshift(`[${new Date().toLocaleTimeString()}] ${message}`)
  if (eventLog.value.length > 20) {
    eventLog.value.pop()
  }
}
</script>