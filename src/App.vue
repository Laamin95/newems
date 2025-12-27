<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="flex justify-center items-center mb-8 space-x-4">
    <a href="https://vite.dev" target="_blank" class="transition-transform hover:scale-105">
      <img src="/vite.svg" class="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank" class="transition-transform hover:scale-105">
      <img src="./assets/vue.svg" class="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#42b883aa]" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite Vue" />
</template>

<style scoped>
/* Custom styles can go here if needed */
</style>
