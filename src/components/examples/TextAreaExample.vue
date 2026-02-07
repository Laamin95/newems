<template>
  <div class="p-6 space-y-10 text-left">
    <h1 class="text-2xl font-bold ui-text-primary">TextArea Component Examples</h1>

    <!-- Basic Usage -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Basic Usage</h2>
      <div class="max-w-2xl space-y-4">
        <Textarea v-model="basicValue" placeholder="Enter text..." />
        <Textarea v-model="basicWithLabel" rounded="lg" label="Message" placeholder="Enter your message" />
        <Textarea v-model="basicWithValue" label="Pre-filled" />
      </div>
      <div class="text-sm ui-text-secondary">
        Basic Value: "{{ basicValue }}"
      </div>
    </section>

    <!-- Sizes -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Sizes</h2>
      <div class="max-w-2xl space-y-4">
        <Textarea v-model="sizeXs" size="xs" label="Extra Small" placeholder="XS size textarea" />
        <Textarea v-model="sizeSm" size="sm" label="Small" placeholder="SM size textarea" />
        <Textarea v-model="sizeMd" size="md" label="Medium (Default)" placeholder="MD size textarea" />
        <Textarea v-model="sizeLg" size="lg" label="Large" placeholder="LG size textarea" />
        <Textarea v-model="sizeXl" size="xl" label="Extra Large" placeholder="XL size textarea" />
      </div>
    </section>

    <!-- Rows and Heights -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Rows and Heights</h2>
      <div class="max-w-2xl space-y-4">
        <Textarea 
          v-model="rowsSmall" 
          label="Small (3 rows)" 
          placeholder="Small textarea..."
          :rows="3"
        />
        <Textarea 
          v-model="rowsMedium" 
          label="Medium (5 rows)" 
          placeholder="Medium textarea..."
          :rows="5"
        />
        <Textarea 
          v-model="rowsLarge" 
          label="Large (8 rows)" 
          placeholder="Large textarea..."
          :rows="8"
        />
        <Textarea 
          v-model="rowsXL" 
          label="Extra Large (12 rows)" 
          placeholder="Extra large textarea..."
          :rows="12"
          :max-height="`600px`"
        />
      </div>
    </section>

    <!-- States -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">States</h2>
      <div class="max-w-2xl space-y-4">
        <Textarea 
          v-model="disabledValue" 
          label="Disabled" 
          placeholder="This field is disabled"
          disabled
        />
        <Textarea 
          v-model="readonlyValue" 
          label="Readonly" 
          placeholder="This field is readonly"
          readonly
        />
        <Textarea 
          v-model="errorValue" 
          label="Error State" 
          placeholder="This field has an error"
          error
          error-message="This field is required"
        />
        <Textarea 
          v-model="requiredValue" 
          label="Required" 
          placeholder="This field is required"
          required
        />
      </div>
    </section>

    <!-- With Clearable Button -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Clearable</h2>
      <div class="max-w-2xl space-y-4">
        <Textarea 
          v-model="clearableValue" 
          label="Clearable (Hover to see clear button)" 
          placeholder="Hover over this field to see the clear button"
          :clearable="true"
        />
        <div class="text-sm ui-text-secondary">
          Current value: "{{ clearableValue }}"
        </div>
      </div>
    </section>

    <!-- Auto Expand -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Auto Expand</h2>
      <div class="max-w-2xl space-y-4">
        <Textarea 
          v-model="autoExpandValue" 
          label="Auto Expand Textarea" 
          placeholder="Start typing... this textarea will expand as you type"
          :rows="3"
          auto-expand
        />
        <div class="text-sm ui-text-secondary">
          Try typing multiple lines - the textarea will expand automatically!
        </div>
      </div>
    </section>

    <!-- Max Length -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Max Length</h2>
      <div class="max-w-2xl space-y-4">
        <Textarea 
          v-model="maxLengthValue" 
          label="Max Length (100 characters)" 
          placeholder="Type up to 100 characters..."
          :max-length="100"
        />
        <div class="text-sm ui-text-secondary">
          Characters: {{ maxLengthValue.length }} / 100
        </div>
      </div>
    </section>

    <!-- Resizable Option -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Resizable Option</h2>
      <div class="max-w-2xl space-y-4">
        <Textarea 
          v-model="resizableValue" 
          label="Resizable (Default)" 
          placeholder="You can resize this textarea by dragging the corner"
          :rows="4"
          :resizable="true"
        />
        <Textarea 
          v-model="nonResizableValue" 
          label="Non-Resizable" 
          placeholder="This textarea cannot be resized"
          :rows="4"
          :resizable="false"
        />
      </div>
    </section>

    <!-- Styling Options -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Styling Options</h2>
      <div class="max-w-2xl space-y-4">
        <Textarea 
          v-model="styleRounded" 
          label="Rounded Corners" 
          placeholder="This has rounded corners"
          rounded="lg"
        />
        <Textarea 
          v-model="styleBorder" 
          label="Custom Border" 
          placeholder="Custom border styling"
          border="border-blue-500"
        />
        <Textarea 
          v-model="styleBg" 
          label="Custom Background" 
          placeholder="Custom background color"
          bg="bg-blue-50"
        />
      </div>
    </section>

    <!-- Hints and Help Text -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Hints and Help Text</h2>
      <div class="max-w-2xl space-y-4">
        <Textarea 
          v-model="hintValue" 
          label="With Hint" 
          placeholder="Enter your feedback..."
          hint="Please provide constructive feedback"
        />
        <Textarea 
          v-model="errorWithHint" 
          label="Error with Hint" 
          placeholder="This field has an error"
          error
          error-message="This field is required"
          hint="Hint text still shows with errors"
        />
      </div>
    </section>

    <!-- Real-world Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Real-world Example</h2>
      <div class="max-w-2xl space-y-4">
        <Textarea 
          v-model="feedbackValue" 
          label="Feedback Form" 
          placeholder="Share your thoughts, suggestions, or report an issue..."
          :rows="6"
          :max-length="500"
          hint="Maximum 500 characters"
          :clearable="true"
        />
        <div class="text-sm ui-text-secondary">
          Characters: {{ feedbackValue.length }} / 500
        </div>
        <button 
          @click="submitFeedback"
          :disabled="!feedbackValue.trim()"
          class="px-4 py-2 bg-color-4 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-color-5"
        >
          Submit Feedback
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Textarea } from '../../'

