<template>
  <li
    :data-drawer-item-id="id"
    :draggable="draggable"
    :class="[
      'nav-drawer-item flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors',
      'hover:bg-color-2',
      dragging ? 'opacity-50' : '',
      isDragOver && dragPos === 'before' ? 'border-t-2 border-primary' : '',
      isDragOver && dragPos === 'after' ? 'border-b-2 border-primary' : ''
    ]"
    @dragstart="onDragStart"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
    @click="onClick"
  >
    <a v-if="href" :href="href" class="flex items-center w-full">
      <slot />
    </a>
    <template v-else>
      <slot />
    </template>
  </li>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: [String, Number], default: '' },
  href: { type: String, default: '' },
  draggable: { type: Boolean, default: false },
  dragging: { type: Boolean, default: false },
  isDragOver: { type: Boolean, default: false },
  dragPos: { type: String, default: null }
})

const emit = defineEmits(['dragstart', 'dragover', 'dragleave', 'drop', 'click'])

const onDragStart = (e) => {
  if (!props.draggable) return
  e.dataTransfer.setData('text/plain', String(props.id))
  emit('dragstart', { id: props.id, event: e })
}

const onDragOver = (e) => {
  if (!props.draggable) return
  emit('dragover', { id: props.id, event: e })
}

const onDragLeave = (e) => {
  emit('dragleave', { id: props.id, event: e })
}

const onDrop = (e) => {
  const sourceId = e.dataTransfer.getData('text/plain')
  emit('drop', { id: props.id, sourceId, event: e })
}

const onClick = (e) => {
  emit('click', { id: props.id, event: e })
}
</script>

<style scoped>
.nav-drawer-item {
  list-style: none;
}
</style>