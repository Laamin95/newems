<template>
  <div :class="[containerClass, width]">
    <Base
      v-bind="$props"
      :persistent-hint="!!hint"
      :error="computedErrors.length > 0"
      :is-open="dragActive"
      :clearable="false"
    >
      <template #control="{ attrs }">
        <div
          :class="dropzoneClasses"
          :aria-disabled="disabled"
          role="button"
          tabindex="0"
          @click="openFileDialog"
          @keydown.enter.prevent="openFileDialog"
          @keydown.space.prevent="openFileDialog"
          @dragenter.prevent="onDragEnter"
          @dragover.prevent="onDragOver"
          @dragleave.prevent="onDragLeave"
          @drop.prevent="onDrop"
        >
          <input
            :id="attrs.id"
            ref="inputRef"
            type="file"
            :accept="accept"
            :multiple="multiple"
            class="hidden"
            :disabled="disabled"
            :readonly="attrs.readonly"
            :required="attrs.required"
            @change="onFileChange"
          >

          <div class="w-full flex items-center gap-2 sm:gap-3 flex-wrap ">

            <Icon name="arrow-up-tray" size="16" />
            <!-- <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5 text-input-text flex-shrink-0"
            >
              <path d="M3 15a4 4 0 014-4h3v2H7a2 2 0 000 4h10a2 2 0 100-4h-3v-2h3a4 4 0 110 8H7a4 4 0 01-4-4z" />
              <path d="M12 4a1 1 0 011 1v8a1 1 0 11-2 0V5a1 1 0 011-1z" />
              <path d="M8.293 8.293a1 1 0 011.414 0L12 10.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
            </svg> -->
            <div class=" ">
              <div class="text-sm text-input-text truncate">
                <span class="font-medium">Click to upload</span> or drag and drop
              </div>
              <div class="text-xs text-input-text mt-1 hidden sm:block ">
                {{ helpText }}
              </div>
            </div>
          </div>
          <Button
            type="button"
            size="xs"
            :disabled="disabled"
            :rounded="rounded"
            class="px-3 py-1.5 text-sm text-primaryText"
          >
            Browse
          </Button>
        </div>
      </template>
    </Base>

    <!-- Selected files list -->
    <div
      v-if="files.length"
      class="mt-2 space-y-2"
    >
    <!-- -->
      <div
        v-for="(f, idx) in files"
        :key="f._id"
        :class="['flex items-center gap-3 p-2 border bg-color-1 ', border, rounded ? roundedMap[rounded] : 'rounded-md']"
      >
        <div
          v-if="showPreview && isImage(f.file)"
          class="w-10 h-10 overflow-hidden rounded-md border border-color-2 flex-shrink-0"
        >
          <img
            :src="f.preview"
            alt="preview"
            class="w-full h-full object-cover"
            loading="lazy"
          >
        </div>
        <div class="min-w-0">
          <div class="text-sm text-input-text truncate">
            {{ f.file.name }}
          </div>
          <div class="text-xs text-input-text opacity-80">
            {{ formatSize(f.file.size) }}
          </div>
        </div>
        <button
          type="button"
          class="text-input-text hover:text-input-focus"
          @click="removeAt(idx)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Base from '@/components/fields/Base.vue'
import { roundedMap } from '@/lib/componentConfig'
import Button from '@/components/buttons/Button.vue'
import Icon from '@/components/icons/Icon.vue'

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  label: { type: [String, Object] },
  hint: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  errorMessages: { type: Array, default: () => [] },
  prepend: { type: String, default: '' },
  append: { type: String, default: '' },
  size: { type: String, },
  rounded: { type: String },
  border: { type: String, default: 'border-color-2' },
  textColor: { type: String, default: 'ui-text-secondary' },
  bg: { type: String, default: 'bg-color-1' },
  width: { type: String, default: 'w-full' },

  multiple: { type: Boolean, default: true },
  accept: { type: String, default: '' },
  maxSizeMB: { type: Number, default: 2 },
  showPreview: { type: Boolean, default: true },
})

const emit = defineEmits(['update:modelValue', 'change', 'error', 'select', 'drop', 'remove'])

const inputRef = ref(null)
const dragActive = ref(true)
const containerClass = ref('')

const files = ref([]) // [{ file: File, preview: string|null, _id: string }]
const componentErrors = ref([])

