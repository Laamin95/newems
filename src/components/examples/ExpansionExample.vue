<template>
  <div class="p-6 max-w-4xl mx-auto space-y-8">
    <h2 class="text-3xl font-bold ui-text-color mb-6">Expansion Panel Component</h2>

    <!-- Example 1: Basic Expansion Panel -->
    <div class="border border-color rounded-lg p-6 space-y-4">
      <h3 class="text-xl font-semibold ui-text-color">Basic Expansion Panel</h3>
      <p class="text-sm text-ui-text-secondary mb-4">Simple accordion with titles and content.</p>
      <Expansion
        v-model="basicModel"
        :items="basicItems"
        @change="handleChange"
      />
    </div>

    <!-- Example 2: With Left Icons -->
    <div class="border border-color rounded-lg p-6 space-y-4">
      <h3 class="text-xl font-semibold ui-text-color">With Left Icons</h3>
      <p class="text-sm text-ui-text-secondary mb-4">Expansion panels with custom left icons.</p>
      <Expansion
        v-model="iconModel"
        :items="iconItems"
        :has-left-icon="true"
      >
        <template #left-icon="{ item, index }">
          <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white">
            <i :class="['text-sm', item.icon]" />
            {{ index + 1 }}
          </div>
        </template>
      </Expansion>
    </div>

    <!-- Example 3: With Badges -->
    <div class="border border-color rounded-lg p-6 space-y-4">
      <h3 class="text-xl font-semibold ui-text-color">With Badges</h3>
      <p class="text-sm text-ui-text-secondary mb-4">Panels with status badges.</p>
      <Expansion
        v-model="badgeModel"
        :items="badgeItems"
      />
    </div>

    <!-- Example 4: With Actions -->
    <div class="border border-color rounded-lg p-6 space-y-4">
      <h3 class="text-xl font-semibold ui-text-color">With Action Buttons</h3>
      <p class="text-sm text-ui-text-secondary mb-4">Panels with action buttons in content.</p>
      <Expansion
        v-model="actionModel"
        :items="actionItems"
        @action-click="handleActionClick"
      />
    </div>

    <!-- Example 5: Multiple Open Panels -->
    <div class="border border-color rounded-lg p-6 space-y-4">
      <h3 class="text-xl font-semibold ui-text-color">Multiple Open Panels</h3>
      <p class="text-sm text-ui-text-secondary mb-4">Allow multiple panels to be open at once.</p>
      <Expansion
        v-model="multipleModel"
        :items="basicItems"
        :exclusive="false"
      />
    </div>

    <!-- Example 6: Custom Content -->
    <div class="border border-color rounded-lg p-6 space-y-4">
      <h3 class="text-xl font-semibold ui-text-color">Custom Content</h3>
      <p class="text-sm text-ui-text-secondary mb-4">Using custom slot content.</p>
      <Expansion
        v-model="customModel"
        :items="customItems"
      >
        <template #content="{ item, index }">
          <div class="space-y-2">
            <p>{{ item.content }}</p>
            <div v-if="item.features" class="grid grid-cols-2 gap-2">
              <div v-for="feature in item.features" :key="feature" class="text-sm flex items-center gap-2">
                <i class="fas fa-check text-success" />
                <span>{{ feature }}</span>
              </div>
            </div>
          </div>
        </template>
      </Expansion>
    </div>

    <!-- Event Log -->
    <div class="border border-color rounded-lg p-6 space-y-4">
      <h3 class="text-xl font-semibold ui-text-color">Event Log</h3>
      <div class="bg-color-1 rounded-md p-4 h-48 overflow-y-auto border border-color scrollbar-thin">
        <div v-if="eventLog.length === 0" class="text-ui-text-secondary text-sm">
          No events yet...
        </div>
        <div v-for="(log, i) in eventLog" :key="i" class="text-xs text-ui-text-secondary mb-1 font-mono">
          {{ log }}
        </div>
      </div>
      <button
        @click="eventLog = []"
        class="px-4 py-2 text-sm bg-slate-500 text-white rounded hover:bg-slate-600"
      >
        Clear Log
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { Expansion } from '../../'

  // Models
  const basicModel = ref(0)
  const iconModel = ref(0)
  const badgeModel = ref(0)
  const actionModel = ref(0)
  const multipleModel = ref([0])
  const customModel = ref(0)

  // Event log
  const eventLog = ref([])

  // Basic items
  const basicItems = [
    {
      id: 1,
      title: 'What is Vue.js?',
      subtitle: 'Learn about Vue',
      content: 'Vue is a progressive JavaScript framework for building user interfaces. It is designed to be incrementally adoptable. The core library is focused on the view layer only.'
    },
    {
      id: 2,
      title: 'What is Tailwind CSS?',
      subtitle: 'Styling with utility classes',
      content: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom designs. It lets you build modern designs without leaving your HTML.'
    },
    {
      id: 3,
      title: 'What is shadcn?',
      subtitle: 'Component library',
      content: 'shadcn is a collection of beautifully designed components built with Radix UI and Tailwind CSS. You can copy and paste them into your apps.'
    }
  ]

  // Icon items
  const iconItems = [
    {
      id: 1,
      title: 'Installation',
      icon: 'fas fa-download',
      content: 'Install the package using npm: npm install @ui/components'
    },
    {
      id: 2,
      title: 'Configuration',
      icon: 'fas fa-cog',
      content: 'Configure your theme settings in the config file to match your brand.'
    },
    {
      id: 3,
      title: 'Usage',
      icon: 'fas fa-code',
      content: 'Import and use components in your Vue applications with ease.'
    }
  ]

  // Badge items
  const badgeItems = [
    {
      id: 1,
      title: 'Documentation',
      badge: [{ text: 'Updated', color: 'success' }],
      content: 'Read our comprehensive documentation to get started quickly.'
    },
    {
      id: 2,
      title: 'API Reference',
      badge: [{ text: 'Beta', color: 'warning' }],
      content: 'Check out the API reference for all available methods and properties.'
    },
    {
      id: 3,
      title: 'Support',
      badge: [{ text: 'Active', color: 'primary' }],
      content: 'Our support team is here to help you. Contact us anytime.'
    }
  ]

  // Action items
  const actionItems = [
    {
      id: 1,
      title: 'Feature Request',
      subtitle: 'Submit a new feature idea',
      content: 'Have an idea for a new feature? Share it with us!',
      actions: [
        { id: 'submit', label: 'Submit Request', variant: 'primary' },
        { id: 'cancel', label: 'Cancel', variant: 'ghost' }
      ]
    },
    {
      id: 2,
      title: 'Report Bug',
      subtitle: 'Report an issue',
      content: 'Found a bug? Let us know so we can fix it.',
      actions: [
        { id: 'report', label: 'Report Bug', variant: 'danger' },
        { id: 'close', label: 'Close', variant: 'outline' }
      ]
    }
  ]

  // Custom items
  const customItems = [
    {
      id: 1,
      title: 'Premium Plan',
      subtitle: '$29/month',
      content: 'Get unlimited access to all features.',
      features: ['Unlimited projects', 'Priority support', 'Advanced analytics', 'Custom domains']
    },
    {
      id: 2,
      title: 'Enterprise Plan',
      subtitle: 'Custom pricing',
      content: 'For large teams and organizations.',
      features: ['Everything in Premium', 'Dedicated account manager', 'SLA guarantee', 'Custom integrations']
    }
  ]

  // Event handlers
  function handleChange(event) {
    addLog(`Panel changed: ${event.item.title} (${event.active ? 'opened' : 'closed'})`)
  }

  function handleActionClick(event) {
    addLog(`Action clicked: ${event.action} on "${event.item.title}"`)
  }

  function addLog(message) {
    eventLog.value.unshift(`[${new Date().toLocaleTimeString()}] ${message}`)
    if (eventLog.value.length > 20) {
      eventLog.value.pop()
    }
  }
</script>