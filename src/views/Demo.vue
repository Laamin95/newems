<template>
  <div class="p-4 ui-bg-color">
    <Tab
      v-model="activeTab10"
      :tabs="tabsData"
      variant="default"
      vertical
    >
      <template #content-0><ButtonExample /></template>
      <!-- <template #content-1><CheckboxExample /></template>   issue is here -->
      <template #content-2><SwitchExample /></template>
      <template #content-3><RadioExample /></template>
      <!-- <template #content-4><InputTextExample /></template>  issue here -->
      <!-- <template #content-5><DatePickerExample /></template> here also -->
      <!-- <template #content-6><SelectExample /></template> -->
      <!-- <template #content-7><InputNumberExample /></template> -->
    </Tab>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Tab from '@/components/Tab.vue'
import CheckboxExample from '@/components/examples/CheckboxExample.vue'
import SwitchExample from '@/components/examples/SwitchExample.vue'
import RadioExample from '@/components/examples/RadioExample.vue'
import ButtonExample from '@/components/examples/ButtonExample.vue'
import InputTextExample from '@/components/examples/InputTextExample.vue'
import DatePickerExample from '@/components/examples/DatePickerExample.vue'
import SelectExample from '@/components/examples/SelectExample.vue'
import InputNumberExample from '@/components/examples/InputNumberExample.vue'

const activeTab10 = ref(0)

const tabsData = [
  { label: 'Button' },
  { label: 'Checkbox' },
  { label: 'Switch' },
  { label: 'Radio' },
  { label: 'Input Text' },
  { label: 'Date Picker' },
  { label: 'Select' },
  { label: 'Input Number' }
]
</script>