<script setup lang="ts">
  import { computed } from 'vue'
  import { isSameDay, isToday } from 'date-fns'
  import { useCalendar } from './useCalendar.ts'

  const props = defineProps<{
    value?: any
    minDate?: Date
    maxDate?: Date
    disabledDate?: (date: Date) => boolean
  }>()

  const emit = defineEmits<{
    (e: 'select', v: Date): void
  }>()

  const calendar = useCalendar(new Date())
  const days = computed(() => calendar.daysInView())

  function disabled(d: Date) {
    if (props.minDate && d < props.minDate) return true
    if (props.maxDate && d > props.maxDate) return true
    return props.disabledDate?.(d)
  }
</script>

<template>
  <div role="grid" class="dp-calendar">
    <button
      v-for="d in days"
      :key="d.toISOString()"
      role="gridcell"
      :disabled="disabled(d)"
      :class="{
        today: isToday(d),
        selected: isSameDay(d, value)
      }"
      @click="emit('select', d)"
    >
      {{ d.getDate() }}
    </button>
  </div>
</template>
