<template>
  <div class="p-6 max-w-4xl mx-auto space-y-8">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Dropdown Components</h2>
    
    <Card title="Dropdown Examples" class="space-y-6">
      <div class="flex items-center gap-4 flex-wrap">
        <!-- Basic Dropdown with items prop -->
        <Dropdown label="Select Option" :items="items" @select="handleSelect" />
        <Dropdown  variant="outlined" color="success" label="Select Option" :items="items" @select="handleSelect" />

        <!-- Custom trigger -->
        <Dropdown :items="items" @select="handleSelect">
          <template #trigger>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Custom Trigger
            </button>
          </template>
        </Dropdown>

        <!-- With custom content -->
        <Dropdown label="Actions" align="right">
            <DropdownItem 
                label="Edit" 
                prepend-icon="pencil-square"
                @select="edit"
            />
          <DropdownItem @select="edit">
            <template #prepend>📝</template>
            Edit
          </DropdownItem>
          <DropdownItem @select="view">
            <template #prepend>👁️</template>
            View
          </DropdownItem>
          <div class="border-t my-1"></div>
          <DropdownItem @select="remove">
            <template #prepend>🗑️</template>
            Delete
          </DropdownItem>
        </Dropdown>

        <!-- Dense variant -->
        <Dropdown label="Dense Menu" dense :items="items" @select="handleSelect" />

        <!-- Open on hover -->
        <Dropdown label="Hover Menu" open-on-hover :items="items" @select="handleSelect" />

        <!-- Right aligned -->
        <Dropdown label="Right Aligned" align="right" :items="items" @select="handleSelect" />
      </div>

      <div class="mt-4 p-4 bg-gray-100 rounded">
        <p class="text-sm font-medium">Selected: {{ selectedItem || 'None' }}</p>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Card from '@/components/defaults/Card.vue'
import Dropdown from '@/components/defaults/Dropdown.vue'
import DropdownItem from '@/components/defaults/DropdownItem.vue'

const selectedItem = ref(null)

const items = [
  { label: 'Profile', value: 'profile' },
  { label: 'Settings', value: 'settings' },
  { label: 'Logout', value: 'logout' }
]

const handleSelect = (item) => {
  selectedItem.value = item.label || item
  console.log('Selected:', item)
}

const edit = () => {
  console.log('Edit clicked')
}

const view = () => {
  console.log('View clicked')
}

const remove = () => {
  console.log('Delete clicked')
}
</script>