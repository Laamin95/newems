<template>
  <header
    ref="el"
    data-component="appbar"
    :dir="rtl ? 'rtl' : 'ltr'"
    :class="[
      'w-full flex flex-col transition-transform duration-300 bg-color-1',
      appBarZClass,
      fixed ? 'fixed top-0 left-0' : floating ? 'absolute top-0 left-1/2 -translate-x-1/2 rounded-xl shadow-lg' : 'relative',
      elevationClass,
      hidden ? 'hidden' : '',
      color,
      bd,
      p,
      m,
      customClass,
      densityClass,
      collapseClass
    ]"
    :style="[customStyle, appBarZStyle]"
  >
    <div :class="['max-w-7xl mx-auto w-full flex items-center justify-between', innerDirectionClass, dense ? 'h-12' : 'h-16']">
      <!-- DYNAMIC REGION ORDER -->
      <template v-for="region in orderedRegions" :key="region">
        <!-- PREPEND -->
        <template v-if="region === 'prepend'">
          <div :class="['flex items-center', prependClass]">
            <slot name="prepend" />

            <!-- drawer/menu button -->
            <button
              
              @click="$emit('toggle-drawer')"
              class="inline-flex items-center justify-center .vts-pa-2 rounded-md"
            >
              <slot name="drawer-icon">
                <Icon name="bars-3" size="24" color="text-gray-600" />
              </slot>
            </button>

            <!-- TITLE -->
            <div :class="['flex-shrink-0 flex items-center', titleMarginClass, titleAlignClass]">
              <slot name="title">
                <span :class="['font-semibold', titleClass]">{{ title }}</span>
              </slot>
            </div>
          </div>
        </template>

        <!-- NAV -->
        <template v-if="region === 'nav'">
          <nav :class="navClass">
            <slot name="nav" />
          </nav>
        </template>

        <!-- ACTIONS -->
        <template v-if="region === 'actions'">
          <div :class="['flex items-center', actionsSpaceClass]">
            <slot name="actions" />

            <!-- Overflow actions -->
            <div v-if="overflowActions.length" class="relative">
              <button @click="toggleOverflow" class="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10">
                <Icon name="ellipsis-vertical" size="20" />
              </button>

              <div v-if="isOverflowOpen" :class="['absolute vts-mt-2 w-40 rounded shadow-lg z-50 bg-color-1', overflowPositionClass]">
                <ul>
                  <li v-for="(action, i) in overflowActions" :key="i">
                    <button @click="action.onClick" class=" w-full flex gap-2 text-left px-4 py-2 hover:bg-color-2">
                      <span v-if="action.icon" class="mr-2">
                        <Icon :name="action.icon" />
                      </span>
                      {{ action.label }}
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <slot name="append" />
          </div>
        </template>
      </template>
    </div>

    <!-- MOBILE NAV -->
    <div v-show="isOpen" class="md:hidden vts-border-sm" :style="{ backgroundColor: 'var(--vts-color-surfaceElevated)', borderColor: 'var(--vts-color-divider)' }">
      <div class="vts-px-2 vts-pt-2 vts-pb-3 vts-space-y-1">
        <slot name="mobile-nav" />
      </div>
    </div>
  </header>
</template>

<script setup>
  import { ref, computed, onMounted, onBeforeUnmount, inject } from 'vue'
  import Icon from '@/components/icons/Icon.vue'
  import { globalRtl } from '@/lib/rtl/rtl'

