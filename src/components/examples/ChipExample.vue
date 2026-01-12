<template>
    <!-- Chips Examples -->
    <div class="p-6 max-w-4xl mx-auto space-y-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Chip Components</h2>
        
        <!-- Basic Chips -->
        <Card title="Basic Chips" class="space-y-4">
        <div class="space-y-4">
            <div>
            <h4 class="text-lg font-semibold mb-2">Default Variants</h4>
            <div class="flex flex-wrap gap-2">
                <Chip label="Default" />
                <Chip label="Primary" color="primary" />
                <Chip label="Secondary" color="secondary" />
                <Chip label="Success" color="success" />
                <Chip label="Warning" color="warning" />
                <Chip label="Error" color="error" />
                <Chip label="Info" color="info" />
            </div>
            </div>
            
            <div>
            <h4 class="text-lg font-semibold mb-2">Outlined Variants</h4>
            <div class="flex flex-wrap gap-2">
                <Chip label="Default" variant="outlined" />
                <Chip label="Primary" variant="outlined" color="primary" />
                <Chip label="Secondary" variant="outlined" color="secondary" />
                <Chip label="Success" variant="outlined" color="success" />
                <Chip label="Warning" variant="outlined" color="warning" />
                <Chip label="Error" variant="outlined" color="error" />
                <Chip label="Info" variant="outlined" color="info" />
            </div>
            </div>
            
            <div>
            <h4 class="text-lg font-semibold mb-2">Filled Variants</h4>
            <div class="flex flex-wrap gap-2">
                <Chip label="Default" variant="filled" />
                <Chip label="Primary" variant="filled" color="primary" />
                <Chip label="Secondary" variant="filled" color="secondary" />
                <Chip label="Success" variant="filled" color="success" />
                <Chip label="Warning" variant="filled" color="warning" />
                <Chip label="Error" variant="filled" color="error" />
                <Chip label="Info" variant="filled" color="info" />
            </div>
            </div>
        </div>
        </Card>

        <!-- Chip Sizes -->
        <Card title="Chip Sizes" class="space-y-4">
        <div class="flex flex-wrap items-center gap-4">
            <Chip label="Small Chip" size="small" />
            <Chip label="Default Chip" size="default" />
            <Chip label="Large Chip" size="large" />
        </div>
        </Card>

        <!-- Interactive Chips -->
        <Card title="Interactive Chips" class="space-y-4">
        <div class="space-y-4">
            <div>
            <h4 class="text-lg font-semibold mb-2">Clickable Chips</h4>
            <div class="flex flex-wrap gap-2">
                <Chip label="Click Me" clickable @click="handleChipClick" />
                <Chip label="Primary Click" color="primary" clickable @click="handleChipClick" />
                <Chip label="Success Click" color="success" clickable @click="handleChipClick" />
            </div>
            </div>
            
            <div>
            <h4 class="text-lg font-semibold mb-2">Closable Chips</h4>
            <div class="flex flex-wrap gap-2">
                <Chip label="Closable" closable @close="handleChipClose" />
                <Chip label="Primary Close" color="primary" closable @close="handleChipClose" />
                <Chip label="Error Close" color="error" variant="filled" closable @close="handleChipClose" />
            </div>
            </div>
            
            <div>
            <h4 class="text-lg font-semibold mb-2">Disabled Chips</h4>
            <div class="flex flex-wrap gap-2">
                <Chip label="Disabled" disabled />
                <Chip label="Disabled Click" clickable disabled />
                <Chip label="Disabled Close" closable disabled />
            </div>
            </div>
        </div>
        </Card>

        <!-- Custom Styled Chips -->
        <Card title="Custom Styled Chips" class="space-y-4">
        <div class="flex flex-wrap gap-2">
            <Chip 
            label="Custom Purple" 
            bg-color="bg-purple-100" 
            text-color="text-purple-800" 
            clickable 
            @click="handleChipClick"
            />
            <Chip 
            label="Custom Gradient" 
            bg-color="bg-gradient-to-r from-pink-500 to-violet-500" 
            text-color="text-white" 
            rounded="lg"
            clickable 
            @click="handleChipClick"
            />
            <Chip 
            label="Custom Border" 
            variant="outlined"
            border-color="border-orange-500" 
            text-color="text-orange-600" 
            closable 
            @close="handleChipClose"
            />
        </div>
        </Card>

        <!-- Chip Groups -->
        <Card title="Chip Groups" class="space-y-6">
        <div class="space-y-4">
            <div>
            <h4 class="text-lg font-semibold mb-2">Simple Chip Group</h4>
            <ChipGroup 
                :chips="simpleChips" 
                color="primary" 
                clickable 
                @chip-click="handleGroupChipClick"
            />
            </div>
            
            <div>
            <h4 class="text-lg font-semibold mb-2">Closable Chip Group</h4>
            <ChipGroup 
                v-model:chips="editableChips" 
                color="success" 
                closable 
                @chip-close="handleGroupChipClose"
            />
            </div>
            
            <div>
            <h4 class="text-lg font-semibold mb-2">Mixed Styled Chips</h4>
            <ChipGroup 
                :chips="mixedChips" 
                gap="lg"
                justify="center"
                @chip-click="handleGroupChipClick"
            />
            </div>
        </div>
        </Card>
    </div>
</template>
<script setup>
    import { ref } from 'vue'
    import Chip from '@/components/fields/Chip.vue'
    import ChipGroup from '@/components/fields/ChipGroup.vue'
    import Card from '@/components/defaults/Card.vue'

    // Chip Examples Data
    const simpleChips = ref([
      'JavaScript',
      'Vue.js',
      'TypeScript',
      'Tailwind CSS',
      'Node.js'
    ])

    const editableChips = ref([
      { id: 1, text: 'Frontend' },
      { id: 2, text: 'Backend' },
      { id: 3, text: 'Database' },
      { id: 4, text: 'DevOps' }
    ])

    const mixedChips = ref([
      { 
        id: 1, 
        text: 'High Priority', 
        color: 'error', 
        variant: 'filled',
        clickable: true 
      },
      { 
        id: 2, 
        text: 'Medium Priority', 
        color: 'warning', 
        variant: 'outlined',
        clickable: true 
      },
      { 
        id: 3, 
        text: 'Low Priority', 
        color: 'info', 
        variant: 'default',
        clickable: true 
      },
      { 
        id: 4, 
        text: 'Completed', 
        color: 'success', 
        variant: 'tonal',
        closable: true 
      }
    ])

    // Chip Event Handlers
    const handleChipClick = () => {
      console.log('Chip clicked!')
    }

    const handleChipClose = () => {
      console.log('Chip closed!')
    }

    const handleGroupChipClick = (event) => {
      console.log('Group chip clicked:', event)
    }

    const handleGroupChipClose = (event) => {
      console.log('Group chip closed:', event)
    }
</script>