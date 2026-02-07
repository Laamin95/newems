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
      <template #content-15><TimelineExample /></template>
      <template #content-16><OverlayExample /></template>
      <template #content-17><FooterExample /></template>
      <template #content-18><ExpansionExample /></template>
      <template #content-19><FormExample /></template>
      <template #content-20><AvatarExample /></template>
      <template #content-21><BreadcrumbsExample /></template>
      <template #content-22><PaginationExample /></template>
      <template #content-23><DividerExample /></template>
      <template #content-24><BadgeExample /></template>
    </Tab>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Tab } from '../'

import { 
  CheckboxExample, SwitchExample, RadioExample, ButtonExample, InputTextExample,
  DatePickerExample, SelectExample, InputNumberExample, TextAreaExample, ChipExample,
  FileUploadExample, BannerExample, DropdownExample, SearchExample, SnackbarExample,
  TimelineExample, OverlayExample, FooterExample, ExpansionExample, FormExample,
  AvatarExample, BreadcrumbsExample, PaginationExample, DividerExample, BadgeExample

} from '../'

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
  { label: 'Timeline' },
  { label: 'Overlay' },
  { label: 'Footer' },
  { label: 'Expansion' },
  { label: 'Form' },
  { label: 'Avatar' },
  { label: 'Breadcrumbs' },
  { label: 'Pagination' },
  { label: 'Divider' },
  { label: 'Badge' }
]
</script>