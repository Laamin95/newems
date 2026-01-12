<template>

<InputSearch
    v-model="data.name"
    label="Name"
/>
</template>
<script setup>

import { ref } from 'vue'
import InputSearch from '@/components/fields/SearchInput.vue'

const data = ref({
  name: ''
})

const rules = {
  required: value => !!value || 'Required.',
  min: min => value => (value && value.length >= min) || `Minimum ${min} characters.`
}

</script>