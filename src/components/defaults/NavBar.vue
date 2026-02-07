<template>
  <div class="relative">
    <!-- Scrim/Overlay for temporary drawer -->
    <Transition name="fade">
      <div
        v-if="isOpen && temporary"
        class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        @click="close"
      />
    </Transition>

    <!-- Navigation Drawer -->
    <Transition :name="transitionName">
      <nav
        v-show="isVisible"
        ref="navRef"
        :class="navClasses"
        :style="navStyles"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <!-- Header -->
        <div v-if="$slots.prepend || title" 
            class="flex items-center px-4 py-4 border-b border-color-3"
            :class="isCollapsed ? 'justify-center' : 'justify-between'"
        >
          <slot name="prepend">
            <div class="flex items-center gap-2 text-gray-500" >
                <Icon
                    name="bug-ant"
                    size="22"
                    class=" fill-yellow-500"
                />
                <span v-if="title && !isCollapsed" class=" font-semibold text-foreground truncate">{{ title }}</span>
            </div>
            <button
                v-if="rail && !temporary && !isCollapsed"
                @click="toggleRail"
                :class="[
                    'p-1.5 py-2 rounded-full bg-color-1 shadow-sm hover:bg-color-4 transition-colors',
                    location === 'left' ? '-right-3' : '-left-3'
                ]"
                aria-label="Toggle navigation width"
            >
                <svg 
                    class="fill-gray-600 dark:fill-gray-200 w-3" 
                    :class="location === 'right' ? 'rotate-180' : ''"
                    xmlns="http://www.w3.org/2000/svg" 
                    shape-rendering="geometricPrecision" 
                    text-rendering="geometricPrecision" 
                    image-rendering="optimizeQuality" 
                    fill-rule="evenodd" clip-rule="evenodd" 
                    viewBox="0 0 512 389.24"
                >
                
                    <path fill-rule="nonzero" d="M0 0h275.1v50.04H0V0zm361.79 115.14 54.44 54.44H0v50.04h416.2l-54.41 54.41 35.39 35.39L512 194.6v-.03l-35.39-35.36-79.43-79.46-35.39 35.39zM0 339.2h275.1v50.04H0V339.2z"/>
                </svg>
            <!-- <Icon
                :name="isCollapsed ? 'chevron-right' : 'chevron-left'"
                size="14"
                :class="location === 'right' ? 'rotate-180' : ''"
            /> -->
            </button>
          </slot>
          <button
            v-if="!permanent && !rail"
            @click="close"
            class="p-1.5 rounded-md hover:bg-color-2 ui-text-secondary hover:text-foreground transition-colors"
            aria-label="Close navigation"
          >
            <Icon name="x-mark" size="18" />
          </button>
        </div>

        <!-- Search -->
        <div v-if="filterable && !isCollapsed" class="px-3 py-2">
          <div class="relative">
            <!-- <Icon name="magnifying-glass" size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /> -->
            <InputText
              v-model="searchQuery"
              type="text"
              :placeholder="searchPlaceholder"
              prepend="magnifying-glass"
            />
          </div>
        </div>

        <!-- Navigation Items -->
        <div class="flex-1 overflow-y-auto py-2">
          <template v-if="items && items.length">
            <template v-for="(group, groupIndex) in groupedItems" :key="groupIndex">
              <!-- Group Header -->
              <div
                v-if="group.title"
                :class="[
                  'flex items-center gap-2 px-3 py-2',
                  isCollapsed ? 'justify-center' : ''
                ]"
              >
                <span v-if="!isCollapsed" class="text-xs font-medium text-color-4 uppercase tracking-wider">
                  {{ group.title }}
                </span>
                <div v-else class="w-6 h-px bg-border" />
              </div>

              <!-- Group Items -->
              <ul class="space-y-1 px-2">
                <li v-for="item in group.items" :key="item.id || item.label">
                  <component
                    :is="item.href ? 'a' : 'button'"
                    :href="item.href"
                    @click="onItemClick(item)"
                    :class="[
                      'group flex items-center gap-3 w-full text-sm font-medium transition-colors',
                      isCollapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2',
                      item.active
                        ? 'bg-color-4 ui-text-secondary'
                        : 'ui-text-secondary hover:bg-color-1',
                    roundedMap[rounded],
                      item.disabled ? 'opacity-50 pointer-events-none' : 'cursor-pointer'
                    ]"
                    :title="isCollapsed ? item.label : undefined"
                  >
                    <Icon v-if="item.icon" :name="item.icon" size="20" class="flex-shrink-0" />
                    <span v-if="!isCollapsed" class="truncate">{{ item.label }}</span>
                    <span
                      v-if="item.badge && !isCollapsed"
                      class="ml-auto inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-600"
                    >
                      {{ item.badge }}
                    </span>
                    <Icon
                      v-if="item.children && !isCollapsed"
                      name="chevron-right"
                      size="16"
                      :class="['ml-auto transition-transform', expandedItems.includes(item.id) ? 'rotate-90' : '']"
                    />
                  </component>

                  <!-- Nested Items -->
                  <Transition name="collapse">
                    <ul
                      v-if="item.children && expandedItems.includes(item.id) && !isCollapsed"
                      :class="[location === 'left' ? 'mt-1 ml-4 pl-3 border-l border-color-3 space-y-1' : 'mt-1 mr-4 pr-3 border-r border-color-3 space-y-1']"
                    >
                      <li v-for="child in item.children" :key="child.id || child.label">
                        <component
                          :is="child.href ? 'a' : 'button'"
                          :href="child.href"
                          @click="onItemClick(child)"
                          :class="[
                            'flex items-center gap-3 w-full px-3 py-2 text-sm transition-colors',
                            child.active
                              ? 'bg-color-2 ui-text-secondary font-medium'
                              : 'ui-text-secondary hover:bg-color-1',
                            roundedMap[rounded],
                            child.disabled ? 'opacity-50 pointer-events-none' : 'cursor-pointer'
                          ]"
                        >
                          <Icon v-if="child.icon" :name="child.icon" size="18" />
                          <span class="truncate">{{ child.label }}</span>
                        </component>
                      </li>
                    </ul>
                  </Transition>
                </li>
              </ul>
            </template>
          </template>

          <!-- Default Slot -->
          <slot v-else />
        </div>

        <!-- Footer -->
        <div v-if="$slots.append" class="mt-auto border-t border-color-3 px-4 py-4">
          <slot name="append" />
        </div>

        <!-- Rail Toggle Button -->
        <!-- <button
          v-if="rail && !temporary"
          @click="toggleRail"
          :class="[
            'absolute top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background border border-border shadow-sm hover:bg-accent transition-colors',
            location === 'left' ? '-right-3' : '-left-3'
          ]"
          aria-label="Toggle navigation width"
        >
          <Icon
            :name="isCollapsed ? 'chevron-right' : 'chevron-left'"
            size="14"
            :class="location === 'right' ? 'rotate-180' : ''"
          />
        </button> -->
      </nav>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, provide } from 'vue'
