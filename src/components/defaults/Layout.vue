<template>
  <div class="min-h-screen w-full  bg-bg-color">
    <!-- Sidebar Slot -->
    <slot name="sidebar" />

    <!-- AppBar Slot -->
    <slot name="appbar" />
    
    <!-- Main Content -->
    <main 
      class=""
      :style="mainStyles"
    >
        <div class="w-full mx-auto p-4">
          <slot />
        </div>
        <!-- <router-view /> -->
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  appBarHeight: { type: [String, Number], default: 64 },
  navWidth: { type: String, default: '64px' },
  navLocation: { type: String, default: 'left' },
  navPermanent: { type: Boolean, default: false },
  navTemporary: { type: Boolean, default: false },
  navRail: { type: Boolean, default: false }
})

const mainStyles = computed(() => {
  const styles = {}
  
  // Top padding for AppBar
  if (props.appBarHeight) {
    const height = typeof props.appBarHeight === 'number' 
      ? `${props.appBarHeight}px` 
      : props.appBarHeight
    styles.paddingTop = height
  }
  
  // Side margin ONLY for permanent or rail NavBar (NOT temporary)
  const shouldShift = (props.navPermanent || props.navRail) && !props.navTemporary
  
  if (shouldShift && props.navWidth) {
    if (props.navLocation === 'right') {
      styles.marginRight = props.navWidth
    } else {
      styles.marginLeft = props.navWidth
    }
  }
  
  return styles
})
</script>