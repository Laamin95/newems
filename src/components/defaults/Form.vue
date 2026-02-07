<template>
  <form @submit.prevent="handleSubmit">
    <slot 
      :isValid="isValid" 
      :validate="validate"
      :reset="reset"
      :resetValidation="resetValidation"
    />
  </form>
</template>

<script setup>
import { reactive, ref, provide, computed, nextTick } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: null },
  validateOn: {
    type: String,
    default: 'blur'
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const fields = reactive(new Map())
const errors = reactive({})
const hasValidated = reactive({}) // Track which fields have been validated

const register = (uid, field) => {
  fields.set(uid, field)
  // Mark as not validated initially
  hasValidated[uid] = false
}

const unregister = (uid) => {
  fields.delete(uid)
  delete errors[uid]
  delete hasValidated[uid]
  updateModelValue()
}

const validate = async () => {
  let allValid = true
  Object.keys(errors).forEach(k => delete errors[k])

  for (const [uid, field] of fields.entries()) {
    if (field?.validate) {
      hasValidated[uid] = true
      const valid = await field.validate()
      if (!valid) {
        allValid = false
      }
    }
  }

  updateModelValue()
  return { valid: allValid, errors: { ...errors } }
}

const reset = () => {
  for (const [uid, field] of fields.entries()) {
    if (field?.reset) {
      field.reset()
    }
  }
  resetValidation()
}

const resetValidation = () => {
  for (const [uid, field] of fields.entries()) {
    if (field?.resetValidation) {
      field.resetValidation()
    }
  }
  Object.keys(errors).forEach(k => delete errors[k])
  Object.keys(hasValidated).forEach(k => hasValidated[k] = false)
  updateModelValue()
}

/**
 * Called by Base input when validating
 */
const report = (uid, valid, fieldErrors) => {
  hasValidated[uid] = true
  
  if (!valid) {
    errors[uid] = fieldErrors
  } else {
    delete errors[uid]
  }
  
  updateModelValue()
}

// Form is valid only if:
// 1. All registered fields have been validated (hasValidated[uid] = true)
// 2. No errors exist
const isValid = computed(() => {
  // Check if all fields have been validated
  const allFieldsValidated = Array.from(fields.keys()).every(uid => hasValidated[uid] === true)
  
  // No errors and all fields validated
  return allFieldsValidated && Object.keys(errors).length === 0
})

const updateModelValue = () => {
  nextTick(() => {
    if (props.modelValue !== null) {
      emit('update:modelValue', isValid.value)
    }
  })
}

const handleSubmit = async () => {
  const result = await validate()
  emit('submit', result)
}

provide('formContext', {
  register,
  unregister,
  validate: report,
  validateOn: computed(() => props.validateOn)
})

defineExpose({
  validate,
  reset,
  resetValidation,
  isValid
})
</script>