import { InputText } from '../../'
import { useLanguageSelected, roundedMap, sizes, iconSizes, heights } from '../../lib/componentConfig'

const props = defineProps({
  modelValue: { type: Boolean, default: true },
  title: { type: String, default: '' },
  items: { type: Array, default: () => [] },
  
  // Drawer modes
  temporary: { type: Boolean, default: false },
  permanent: { type: Boolean, default: false },
  persistent: { type: Boolean, default: false },
  
  // Rail mode
  rail: { type: Boolean, default: false },
  railWidth: { type: [String, Number], default: 64 },
  railExpanded: { type: Boolean, default: false },
  expandOnHover: { type: Boolean, default: false },
  
  // Layout offset
  appBarOffset: { type: [String, Number], default: 0 },
  
  // Positioning
  location: { type: String, default: 'left' },
  width: { type: [String, Number], default: 256 },
  
  // Features
  filterable: { type: Boolean, default: false },
  searchPlaceholder: { type: String, default: 'Search...' },
  groupBy: { type: String, default: '' },
  
  // Styling
  color: { type: String, default: '' },
  bordered: { type: Boolean, default: true },
  elevated: { type: Boolean, default: false },
  floating: { type: Boolean, default: false },
  rounded: { type: String, default: 'md' },
  
  // Behavior
  closeOnClick: { type: Boolean, default: false },
  disableRouteWatcher: { type: Boolean, default: false }
})

const emit = defineEmits([
  'update:modelValue', 
  'update:railExpanded',
  'update:width',
  'update:collapsed',
  'open', 
  'close', 
  'item-click'
])

// State
const navRef = ref(null)
const searchQuery = ref('')
const expandedItems = ref([])
const isHovered = ref(false)

// Rail expanded state as v-model
const isRailExpanded = computed({
  get: () => props.railExpanded,
  set: (val) => emit('update:railExpanded', val)
})

