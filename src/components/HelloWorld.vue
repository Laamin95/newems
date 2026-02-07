

<template>
  <div class="w-full">
    <div class="flex items-center justify-center gap-8 mb-8 flex-wrap">
      <h1 class="m-0 text-5xl font-bold text-gray-900 dark:text-white">{{ msg }}</h1>
      <ThemeToggle />
    </div>

    <InputText 
      v-model="inputValue"
      label="Your Label"
      placeholder="Enter text..."
      :disabled="false" 
    />

    <div class="p-8 bg-color-1 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-900 transition-all duration-300 mb-6">
      <button 
        type="button" 
        @click="count++" 
        class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 mb-4"
      >
        count is {{ count }}
      </button>
      <p class="text-gray-600 dark:text-gray-400">
        Edit
        <code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono">components/HelloWorld.vue</code> 
        to test HMR
      </p>
    </div>

    <p class="mb-4 text-gray-700 dark:text-gray-300">
      Check out
      <a 
        href="https://vuejs.org/guide/quick-start.html#local" 
        target="_blank"
        class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
      >
        create-vue
      </a>
      , the official Vue + Vite starter
    </p>
    <p class="mb-4 text-gray-700 dark:text-gray-300">
      Learn more about IDE Support for Vue in the
      <a
        href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
        target="_blank"
        class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
      >
        Vue Docs Scaling up Guide
      </a>
      .
    </p>
    <p class="text-gray-500 dark:text-gray-400">Click on the Vite and Vue logos to learn more</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ThemeToggle from './defaults/ThemeToggle.vue'
import InputText from '@/components/fields/InputText.vue'

defineProps<{ msg: string }>()
 const inputValue = ref('');
const count = ref(0)
</script>

<style scoped>
@media (max-width: 640px) {
  .flex-wrap > h1 {
    order: 1;
  }
  .flex-wrap > * {
    order: 2;
  }
  .flex-wrap {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
