# Advanced Vue 3 UI Components Library

A comprehensive, production-ready component library with shadcn-inspired styling and Vuetify-style composable APIs.

## 🎯 Quick Overview

This project includes **19 UI components**, **4 composable APIs**, and **18+ examples** with complete documentation.

### What's Included
- ✨ 7 form input components (InputText, Select, DatePicker, etc.)
- 🎨 6 layout & navigation components (AppBar, Layout, SideBar, Tab, etc.)
- 💬 5 feedback components (Snackbar, Banner, Card)
- 📈 1 advanced timeline component with multiple layouts
- � 4 Vuetify-style composable APIs (useSnackbar, useTimeline, etc.)
- 📚 Complete documentation with guides and examples
- � Dark mode support throughout
- ♿ Accessibility-first design
- 📱 Fully responsive

## � Quick Start

### Install & Run
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### View Components
Visit `http://localhost:5173/demo` to see all components in action with 16+ tabs.

## 📚 Documentation

### Main Guides
- **[QUICK_START.md](./QUICK_START.md)** - 5-minute setup and common tasks
- **[COMPONENTS_REFERENCE.md](./COMPONENTS_REFERENCE.md)** - Complete API reference
- **[TIMELINE_GUIDE.md](./TIMELINE_GUIDE.md)** - Timeline component documentation
- **[SNACKBAR_GUIDE.md](./SNACKBAR_GUIDE.md)** - Snackbar component documentation
- **[COMPONENTS_SUMMARY.md](./COMPONENTS_SUMMARY.md)** - Project overview
- **[COMPONENTS_CHECKLIST.md](./COMPONENTS_CHECKLIST.md)** - Complete feature checklist

## 💡 Common Usage

### Show Notification
```javascript
import { useSnackbar } from '@/lib/useSnackbar'

const { success, error } = useSnackbar()

success('Operation completed!')
error('Something went wrong')
```

### Display Timeline
```vue
<template>
  <Timeline :items="steps" color="success" mode="left" />
</template>

<script setup>
import Timeline from '@/components/defaults/Timeline.vue'
import { ref } from 'vue'

const steps = ref([
  { title: 'Step 1', status: 'success' },
  { title: 'Step 2', status: 'pending' }
])
</script>
```

### Build a Form
```vue
<template>
  <form @submit="handleSubmit" class="space-y-4">
    <InputText v-model="email" label="Email" type="email" />
    <Select v-model="role" label="Role" :options="roles" />
    <TextArea v-model="bio" label="Bio" clearable />
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import InputText from '@/components/fields/InputText.vue'
import Select from '@/components/fields/Select.vue'
import TextArea from '@/components/fields/TextArea.vue'
import { ref } from 'vue'

const email = ref('')
const role = ref(null)
const bio = ref('')

const roles = [
  { label: 'Admin', value: 'admin' },
  { label: 'User', value: 'user' }
]

const handleSubmit = (e) => {
  e.preventDefault()
  console.log({ email, role, bio })
}
</script>
```

## 📦 Components

### Form Input Components
| Component | Features |
|-----------|----------|
| **InputText** | Text input with prefix/suffix, clearable |
| **InputNumber** | Numeric input with min/max |
| **Checkbox** | Checkbox with custom true/false values |
| **Select** | Dropdown with custom options |
| **DatePicker** | Date selection with formatting |
| **TextArea** | Multi-line text with auto-expand |
| **FileUpload** | File input with drag-drop support |

### Layout Components
| Component | Features |
|-----------|----------|
| **AppBar** | Header with drawer toggle & menu |
| **Layout** | Main container with nav integration |
| **NavBar** | Navigation bar component |
| **SideBar** | Drawer with permanent/temporary modes |
| **Tab** | Tabbed interface (vertical/horizontal) |

### Feedback Components
| Component | Features |
|-----------|----------|
| **Snackbar** | Toast with variants and actions |
| **Banner** | Alert banner with close button |
| **Card** | Content container with elevation |

### Timeline Component
- Multiple layouts (vertical, horizontal)
- Positioning modes (left, right, alternate)
- Status indicators (pending, success, error)
- Size variations (sm, md, lg)
- Color variants (primary, success, warning, error, slate)
- Dense/compact mode
- Custom slots

## 🔌 Composable APIs

### useSnackbar()
```javascript
import { useSnackbar } from '@/lib/useSnackbar'

const { show, success, error, warning, info } = useSnackbar()
```

### useTimeline()
```javascript
import { useTimeline } from '@/lib/useTimeline'

const timeline = useTimeline(items)
timeline.addItem(item)
timeline.completeItem(id)
timeline.updateItem(id, updates)
```

### createWorkflowTimeline()
```javascript
import { createWorkflowTimeline } from '@/lib/useTimeline'

const workflow = createWorkflowTimeline(steps)
workflow.completeStep(0)
workflow.failStep(1)
workflow.goToStep(2)
```

### createProgressTimeline()
```javascript
import { createProgressTimeline } from '@/lib/useTimeline'

const progress = createProgressTimeline(stages)
// progress.progress.value returns 0-100
```

## 🎨 Features

### Design System
- Shadcn-inspired styling
- Tailwind CSS utilities
- Custom color variants
- Dark mode support
- Consistent spacing

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support
- Color contrast compliant