// Computed: Is drawer open
const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// Computed: Is visible
const isVisible = computed(() => {
  if (props.permanent) return true
  if (props.rail) return true
  return isOpen.value
})

// Computed: Is in collapsed rail state
const isCollapsed = computed(() => {
  if (!props.rail) return false
  if (props.expandOnHover && isHovered.value) return false
  return !isRailExpanded.value
})

// Watch isCollapsed and emit
watch(isCollapsed, (val) => {
  emit('update:collapsed', val)
})

// Computed: Current width
const currentWidth = computed(() => {
  if (isCollapsed.value) {
    return typeof props.railWidth === 'number' ? `${props.railWidth}px` : props.railWidth
  }
  return typeof props.width === 'number' ? `${props.width}px` : props.width
})

// Watch width changes and emit
watch(currentWidth, (val) => {
  emit('update:width', val)
}, { immediate: true })

// Provide width for layout
provide('navWidth', currentWidth)

// Computed: Navigation styles
const navStyles = computed(() => {
  const styles = {
    width: currentWidth.value
  }
  
  // Add top offset for AppBar
  if (props.appBarOffset) {
    const offset = typeof props.appBarOffset === 'number' 
      ? `${props.appBarOffset}px` 
      : props.appBarOffset
    styles.top = offset
    styles.height = `calc(100vh - ${offset})`
  }
  
  return styles
})

// Computed: Navigation classes
const navClasses = computed(() => {
  const classes = [
    'fixed bottom-0 z-40 flex flex-col',
    'bg-color-1 ui-text-secondary',
    'transition-all duration-300 ease-in-out'
  ]

  if (props.location === 'right') {
    classes.push('right-0')
  } else {
    classes.push('left-0')
  }

  if (props.bordered) {
    classes.push(props.location === 'right' ? 'border-l' : 'border-r')
    classes.push('border-color-3')
  }

  if (props.elevated || props.temporary) {
    classes.push('shadow-lg')
  }

  if (props.floating) {
    classes.push('m-4 rounded-lg')
  }

  if (props.color) {
    classes.push(props.color)
  }

  return classes
})

// Computed: Transition name
const transitionName = computed(() => {
  return props.location === 'right' ? 'slide-right' : 'slide-left'
})

// Computed: Grouped items
const groupedItems = computed(() => {
  let filteredItems = props.items

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filteredItems = props.items.filter(item => {
      const matchesLabel = item.label?.toLowerCase().includes(query)
      const matchesChildren = item.children?.some(child => 
        child.label?.toLowerCase().includes(query)
      )
      return matchesLabel || matchesChildren
    })
  }

  if (props.groupBy) {
    const groups = {}
    filteredItems.forEach(item => {
      const groupKey = item[props.groupBy] || 'Other'
      if (!groups[groupKey]) {
        groups[groupKey] = { title: groupKey, items: [] }
      }
      groups[groupKey].items.push(item)
    })
    return Object.values(groups)
  }

  return [{ title: null, items: filteredItems }]
})

// Methods
const open = () => {
  isOpen.value = true
  emit('open')
}

const close = () => {
  if (props.permanent) return
  isOpen.value = false
  emit('close')
}

const toggle = () => {
  if (isOpen.value) {
    close()
  } else {
    open()
  }
}

const toggleRail = () => {
  emit('update:railExpanded', !isRailExpanded.value)
}

const onMouseEnter = () => {
  if (props.expandOnHover && props.rail) {
    isHovered.value = true
  }
}

const onMouseLeave = () => {
  if (props.expandOnHover && props.rail) {
    isHovered.value = false
  }
}

const onItemClick = (item) => {
  emit('item-click', item)

  if (item.children) {
    const index = expandedItems.value.indexOf(item.id)
    if (index > -1) {
      expandedItems.value.splice(index, 1)
    } else {
      expandedItems.value.push(item.id)
    }
    return
  }

  if (props.closeOnClick || props.temporary) {
    close()
  }
}

const onKeydown = (e) => {
  if (e.key === 'Escape' && (props.temporary || props.persistent)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
})

defineExpose({ open, close, toggle, isCollapsed })
</script>

<style scoped>
/* shadcn-inspired CSS variables */

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}
.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}
.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  max-height: 0;
}
.collapse-enter-to,
.collapse-leave-from {
  max-height: 500px;
}

/* Hover expand for rail mode */
.hover\:w-64:hover {
  width: 16rem !important;
}
</style>