//   const themeStyles = computed(() => ({
//     backgroundColor: 'var(--vts-color-surfaceElevated)',
//     color: 'var(--vts-color-text)',
//     boxShadow: props.elevation ? `var(--vts-elevation-${props.elevation})` : props.shadow ? 'var(--vts-shadow-md)' : undefined,
//     borderBottom: '1px solid var(--vts-color-border)'
//   }))

  const props = defineProps({
    id: {
      type: String,
      default: () => `appbar-${Math.random().toString(36).slice(2, 9)}`
    },

    title: String,
    titleAlign: { type: String, default: 'left' },
    titleClass: String,

    fixed: Boolean,
    floating: Boolean,

    elevation: [String, Number],
    shadow: String, // kept for compatibility

    color: String,
    bd: { type: String, default: 'border-b border-color-3' },
    p: { type: String, default: '' },
    m: { type: String, default: '' },
    hidden: { type: Boolean, default: false },
    customClass: { type: String, default: '' },
    customStyle: { type: [String, Object], default: '' },

    zIndex: { type: [String, Number], default: undefined },

    drawer: Boolean,
    menu: Boolean,
    overflowActions: { type: Array, default: () => [] },

    rtl: { type: Boolean, default: globalRtl.value },

    dense: Boolean,
    collapseOnScroll: Boolean
  })

  const layout = inject('layout', null)
  const el = ref(null)
  const height = ref(0)

  function updateHeight() {
    if (!el.value) return
    height.value = el.value.getBoundingClientRect().height
    if (layout)
      layout.register('appBar', props.id, {
        height: height.value,
        dense: props.dense
      })
  }

  onMounted(() => {
    updateHeight()
    const ro = new ResizeObserver(updateHeight)
    if (el.value) ro.observe(el.value)

    if (props.collapseOnScroll) window.addEventListener('scroll', onScroll, { passive: true })

    onBeforeUnmount(() => {
      ro.disconnect()
      if (props.collapseOnScroll) window.removeEventListener('scroll', onScroll)
      if (layout) layout.unregister('appBar', props.id)
    })
  })

  let lastScroll = 0
  const collapseClass = ref('')

  function onScroll() {
    const y = window.scrollY
    const delta = y - lastScroll
    lastScroll = y

    if (y > 0 && delta > 0) collapseClass.value = '-translate-y-12 opacity-95'
    else collapseClass.value = ''
  }

  const orderedRegions = computed(() => (props.rtl ? ['actions', 'nav', 'prepend'] : ['prepend', 'nav', 'actions']))

  const innerDirectionClass = computed(() => (props.rtl ? 'flex-row-reverse' : 'flex-row'))

  const prependClass = computed(() => (props.rtl ? 'mr-2' : ''))
  const titleMarginClass = computed(() => (props.rtl ? 'mr-2' : 'ml-2'))

  const titleAlignClass = computed(() => {
    const a = props.titleAlign
    const RTL = props.rtl

    if (RTL)
      return {
        center: 'justify-center text-center w-full',
        left: 'justify-end text-right w-full',
        right: ''
      }[a]

    return {
      center: 'justify-center text-center w-full',
      right: 'justify-end text-right w-full',
      left: ''
    }[a]
  })

  const navClass = computed(() =>
    props.rtl ? 'hidden md:flex md:mr-6 md:space-x-4 items-center' : 'hidden md:flex md:ml-6 md:space-x-4 items-center'
  )

  const actionsSpaceClass = computed(() => (props.rtl ? 'space-x-2 space-x-reverse' : 'space-x-2'))

  const overflowPositionClass = computed(() => (props.rtl ? 'left-0' : 'right-0'))

  const isOverflowOpen = ref(false)
  const toggleOverflow = () => (isOverflowOpen.value = !isOverflowOpen.value)

  const elevationClass = computed(() => {
    if (props.shadow) return props.shadow
    if (props.elevation) return `shadow-${props.elevation}`
    return ''
  })

  const appBarZClass = computed(() => {
    if (typeof props.zIndex === 'string' && props.zIndex.startsWith('z-')) return props.zIndex
    return 'z-30'
  })
  const appBarZStyle = computed(() => (typeof props.zIndex === 'number' ? { zIndex: props.zIndex } : undefined))

  const densityClass = computed(() => (props.dense ? 'py-1' : ''))

  const isOpen = ref(false)
</script>