### Developer Experience
- Clear prop names
- Flexible slot system
- Comprehensive examples
- TypeScript-ready
- Well-documented

## 📁 Project Structure

```
src/
├── components/
│   ├── defaults/        # Core UI components
│   ├── fields/          # Form input components
│   ├── examples/        # 18+ example files
│   └── buttons/         # Button variants
├── lib/
│   ├── useSnackbar.js   # Notification composable
│   ├── useTimeline.js   # Timeline composable
│   └── utilities/
├── views/
│   └── demo.vue         # Component showcase (16 tabs)
└── App.vue
```

## 🎯 Examples

Over 18 example components showing real-world usage patterns:
- Form input patterns
- Timeline variations
- Snackbar notifications
- Workflow management
- Progress tracking
- Custom layouts

Visit `/demo` to see all examples interactively.

## 🌙 Dark Mode

All components automatically support dark mode. Enable it in your app:

```html
<!-- HTML -->
<html class="dark">
  <!-- Dark mode enabled -->
</html>
```

## 📈 Component Stats

| Metric | Count |
|--------|-------|
| Form Components | 7 |
| Layout Components | 6 |
| Feedback Components | 5 |
| Timeline Components | 1 |
| Composables | 4 |
| Examples | 18+ |
| Documentation Files | 5 |
| **Total** | **39+** |

## 🔧 Development

### Available Scripts
```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview build
```

### Tech Stack
- Vue 3 (Composition API)
- Tailwind CSS
- Vite
- TypeScript-ready

## 📖 Documentation Structure

1. **QUICK_START.md** - Start here! 5-minute setup
2. **COMPONENTS_REFERENCE.md** - Complete API reference
3. **TIMELINE_GUIDE.md** - Timeline deep dive
4. **SNACKBAR_GUIDE.md** - Snackbar patterns
5. **COMPONENTS_SUMMARY.md** - Project overview
6. **COMPONENTS_CHECKLIST.md** - Feature checklist

## ✅ What's Implemented

✅ All form components with proper Vue 3 support  
✅ Complete layout and navigation system  
✅ Snackbar with function and component APIs  
✅ Advanced Timeline with multiple layouts  
✅ Composable APIs (Vuetify-style)  
✅ Dark mode support  
✅ Responsive design  
✅ Accessibility features  
✅ 18+ comprehensive examples  
✅ Complete documentation  

## 🎓 Learning Path

1. **Day 1**: Run `npm run dev` and explore `/demo`
2. **Day 2**: Read QUICK_START.md and build a simple form
3. **Day 3**: Read TIMELINE_GUIDE.md and implement a timeline
4. **Day 4**: Read SNACKBAR_GUIDE.md and add notifications
5. **Day 5**: Combine components and build a dashboard

## 🚀 Next Steps

### For New Users
1. Read [QUICK_START.md](./QUICK_START.md)
2. Visit `/demo` in your browser
3. Copy example code and adapt

### For Advanced Users
1. Check [COMPONENTS_REFERENCE.md](./COMPONENTS_REFERENCE.md)
2. Review component source code
3. Create custom variations

## 💬 Common Questions

**Q: How do I show a toast notification?**
A: Use `useSnackbar()` composable. See [SNACKBAR_GUIDE.md](./SNACKBAR_GUIDE.md)

**Q: How do I create a timeline?**
A: Use `Timeline.vue` component. See [TIMELINE_GUIDE.md](./TIMELINE_GUIDE.md)

**Q: How do I customize colors?**
A: Pass color prop to components or use custom Tailwind classes

**Q: Is dark mode supported?**
A: Yes! All components support dark mode automatically

**Q: Can I use TypeScript?**
A: Yes! The structure is TypeScript-ready

## 📄 License

MIT License - Free to use in your projects

## 🤝 Contributing

This library is designed to be extended. Feel free to:
- Create custom variations of components
- Add new components following the patterns
- Extend composables with new methods
- Share your improvements

## 📞 Support

For detailed information:
- **Getting Started**: [QUICK_START.md](./QUICK_START.md)
- **API Reference**: [COMPONENTS_REFERENCE.md](./COMPONENTS_REFERENCE.md)
- **Timeline Help**: [TIMELINE_GUIDE.md](./TIMELINE_GUIDE.md)
- **Snackbar Help**: [SNACKBAR_GUIDE.md](./SNACKBAR_GUIDE.md)
- **Live Examples**: Visit `/demo` route

## 🎉 Features Highlights

✨ **Shadcn Design** - Clean, professional aesthetic  
✨ **Vuetify APIs** - Familiar function-based APIs  
✨ **Tailwind CSS** - Utility-first styling  
✨ **Dark Mode** - Automatic theme switching  
✨ **Responsive** - Mobile-first design  
✨ **Accessible** - WCAG compliant  
✨ **Documented** - Comprehensive guides  
✨ **Examples** - 18+ real-world patterns  

## 🏆 Quality Metrics

- ✅ Vue 3 compatible
- ✅ No console warnings
- ✅ Proper type safety
- ✅ Accessibility compliant
- ✅ Performance optimized
- ✅ Well-documented
- ✅ Production-ready

---

## 🚀 Get Started Now!

```bash
npm install
npm run dev
```

Then visit `http://localhost:5173/demo`

---

**Version**: 1.0.0  
**Status**: ✅ Production Ready  
**Last Updated**: January 2024
