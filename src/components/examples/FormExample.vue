<template>
  <Card
    :title="'Form Example'"
    class="mb-4"
    bg=""
  >
    <!-- Debug Info -->
    <div class="mb-4 p-4 bg-surface rounded">
      <div>Form Valid: {{ isValid }}</div>
      <div>Form Data: {{ data }}</div>
    </div>

    <!-- New Vuetify-style Form -->
    <Form
      ref="form" 
      v-model="isValid"
      validate-on="blur"
      padding="p-4 space-y-4"
    >
      <div class="space-y-4">
        <SearchInput
          v-model="data.name"
          label="Name"
          :rules="[rules.required, rules.min(3)]"
        />
        <SearchInput
          v-model="data.role"
          label="Role"
          :rules="[rules.required, rules.min(2)]"
        />
        <Select
          v-model="data.country"
          label="Country"
          :items="countries"
          item-title="text"
          item-value="value"
          :rules="[rules.required]"
          :searchable="true"
          :multiple="true"
        />

        <SearchInput
          v-model="data.nid"
          label="NID"
          :rules="[rules.required, rules.customPattern(
            () => data.country === 'mv', 
            '^A\\d{6}$',
            'NID must start with A followed by 6 digits for Maldives'
          )]"
        />
        <InputText
          v-model="data.nid2"
          label="NID2"
          :rules="[rules.required, rules.nid(data.country)]"
        />
        <Textarea
          v-model="data.description"
          label="Description"
          :rules="[rules.max(200)]"
        />
        
        <div class="flex gap-2">
          <Button
            type="submit"
            :disabled="!isValid"
            @click="submit"
          >
            Submit
          </Button>
          
          <Button 
            @click="form?.reset()"
            label="reset"
          />
          
          <!-- <Button 
            @click="form?.validate()"
            variant="outlined"
          >
            Validate
          </Button> -->
        </div>
      </div>
    </Form>
  </Card>
</template>

<script setup>
import { ref, inject } from 'vue'
import { Card, Form, SearchInput, InputText, Select, Button, Textarea } from '../../'

const rules = inject('validationRules')

const form = ref(null)
const isValid = ref(false) // Track form validity

const data = ref({
  name: '',
  role: '',
  country: [],
  nid: '',
  nid2: '',
  description: '',
})

const countries = [
  { text: 'Maldives', value: 'mv' },
  { text: 'India', value: 'in' },
  { text: 'Sri Lanka', value: 'lk' },
]

const submit = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return

  console.log('FORM OK', data.value)
}
</script>