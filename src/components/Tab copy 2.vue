<template>
  <div
    ref="scrollContainer"
    :id="tabId"
    role="tablist"
    :dir="isRtl ? 'rtl' : 'ltr'"
    :aria-orientation="vertical ? 'vertical' : 'horizontal'"
    :aria-label="ariaLabel"
    @wheel.stop.prevent="!shouldScroll"
    :class="[vertical ? 'flex flex-row gap-6 h-full' : 'flex flex-col', contentHeightClass]"
  >
    <!-- TAB LIST -->
    <div
      ref="scrollContainer"
      role="tablist"
      :aria-orientation="vertical ? 'vertical' : 'horizontal'"
      :aria-label="ariaLabel"
      @wheel.prevent="!shouldScroll"
      :class="[
        'relative',
        shouldScroll ? 'flex-shrink-0' : 'flex-shrink',
        listOverflowClasses,
        getListClasses
      ]"
    >
      <div
        :class="[
          'flex',
          vertical
            ? 'flex-col space-y-1'
            : shouldScroll
              ? 'flex-row whitespace-nowrap'
              : 'flex-row flex-wrap',
          getListContainerClasses
        ]"
      >
        <button
          v-for="(tab, index) in tabsComputed"
          :key="index"
          :id="`tab-${tabId}-${index}`"
          role="tab"
          type="button"
          :aria-selected="activeTab === index"
          :aria-controls="`panel-${tabId}-${index}`"
          :tabindex="activeTab === index ? 0 : -1"
          :disabled="tab.disabled || disabled"
          :class="[
            'relative inline-flex items-center justify-center gap-2 transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
            'disabled:pointer-events-none disabled:opacity-50',
            getTabSizeClasses,
            getTabVariantClasses(index)
          ]"
          @click="selectTab(index)"
          @keydown="handleKeydown($event, index)"
        >
          <component v-if="tab.icon" :is="tab.icon" :class="getIconSizeClasses" />
          <span>{{ tab.label }}</span>

          <span
            v-if="tab.badge"
            :class="[
              'inline-flex items-center justify-center rounded-full text-xs font-medium',
              getBadgeSizeClasses,
              getBadgeClasses(tab)
            ]"
          >
            {{ tab.badge }}
          </span>
        </button>
      </div>
    </div>

    <!-- PANELS -->
    <div class="flex-1 min-w-0 min-h-0 overflow-auto">
      <template v-for="(tab, index) in tabsComputed" :key="index">
        <div
          v-show="activeTab === index"
          :id="`panel-${tabId}-${index}`"
          role="tabpanel"
          :aria-labelledby="`tab-${tabId}-${index}`"
          :class="getPanelClasses"
        >
          <slot :name="`content-${index}`" :tab="tab">
            {{ tab.content }}
          </slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { globalRtl } from '@/lib/rtl/rtl.ts'

/* ───── props ───── */
const props = defineProps({
  tabs: { type: Array, required: true },
  modelValue: { type: Number, default: 0 },
  variant: { type: String, default: 'default' },
  size: { type: String, default: 'default' },
  vertical: Boolean,
  disabled: Boolean,
  scrollable: Boolean,
  contentHeight: String,
  ariaLabel: { type: String, default: 'Tabs' }
})

const emit = defineEmits(['update:modelValue', 'change'])

/* ───── state ───── */
const tabsComputed = computed(() => props.tabs)
const activeTab = ref(props.modelValue)
const tabId = `tabs-${Math.random().toString(36).slice(2)}`
const scrollContainer = ref(null)

/* ───── computed ───── */
const isRtl = computed(() => globalRtl.value)
const shouldScroll = computed(() => props.scrollable && !props.vertical)
const contentHeightClass = computed(() => props.contentHeight || '')

const listOverflowClasses = computed(() =>
  shouldScroll.value
    ? props.vertical ? 'overflow-y-auto' : 'overflow-x-auto'
    : 'overflow-visible'
)

/* ───── class helpers ───── */
const getListClasses = computed(() => 'inline-flex rounded-lg bg-color-2 p-1')
const getListContainerClasses = computed(() => '')
const getTabSizeClasses = computed(() =>
  props.size === 'sm' ? 'px-2 py-1 text-xs' :
  props.size === 'lg' ? 'px-4 py-2 text-base' :
  'px-3 py-2 text-sm'
)

const getIconSizeClasses = computed(() => 'h-4 w-4')
const getBadgeSizeClasses = computed(() => 'h-5 min-w-5 px-1 text-xs')
const getBadgeClasses = () => 'bg-primary text-white'

const getTabVariantClasses = (index) =>
  activeTab.value === index
    ? 'bg-color-1 ui-text-color shadow'
    : 'ui-text-secondary hover:bg-color-3'

const getPanelClasses = computed(() => 'mt-4')

/* ───── logic ───── */
const selectTab = (index) => {
  if (props.tabs[index]?.disabled) return
  activeTab.value = index
  emit('update:modelValue', index)
  emit('change', index)

  if (!shouldScroll.value) return
  nextTick(() => {
    const el = document.getElementById(`tab-${tabId}-${index}`)
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center' })
  })
}

const handleKeydown = (e, i) => {
  if (e.key === 'ArrowRight') selectTab((i + 1) % props.tabs.length)
  if (e.key === 'ArrowLeft') selectTab((i - 1 + props.tabs.length) % props.tabs.length)
}

watch(() => props.modelValue, v => activeTab.value = v)
</script>
