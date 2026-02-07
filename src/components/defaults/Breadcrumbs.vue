<template>
  <nav
    :aria-label="ariaLabel"
    :class="[
      'flex items-center',
      containerClass
    ]"
    :style="containerStyle"
  >
    <ol
      :class="[
        'flex items-center flex-wrap',
        sizeClasses,
        gapClasses
      ]"
    >
      <!-- Home Icon (optional) -->
      <li v-if="showHome" class="flex items-center">
        <a
          :href="homeHref"
          @click.prevent="handleClick({ label: 'Home', href: homeHref, icon: homeIcon }, 0)"
          :class="[
            'inline-flex items-center transition-colors',
            linkClasses,
            'hover:text-primary'
          ]"
        >
          <i :class="[homeIcon, 'text-current']" />
        </a>
        <span :class="['mx-2', separatorClasses]">
          <i v-if="separatorIcon" :class="separatorIcon" />
          <span v-else>{{ separator }}</span>
        </span>
      </li>

      <!-- Breadcrumb Items -->
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center"
      >
        <!-- Custom Slot -->
        <slot name="item" :item="item" :index="index" :is-last="index === items.length - 1">
          <!-- Link (not last item or disabled) -->
          <a
            v-if="index !== items.length - 1 && !item.disabled"
            :href="item.href || '#'"
            @click.prevent="handleClick(item, index)"
            :class="[
              'inline-flex items-center gap-2 transition-colors',
              linkClasses,
              'hover:text-primary',
              item.class
            ]"
          >
            <i v-if="item.icon" :class="[item.icon, 'text-current']" />
            <span>{{ item.label }}</span>
          </a>

          <!-- Current/Last Item -->
          <span
            v-else
            :class="[
              'inline-flex items-center gap-2',
              activeClasses,
              item.disabled && 'opacity-50 cursor-not-allowed',
              item.class
            ]"
            :aria-current="index === items.length - 1 ? 'page' : undefined"
          >
            <i v-if="item.icon" :class="[item.icon, 'text-current']" />
            <span :class="truncate && 'truncate max-w-[200px]'">{{ item.label }}</span>
          </span>
        </slot>

        <!-- Separator (not last item) -->
        <span
          v-if="index !== items.length - 1"
          :class="['mx-2', separatorClasses]"
          aria-hidden="true"
        >
          <slot name="separator">
            <i v-if="separatorIcon" :class="separatorIcon" />
            <span v-else>{{ separator }}</span>
          </slot>
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    validator: (items) => items.every(item => item.label)
  },
  separator: {
    type: String,
    default: '/'
  },
  separatorIcon: {
    type: String,
    default: ''
  },
  showHome: {
    type: Boolean,
    default: false
  },
  homeIcon: {
    type: String,
    default: 'fas fa-home'
  },
  homeHref: {
    type: String,
    default: '/'
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'muted', 'bold'].includes(v)
  },
  truncate: {
    type: Boolean,
    default: false
  },
  ariaLabel: {
    type: String,
    default: 'Breadcrumb'
  },
  containerClass: {
    type: String,
    default: ''
  },
  containerStyle: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['click', 'item-click'])

// Size classes
const sizeClasses = computed(() => {
  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }
  return sizes[props.size] || sizes.md
})

// Gap classes
const gapClasses = computed(() => {
  const gaps = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3'
  }
  return gaps[props.size] || gaps.md
})

// Link classes
const linkClasses = computed(() => {
  const variants = {
    default: 'text-ui-text-secondary hover:underline',
    muted: 'text-ui-text-secondary/70 hover:text-ui-text-secondary hover:underline',
    bold: 'text-ui-text-color font-medium hover:underline'
  }
  return variants[props.variant] || variants.default
})

// Active/current item classes
const activeClasses = computed(() => {
  const variants = {
    default: 'text-ui-text-color font-medium',
    muted: 'text-ui-text-secondary',
    bold: 'text-ui-text-color font-semibold'
  }
  return variants[props.variant] || variants.default
})

// Separator classes
const separatorClasses = computed(() => {
  return 'text-ui-text-secondary/50'
})

// Methods
const handleClick = (item, index) => {
  if (item.disabled) return
  
  emit('item-click', { item, index })
  emit('click', { item, index })
}
</script>

<style scoped>
/* Smooth transitions */
a {
  transition-property: color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Focus states */
a:focus-visible {
  @apply outline-none ring-2 ring-primary ring-offset-2 rounded;
}

/* Truncate text */
.truncate {
  display: inline-block;
}
</style>