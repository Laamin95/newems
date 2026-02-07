<script setup>
import { provide } from 'vue'
import { useSnackbar } from '@/lib/useSnackbar'
import Snackbar from './Snackbar.vue'

const snackbar = useSnackbar()
provide('useSnackbar', snackbar)
</script>

<template>
  <slot />
  
  <!-- Render all active snackbars -->
  <div class="fixed inset-0 pointer-events-none z-[9999]">
    <!-- Bottom snackbars -->
    <div class="fixed bottom-4 left-0 right-0 flex flex-col items-center gap-2">
      <Snackbar
        v-for="sb in snackbar.snackbars.value.filter(s => s.options.position === 'bottom')"
        :key="sb.id"
        v-model="sb.isVisible.value"
        v-bind="sb.options"
        class="pointer-events-auto"
        @close="sb.close"
        @action="sb.options.onAction"
      />
    </div>

    <!-- Top snackbars -->
    <div class="fixed top-4 left-0 right-0 flex flex-col items-center gap-2">
      <Snackbar
        v-for="sb in snackbar.snackbars.value.filter(s => s.options.position === 'top')"
        :key="sb.id"
        v-model="sb.isVisible.value"
        v-bind="sb.options"
        class="pointer-events-auto"
        @close="sb.close"
        @action="sb.options.onAction"
      />
    </div>
  </div>
</template>