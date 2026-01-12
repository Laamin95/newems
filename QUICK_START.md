# Quick Start Guide

Get up and running with the UI components in 5 minutes.

## 🚀 Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```

### 3. View Components
Open browser to `http://localhost:5173/demo`

---

## 💡 Common Tasks

### Show a Success Message
```javascript
// In any component:
import { useSnackbar } from '@/lib/useSnackbar'

export default {
  setup() {
    const { success } = useSnackbar()
    
    return {
      handleSave: () => success('Saved!')
    }
  }
}
```

### Display a Timeline
```vue
<template>
  <Timeline :items="steps" color="success" />
</template>

<script setup>
import Timeline from '@/components/defaults/Timeline.vue'
import { ref } from 'vue'

const steps = ref([
  { title: 'Step 1', status: 'success' },
  { title: 'Step 2', status: 'pending' },
  { title: 'Step 3', status: 'pending' }
])
</script>
```

### Create a Form
```vue
<template>
  <form @submit="handleSubmit" class="space-y-4">
    <InputText v-model="email" label="Email" type="email" />
    <InputNumber v-model="age" label="Age" min="0" max="120" />
    <Select v-model="role" label="Role" :options="roles" />
    <TextArea v-model="bio" label="Bio" clearable />
    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">
      Submit
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import InputText from '@/components/fields/InputText.vue'
import InputNumber from '@/components/fields/InputNumber.vue'
import Select from '@/components/fields/Select.vue'
import TextArea from '@/components/fields/TextArea.vue'

const email = ref('')
const age = ref('')
const role = ref(null)
const bio = ref('')

const roles = [
  { label: 'Admin', value: 'admin' },
  { label: 'User', value: 'user' },
  { label: 'Guest', value: 'guest' }
]

const handleSubmit = (e) => {
  e.preventDefault()
  console.log({ email, age, role, bio })
}
</script>
```

### Manage Steps in a Process
```vue
<script setup>
import { createWorkflowTimeline } from '@/lib/useTimeline'
import Timeline from '@/components/defaults/Timeline.vue'

const workflow = createWorkflowTimeline([
  'Design', 'Development', 'Testing', 'Deploy'
])

const nextStep = () => {
  const completed = workflow.items.value.filter(i => i.status === 'success').length
  workflow.completeStep(completed)
}
</script>

<template>
  <div class="space-y-4">
    <button @click="nextStep" class="px-4 py-2 bg-blue-600 text-white rounded">
      Complete Step
    </button>
    <Timeline :items="workflow.items" mode="left" />
  </div>
</template>
```

---

## 📚 Key Files to Know

| File | Purpose |
|------|---------|
| `/demo` | View all 16+ components in tabs |
| `src/components/defaults/` | Core UI components |
| `src/components/fields/` | Form input components |
| `src/components/examples/` | Usage examples |
| `src/lib/useSnackbar.js` | Notification composable |
| `src/lib/useTimeline.js` | Timeline composable |
| `COMPONENTS_REFERENCE.md` | Complete API reference |
| `TIMELINE_GUIDE.md` | Timeline documentation |
| `SNACKBAR_GUIDE.md` | Snackbar documentation |

---

## 🎯 Example: Build a Simple Dashboard

```vue
<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <h1 class="text-3xl font-bold">Dashboard</h1>

    <!-- Stats Form -->
    <Card title="Create Report">
      <div class="space-y-4">
        <InputText v-model="reportName" label="Report Name" />
        <Select v-model="reportType" label="Type" :options="types" />
        <button 
          @click="generateReport"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Generate
        </button>
      </div>
    </Card>

    <!-- Process Timeline -->
    <Card title="Generation Progress">
      <Timeline :items="process.items" color="success" mode="left" size="sm" />
    </Card>

    <!-- Status Banner -->
    <Banner 
      v-if="showBanner"
      title="Status"
      :message="bannerMessage"
      variant="success"
      closeable
      @close="showBanner = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSnackbar } from '@/lib/useSnackbar'
import { createProgressTimeline } from '@/lib/useTimeline'
import Card from '@/components/defaults/Card.vue'
import Banner from '@/components/defaults/Banner.vue'
import Timeline from '@/components/defaults/Timeline.vue'
import InputText from '@/components/fields/InputText.vue'
import Select from '@/components/fields/Select.vue'

const { success } = useSnackbar()

const reportName = ref('')
const reportType = ref(null)
const showBanner = ref(false)
const bannerMessage = ref('')

const types = [
  { label: 'Sales', value: 'sales' },
  { label: 'Analytics', value: 'analytics' }
]

const process = createProgressTimeline([
  'Collecting data',
  'Processing',
  'Generating charts',
  'Creating PDF'
])

const generateReport = async () => {
  if (!reportName.value) {
    success('Please enter a report name')
    return
  }

  // Simulate generation
  for (let i = 0; i < 4; i++) {
    await new Promise(r => setTimeout(r, 1000))
    process.completeStep(i)
  }

  bannerMessage.value = `${reportName.value} generated successfully!`
  showBanner.value = true
}
</script>
```

