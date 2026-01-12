# Timeline Component Usage Guide

## Overview

The Timeline component is a versatile Vue 3 component for displaying sequential events, processes, or steps. It supports multiple layouts, status indicators, and custom content with a clean, modern design inspired by shadcn.

## Quick Start

### Basic Usage

```vue
<script setup>
import Timeline from '@/components/defaults/Timeline.vue'
import { ref } from 'vue'

const items = ref([
  {
    title: 'Project Started',
    description: 'Initial project setup',
    timestamp: 'Jan 1, 2024',
    status: 'success'
  },
  {
    title: 'Development',
    description: 'Building the application',
    timestamp: 'Feb 1, 2024',
    status: 'pending'
  },
  {
    title: 'Testing',
    description: 'Quality assurance',
    timestamp: 'Mar 1, 2024',
    status: 'pending'
  }
])
</script>

<template>
  <Timeline :items="items" />
</template>
```

---

## Using the useTimeline Composable

The `useTimeline` composable provides a Vuetify-style function API for managing timeline items.

### Basic Setup

```vue
<script setup>
import { useTimeline } from '@/lib/useTimeline'
import Timeline from '@/components/defaults/Timeline.vue'

// Create a timeline with initial items
const timeline = useTimeline([
  { title: 'Step 1', description: 'Initial step' },
  { title: 'Step 2', description: 'Processing' },
  { title: 'Step 3', description: 'Completion' }
])

// Access items
const items = timeline.items

// Add a single item
const handleAddItem = () => {
  timeline.addItem({
    title: 'New Step',
    description: 'A new step has been added'
  })
}

// Complete an item
const handleComplete = (itemId) => {
  timeline.completeItem(itemId)
}
</script>

<template>
  <div>
    <button @click="handleAddItem">Add Step</button>
    <Timeline :items="items" />
  </div>
</template>
```

### useTimeline API Methods

```javascript
import { useTimeline } from '@/lib/useTimeline'

const timeline = useTimeline(initialItems)

// Add single item
timeline.addItem({
  title: 'Item Title',
  description: 'Item description',
  timestamp: '2024-01-01',
  status: 'pending' // 'pending', 'success', 'error'
})

// Add multiple items
timeline.addItems([
  { title: 'Item 1' },
  { title: 'Item 2' }
])

// Update an item
timeline.updateItem(itemId, { status: 'success' })

// Remove an item
timeline.removeItem(itemId)

// Complete an item (sets status to 'success')
timeline.completeItem(itemId)

// Mark as error
timeline.errorItem(itemId, errorMessage)

// Mark as pending
timeline.pendingItem(itemId)

// Get item by ID
const item = timeline.getItem(itemId)

// Get all items
const allItems = timeline.getAllItems()

// Clear all items
timeline.clear()

// Access reactive items array
console.log(timeline.items.value)
```

---

## Workflow Timeline

For managing step-by-step workflows, use `createWorkflowTimeline`:

```vue
<script setup>
import { createWorkflowTimeline } from '@/lib/useTimeline'
import Timeline from '@/components/defaults/Timeline.vue'

const workflow = createWorkflowTimeline([
  { title: 'Design Review', description: 'Review design mockups' },
  { title: 'Development', description: 'Build features' },
  { title: 'Code Review', description: 'Peer review' },
  { title: 'Testing', description: 'QA testing' },
  { title: 'Deployment', description: 'Deploy to production' }
])

// Workflow-specific methods
const handleStepComplete = (stepIndex) => {
  workflow.completeStep(stepIndex)
}

const handleStepFail = (stepIndex, error) => {
  workflow.failStep(stepIndex, error)
}

const handleGoToStep = (stepIndex) => {
  workflow.goToStep(stepIndex)
}
</script>

<template>
  <div>
    <div class="flex gap-2 mb-4">
      <button @click="handleStepComplete(0)">Complete Step 1</button>
      <button @click="handleStepFail(1)">Fail Step 2</button>
      <button @click="handleGoToStep(2)">Go to Step 3</button>
    </div>
    <Timeline :items="workflow.items" color="primary" />
  </div>
</template>
```

### createWorkflowTimeline Methods

```javascript
const workflow = createWorkflowTimeline(steps)

// Complete a step by index
workflow.completeStep(0) // Sets status to 'success'

// Fail a step
workflow.failStep(1, 'Error message') // Sets status to 'error'

// Mark all previous as success, current as pending, rest as pending
workflow.goToStep(2)
```

---

## Progress Timeline

For tracking progress through stages:

