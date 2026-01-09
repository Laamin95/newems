<template>
  <div class="relative">
    <!-- Scrim for temporary drawer -->
    <div
      v-if="isOpen && temporary"
      class="fixed inset-0"
      :class="scrimClass"
      :style="[scrimStyle]"
      @click="onScrimClick"
    ></div>

    <!-- Drawer container -->
    <nav
      ref="navRef"
      :class="[
        zClass,
        props.location === 'right' ? 'border-l' : 'border',
        'border-color-2 transform transition-transform duration-200 ease-in-out',
        containerBaseClasses,
        locationClass,
        railClass,
        expandedClass,
        color,
        widthClass,
        !isOpen && !permanent ? hiddenClass : 'translate-x-0',
      ]"
      :style="[zStyle, topPadding ? { paddingTop: topPadding + 'px' } : undefined]"
      :aria-hidden="!isOpen && !permanent"
      @click="onMouseEnter"

    >
      <div class="flex h-full flex-col" :style="{ minHeight: '100vh' }">
        <div class="flex items-center justify-between px-4 py-3">
          <slot name="prepend" v-if="showPrepend">
            <!-- Default prepend content: app title -->
            <span class="font-semibold">Menu</span>
          </slot>
          <div class="flex items-center gap-2">
            <slot name="append"></slot>
            <button v-if="!permanent && !temporary" :class="['pa-2']" aria-label="Toggle drawer">
              <!-- FIX: for better code -->
               <!-- d -->
              <Icon v-if="location === 'left' && !globalRtl && collapsed && !rail " name="chevron-right" class="fill-color-4" size="20" />
              <Icon v-if="location === 'left' && !globalRtl && !rail && !collapsed" name="chevron-left" class="fill-color-4" size="20" />

              <Icon v-if="location === 'right' && globalRtl && !rail && collapsed" name="chevron-left" class="fill-color-4" size="20" />
              <Icon v-if="location === 'right' && globalRtl && !rail && !collapsed" name="chevron-right" class="fill-color-4" size="20" />
              <!-- <Icon :name="locationIcon" size="20" /> -->
            </button>
            <button v-if="temporary" @click="close" :class="['ml-2 rounded p-2']" aria-label="Close drawer">
                <Icon name="x-mark" class="fill-color-4 hover:fill-color-3" size="20" />
            </button>
          </div>
        </div>

        <!-- If data-driven items provided, render grouped items and support filtering & ordering -->
        <div class="flex-1 overflow-auto">
          <div v-if="props.items">
            <div v-if="props.filterable && !(props.rail && collapsed)" class="px-3 py-2">
              <InputText prepend="magnifying-glass" label="Search" v-model="filterQuery" :placeholder="props.searchPlaceholder"  />
            </div>

            <div v-for="group in groupedItems" :key="group.group" :class="['py-2', collapsed ? 'py-1' : '']">
              <div
                v-if="group.group"
                :class="['group-header px-3 pt-3 pb-1 text-lg uppercase flex items-center justify-between', groupHeaderStyles, collapsed ? 'pt-1 pb-0 px-1' : '']"
                role="button"
                :tabindex="props.collapsibleGroups ? 0 : -1"
                @click.prevent="toggleGroup(group.group)"
                @keydown.enter.prevent="toggleGroup(group.group)"
                @keydown.space.prevent="toggleGroup(group.group)"
                :aria-expanded="isGroupOpen(group.group)"
              >
                <span class="flex items-center gap-2">
                  <template v-if="props.renderGroupParent">
                    <component
                      :is="props.groupParents && props.groupParents[group.group] && props.groupParents[group.group].href ? 'a' : 'button'"
                      :href="(props.groupParents && props.groupParents[group.group] && props.groupParents[group.group].href) || undefined"
                      class="group-parent flex items-center gap-3 px-0 py-0 w-full text-left"
                      @click.stop="e => onGroupParentClick(e, group.group)"
                      @keydown="e => onGroupParentKey(e, group.group)"
                    >
                      <span
                        v-if="props.groupParents && props.groupParents[group.group] && props.groupParents[group.group].icon"
                        class="mr-2"
                      >
                        <Icon :name="props.groupParents[group.group].icon" size="18" />
                      </span>
                      <span v-else-if="props.groupIcons && props.groupIcons[group.group]" class="mr-2">
                        <Icon :name="props.groupIcons[group.group]" size="18" />
                      </span>
                      <span v-if="!props.rail || !collapsed" :class="['text-lg uppercase', groupHeaderStyles]">
                        {{
                          (props.groupParents && props.groupParents[group.group] && props.groupParents[group.group].label) || group.group
                        }}
                      </span>
                    </component>
                  </template>
                  <template v-else>
                    <span v-if="props.groupIcons && props.groupIcons[group.group]" class="mr-2">
                      <Icon :name="props.groupIcons[group.group]" size="18" />
                    </span>
                    <span v-if="!props.rail || !collapsed" :class="['text-lg uppercase', groupHeaderStyles]">
                      {{ group.group }}
                    </span>
                  </template>
                </span>
                <button
                  v-if="props.collapsibleGroups && (!props.rail || !collapsed)"
                  @click.stop.prevent="toggleGroup(group.group)"
                  @keydown.enter.stop.prevent="toggleGroup(group.group)"
                  @keydown.space.stop.prevent="toggleGroup(group.group)"
                  :class="['px-2 py-1 rounded focus:outline-none', groupHeaderStyles]"
                  :style="{ opacity: 0.7 }"
                  :aria-expanded="isGroupOpen(group.group)"
                >
                  <Icon name="chevron-down" size="16" :class="{ 'rotate-180': isGroupOpen(group.group) }" />
                </button>
              </div>
              <ul :class="['py-1', collapsed ? 'py-0' : '']" v-show="isGroupOpen(group.group)">
                <SideBarItem
                  v-for="item in group.items"
                  :key="item.id"
                  :id="item.id"
                  :href="item.href"
                  :draggable="props.draggable && !item.disabled"
                  :dragging="String(draggingId) === String(item.id)"
                  :is-drag-over="String(dragOverId) === String(item.id)"
                  :drag-pos="dragOverPos"
                  @dragstart="handleDragStart"
                  @dragover="handleDragOver"
                  @dragleave="
                    e => {
                      if (String(dragOverId) === String(item.id)) {
                        dragOverId = null
                        dragOverPos = null
                      }
                    }
                  "
                  @drop="handleDrop"
                >
                  <Icon v-if="item.icon" :name="item.icon" size="20" class="rail-icon mr-2" />
                  <span class="rail-label">{{ item.label }}</span>
                </SideBarItem>
              </ul>
            </div>
          </div>
          <div v-else>
            <slot />
          </div>
        </div>

        <div class="px-4 py-3">
          <slot name="footer"></slot>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
  import { ref, watch, computed, onMounted, onBeforeUnmount, onUpdated, inject } from 'vue'
  import { nextTick } from 'vue'
  import Icon from '@/components/icons/Icon.vue'
  import SideBarItem from '@/components/defaults/SideBarItem.vue'
  import { globalRtl } from '@/lib/rtl/rtl'
