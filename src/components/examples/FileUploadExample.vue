<template>
  <Card :title="'File Upload'" class="mb-4">
    <div class="space-y-3">
      <File
        v-model="files"
        label="Upload files"
        hint="Images allowed, max 2MB each"
        :accept="'image/*,.pdf'"
        :max-size-mb="2"
        :multiple="true"
        
      />

      <div v-if="files.length" class="mt-2">
        <div class="text-sm text-input-text mb-1">Selected:</div>
        <ul class="space-y-1">
          <li v-for="(f, i) in files" :key="i" class="text-xs text-input-text">{{ f.file.name }} — {{ formatSize(f.file.size) }}</li>
        </ul>
      </div>
    </div>
  </Card>
</template>

<script setup>
  import { ref } from 'vue'
  import { File } from '../../'

  const files = ref([])

  function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`
    const kb = bytes / 1024
    if (kb < 1024) return `${kb.toFixed(1)} KB`
    const mb = kb / 1024
    return `${mb.toFixed(2)} MB`
  }
</script>

<style scoped></style>
