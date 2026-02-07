<template>
  <div
    :class="[
      'border overflow-hidden transition-all duration-300',
      border,
      rounded ? roundedMap[rounded] : '',
      containerClass
    ]"
    :style="containerStyle"
  >
    <!-- Expansion Items -->
    <div
      v-for="(item, index) in items"
      :key="item.id ?? index"
      :class="[
        'border-b ui-border-color last:border-b-0 transition-all',
        activeIndex === index && 'bg-color-1'
      ]"
    >
      <!-- Header -->
      <button
        @click="toggleItem(index)"
        @keydown.enter.prevent="toggleItem(index)"
        @keydown.space.prevent="toggleItem(index)"
        :aria-expanded="activeIndex === index"
        :aria-controls="`panel-${index}`"
        class="w-full flex items-center justify-between px-6 py-4 text-left transition-all hover:bg-color-1"
        :class="[
          activeIndex === index ? 'bg-color-1' : 'bg-color-2',
          clickable && 'cursor-pointer'
        ]"
      >
        <!-- Left Icon (optional) -->
        <div v-if="hasLeftIcon" class="flex-shrink-0 mr-3">
          <slot name="left-icon" :item="item" :index="index">
            <div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
              {{ index + 1 }}
            </div>
          </slot>
        </div>

        <!-- Title & Description -->
        <div class="flex-1 min-w-0">
          <h3 class="font-semibold ui-text-color truncate">
            {{ item.title }}
          </h3>
          <p v-if="item.subtitle" class="text-sm ui-text-secondary truncate mt-1">
            {{ item.subtitle }}
          </p>
        </div>

        <!-- Right Content (optional) -->
        <div v-if="item.badge || item.rightIcon" class="flex-shrink-0 ml-4 flex items-center gap-2">
          <!-- Badge -->
           <ChipGroup
            v-if="item.badge"
            :chips="item.badge"
            size="small"
            class="px-2 py-1 text-xs font-medium rounded-full"
            />

          <!-- Right Icon -->
          <div v-if="item.rightIcon" class="text-ui-text-secondary">
            <i :class="['text-lg', item.rightIcon]" />
          </div>
        </div>

        <!-- Chevron Icon -->
        <Icon
          name="chevron-down"
          type="outline"
          size="16"
          :class="['transition-transform duration-200', activeIndex === index ? 'rotate-180' : '', 'text-input-border']"
        />
      </button>

      <!-- Content -->
      <Transition
        name="expand"
        @enter="onEnter"
        @leave="onLeave"
      >
        <div
          v-if="activeIndex === index"
          :id="`panel-${index}`"
          class="overflow-hidden"
        >
          <div class="px-6 py-4 border-t border-color bg-color-2 text-ui-text-color">
            <!-- Slot Content -->
            <slot name="content" :item="item" :index="index">
              {{ item.content }}
            </slot>

            <!-- Action Buttons (optional) -->
            <div v-if="item.actions || $slots.actions" class="flex gap-2 mt-4 pt-4 border-t border-color">
              <slot name="actions" :item="item" :index="index">
                <button
                  v-for="action in item.actions"
                  :key="action.label"
                  @click="handleAction(action, item, index)"
                  :class="[
                    'px-4 py-2 text-sm font-medium rounded-md transition-all',
                    actionButtonClass(action.variant)
                  ]"
                >
                  {{ action.label }}
                </button>
              </slot>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
    import { ref, computed, useSlots } from 'vue'
    import { roundedMap, useLanguageSelected, sizes } from '../../lib/componentConfig'
    import { ChipGroup } from '../../'

  const props = defineProps({
    items: {
      type: Array,
      required: true,
      validator: (items) => Array.isArray(items) && items.length > 0
    },
    modelValue: { type: [Number, Array], default: 0 },
    exclusive: { type: Boolean, default: true },
    clickable: { type: Boolean, default: true },
    elevation: { type: [Number, String], default: 1 },
    rounded: { type: String, default: 'lg' },
    flat: { type: Boolean, default: false },
    containerClass: { type: String, default: '' },
    containerStyle: { type: Object, default: () => ({}) },
    hasLeftIcon: { type: Boolean, default: false },
    border: { type: String, default: 'ui-border-color ' },
    rounded: { type: String, default: 'd' }

  })

  const emit = defineEmits(['update:modelValue', 'change', 'action-click'])

  const slots = useSlots()

  // State
  const internalActiveIndex = ref(props.modelValue)

  // Computed
  const activeIndex = computed({
    get: () => props.exclusive ? internalActiveIndex.value : props.modelValue,
    set: (value) => {
      internalActiveIndex.value = value
      emit('update:modelValue', value)
    }
  })

  // Methods
  function toggleItem(index) {
    if (!props.clickable) return

    if (props.exclusive) {
      activeIndex.value = activeIndex.value === index ? -1 : index
    } else {
      const newValue = Array.isArray(activeIndex.value) ? [...activeIndex.value] : []
      const idx = newValue.indexOf(index)
      if (idx > -1) {
        newValue.splice(idx, 1)
      } else {
        newValue.push(index)
      }
      activeIndex.value = newValue
    }

    emit('change', {
      index,
      item: props.items[index],
      active: activeIndex.value === index
    })
  }

  function handleAction(action, item, index) {
    emit('action-click', {
      action: action.id || action.label,
      item,
      index
    })
    if (action.callback) {
      action.callback(item, index)
    }
  }

  function badgeClass(badge) {
    const variants = {
      primary: 'bg-primary/20 text-primary',
      success: 'bg-success/20 text-success',
      warning: 'bg-warning/20 text-warning',
      error: 'bg-error/20 text-error',
      info: 'bg-info/20 text-info',
      default: 'bg-color-3 text-ui-text-color'
    }
    return variants[badge.variant || 'default'] || variants.default
  }

  function actionButtonClass(variant) {
    const classes = {
      primary: 'bg-primary text-white hover:bg-primary/90',
      secondary: 'bg-color-3 text-ui-text-color hover:bg-color-4',
      outline: 'border border-color text-ui-text-color hover:bg-color-1',
      ghost: 'text-primary hover:bg-color-1',
      danger: 'bg-error text-white hover:bg-error/90'
    }
    return classes[variant || 'secondary'] || classes.secondary
  }

  function onEnter(el) {
    el.style.height = '0'
    el.offsetHeight // Trigger reflow
    el.style.height = el.scrollHeight + 'px'
  }

  function onLeave(el) {
    el.style.height = '0'
  }
</script>

<style scoped>
  /* Expansion animation */
  .expand-enter-active,
  .expand-leave-active {
    @apply transition-all duration-300 overflow-hidden;
  }

  .expand-enter-from,
  .expand-leave-to {
    @apply opacity-0;
  }

  /* Smooth transitions */
  button {
    transition-property: background-color, color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
  }

  button:active {
    @apply scale-95;
  }

  /* Focus states */
  button:focus-visible {
    @apply outline-none ring-2 ring-primary ring-offset-2;
  }
</style>