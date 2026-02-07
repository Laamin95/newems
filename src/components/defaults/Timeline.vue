<template>
  <div
    class="relative ui-text-color"
    :class="[
      direction === 'vertical' ? 'py-2' : 'py-6 px-2'
    ]"
  >
    <!-- Rail line -->
    <div
      :class="[
        'absolute top-0 bottom-0 w-0.5 bg-color-4',
        direction === 'vertical' && side === 'both' ? 'left-1/2 -translate-x-1/2' : '',
        direction === 'vertical' && side === 'one' ? (isRtl ? 'right-[7px]' : 'left-[7px]') : '',
        direction === 'horizontal' ? 'left-0 right-0 h-0.5 w-full' : 'h-full',
        lineStyle === 'dashed' ? 'timeline-dashed-line' : ''
      ]"
      :style="{
        top: direction === 'horizontal' ? `calc(24px + (${dotSizePx}px / 2))` : '0'
      }"
    ></div>

    <!-- Vertical items -->
    <div v-if="direction === 'vertical'" class="block">
      <div
        v-for="(item, i) in items"
        :key="item.id ?? i"
        :class="[
          'relative clear-both',
          condensed ? 'mb-3' : 'mb-6'
        ]"
      >
        <!-- Dot -->
        <div
          :class="[
            'absolute rounded-full border border-solid shadow-sm',
            statusColor(item),
            side === 'one' ? (isRtl ? 'right-0' : 'left-0') : 'left-1/2 -translate-x-1/2'
          ]"
          :style="{
            width: dotSizePx + 'px',
            height: dotSizePx + 'px',
            borderColor: 'var(--color-1)',
            top: '0.5rem'
          }"
        ></div>

        <!-- Content card -->
        <div
          :class="[
            'border border-color-2rounded-md py-3 px-4 transition-all',
            'align-' + align,
            clickable ? 'cursor-pointer hover:shadow-md' : '',
            elevation === 0 ? 'shadow-none' : elevation === 1 ? 'shadow-sm' : elevation === 2 ? 'shadow-md' : 'shadow-lg'
          ]"
          :style="{
            background: 'var(--color-2)',
            ...cardStyle(i)
          }"
          role="group"
          tabindex="0"
          @click="emit('item-click', { item, index: i })"
          @keydown.enter.prevent="emit('item-click', { item, index: i })"
          @keydown.space.prevent="emit('item-click', { item, index: i })"
        >
          <template v-if="hasItemSlot">
            <slot name="item" :item="item" :index="i" />
          </template>

          <template v-else-if="hasDefaultSlot">
            <slot :item="item" :index="i" />
          </template>

          <template v-else>
            <div v-if="item.title" class="font-semibold mb-1">{{ item.title }}</div>
            <div v-if="item.time" class="text-secondary text-xs mb-2">{{ item.time }}</div>
            <div v-if="item.content" class="text-sm">{{ item.content }}</div>
          </template>
        </div>
      </div>
    </div>

    <!-- Horizontal items -->
    <div v-else class="flex gap-6 items-start justify-between relative" :class="[equalizeCards ? 'items-stretch' : '']">
      <div
        v-for="(item, i) in items"
        :key="item.id ?? i"
        class="relative flex flex-col flex-1 pt-6"
      >
        <!-- Dot -->
        <div
          :class="[
            'absolute rounded-full border border-solid shadow-sm left-1/2 -translate-x-1/2 top-0',
            statusColor(item)
          ]"
          :style="{
            width: dotSizePx + 'px',
            height: dotSizePx + 'px',
            borderColor: 'var(--color-1)'
          }"
        ></div>

        <!-- Content card -->
        <div
          :class="[
            'border border-solid border-color rounded-md py-3 px-4 mt-4 transition-all',
            'align-' + align,
            elevation === 0 ? 'shadow-none' : elevation === 1 ? 'shadow-sm' : elevation === 2 ? 'shadow-md' : 'shadow-lg',
            equalizeCards ? 'flex-1' : ''
          ]"
          :style="{ background: 'var(--color-2)' }"
          role="group"
          tabindex="0"
          @click="emit('item-click', { item, index: i })"
          @keydown.enter.prevent="emit('item-click', { item, index: i })"
          @keydown.space.prevent="emit('item-click', { item, index: i })"
        >
          <template v-if="hasItemSlot">
            <slot name="item" :item="item" :index="i" />
          </template>
          <template v-else-if="hasDefaultSlot">
            <slot :item="item" :index="i" />
          </template>
          <template v-else>
            <div v-if="item.title" class="font-semibold mb-1">{{ item.title }}</div>
            <div v-if="item.time" class="text-secondary text-xs mb-2">{{ item.time }}</div>
            <div v-if="item.content" class="text-sm">{{ item.content }}</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, inject, useSlots } from 'vue'

  import { globalRtl } from '../../lib/rtl/rtl'
  const { language } = inject('i18n')

  const props = defineProps({
    items: {
      type: Array,
      default: () => []
    },
    direction: {
      type: String,
      default: 'vertical'
    },
    side: {
      type: String,
      default: 'both'
    },
    align: {
      type: String,
      default: 'start'
    },
    alternate: {
      type: Boolean,
      default: true
    },
    rtl: {
      type: Boolean,
      default: false
    },
    lineStyle: {
      type: String,
      default: 'solid'
    },
    dotShape: {
      type: String,
      default: 'circle'
    },
    dotSize: {
      type: String,
      default: 'lg'
    },
    clickable: {
      type: Boolean,
      default: false
    },
    condensed: {
      type: Boolean,
      default: false
    },
    elevation: {
      type: [Number, String],
      default: 1
    },
    equalizeCards: {
      type: Boolean,
      default: true
    },
    gap: {
      type: Number,
      default: 30
    }
  })

  const isRtl = computed(() => props.rtl ?? globalRtl.value)

  // Slots detection for card content customization
  const slots = useSlots()
  const hasItemSlot = computed(() => !!slots.item)
  const hasDefaultSlot = computed(() => !!slots.default)

  // Vertical line position and dot offsets
  const dotSizePx = computed(() => (props.dotSize === 'sm' ? 10 : props.dotSize === 'lg' ? 16 : 12))
  const gapPx = computed(() => props.gap ?? 16)

  function itemSide(index) {
    if (props.direction === 'horizontal') return 'bottom'
    if (props.side === 'one') {
      return isRtl.value ? 'right' : 'left'
    }
    const left = props.alternate ? index % 2 === 0 : true
    const logical = left ? 'left' : 'right'
    return isRtl.value ? (logical === 'left' ? 'right' : 'left') : logical
  }

  function cardStyle(index) {
    if (props.direction === 'horizontal') return {}
    if (props.side === 'one') {
      return {
        maxWidth: '100%',
        marginLeft: '0',
        marginRight: '0',
        marginInlineStart: gapPx.value + 'px',
        marginInlineEnd: '0'
      }
    }
    const side = itemSide(index)
    if (side === 'left') {
      return {
        maxWidth: '50%',
        marginLeft: '0',
        marginRight: 'calc(50% + 16px)'
      }
    }
    return {
      maxWidth: '50%',
      marginRight: '0',
      marginLeft: 'calc(50% + 16px)'
    }
  }

  function statusColor(item) {
    const s = item.status ?? 'default'
    switch (s) {
      case 'primary':
        return 'bg-primary'
      case 'success':
        return 'bg-success'
      case 'warning':
        return 'bg-warning'
      case 'error':
        return 'bg-error'
      case 'info':
        return 'bg-info'
      default:
        return 'bg-color-4'
    }
  }

  const emit = defineEmits(['item-click'])
</script>

<style scoped>
  .timeline-dashed-line {
    background-image: linear-gradient(180deg, currentColor 50%, transparent 50%);
    background-size: 2px 8px;
    background-repeat: repeat-y;
    background-color: transparent;
  }

  .timeline-dashed-line[style*="horizontal"] {
    background-image: repeating-linear-gradient(
      90deg,
      currentColor 0,
      currentColor 4px,
      transparent 4px,
      transparent 8px
    );
    background-size: auto;
    background-repeat: repeat-x;
  }

  .align-start {
    text-align: left;
  }

  .align-center {
    text-align: center;
  }

  .align-end {
    text-align: right;
  }

  :dir(rtl) .align-start {
    text-align: right;
  }

  :dir(rtl) .align-end {
    text-align: left;
  }
</style>
