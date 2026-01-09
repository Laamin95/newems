<template>

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
            <!-- PREPEND -->
        <!-- <template #prepend>
          <button
            class="hidden md:inline-flex items-center gap-1 px-3 py-1 rounded-md bg-indigo-100 hover:bg-indigo-200 text-indigo-700 dark:bg-indigo-900 dark:hover:bg-indigo-800"
          >
            <Icon
              name="home"
              size="20"
            />
            HOME
          </button>
        </template> -->

        <!-- TITLE (custom slot) -->
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

        <!-- APPEND -->
        <!-- <template #append>
          <button class="px-3 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
            ލޮގްއައުޓް
          </button>
        </template> -->

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
      <NavBar
        v-model="drawerOpen"
        :temporary="false"
        :permanent="true"
        :persistent="false"
        title="My App"
        :items="[
          { id: 1, label: 'Dashboard', icon: 'home', active: true },
          { id: 2, label: 'Users', icon: 'users', badge: '5' },
          { id: 3, label: 'Settings', icon: 'cog', children: [
            { id: 31, label: 'Profile', icon: 'user' },
            { id: 32, label: 'Security', icon: 'shield-check' }
          ]}
        ]"
        :rail="true"
        :rail-expanded="true"
        expand-on-hover
        filterable
      />
      <!-- <SideBar
        v-model="drawerOpen"
        v-model:items="sampleItems"
        :temporary="temporary"
        :rail="rail"
        :hover-expand="hoverExpand"
        :persistent="persistent"
        :permanent="permanent"
        :location="location"
        :is-stuck="isStuck"
        :filterable="true"
        :group-by="'group'"
        ref="el"
        :draggable="true"
        search-placeholder="Search..."
        :group-icons="{
          Settings: 'cog-8-tooth',
          Reports: 'document',
          Users: 'cog'
        }"
        color="bg-color-1"
        width="w-64"
        rail-width="w-16"
        :close-on-scrim-click="true"
        :overlay-app-bar="overlayAppBar"
        :z-index="zIndex"
        :app-bar-offset="appBarOffset"
      >
        <template #prepend>
          <div class="px-3 py-2 text-sm font-semibold">
            މިފިނި
          </div>
        </template>

        <template #default>
          
        </template>

        <template #footer>
          <NavDrawerItem
            class=""
            href="#/"
          >
            <HeroIcon
              name="arrow-uturn-left"
              size="20"
            />

            <label class="flex items-center gap-2">
              <input
                v-model="rtl"
                type="checkbox"
              >
              RTL mode
            </label>

            <ThemeToggle />
          </NavDrawerItem>
        </template>
      </SideBar> -->
  <!-- Router View -->
   <svg  class="fill-black stroke-2 w-3" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 389.24">
      <path fill-rule="nonzero" d="M0 0h275.1v50.04H0V0zm361.79 115.14 54.44 54.44H0v50.04h416.2l-54.41 54.41 35.39 35.39L512 194.6v-.03l-35.39-35.36-79.43-79.46-35.39 35.39zM0 339.2h275.1v50.04H0V339.2z"/>
  </svg>
  <router-view />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRtl } from '@/composables/useRtl';
import { globalRtl } from '@/lib/rtl/rtl.ts';
import AppBar from '@/components/AppBar.vue';
import Icon from '@/components/icons/Icon.vue';
import { drawerOpen } from '@/lib/drawerState.ts';
import ThemeToggle from '@/components/ThemeToggle.vue';
// import SideBar from '@/components/defaults/SideBar.vue';
import type { S } from 'vue-router/dist/router-CWoNjPRp.mjs';
import NavBar from './components/defaults/NavBar.vue';

// for AppBar
  const rtl = ref(false)
  const isRtl = ref(false)
  const isDense = ref(false)
  const collapse = ref(false)
  const isOpen = ref(false)

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


//for SideBar
const temporary = ref(false)
  const rail = ref(true)
  const hoverExpand = ref(true)
  const persistent = ref(false)
  const permanent = ref(false)
  const isStuck = ref(true)
  const location = ref(globalRtl.value ? 'right' : 'left')
  const overlayAppBar = ref(true)
  const zIndex = ref(undefined)
  const appBarOffset = ref(false)

  const sampleItems = ref([
    { id: 1, label: 'admin', href: '#/', group: 'Settings' },
    { id: 2, label: 'users', href: '#/users', group: 'Users' },
    { id: 3, label: 'reports', href: '#/reports', group: 'Reports' },
    { id: 4, label: 'settings', href: '#/settings', group: 'Settings' }
  ])

</script>


<style scoped>
/* Custom styles can go here if needed */
</style>