const computedErrors = computed(() => {
  const external = Array.isArray(props.errorMessages) ? props.errorMessages : []
  const internal = Array.isArray(componentErrors.value) ? componentErrors.value : []
  return [...external, ...internal]
})

watch(
  () => props.modelValue,
  (val) => {
    // accept external v-model updates
    files.value = toInternal(val)
  },
  { immediate: true }
)

function toInternal(list) {
  const arr = Array.isArray(list) ? list : []
  return arr.map((f) => ({ file: f.file ?? f, preview: f.preview ?? null, _id: genId() }))
}

function genId() {
  return Math.random().toString(36).slice(2)
}

const dropzoneClasses = computed(() => [
  'w-full h-full flex items-center justify-between',
  'gap-2 sm:gap-3 px-2 sm:px-3',
  'cursor-pointer select-none transition',
  'bg-input-background',
])

const helpText = computed(() => {
  const acc = props.accept && props.accept.length ? props.accept : 'any file'
  return `${props.multiple ? 'Upload multiple ' : 'Upload '}(${acc}) • Max ${props.maxSizeMB}MB each`
})

function openFileDialog() {
  if (props.disabled || props.readonly) return
  inputRef.value?.click()
}

function onFileChange(e) {
  if (!e.target.files) return
  const list = Array.from(e.target.files)
  addFiles(list)
  // reset input so same file can be selected again
  e.target.value = ''
}

function onDragEnter() {
  if (props.disabled) return
  dragActive.value = true
}

function onDragOver() {
  if (props.disabled) return
  dragActive.value = true
}

function onDragLeave() {
  dragActive.value = false
}

function onDrop(e) {
  dragActive.value = false
  if (props.disabled) return
  const dt = e.dataTransfer
  const list = dt ? Array.from(dt.files || []) : []
  emit('drop', list)
  addFiles(list)
}

function addFiles(list) {
  componentErrors.value = []
  const accepted = []
  const maxBytes = props.maxSizeMB * 1024 * 1024
  const acceptSet = parseAccept(props.accept)

  for (const f of list) {
    if (f.size > maxBytes) {
      componentErrors.value.push(`${f.name} exceeds ${props.maxSizeMB}MB`)
      emit('error', { type: 'size', file: f })
      continue
    }
    if (acceptSet.size && !matchesAccept(f, acceptSet)) {
      componentErrors.value.push(`${f.name} type not allowed`)
      emit('error', { type: 'type', file: f })
      continue
    }
    accepted.push(f)
  }

  if (!accepted.length) return

  const prepared = accepted.map((f) => ({ file: f, preview: createPreview(f), _id: genId() }))
  const next = props.multiple ? files.value.concat(prepared) : prepared.slice(0, 1)
  files.value = next
  emit('select', accepted)
  emit('update:modelValue', next.map((x) => ({ file: x.file, preview: x.preview })))
  emit('change', next.map((x) => x.file))
}

function createPreview(file) {
  if (!isImage(file)) return null
  try {
    return URL.createObjectURL(file)
  } catch {
    return null
  }
}

function isImage(file) {
  return /^image\//.test(file.type)
}

function removeAt(index) {
  const removed = files.value.splice(index, 1)
  emit('remove', removed[0]?.file)
  emit('update:modelValue', files.value.map((x) => ({ file: x.file, preview: x.preview })))
  emit('change', files.value.map((x) => x.file))
}

function parseAccept(accept) {
  const set = new Set()
  if (!accept) return set
  accept
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .forEach((token) => set.add(token.toLowerCase()))
  return set
}

function matchesAccept(file, set) {
  if (!set || !set.size) return true
  const type = file.type.toLowerCase()
  const ext = file.name.toLowerCase().split('.').pop()
  for (const token of set) {
    if (token.includes('/')) {
      // e.g., image/* or image/png
      const [major, minor] = token.split('/')
      const [ftMajor, ftMinor] = type.split('/')
      if (minor === '*') {
        if (major === ftMajor) return true
      } else if (token === type) {
        return true
      }
    } else if (token.startsWith('.')) {
      if (ext && token.slice(1) === ext) return true
    }
  }
  return false
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(1)} KB`
  const mb = kb / 1024
  return `${mb.toFixed(2)} MB`
}
</script>

<style scoped>
</style>