---

## 📖 Learning Path

1. **Start**: Look at `/demo` to see all components
2. **Choose**: Pick a component that interests you
3. **Read**: Check the example file for that component
4. **Copy**: Use example code as template
5. **Modify**: Adapt to your needs
6. **Reference**: Use COMPONENTS_REFERENCE.md for API details

---

## 🎨 Customization Tips

### Use Different Colors
```vue
<Timeline :items="items" color="success" />  <!-- Green -->
<Timeline :items="items" color="warning" />  <!-- Amber -->
<Timeline :items="items" color="error" />    <!-- Red -->
```

### Change Sizes
```vue
<Timeline :items="items" size="sm" />    <!-- Small -->
<Timeline :items="items" size="md" />    <!-- Medium (default) -->
<Timeline :items="items" size="lg" />    <!-- Large -->
```

### Different Layouts
```vue
<Timeline :items="items" mode="left" />      <!-- Left-aligned -->
<Timeline :items="items" mode="right" />     <!-- Right-aligned -->
<Timeline :items="items" mode="alternate" /> <!-- Alternating -->
```

### Dark Mode
Works automatically! Just enable dark mode in your CSS:
```css
/* In your CSS */
@media (prefers-color-scheme: dark) {
  /* Dark mode styles applied automatically */
}
```

---

## 🔧 Build & Deploy

### Development
```bash
npm run dev        # Start dev server
```

### Production Build
```bash
npm run build      # Build for production
npm run preview    # Preview production build
```

---

## 🆘 Help & Resources

### Find Component Docs
- **Timeline**: See `TIMELINE_GUIDE.md`
- **Snackbar**: See `SNACKBAR_GUIDE.md`
- **All Components**: See `COMPONENTS_REFERENCE.md`

### See Examples
- Visit `/demo` route for interactive examples
- Check `src/components/examples/` for code

### Check Component Props
- Open component file and read JSDoc comments
- All props documented at top of component

---

## ✅ Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] Dev server running (`npm run dev`)
- [ ] Demo page loaded (`/demo`)
- [ ] Tried 1-2 components
- [ ] Read the guides you're interested in
- [ ] Found the example files helpful

---

## 🚀 Next Steps

1. **Explore Examples** - Visit `/demo` and try each tab
2. **Build Something** - Create a simple form or timeline
3. **Read Guides** - Deep dive into TIMELINE_GUIDE.md
4. **Customize** - Modify colors and layouts
5. **Deploy** - Build and deploy to production

---

## 💬 Common Questions

**Q: How do I show a notification?**
A: Import and use `useSnackbar()`:
```javascript
const { success, error } = useSnackbar()
success('Done!')
error('Failed!')
```

**Q: How do I update a timeline step?**
A: Use timeline methods:
```javascript
const timeline = useTimeline(items)
timeline.completeItem(itemId)
timeline.errorItem(itemId)
```

**Q: How do I create a multi-step form?**
A: Combine form fields with workflow timeline:
```vue
<InputText v-model="step1Data" label="Step 1" />
<Timeline :items="workflow.items" />
```

**Q: How do I customize colors?**
A: Pass color prop to components:
```vue
<Timeline :items="items" color="success" />
```

**Q: Where are the components?**
A: In `src/components/` folder:
- Form fields: `fields/`
- Layouts/UI: `defaults/`
- Examples: `examples/`

---

**Ready? Start with:** `npm run dev` then visit `/demo`
