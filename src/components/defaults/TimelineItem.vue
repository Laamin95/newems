<template>
  <div class="v-timeline-item">
    <!-- Opposite -->
    <div class="v-timeline-item__opposite py-2 px-4">
      <slot name="opposite" />
    </div>

    <!-- Dot -->
    <div v-if="!hideDot" class="v-timeline-item__dot rounded-full mt-3" :style="{ background: color }">
      <slot name="icon">
        <span v-if="icon" class="v-timeline-item__icon">{{ icon }}</span>
      </slot>
    </div>

    <!-- Content -->
    <div class="v-timeline-item__content py-2 px-4 rounded-md">
      <slot />
    </div>
  </div>
</template>

<script setup>
  import { computed, inject } from 'vue'

  const timeline = inject('timeline', null)

  const props = defineProps({
    color: {
      type: String,
      default: 'var(--color-primary)'
    },
    icon: {
      type: String,
      default: null
    },
    dot: {
      type: Boolean,
      default: true
    },
    hideDot: {
      type: Boolean,
      default: false
    }
  })

  const classes = computed(() => ({
    'v-timeline-item': true,
    'v-timeline-item--alternate': timeline?.align === 'alternate'
  }))
</script>

<style scoped>
  .v-timeline-item {
    display: flex;
    position: relative;
    min-height: 48px;
  }

  .v-timeline-item__opposite,
  .v-timeline-item__content {
    width: 45%;
  }

  .v-timeline-item__dot {
    width: 20px;
    height: 20px;
    position: relative;
    z-index: 1;
  }

  .v-timeline-item__icon {
    color: white;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .v-timeline-item__content {
    background: var(--color-2);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }
</style>
