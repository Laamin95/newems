<template>
  <SnackbarContainer />
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
</template>

<script setup>
import { ref } from 'vue'
import Layout from '@/components/defaults/Layout.vue'
import AppBar from '@/components/AppBar.vue'
import NavBar from '@/components/defaults/NavBar.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import SnackbarContainer from '@/components/defaults/SnackbarContainer.vue'
// import { drawerOpen } from '@/lib/drawerState.ts'
import Icon from '@/components/icons/Icon.vue'
import { globalRtl } from '@/lib/rtl/rtl.ts';

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