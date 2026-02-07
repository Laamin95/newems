<template>
  <Teleport to="body">
    <Transition :name="transitionName">
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
        <div v-if="closebutton" class="absolute top-4 right-4 z-50">
            <Button icon="x-mark" variant="outlined" color="gray" size="xl" @click="show = false"/>
        </div>
        <!-- Overlay -->
        <div
          class="absolute inset-0 transition-opacity duration-300 bg-black/30 backdrop-blur-sm"
          :class="overlayClass"
          @click="attemptClose"
        />

        <!-- Modal using Card -->
        <Transition :name="transitionName">
          <Card
            v-if="show"
            :title="title"
            :card-class="[
              fullscreen ? 'h-screen w-full rounded-none' : 'mx-4 sm:max-w-lg max-h-screen',
              modalClass,
              shake && 'animate-shake'
            ]"
            :bg="cardBg"
            :text-color="bodyTextColor"
            :rounded="rounded"
            :border="border"
            :header-class="headerClass"
            :footer-class="footerClass"
            @click.stop
          >
            <!-- Header slot from parent -->
            <template v-if="$slots.header" #header>
              <slot name="header" />
            </template>

            <!-- Body/Content slot from parent -->
            <div class="flex-1 overflow-x-hidden" :class="contentClass">
                <slot />
            </div>

            <!-- Footer slot from parent -->
            <template v-if="$slots.footer" #footer>
              <slot name="footer" />
            </template>
          </Card>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
  import { computed, ref, onMounted, onBeforeUnmount } from 'vue'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    persistent: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: 'center'
    },
    overlayClass: {
      type: String,
      default: ''
    },
    modalClass: {
      type: String,
      default: ''
    },
    headerClass: {
      type: String,
      default: ''
    },
    contentClass: {
      type: String,
      default: ''
    },
    footerClass: {
      type: String,
      default: ''
    },
    headerTextSize: {
      type: String,
      default: 'text-lg font-semibold'
    },
    cardBg: {
      type: String,
      default: 'ui-bg-color'
    },
    rounded: {
      type: String
    },
    border: {
      type: String,
      default: 'ui-border-color'
    },
    bodyTextColor: {
      type: String,
    },
    closebutton: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['update:modelValue'])

  const show = computed({
    get: () => props.modelValue,
    set: v => emit('update:modelValue', v)
  })

  const shake = ref(false)

  function attemptClose() {
    if (props.persistent) {
      shake.value = true
      setTimeout(() => (shake.value = false), 400)
      return
    }
    show.value = false
  }

  function onEsc(e) {
    if (e.key === 'Escape' && show.value && !props.persistent) {
      attemptClose()
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', onEsc)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', onEsc)
  })

  const transitionName = computed(() => {
    return `${props.transition ?? 'center'}`
  })
</script>