// Basic Usage
const basicValue = ref('')
const basicWithLabel = ref('')
const basicWithValue = ref('This field comes pre-filled with some text.')

// Sizes
const sizeXs = ref('')
const sizeSm = ref('')
const sizeMd = ref('')
const sizeLg = ref('')
const sizeXl = ref('')

// Rows and Heights
const rowsSmall = ref('Small textarea with 3 rows')
const rowsMedium = ref('Medium textarea with 5 rows')
const rowsLarge = ref('Large textarea with 8 rows')
const rowsXL = ref('Extra large textarea with 12 rows')

// States
const disabledValue = ref('This field is disabled and cannot be edited.')
const readonlyValue = ref('This field is readonly and cannot be edited.')
const errorValue = ref('')
const requiredValue = ref('')

// Clearable
const clearableValue = ref('This textarea has a clear button that appears on hover.')

// Auto Expand
const autoExpandValue = ref('This textarea will automatically expand as you type more content.\n\nTry typing several lines and watch it grow!')

// Max Length
const maxLengthValue = ref('')

// Resizable
const resizableValue = ref('You can resize this textarea by dragging the bottom-right corner.')
const nonResizableValue = ref('This textarea cannot be resized.')

// Styling
const styleRounded = ref('This textarea has rounded corners.')
const styleBorder = ref('This textarea has a custom border color.')
const styleBg = ref('This textarea has a custom background color.')

// Hints and Help Text
const hintValue = ref('')
const errorWithHint = ref('')

// Real-world Example
const feedbackValue = ref('')

const submitFeedback = () => {
  if (feedbackValue.value.trim()) {
    console.log('Feedback submitted:', feedbackValue.value)
    alert('Thank you for your feedback!')
    feedbackValue.value = ''
  }
}
</script>
