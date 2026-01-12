<template>
  <div class="p-4 ui-bg-color">
    <Tab
      v-model="activeTab10"
      :tabs="tabsData"
      variant="default"
      vertical
    >
      <template #content-0><ButtonExample /></template>
      <template #content-1><CheckboxExample /></template>   
      <template #content-2><SwitchExample /></template>
      <template #content-3><RadioExample /></template>
      <template #content-4><InputTextExample /></template> 
      <template #content-5><DatePickerExample /></template> 
      <template #content-6><SelectExample /></template>
      <template #content-7><InputNumberExample /></template>
      <template #content-8><TextAreaExample /></template>
      <template #content-9><ChipExample /></template>
      <template #content-10><FileUploadExample /></template>
      <template #content-11><BannerExample /></template>
      <template #content-12><DropdownExample /></template>
      <template #content-13><SearchExample /></template>
      <template #content-14><SnackbarExample /></template>
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
import TextAreaExample from '@/components/examples/TextAreaExample.vue'
import ChipExample from '@/components/examples/ChipExample.vue'
import FileUploadExample from '@/components/examples/FileUploadExample.vue'
import BannerExample from '@/components/examples/BannerExample.vue'
import DropdownExample from '@/components/examples/DropdownExample.vue'
import SearchExample from '@/components/examples/SearchExample.vue'
import SnackbarExample from '@/components/examples/SnackbarExample.vue'

const activeTab10 = ref(0)

const tabsData = [
  { label: 'Button' },
  { label: 'Checkbox' },
  { label: 'Switch' },
  { label: 'Radio' },
  { label: 'Input Text' },
  { label: 'Date Picker' },
  { label: 'Select' },
  { label: 'Input Number' },
  { label: 'Text Area' },
  { label: 'Chip' },
  { label: 'File Upload' },
  { label: 'Banner' },
  { label: 'Dropdown' },
  { label: 'Search' },
  { label: 'Snackbar' },
]
</script>