import InputText from '../fields/InputText.vue'

//   const themeStyles = computed(() => ({
//     backgroundColor: 'var(--color-surface)',
//     color: 'var(--color-text)',
//     borderRight: '1px solid var(--color-border)',
//     boxShadow: 'var(--elevation-2)'
//   }))

//   const scrimThemeStyles = computed(() => ({
//     backgroundColor: 'var(--color-overlay)'
//   }))

//   const searchInputStyles = computed(() => ({
//     backgroundColor: 'var(--color-surface)',
//     color: 'var(--color-text)',
//     border: '1px solid var(--color-border)',
//     borderRadius: 'var(--radius-sm)'
//   }))

//   const hoverButtonStyles = 'hover:bg-[var(--color-surface)]'
//   const groupHeaderStyles = 'text-[var(--color-textSecondary)]'

  const props = defineProps({
    id: {
      type: String,
      default: () => `drawer-${Math.random().toString(36).slice(2, 9)}`
    },
    modelValue: { type: Boolean, default: false },
    permanent: { type: Boolean, default: false },
    temporary: { type: Boolean, default: false },
    persistent: { type: Boolean, default: false },
    rail: { type: Boolean, default: false },
    hoverExpand: { type: Boolean, default: false },
    isStuck: { type: Boolean, default: false },
    belowAppbar: { type: Boolean, default: false },
    location: { type: String, default: 'left' },
    // color: { type: String, default: 'bg-white dark:bg-gray-900' },
    color: { type: String },
    width: { type: [String, Number], default: 'w-64' },
    railWidth: { type: [String, Number], default: 'w-16' },
    closeOnScrimClick: { type: Boolean, default: true },
    expandOnHover: { type: Boolean, default: false },
    overlayAppBar: { type: Boolean, default: true }, // if false, drawer will appear under app bar
    zIndex: { type: [String, Number], default: undefined },
    appBarOffset: { type: Boolean, default: false },
    appBarHeight: { type: [String, Number], default: undefined },
    // data-driven items
    items: {
      type: Array,
      default: undefined
    },
    filterable: { type: Boolean, default: false },
    searchPlaceholder: { type: String, default: 'Search' },
    draggable: { type: Boolean, default: false },
    groupBy: {
      type: [String, Function],
      default: undefined
    },
    allowCrossGroupReorder: { type: Boolean, default: false },
    collapsibleGroups: { type: Boolean, default: true },
    groupDefaultOpen: { type: Boolean, default: true },
    groupIcons: {
      type: Object,
      default: undefined
    },
    renderGroupParent: { type: Boolean, default: false },
    groupParents: {
      type: Object,
      default: undefined
    }
  })

  const locationIcon = computed(() => {
    const isLeft = props.location === 'left'

    // Case 1: Rail + closed → always show expand icon
    if (props.rail && !props.modelValue && !hoverOpen.value) {
      return isLeft ? 'chevron-right' : 'chevron-left'
    }

    // Case 2: Rail + open but NOT hover-expanded → still expand icon
    if (props.rail && props.modelValue && !hoverOpen.value) {
      return isLeft ? 'chevron-right' : 'chevron-left'
    }

    // Case 3: Expanded rail OR normal drawer → collapse icon
    return isLeft ? 'chevron-left' : 'chevron-right'
  })

  const emit = defineEmits(['update:modelValue', 'open', 'close', 'update:items', 'reorder', 'group-toggle'])

  const internalOpen = ref(Boolean(props.modelValue))
  const navRef = ref(null)
  // local copy of items so we can reorder and filter
  const localItems = ref(props.items ? [...props.items] : [])
  const filterQuery = ref('')
  // sync prop items with local items
  watch(
    () => props.items,
    i => {
      localItems.value = props.items ? [...props.items] : []
    }
  )

  watch(
    () => props.overlayAppBar,
    v => {
      computeTopPadding()
    }
  )

  // derived filtered items
  const filteredItems = computed(() => {
    if (!props.items) return []
    if (!filterQuery.value || filterQuery.value.trim().length === 0) return localItems.value
    const q = filterQuery.value.toLowerCase()
    return localItems.value.filter(it => {
      const label = String(it.label || it.name || '')
      return label.toLowerCase().includes(q) || (it.tags && String(it.tags).toLowerCase().includes(q))
    })
  })

  // compute groups
  const groupedItems = computed(() => {
    if (!props.items) return []
    if (!props.groupBy) return [{ group: null, items: filteredItems.value }]
    const groups = {}
    const getter = typeof props.groupBy === 'function' ? props.groupBy : (it) => it[props.groupBy]
    filteredItems.value.forEach(it => {
      const key = getter(it) || 'Ungrouped'
      if (!groups[key]) groups[key] = []
      groups[key].push(it)
    })
    return Object.keys(groups).map(g => ({ group: g, items: groups[g] }))
  })

  // Track open/closed state for groups
  const groupOpenMap = ref({})

  // init or sync group states when groupedItems change
  watch(groupedItems, groups => {
    groups.forEach(g => {
      const key = String(g.group || 'Ungrouped')
      if (groupOpenMap.value[key] === undefined) {
        groupOpenMap.value[key] = Boolean(props.groupDefaultOpen)
      }
    })
  })

  function isGroupOpen(key) {
    if (!props.collapsibleGroups) return true
    const k = String(key || 'Ungrouped')
    return Boolean(groupOpenMap.value[k])
  }

  function toggleGroup(key) {
    if (!props.collapsibleGroups) return
    const k = String(key || 'Ungrouped')
    groupOpenMap.value[k] = !Boolean(groupOpenMap.value[k])
    emit('group-toggle', { group: key, open: groupOpenMap.value[k] })
  }

  function onGroupParentClick(e, key) {
    const parent = props.groupParents && key ? props.groupParents[key] : undefined
    if (!parent || !parent.href) {
      e.preventDefault()
      toggleGroup(key)
    }
  }

  function onGroupParentKey(e, key) {
    // Only toggle when Enter/Space and the group parent has no href (acting as a button)
    if (!key) return
    const parent = props.groupParents && key ? props.groupParents[key] : undefined
    if (!(e.key === 'Enter' || e.key === ' ')) return
    if (!parent || !parent.href) {
      e.preventDefault()
      e.stopPropagation()
      toggleGroup(key)
    }
  }

  // Normalize list items: wrap plain text nodes in `.rail-label` spans, mark icons with `.rail-icon` for consistent styling.
  function normalizeNavItems() {
    const nav = navRef.value
    if (!nav) return
    // If items are in a ul, normalize li elements. Otherwise, normalize anchors and buttons direct under nav
    const items = nav.querySelectorAll('li')
    items.forEach(li => {
      // Add rail-icon class to first svg or component
      const firstSvg = li.querySelector('svg')
      if (firstSvg && !firstSvg.classList.contains('rail-icon')) {
        firstSvg.classList.add('rail-icon')
      }

      // Wrap text nodes in .rail-label spans (if not already wrapped)
      const childNodes = Array.from(li.childNodes)
      childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent?.trim()
          if (text && text.length) {
            // create span. Avoid double-wrapping by checking parent
            const span = document.createElement('span')
            span.className = 'rail-label'
            span.textContent = text
            li.replaceChild(span, node)
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node
          // If element already is a label or icon, skip
          if (el.classList.contains('rail-label') || el.classList.contains('rail-icon')) return
          // If element contains text nodes, wrap them
          const subChildren = Array.from(el.childNodes)
          subChildren.forEach(sub => {
            if (sub.nodeType === Node.TEXT_NODE) {
              const txt = sub.textContent?.trim()
              if (txt && txt.length) {
                const span = document.createElement('span')
                span.className = 'rail-label'
                span.textContent = txt
                el.replaceChild(span, sub)
              }
            }
          })
        }
      })
    })

    // Normalize anchors directly under nav (wrap anchors/buttons directly under nav in an li)
    const directAnchors = nav.querySelectorAll(':scope > a, :scope > button')
    directAnchors.forEach(a => {
      // ensure role and class
      if (!a.classList.contains('nav-drawer-link')) a.classList.add('nav-drawer-link')
      const existingParent = a.parentElement
      if (existingParent && existingParent.tagName.toLowerCase() !== 'li') {
        const li = document.createElement('li')
        li.className = 'nav-drawer-item'
        existingParent.replaceChild(li, a)
        li.appendChild(a)
      }
    })
  }

  // Drag & drop helpers for data-driven items
  let draggingId = null
  let dragOverId = null
  let dragOverPos = null

  function findItemIndexById(id, arr = localItems.value) {
    if (id === null || id === undefined) return -1
    return arr.findIndex(it => String(it.id) === String(id))
  }

  function handleDragStart(ctx) {
    draggingId = ctx.id
  }

  function handleDragOver(ctx) {
    dragOverId = ctx.id
    // compute position relative to target element using event
    if (ctx.event && ctx.event.clientY !== undefined) {
      const el = document.querySelector(`[data-drawer-item-id='${ctx.id}']`)
      if (el) {
        const rect = el.getBoundingClientRect()
        const mid = rect.top + rect.height / 2
        dragOverPos = ctx.event.clientY < mid ? 'before' : 'after'
        // set CSS classes by forcing a reactivity value
      }
    } else {
      dragOverPos = 'after'
    }
  }

  function handleDrop(ctx) {
    // if no items are passed, nothing to do
    if (!props.items || !props.draggable) return
    const sourceId = ctx.sourceId !== undefined ? ctx.sourceId : draggingId
    const targetId = ctx.id
    if (!sourceId || !targetId) return
    if (String(sourceId) === String(targetId)) return

    const fromIndex = findItemIndexById(sourceId)
    const toIndex = findItemIndexById(targetId)
    if (fromIndex === -1 || toIndex === -1) return

    // move
    const copy = [...localItems.value]
    const [moved] = copy.splice(fromIndex, 1)
    copy.splice(toIndex, 0, moved)
    localItems.value = copy
    emit('update:items', copy)
    emit('reorder', { items: copy })
    // reset drag id & pos
    draggingId = null
    dragOverId = null
    dragOverPos = null
  }

  function handleOutsideClick(e) {
    if (!navRef.value) return
    if (!navRef.value.contains(e.target)) {
      onMouseLeave() // 👈 Trigger your function
    }
  }

  watch(
    () => props.modelValue,
    v => {
      internalOpen.value = Boolean(v)
      updateLayout()
    }
  )

  watch(
    () => props.permanent,
    v => {
      updateLayout()
    }
  )

  watch(internalOpen, v => {
    emit('update:modelValue', v)
    if (v) emit('open')
    else emit('close')
  })

  // compute open: if permanent -> always open
  const isOpen = computed(() => {
    if (props.permanent) return true
    return internalOpen.value
  })

  const toggleOpen = () => {
    if (props.permanent) return
    internalOpen.value = !internalOpen.value
  }

  const open = () => {
    if (props.permanent) return
    internalOpen.value = true
  }

  const close = () => {
    if (props.permanent) return
    internalOpen.value = false
  }

  const onScrimClick = () => {
    if (props.closeOnScrimClick) close()
  }

  // keyboard ESC to close for temporary/persistent
  const onKey = (e) => {
    if (e.key === 'Escape' && (props.temporary || props.persistent)) {
      close()
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', handleOutsideClick)
    // run normalization so rail mode works with existing markup
    normalizeNavItems()
  })

  onUpdated(() => {
    // re-run normalization when slot content or children update
    normalizeNavItems()
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKey)
    document.removeEventListener('click', handleOutsideClick)
    window.removeEventListener('resize', onWindowResize)
  })

  // Focus trap for temporary/persistent mode when open
  let focusTrapHandler = null
  function getFocusable(el) {
    const selectors = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    return Array.from(el.querySelectorAll(selectors))
  }

  watch(isOpen, open => {
    if (open && (props.temporary || props.persistent)) {
      const nav = navRef.value
      if (!nav) return
      const focusables = getFocusable(nav)
      if (focusables.length) {
        focusables[0].focus()
      } else {
        nav.setAttribute('tabindex', '-1')
        nav.focus()
      }

      focusTrapHandler = (e) => {
        if (e.key !== 'Tab') return
        const focusEls = getFocusable(nav)
        if (!focusEls.length) return
        const first = focusEls[0]
        const last = focusEls[focusEls.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
      document.addEventListener('keydown', focusTrapHandler)
    } else {
      if (focusTrapHandler) {
        document.removeEventListener('keydown', focusTrapHandler)
        focusTrapHandler = null
      }
    }
    // ensure nav items normalized on open state change (e.g., rail toggled)
    normalizeNavItems()
  })

  // hover expand behavior
  const hoverOpen = ref(false)

  const allowHoverExpand = computed(() => {
    // In rail mode, expand on hover is always enabled (UX requirement)
    if (props.rail) return true
    return Boolean(props.hoverExpand || props.expandOnHover)
  })

  let hoverTimeout = undefined

  const onMouseEnter = () => {
    if (allowHoverExpand.value) {
      hoverTimeout && window.clearTimeout(hoverTimeout)
      hoverOpen.value = true
    }
  }

  const onMouseLeave = () => {
    if (allowHoverExpand.value) {
      hoverTimeout = window.setTimeout(() => {
        hoverOpen.value = false
      }, 150)
    }
  }

  const collapsed = computed(() => props.rail && !hoverOpen.value)

  // classes
  const locationClass = computed(() => (props.location === 'right' ? 'right-0' : 'left-0'))
  const widthClass = computed(() => {
    if (collapsed.value) return typeof props.railWidth === 'number' ? `w-[${props.railWidth}px]` : String(props.railWidth)
    return typeof props.width === 'number' ? `w-[${props.width}px]` : String(props.width)
  })

  const containerBaseClasses = computed(() => {
    const base = ['fixed', 'h-full', 'overflow-hidden', 'flex', 'flex-col']
    if (props.isStuck) base.push('top-0')
    if (props.location === 'right') base.push('right-0')
    else base.push('left-0')
    if (props.rail) base.push('transition-all')
    watch(
      () => props.rail,
      v => {
        normalizeNavItems()
      }
    )
    return base.join(' ')
  })

  const railClass = computed(() => (props.rail ? 'drawer-rail' : ''))
  const expandedClass = computed(() => (props.rail && !collapsed.value ? 'drawer-expanded' : ''))
  const showPrepend = computed(() => !(props.rail && collapsed.value))

  const hiddenClass = computed(() => {
    if (props.location === 'right') return 'translate-x-full'
    return '-translate-x-full'
  })

  // z-index control for drawer and scrim
  const zClass = computed(() => {
    if (props.zIndex !== undefined && typeof props.zIndex === 'string') {
      // allow passing 'z-40' style classes
      if (props.zIndex.startsWith('z-')) return props.zIndex
    }
    return props.overlayAppBar ? 'z-50' : 'z-10'
  })

  const zStyle = computed(() => {
    if (props.zIndex !== undefined && typeof props.zIndex === 'number') {
      return { zIndex: props.zIndex }
    }
    return undefined
  })

  const scrimStyle = computed(() => {
    if (props.zIndex !== undefined && typeof props.zIndex === 'number') {
      return { zIndex: props.zIndex - 1 }
    }
    return undefined
  })

  // Calculate top padding so content appears below app bar if drawer sits behind it
  const topPadding = ref(0)
  const computeTopPadding = () => {
    if (!props.appBarOffset && props.overlayAppBar) {
      topPadding.value = 0
    //   console.log('No app bar offset, top padding set to 0')
      return
    }
    if (props.appBarHeight !== undefined && props.appBarHeight !== null) {
      if (typeof props.appBarHeight === 'number') topPadding.value = props.appBarHeight
      else if (typeof props.appBarHeight === 'string') {
        const px = Number(String(props.appBarHeight).replace(/px$/i, ''))
        topPadding.value = Number.isFinite(px) ? px : 0
      }
      console.log('Using provided appBarHeight for top padding:', topPadding.value)
      return
    }
    // detect appbar element
    if (typeof document !== 'undefined') {
      const el = document.querySelector('[data-component="appbar"]')
      if (!el) {
        topPadding.value = 0
        return
      }
      const rect = el.getBoundingClientRect()
      topPadding.value = Math.round(rect.height)
      console.log('Computed top padding for drawer:', topPadding.value)
    }
  }

  // compute initial padding
  computeTopPadding()
  // recompute on resize
  let resizeTimer = undefined
  const onWindowResize = () => {
    resizeTimer && window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(() => {
      computeTopPadding()
    }, 100)
  }
  onMounted(() => {
    window.addEventListener('resize', onWindowResize)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', onWindowResize)
  })

  const scrimClass = computed(() => {
    if (props.zIndex !== undefined && typeof props.zIndex === 'number') {
      // scrim will be one less than drawer z-index — but since we're using inline style, we won't set class
      return ''
    }
    return props.overlayAppBar ? 'z-40' : 'z-0'
  })

  // always allow overlay toggling for temporary models

  const layout = inject('layout', null)
  // const horizontalOffset = inject("horizontalOffset", ref(0));
  const el = ref(null)
  const w = ref(0)

  function updateLayout() {
    if (!el.value) return
    w.value = el.value.getBoundingClientRect().width

    if (layout && !props.rail) {
      layout.register('drawer', props.id, {
        mode: props.modelValue || props.permanent ? 'permanent' : 'rail',
        right: props.location === 'right' ? true : false,
        width: w.value
      })
    }
  }

  onMounted(() => {
    el.value = navRef.value
    updateLayout()

    const ro = new ResizeObserver(updateLayout)
    if (el.value) ro.observe(el.value)

    onBeforeUnmount(() => {
      ro.disconnect()
      if (layout) {
        layout.unregister('drawer', props.id)
      }
    })
  })
</script>

<style scoped>
  /* small helpers */
  .w-rail {
    width: var(--rail-width, 4rem);
  }

  /* rail mode: show icon only for items by hiding labels visually but keeping them accessible */
  .drawer-rail:not(.drawer-expanded) :deep(.rail-label) {
    /* sr-only (visually hidden but accessible) */
    position: absolute !important;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }

  .drawer-rail:not(.drawer-expanded) :deep(.rail-icon) {
    margin-right: 0 !important;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .drawer-rail:not(.drawer-expanded) :deep(ul li) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .drawer-rail:not(.drawer-expanded) :deep(ul li .rail-icon) {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  /* center group header icon when collapsed */
  .drawer-rail:not(.drawer-expanded) :deep(.group-header) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    min-height: auto;
  }

  .drawer-rail:not(.drawer-expanded) :deep(.group-header) .text-lg {
    display: none;
  }

  .drawer-rail:not(.drawer-expanded) :deep(.group-header) .mr-2 {
    margin-right: 0;
  }

  .drawer-rail:not(.drawer-expanded) :deep(.group-header) .gap-2 {
    gap: 0;
  }

  /* Reduce group container padding when collapsed */
  .drawer-rail:not(.drawer-expanded) :deep(.py-2) {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }

  .drawer-rail:not(.drawer-expanded) :deep(ul.py-1) {
    padding-top: 0;
    padding-bottom: 0;
  }

  .drawer-rail:not(.drawer-expanded) :deep(ul li) {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
  }

  /* rail label animation & transitions */
  .drawer-rail :deep(.rail-label) {
    opacity: 1;
    max-width: 1000px;
    transform: translateX(0);
  }

  .drawer-rail:not(.drawer-expanded) :deep(.rail-label) {
    opacity: 0 !important;
    /* visually hidden when collapsed */
    max-width: 0 !important;
    transform: translateX(-6px);
  }

  /* smooth container width transition */
  .drawer-rail {
    transition: width 700ms ease;
  }

  .drawer-expanded {
    transition: width 700ms ease;
  }

  /* rotate chevron with a smooth transition for toggle buttons */
  button[aria-expanded] :deep(svg) {
    transition: transform 700ms ease;
  }
</style>