```vue
<script setup>
import { createProgressTimeline } from '@/lib/useTimeline'
import Timeline from '@/components/defaults/Timeline.vue'
import { computed } from 'vue'

const progress = createProgressTimeline([
  { title: 'Requirements', description: 'Gather requirements' },
  { title: 'Design', description: 'Create design' },
  { title: 'Development', description: 'Develop features' },
  { title: 'QA', description: 'Quality assurance' },
  { title: 'Release', description: 'Deploy to production' }
])

// Progress composable provides automatic percentage calculation
const progressPercentage = computed(() => progress.progress.value)
</script>

<template>
  <div>
    <div class="mb-4">
      <p class="text-sm font-semibold">Progress: {{ progressPercentage }}%</p>
      <div class="w-full bg-gray-200 rounded h-2">
        <div 
          class="bg-blue-600 h-2 rounded transition-all"
          :style="{ width: progressPercentage + '%' }"
        />
      </div>
    </div>
    <Timeline :items="progress.items" />
  </div>
</template>
```

---

## Timeline Props

### Main Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | Array | `[]` | Timeline items to display |
| `variant` | String | `'vertical'` | Layout direction: `'vertical'` or `'horizontal'` |
| `mode` | String | `'left'` | Content position: `'left'`, `'right'`, `'alternate'`, or `'center'` |
| `size` | String | `'md'` | Item size: `'sm'`, `'md'`, or `'lg'` |
| `color` | String | `'primary'` | Color scheme: `'primary'`, `'success'`, `'warning'`, `'error'`, or `'slate'` |
| `dense` | Boolean | `false` | Reduce spacing for compact display |

### Item Properties

Each item in the `items` array can have:

```javascript
{
  id: 'unique-id',              // Auto-generated if not provided
  title: 'Item Title',          // Main heading
  description: 'Description',   // Subtitle text
  timestamp: '2024-01-01',      // Date/time string
  status: 'pending',            // 'pending', 'success', 'error'
  icon: 'success',              // 'success', 'pending', 'warning', 'error'
  badge: 'Completed',           // Small badge text
  dotColor: 'bg-blue-600',      // Custom dot color (Tailwind class)
  connectorColor: 'bg-blue-200' // Custom connector color
}
```

---

## Customization

### Custom Colors

```vue
<script setup>
import Timeline from '@/components/defaults/Timeline.vue'

const items = ref([
  {
    title: 'Custom Style',
    description: 'With custom colors',
    status: 'success',
    dotColor: 'bg-purple-600 border-purple-600',
    connectorColor: 'bg-purple-200',
    contentColor: 'bg-purple-50 border-l-purple-200'
  }
])
</script>

<template>
  <Timeline :items="items" />
</template>
```

### Custom Dot Slot

```vue
<template>
  <Timeline :items="items">
    <template #dot="{ item, index }">
      <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
        {{ index + 1 }}
      </div>
    </template>
  </Timeline>
</template>
```

### Custom Content Slot

```vue
<template>
  <Timeline :items="items">
    <template #content="{ item, index }">
      <div class="space-y-2">
        <h4 class="font-semibold text-lg">{{ item.title }}</h4>
        <p class="text-gray-600">{{ item.description }}</p>
        <div class="flex gap-2">
          <button 
            @click="handleAction(item.id)"
            class="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            Take Action
          </button>
          <button 
            @click="handleSkip(item.id)"
            class="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300"
          >
            Skip
          </button>
        </div>
      </div>
    </template>
  </Timeline>
</template>
```

---

## Common Patterns

### Process Status Tracker

```vue
<script setup>
import { useTimeline } from '@/lib/useTimeline'
import Timeline from '@/components/defaults/Timeline.vue'

const process = useTimeline([
  { title: 'Downloaded', status: 'success' },
  { title: 'Extracting', status: 'success' },
  { title: 'Installing', status: 'pending' },
  { title: 'Configuring', status: 'pending' }
])

const simulateProgress = async () => {
  await new Promise(r => setTimeout(r, 2000))
  process.completeItem(process.items.value[2].id)
  
  await new Promise(r => setTimeout(r, 2000))
  process.completeItem(process.items.value[3].id)
}
</script>

<template>
  <div>
    <button @click="simulateProgress">Simulate Progress</button>
    <Timeline 
      :items="process.items" 
      color="success"
      mode="left"
    />
  </div>
</template>
```

### Build/Deployment Pipeline

