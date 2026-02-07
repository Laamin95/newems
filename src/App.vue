<template>
  <!-- <SnackbarContainer /> -->
  <Layout
    :app-bar-height="64"
    :nav-width="navWidth"
    nav-location="left"
    :nav-permanent="isPermanent"
    :nav-temporary="isTemporary"
    :nav-rail="isRail"
  >
    <template #appbar>
      <AppBar
      id="appbar"
      title="My Awesome Dashboard"
      title-align="center"
      title-class="text-lg font-bold text-indigo-600"
      :drawer="true"
      :menu="true"
      fixed
      :dense="isDense"
      color="bg-color-1"
      elevation="4"
      bd="border-b border-color-3"
      p="px-4"
      :rtl="rtl || isRtl"
      :overflow-actions="overflowActions"
      :collapse-on-scroll="collapse"
      :z-index="50"
      custom-class=""
      @toggle-drawer="drawerOpen = !drawerOpen"
    >
        <!-- AppBar content -->
         <template #title>
          <div class="flex items-center gap-2 text-gray-500">
            <Icon
              name="bug-ant"
              size="22"
              class=" fill-yellow-500"
            />
            <span class="font-bold text-xl">App Name</span>
          </div>
        </template>

        <!-- NAV -->
        <template #nav>
          <button class="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700">
            Home
          </button>
          <button class="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700">
            About
          </button>
          <button class="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700">
            Contact
          </button>
        </template>

        <!-- ACTIONS -->
        <template #actions>
          <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">
            <Icon
              name="bell"
              type="outline"
              size="22"
            />
          </button>

          <button class="hidden md:block p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">
            <Icon
              name="cog-6-tooth"
              type="outline"
              size="22"
            />
          </button>
          <ThemeToggle />
        </template>
        <!-- MOBILE NAV -->
        <template #mobile-nav>
          <button class="block w-full px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700">
            Dashboard
          </button>
          <button class="block w-full px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700">
            Analytics
          </button>
          <button class="block w-full px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700">
            Users
          </button>
        </template>
      </AppBar>
    </template>
    
    <template #sidebar>
      <NavBar
        v-model="drawerOpen"
        v-model:rail-expanded="railExpanded"
        :temporary="isTemporary"
        :permanent="isPermanent"
        :rail="isRail"
        :app-bar-offset="64"
        title="My App"
        :items="navItems"
        expand-on-hover
        filterable
        @update:width="onNavWidthChange"
      />
    </template>
    
    <!-- Main Content -->
    <router-view />

  </Layout>
   <div class="fixed inset-0 pointer-events-none z-[9999]">
      <!-- Bottom snackbars -->
      <div class="fixed bottom-4 left-0 right-0 flex flex-col items-center gap-2">
        <Snackbar
          v-for="sb in bottomSnackbars"
          :key="sb.id"
          v-model="sb.isVisible"
          :message="sb.options.message"
          :title="sb.options.title"
          :variant="sb.options.variant"
          :icon="sb.options.icon"
          :action="sb.options.action"
          :timeout="sb.options.timeout"
          :position="sb.options.position"
          :closeable="sb.options.closeable"
          :showProgress="sb.options.showProgress"
          :multiline="sb.options.multiline"
          class="pointer-events-auto"
          @close="sb.close"
          @action="sb.options.onAction"
        />
      </div>

      <!-- Top snackbars -->
      <div class="fixed top-4 left-0 right-0 flex flex-col items-center gap-2">
        <Snackbar
          v-for="sb in topSnackbars"
          :key="sb.id"
          v-model="sb.isVisible"
          :message="sb.options.message"
          :title="sb.options.title"
          :variant="sb.options.variant"
          :icon="sb.options.icon"
          :action="sb.options.action"
          :timeout="sb.options.timeout"
          :position="sb.options.position"
          :closeable="sb.options.closeable"
          :showProgress="sb.options.showProgress"
          :multiline="sb.options.multiline"
          class="pointer-events-auto"
          @close="sb.close"
          @action="sb.options.onAction"
        />
      </div>
  </div>
</template>

<script setup>
import { ref, computed, provide, watch   } from 'vue'
import { Layout, AppBar, NavBar, ThemeToggle, Snackbar } from './index.js'
import Icon from '@/components/icons/Icon.vue'
import { globalRtl } from '@/lib/rtl/rtl.ts';
import { useSnackbar } from '@/lib/useSnackbar'


const snackbarAPI = useSnackbar()

// Provide globally
provide('useSnackbar', snackbarAPI)

watch(() => snackbarAPI.snackbars.value, (newVal) => {
  console.log('Snackbars updated:', newVal)
}, { deep: true })

// Computed snackbar lists
const bottomSnackbars = computed(() => {
  const filtered = snackbarAPI.snackbars.value.filter(s => s.options.position === 'bottom')
  console.log('Bottom snackbars:', filtered)
  return filtered
})

const topSnackbars = computed(() => {
  const filtered = snackbarAPI.snackbars.value.filter(s => s.options.position === 'top')
  console.log('Top snackbars:', filtered)
  return filtered
})

// for AppBar
  const rtl = ref(false)
  const isRtl = ref(false)
  const isDense = ref(false)
  const collapse = ref(false)

  // NavBar mode - change these to test different behaviors
const drawerOpen = ref(true)
const railExpanded = ref(false)
const navWidth = ref('64px')
const isPermanent = ref(true)   // Set to true for permanent mode
const isTemporary = ref(false)  // Set to true for temporary mode (overlay)
const isRail = ref(true)        // Set to true for rail mode


const navItems = [
  { id: 1, label: 'Dashboard', icon: 'home', active: true },
  { id: 2, label: 'Users', icon: 'users', badge: '5' },
  { id: 3, label: 'Settings', icon: 'cog', children: [
    { id: 31, label: 'Profile', icon: 'user' },
    { id: 32, label: 'Security', icon: 'shield-check' }
  ]}
]

  const overflowActions = [
    {
      label: 'Profile',
      icon: 'UserIcon',
      onClick: () => alert('Profile clicked')
    },
    {
      label: 'Settings',
      icon: 'Cog6ToothIcon',
      onClick: () => alert('Settings clicked')
    },
    {
      label: 'Sign out',
      icon: 'ArrowRightStartOnRectangleIcon',
      onClick: () => alert('Logout clicked')
    }
  ]

const onNavWidthChange = (width) => {
  navWidth.value = width
}
</script>