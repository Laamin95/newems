<template>
  <div class="fixed inset-0 pointer-events-none z-50">
    <!-- Top Position Snackbars -->
    <div class="fixed top-4 left-0 right-0 flex flex-col gap-2 px-4 pointer-events-none">
      <SnackbarItem
        v-for="snackbar in topSnackbars"
        :key="snackbar.id"
        :snackbar="snackbar"
        class="pointer-events-auto"
      />
    </div>

    <!-- Bottom Position Snackbars -->
    <div class="fixed bottom-4 left-0 right-0 flex flex-col gap-2 px-4 pointer-events-none">
      <SnackbarItem
        v-for="snackbar in bottomSnackbars"
        :key="snackbar.id"
        :snackbar="snackbar"
        class="pointer-events-auto"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getSnackbars } from '@/lib/useSnackbar'
import SnackbarItem from './SnackbarItem.vue'

const snackbars = computed(() => getSnackbars())

const topSnackbars = computed(() => 
  snackbars.value.filter(s => s.options.position === 'top')
)

const bottomSnackbars = computed(() => 
  snackbars.value.filter(s => s.options.position !== 'top')
)
</script>