```vue
<script setup>
import { createWorkflowTimeline } from '@/lib/useTimeline'
import Timeline from '@/components/defaults/Timeline.vue'

const pipeline = createWorkflowTimeline([
  { title: 'Build', description: 'Compile source code' },
  { title: 'Test', description: 'Run test suite' },
  { title: 'Deploy', description: 'Deploy to staging' },
  { title: 'Verify', description: 'Smoke tests' },
  { title: 'Release', description: 'Deploy to production' }
])

const stages = [
  { label: 'Build', action: () => pipeline.completeStep(0) },
  { label: 'Test', action: () => { 
    if (Math.random() > 0.3) pipeline.completeStep(1) 
    else pipeline.failStep(1, 'Tests failed')
  }},
  { label: 'Deploy', action: () => pipeline.goToStep(2) }
]
</script>

<template>
  <div class="space-y-4">
    <div class="flex gap-2 flex-wrap">
      <button 
        v-for="stage in stages" 
        :key="stage.label"
        @click="stage.action"
        class="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
      >
        {{ stage.label }}
      </button>
    </div>
    <Timeline 
      :items="pipeline.items"
      color="primary"
      size="md"
    />
  </div>
</template>
```

### Order Status Timeline

```vue
<script setup>
import { ref } from 'vue'
import Timeline from '@/components/defaults/Timeline.vue'

const orderSteps = ref([
  {
    title: 'Order Confirmed',
    description: 'Order #12345 has been confirmed',
    timestamp: '2024-01-01 10:00 AM',
    status: 'success',
    badge: 'Completed'
  },
  {
    title: 'Payment Processed',
    description: 'Payment has been received and verified',
    timestamp: '2024-01-01 10:15 AM',
    status: 'success',
    badge: 'Completed'
  },
  {
    title: 'Preparing Shipment',
    description: 'Items are being packaged',
    timestamp: '2024-01-02 2:00 PM',
    status: 'pending',
    badge: 'In Progress'
  },
  {
    title: 'Shipped',
    description: 'Package in transit',
    timestamp: 'Expected Jan 5',
    status: 'pending',
    badge: 'Pending'
  },
  {
    title: 'Delivered',
    description: 'Package delivered to recipient',
    timestamp: 'Expected Jan 5',
    status: 'pending',
    badge: 'Pending'
  }
])
</script>

<template>
  <Timeline 
    :items="orderSteps"
    color="primary"
    mode="left"
    size="md"
  />
</template>
```

---

## Styling

### Available Color Schemes

```vue
<!-- Primary (Blue) -->
<Timeline :items="items" color="primary" />

<!-- Success (Green) -->
<Timeline :items="items" color="success" />

<!-- Warning (Amber) -->
<Timeline :items="items" color="warning" />

<!-- Error (Red) -->
<Timeline :items="items" color="error" />

<!-- Slate (Gray) -->
<Timeline :items="items" color="slate" />
```

### Different Sizes

```vue
<!-- Small -->
<Timeline :items="items" size="sm" />

<!-- Medium (Default) -->
<Timeline :items="items" size="md" />

<!-- Large -->
<Timeline :items="items" size="lg" />
```

### Layout Modes

```vue
<!-- Vertical, Left-aligned -->
<Timeline :items="items" variant="vertical" mode="left" />

<!-- Vertical, Right-aligned -->
<Timeline :items="items" variant="vertical" mode="right" />

<!-- Vertical, Alternating -->
<Timeline :items="items" variant="vertical" mode="alternate" />

<!-- Horizontal -->
<Timeline :items="items" variant="horizontal" />
```

### Compact Display

```vue
<Timeline :items="items" dense size="sm" />
```

---

## Dark Mode Support

The Timeline component automatically supports dark mode through Tailwind CSS classes:

```vue
<script setup>
import Timeline from '@/components/defaults/Timeline.vue'

const items = ref([
  {
    title: 'Dark Mode Ready',
    description: 'Automatically adapts to dark theme',
    status: 'success'
  }
])
</script>

<template>
  <!-- Works in light and dark modes -->
  <Timeline :items="items" />
</template>
```

---

## Best Practices

1. **Use meaningful titles and descriptions** - Help users understand each step
2. **Set appropriate statuses** - Keep users informed about progress
3. **Use icons wisely** - They help with quick scanning
4. **Responsive layouts** - Use `mode="alternate"` for better mobile presentation
5. **Color coding** - Use different colors for different workflow types
6. **Timestamps** - Include timestamps for audit trails
7. **Action buttons** - Provide clear next steps in custom slots

---

## Examples

See `TimelineExample.vue` in the components directory for comprehensive examples including:
- Basic timeline
- Different sizes
- Layout modes
- Status indicators
- Color variants
- Custom content
- Process workflows
- Dense timelines

Visit `/demo` in the app to see all examples in action.
