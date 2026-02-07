<template>
  <div class="flex gap-2">
    <Button color="primary" @click="basic = true">Open Basic Modal</Button>
    <Button color="primary" @click="persistent = true">Open Persistent Modal</Button>
    <Button color="primary" @click="bottom = true">Open Bottom Sheet</Button>
    <Button color="primary" @click="fullscreen = true">Open Fullscreen Modal</Button>

    <!-- <Card class="p-4 flex-1" :style="{ backgroundColor: 'var(--vts-color-surface)', borderColor: 'var(--vts-color-border)' }">
      <h2 class="text-lg font-semibold mb-2" :style="headingStyles">Overlay Example</h2>
      <p class="faruma" :style="textStyles">
        This example demonstrates different types of modals using the Overlay component.
        You can open a basic modal, a persistent modal that cannot be closed by clicking outside,
        a bottom sheet that slides up from the bottom, and a fullscreen modal that occupies the entire viewport.
      </p>
    </Card> -->
    <!-- Basic -->
    <Overlay v-model="basic"  
        title="Basic Modals"
        closebutton
    >
      <!-- <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold" :style="headingStyles">Basic Modal</h2>
          <Button color="primary" @click="basic = false">Close</Button>
        </div>
      </template> -->
      <p :style="textStyles">Click outside or press ESC to close.</p>
      <template #footer>
         <Button color="primary" @click="basic = false">Close</Button>
      </template>
    </Overlay>

    <!-- Persistent -->
    <Overlay v-model="persistent" persistent closebutton>
        <template #header>
            <div class="px-4 pt-2">
                <h2 class="text-lg font-semibold faruma" :style="headingStyles">ތަޅުވާ މޮޑެލް</h2>
            </div>
        </template>
        <p class="faruma" :style="textStyles">ތެޅެންޔާ ތަޅުވާނެ</p>
        <template #footer>
            <Button class="faruma" color="primary" @click="persistent = false">ފަހިމްތި</Button>
        </template>
    </Overlay>

    <!-- Bottom sheet -->
    <Overlay v-model="bottom" transition="bottom" modal-class="rounded">
      <template #header>
        <div class="px-4 pt-2">
            <h2 class="text-lg font-semibold" :style="headingStyles">Header</h2>
        </div>
      </template>
      <p class="mb-4 faruma" :style="textStyles">ސްކްރޯލް</p>
      <div class="space-y-2">
        <p v-for="i in 60" :key="i" class="faruma" :style="textStyles">ވަރަށް ގިނަ ބައިވަރު އެކި އެކި ލިޔުންލިޔަން ހިތާ ހިތާ {{ i }}</p>
      </div>

      <template #footer>
        <h2 class="text-lg font-semibold" :style="headingStyles">Footer</h2>
      </template>
    </Overlay>

    <!-- Fullscreen -->
    <Overlay v-model="fullscreen" fullscreen 
        transition="right"
        title="Fullscreen Modal"
        closebutton
    >
      <!-- <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold" :style="headingStyles">Fullscreen Modal</h2>
          <Button color="primary" @click="fullscreen = false">Close</Button>
        </div>
      </template> -->
      <p :style="textStyles">Slides in from the right and occupies full viewport.</p>
      <template #footer>
        <Button color="primary" @click="fullscreen = false">Close</Button>
      </template>
    </Overlay>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { Overlay } from '../..'

  const basic = ref(false)
  const persistent = ref(false)
  const bottom = ref(false)
  const fullscreen = ref(false)

  const headingStyles = computed(() => ({
    color: 'var(--vts-color-text)'
  }))

  const textStyles = computed(() => ({
    color: 'var(--vts-color-text)'
  }))
</script>

<style scoped>
  /* Styles are now applied via theme tokens in template */
</style>
