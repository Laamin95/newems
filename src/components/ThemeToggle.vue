<template>
  <button 
    @click="toggleTheme" 
    class="flex items-center justify-center w-10 h-10 p-2 bg-transparent rounded-full cursor-pointer transition-all duration-300 ease-in-out text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105 focus:outline-none "
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <svg v-if="isDark" class="w-5 h-5 transition-transform duration-300 ease-in-out hover:rotate-15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Sun icon -->
      <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
      <path d="m12 2 0 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="m12 20 0 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="m4.93 4.93 1.41 1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="m17.66 17.66 1.41 1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="m2 12 2 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="m20 12 2 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="m6.34 17.66-1.41 1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="m19.07 4.93-1.41 1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
    <svg v-else class="w-5 h-5 transition-transform duration-300 ease-in-out hover:rotate-15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Moon icon -->
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" fill="currentColor"/>
    </svg>
    <span class="sr-only">{{ isDark ? 'Switch to light mode' : 'Switch to dark mode' }}</span>
  </button>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const isDark = ref(false)

// Initialize theme from localStorage or system preference
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  applyTheme()
})

// Watch for theme changes and apply them
watch(isDark, () => {
  applyTheme()
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
})

const applyTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const toggleTheme = () => {
  isDark.value = !isDark.value
}

</script>



<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.hover\:rotate-15:hover {
  transform: rotate(15deg);
}
</style>
