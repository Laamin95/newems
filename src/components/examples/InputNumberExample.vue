<template>
  <div class="p-6 space-y-10 text-left">
    <h1 class="text-2xl font-bold ui-text-primary">InputNumber Component Examples</h1>

    <!-- Basic Usage -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Basic Usage</h2>
      <div class="max-w-md space-y-4">
        <InputNumber v-model="basicValue" placeholder="Enter a number" />
        <InputNumber v-model="basicWithLabel" label="Quantity" placeholder="Enter quantity" />
        <InputNumber v-model="basicPreset" label="Pre-set Value" />
      </div>
      <div class="text-sm ui-text-secondary">
        Values: {{ basicValue }}, {{ basicWithLabel }}, {{ basicPreset }}
      </div>
    </section>

    <!-- Min / Max / Step -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Min / Max / Step</h2>
      <div class="max-w-md space-y-4">
        <InputNumber 
          v-model="minMaxValue" 
          label="Min 0, Max 100" 
          :min="0" 
          :max="100"
          placeholder="0 - 100"
        />
        <InputNumber 
          v-model="stepValue" 
          label="Step by 5" 
          :step="5"
          :min="0"
          :max="100"
        />
        <InputNumber 
          v-model="decimalStep" 
          label="Decimal Step (0.1)" 
          :step="0.1"
          :min="0"
          :max="10"
          :precision="1"
        />
        <InputNumber 
          v-model="negativeValue" 
          label="Allow Negative (-50 to 50)" 
          :min="-50"
          :max="50"
        />
      </div>
      <div class="text-sm ui-text-secondary">
        Min/Max: {{ minMaxValue }}, Step: {{ stepValue }}, Decimal: {{ decimalStep }}, Negative: {{ negativeValue }}
      </div>
    </section>

    <!-- Precision -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Precision (Decimal Places)</h2>
      <div class="max-w-md space-y-4">
        <InputNumber 
          v-model="precision0" 
          label="Integer Only (precision: 0)" 
          :precision="0"
        />
        <InputNumber 
          v-model="precision2" 
          label="2 Decimal Places" 
          :precision="2"
          :step="0.01"
        />
        <InputNumber 
          v-model="precision4" 
          label="4 Decimal Places" 
          :precision="4"
          :step="0.0001"
        />
      </div>
    </section>

    <!-- Sizes -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Sizes</h2>
      <div class="max-w-md space-y-4">
        <InputNumber v-model="sizeXs" size="xs" label="Extra Small" placeholder="XS" />
        <InputNumber v-model="sizeSm" size="sm" label="Small" placeholder="SM" />
        <InputNumber v-model="sizeMd" size="md" label="Medium (Default)" placeholder="MD" />
        <InputNumber v-model="sizeLg" size="lg" label="Large" placeholder="LG" />
        <InputNumber v-model="sizeXl" size="xl" label="Extra Large" placeholder="XL" />
      </div>
    </section>

    <!-- Controls Position -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Controls Position</h2>
      <div class="max-w-md space-y-4">
        <InputNumber 
          v-model="controlsSides" 
          label="Sides (Default)" 
          controls-position="sides"
        />
        <InputNumber 
          v-model="controlsStackedRight" 
          label="Stacked Right" 
          controls-position="stacked-right"
        />
        <InputNumber 
          v-model="controlsStackedLeft" 
          label="Stacked Left" 
          controls-position="stacked-left"
        />
        <InputNumber 
          v-model="controlsNone" 
          label="No Controls" 
          :show-controls="false"
        />
      </div>
    </section>

    <!-- Prefix & Suffix -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Prefix & Suffix</h2>
      <div class="max-w-md space-y-4">
        <InputNumber 
          v-model="currencyValue" 
          label="Currency (USD)" 
          prefix="$"
          :precision="2"
          :min="0"
        />
        <InputNumber 
          v-model="percentValue" 
          label="Percentage" 
          suffix="%"
          :min="0"
          :max="100"
        />
        <InputNumber 
          v-model="weightValue" 
          label="Weight" 
          suffix="kg"
          :min="0"
          :precision="1"
        />
        <InputNumber 
          v-model="bothAffixes" 
          label="Price Range" 
          prefix="$"
          suffix="USD"
          :precision="2"
        />
      </div>
    </section>

    <!-- Thousand Separator -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Thousand Separator</h2>
      <div class="max-w-md space-y-4">
        <InputNumber 
          v-model="thousandComma" 
          label="Comma Separator (1,000,000)" 
          :thousand-separator="true"
          :min="0"
          :max="999999999"
        />
        <InputNumber 
          v-model="thousandSpace" 
          label="Space Separator (1 000 000)" 
          thousand-separator=" "
          :min="0"
        />
        <InputNumber 
          v-model="europeanFormat" 
          label="European Format (1.000.000,00)" 
          thousand-separator="."
          decimal-separator=","
          :precision="2"
        />
      </div>
      <div class="text-sm ui-text-secondary">
        Values: {{ thousandComma }}, {{ thousandSpace }}, {{ europeanFormat }}
      </div>
    </section>

    <!-- Text Alignment -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Text Alignment</h2>
      <div class="max-w-md space-y-4">
        <InputNumber v-model="alignLeft" label="Left Aligned" align="left" />
        <InputNumber v-model="alignCenter" label="Center Aligned" align="center" />
        <InputNumber v-model="alignRight" label="Right Aligned" align="right" />
      </div>
    </section>

    <!-- With Hints & Description -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">With Hints & Description</h2>
      <div class="max-w-md space-y-4">
        <InputNumber 
          v-model="hintValue" 
          label="Age"
          :min="0"
          :max="120"
          hint="Enter your age (0-120)"
        />
        <InputNumber 
          v-model="descValue" 
          label="Quantity"
          :min="1"
          :max="99"
          description="How many items would you like?"
        />
      </div>
    </section>

    <!-- Validation States -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Validation States</h2>
      <div class="max-w-md space-y-4">
        <InputNumber 
          v-model="errorValue" 
          label="Required Field"
          :required="true"
          :rules="[v => v !== null || 'This field is required', v => v >= 1 || 'Must be at least 1']"
        />
        <InputNumber 
          v-model="successState" 
          label="Valid Input"
          :min="0"
          border="success"
        />
        <InputNumber 
          v-model="warningState" 
          label="Warning State"
          border="warning"
          hint="This value seems unusual"
        />
      </div>
    </section>

    <!-- States -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">States</h2>
      <div class="max-w-md space-y-4">
        <InputNumber 
          v-model="disabledValue" 
          label="Disabled" 
          :disabled="true"
        />
        <InputNumber 
          v-model="readonlyValue" 
          label="Readonly" 
          :readonly="true"
        />
        <InputNumber 
          v-model="clearableValue" 
          label="Clearable" 
          :clearable="true"
        />
      </div>
    </section>

    <!-- Rounded Variants -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Rounded Variants</h2>
      <div class="max-w-md space-y-4">
        <InputNumber v-model="roundedNone" label="None" rounded="none" />
        <InputNumber v-model="roundedSm" label="Small" rounded="sm" />
        <InputNumber v-model="roundedMd" label="Medium" rounded="md" />
        <InputNumber v-model="roundedLg" label="Large" rounded="lg" />
        <InputNumber v-model="roundedFull" label="Full" rounded="full" />
      </div>
    </section>

    <!-- Mouse Wheel Support -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Mouse Wheel Support</h2>
      <div class="max-w-md space-y-4">
        <InputNumber 
          v-model="mouseWheelValue" 
          label="Scroll to Change Value"
          :mouse-wheel="true"
          :min="0"
          :max="100"
          hint="Focus the input and use mouse wheel to increment/decrement"
        />
      </div>
    </section>

    <!-- Quantity Selector Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Quantity Selector Example</h2>
      <div class="max-w-sm bg-color-2 rounded-xl border border-color-3 p-6">
        <div class="flex gap-4 mb-4">
          <div class="w-20 h-20 bg-color-3 rounded-lg flex items-center justify-center text-3xl">
            🎧
          </div>
          <div class="flex-1">
            <h3 class="font-semibold ui-text-primary">Wireless Headphones</h3>
            <p class="text-sm ui-text-secondary">Premium Audio</p>
            <p class="text-lg font-bold text-primary mt-1">$149.99</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <InputNumber 
            v-model="productQty" 
            :min="1"
            :max="10"
            :show-controls="true"
            controls-position="sides"
            align="center"
            width="w-32"
          />
          <div class="flex-1 text-right">
            <p class="text-sm ui-text-secondary">Subtotal</p>
            <p class="text-lg font-bold ui-text-primary">${{ (productQty * 149.99).toFixed(2) }}</p>
          </div>
        </div>
        <button class="w-full mt-4 py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          Add to Cart
        </button>
      </div>
    </section>

    <!-- Price Input Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Price Input Example</h2>
      <div class="max-w-md bg-color-2 rounded-xl border border-color-3 p-6">
        <h3 class="font-semibold ui-text-primary mb-4">Set Product Price</h3>
        <div class="space-y-4">
          <InputNumber 
            v-model="priceInput" 
            label="Regular Price"
            prefix="$"
            :precision="2"
            :min="0"
            :show-controls="false"
            align="right"
          />
          <InputNumber 
            v-model="salePriceInput" 
            label="Sale Price"
            prefix="$"
            :precision="2"
            :min="0"
            :max="priceInput || 0"
            :show-controls="false"
            align="right"
            :hint="priceInput && salePriceInput ? `${Math.round((1 - salePriceInput / priceInput) * 100)}% off` : ''"
          />
        </div>
      </div>
    </section>

    <!-- Rating Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Rating Input Example</h2>
      <div class="max-w-md bg-color-2 rounded-xl border border-color-3 p-6">
        <h3 class="font-semibold ui-text-primary mb-4">Rate this Product</h3>
        <div class="flex items-center gap-4">
          <InputNumber 
            v-model="ratingValue" 
            :min="0"
            :max="5"
            :step="0.5"
            :precision="1"
            align="center"
            width="w-24"
          />
          <div class="flex items-center gap-1 text-2xl">
            <span v-for="i in 5" :key="i" :class="i <= Math.floor(ratingValue || 0) ? 'text-yellow-400' : 'text-gray-300'">
              ★
            </span>
          </div>
          <span class="text-sm ui-text-secondary">({{ ratingValue || 0 }} / 5)</span>
        </div>
      </div>
    </section>

    <!-- BMI Calculator Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">BMI Calculator Example</h2>
      <div class="max-w-md bg-color-2 rounded-xl border border-color-3 p-6">
        <h3 class="font-semibold ui-text-primary mb-4">Calculate BMI</h3>
        <div class="grid grid-cols-2 gap-4">
          <InputNumber 
            v-model="bmiWeight" 
            label="Weight"
            suffix="kg"
            :min="20"
            :max="300"
            :precision="1"
            controls-position="stacked-right"
          />
          <InputNumber 
            v-model="bmiHeight" 
            label="Height"
            suffix="cm"
            :min="100"
            :max="250"
            :precision="0"
            controls-position="stacked-right"
          />
        </div>
        <div v-if="bmiWeight && bmiHeight" class="mt-4 p-4 rounded-lg" :class="bmiClass">
          <p class="text-sm font-medium">Your BMI</p>
          <p class="text-2xl font-bold">{{ calculatedBMI }}</p>
          <p class="text-sm">{{ bmiCategory }}</p>
        </div>
      </div>
    </section>

    <!-- Tip Calculator Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Tip Calculator Example</h2>
      <div class="max-w-md bg-color-2 rounded-xl border border-color-3 p-6">
        <h3 class="font-semibold ui-text-primary mb-4">Calculate Tip</h3>
        <div class="space-y-4">
          <InputNumber 
            v-model="billAmount" 
            label="Bill Amount"
            prefix="$"
            :precision="2"
            :min="0"
            :show-controls="false"
          />
          <InputNumber 
            v-model="tipPercent" 
            label="Tip Percentage"
            suffix="%"
            :min="0"
            :max="100"
            :step="5"
          />
          <InputNumber 
            v-model="splitCount" 
            label="Split Between"
            suffix="people"
            :min="1"
            :max="20"
          />
        </div>
        <div v-if="billAmount" class="mt-4 p-4 bg-color-3/50 rounded-lg space-y-2">
          <div class="flex justify-between text-sm">
            <span class="ui-text-secondary">Tip Amount:</span>
            <span class="ui-text-primary font-medium">${{ tipAmount }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="ui-text-secondary">Total:</span>
            <span class="ui-text-primary font-medium">${{ totalWithTip }}</span>
          </div>
          <div class="flex justify-between text-base pt-2 border-t border-color-3">
            <span class="ui-text-primary font-medium">Per Person:</span>
            <span class="text-primary font-bold">${{ perPerson }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Countdown Timer Setup -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Timer Setup Example</h2>
      <div class="max-w-md bg-color-2 rounded-xl border border-color-3 p-6">
        <h3 class="font-semibold ui-text-primary mb-4">Set Timer</h3>
        <div class="grid grid-cols-3 gap-4">
          <InputNumber 
            v-model="timerHours" 
            label="Hours"
            :min="0"
            :max="23"
            :precision="0"
            align="center"
            controls-position="stacked-right"
          />
          <InputNumber 
            v-model="timerMinutes" 
            label="Minutes"
            :min="0"
            :max="59"
            :precision="0"
            align="center"
            controls-position="stacked-right"
          />
          <InputNumber 
            v-model="timerSeconds" 
            label="Seconds"
            :min="0"
            :max="59"
            :precision="0"
            align="center"
            controls-position="stacked-right"
          />
        </div>
        <p class="text-center text-2xl font-mono ui-text-primary mt-4">
          {{ String(timerHours || 0).padStart(2, '0') }}:{{ String(timerMinutes || 0).padStart(2, '0') }}:{{ String(timerSeconds || 0).padStart(2, '0') }}
        </p>
        <button class="w-full mt-4 py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          Start Timer
        </button>
      </div>
    </section>

    <!-- Dimensions Input Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Dimensions Input Example</h2>
      <div class="max-w-lg bg-color-2 rounded-xl border border-color-3 p-6">
        <h3 class="font-semibold ui-text-primary mb-4">Package Dimensions</h3>
        <div class="grid grid-cols-3 gap-4">
          <InputNumber 
            v-model="dimLength" 
            label="Length"
            suffix="cm"
            :min="1"
            :max="200"
            :precision="1"
            :show-controls="false"
          />
          <InputNumber 
            v-model="dimWidth" 
            label="Width"
            suffix="cm"
            :min="1"
            :max="200"
            :precision="1"
            :show-controls="false"
          />
          <InputNumber 
            v-model="dimHeight" 
            label="Height"
            suffix="cm"
            :min="1"
            :max="200"
            :precision="1"
            :show-controls="false"
          />
        </div>
        <div v-if="dimLength && dimWidth && dimHeight" class="mt-4 p-4 bg-color-3/50 rounded-lg">
          <div class="flex justify-between text-sm">
            <span class="ui-text-secondary">Volume:</span>
            <span class="ui-text-primary font-medium">{{ (dimLength * dimWidth * dimHeight).toLocaleString() }} cm³</span>
          </div>
          <div class="flex justify-between text-sm mt-1">
            <span class="ui-text-secondary">Volumetric Weight:</span>
            <span class="ui-text-primary font-medium">{{ ((dimLength * dimWidth * dimHeight) / 5000).toFixed(2) }} kg</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Props Reference -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Props Reference</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-color-2">
            <tr>
              <th class="text-left p-3 ui-text-primary font-semibold">Prop</th>
              <th class="text-left p-3 ui-text-primary font-semibold">Type</th>
              <th class="text-left p-3 ui-text-primary font-semibold">Default</th>
              <th class="text-left p-3 ui-text-primary font-semibold">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-color-3">
            <tr v-for="prop in propsReference" :key="prop.name">
              <td class="p-3 font-mono text-primary">{{ prop.name }}</td>
              <td class="p-3 ui-text-secondary">{{ prop.type }}</td>
              <td class="p-3 ui-text-secondary">{{ prop.default }}</td>
              <td class="p-3 ui-text-secondary">{{ prop.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Events Reference -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Events Reference</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-color-2">
            <tr>
              <th class="text-left p-3 ui-text-primary font-semibold">Event</th>
              <th class="text-left p-3 ui-text-primary font-semibold">Payload</th>
              <th class="text-left p-3 ui-text-primary font-semibold">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-color-3">
            <tr v-for="event in eventsReference" :key="event.name">
              <td class="p-3 font-mono text-primary">{{ event.name }}</td>
              <td class="p-3 ui-text-secondary">{{ event.payload }}</td>
              <td class="p-3 ui-text-secondary">{{ event.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Keyboard Shortcuts -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Keyboard Shortcuts</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-color-2">
            <tr>
              <th class="text-left p-3 ui-text-primary font-semibold">Key</th>
              <th class="text-left p-3 ui-text-primary font-semibold">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-color-3">
            <tr>
              <td class="p-3"><kbd class="px-2 py-1 bg-color-3 rounded text-xs">↑</kbd></td>
              <td class="p-3 ui-text-secondary">Increment value by step</td>
            </tr>
            <tr>
              <td class="p-3"><kbd class="px-2 py-1 bg-color-3 rounded text-xs">↓</kbd></td>
              <td class="p-3 ui-text-secondary">Decrement value by step</td>
            </tr>
            <tr>
              <td class="p-3"><kbd class="px-2 py-1 bg-color-3 rounded text-xs">Enter</kbd></td>
              <td class="p-3 ui-text-secondary">Confirm input and blur</td>
            </tr>
            <tr>
              <td class="p-3"><kbd class="px-2 py-1 bg-color-3 rounded text-xs">Mouse Wheel</kbd></td>
              <td class="p-3 ui-text-secondary">Increment/decrement (when mouseWheel prop is true)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import InputNumber from '@/components/fields/InputNumber.vue'

// Basic usage
const basicValue = ref(null)
const basicWithLabel = ref(null)
const basicPreset = ref(42)

// Min/Max/Step
const minMaxValue = ref(50)
const stepValue = ref(25)
const decimalStep = ref(5.5)
const negativeValue = ref(-10)

// Precision
const precision0 = ref(100)
const precision2 = ref(99.99)
const precision4 = ref(3.1415)

// Sizes
const sizeXs = ref(10)
const sizeSm = ref(20)
const sizeMd = ref(30)
const sizeLg = ref(40)
const sizeXl = ref(50)

// Controls position
const controlsSides = ref(5)
const controlsStackedRight = ref(10)
const controlsStackedLeft = ref(15)
const controlsNone = ref(20)

// Prefix & Suffix
const currencyValue = ref(99.99)
const percentValue = ref(25)
const weightValue = ref(72.5)
const bothAffixes = ref(149.99)

// Thousand separator
const thousandComma = ref(1234567)
const thousandSpace = ref(9876543)
const europeanFormat = ref(12345.67)

// Text alignment
const alignLeft = ref(123)
const alignCenter = ref(456)
const alignRight = ref(789)

// Hints
const hintValue = ref(25)
const descValue = ref(3)

// Validation
const errorValue = ref(null)
const successState = ref(100)
const warningState = ref(999)

// States
const disabledValue = ref(50)
const readonlyValue = ref(75)
const clearableValue = ref(100)

// Rounded
const roundedNone = ref(10)
const roundedSm = ref(20)
const roundedMd = ref(30)
const roundedLg = ref(40)
const roundedFull = ref(50)

// Mouse wheel
const mouseWheelValue = ref(50)

// Product quantity
const productQty = ref(1)

// Price input
const priceInput = ref(199.99)
const salePriceInput = ref(149.99)

// Rating
const ratingValue = ref(4)

// BMI Calculator
const bmiWeight = ref(70)
const bmiHeight = ref(175)

const calculatedBMI = computed(() => {
  if (!bmiWeight.value || !bmiHeight.value) return '0'
  const heightM = bmiHeight.value / 100
  return (bmiWeight.value / (heightM * heightM)).toFixed(1)
})

const bmiCategory = computed(() => {
  const bmi = parseFloat(calculatedBMI.value)
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal weight'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
})

const bmiClass = computed(() => {
  const bmi = parseFloat(calculatedBMI.value)
  if (bmi < 18.5) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  if (bmi < 25) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  if (bmi < 30) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
})

// Tip calculator
const billAmount = ref(85.50)
const tipPercent = ref(15)
const splitCount = ref(2)

const tipAmount = computed(() => {
  return ((billAmount.value || 0) * (tipPercent.value || 0) / 100).toFixed(2)
})

const totalWithTip = computed(() => {
  return ((billAmount.value || 0) + parseFloat(tipAmount.value)).toFixed(2)
})

const perPerson = computed(() => {
  return (parseFloat(totalWithTip.value) / (splitCount.value || 1)).toFixed(2)
})

// Timer
const timerHours = ref(0)
const timerMinutes = ref(5)
const timerSeconds = ref(0)

// Dimensions
const dimLength = ref(30)
const dimWidth = ref(20)
const dimHeight = ref(15)

// Props reference
const propsReference = [
  { name: 'modelValue', type: 'Number | String | null', default: 'null', description: 'v-model binding value' },
  { name: 'min', type: 'Number', default: '-Infinity', description: 'Minimum allowed value' },
  { name: 'max', type: 'Number', default: 'Infinity', description: 'Maximum allowed value' },
  { name: 'step', type: 'Number', default: '1', description: 'Increment/decrement step' },
  { name: 'precision', type: 'Number', default: 'undefined', description: 'Number of decimal places' },
  { name: 'showControls', type: 'Boolean', default: 'true', description: 'Show increment/decrement buttons' },
  { name: 'controlsPosition', type: "'sides' | 'stacked-left' | 'stacked-right'", default: "'sides'", description: 'Position of control buttons' },
  { name: 'prefix', type: 'String', default: "''", description: 'Text prefix (e.g., $)' },
  { name: 'suffix', type: 'String', default: "''", description: 'Text suffix (e.g., kg, %)' },
  { name: 'thousandSeparator', type: 'Boolean | String', default: 'false', description: 'Enable thousand separator (true for comma, or custom char)' },
  { name: 'decimalSeparator', type: 'String', default: "'.'", description: 'Decimal separator character' },
  { name: 'allowNegative', type: 'Boolean', default: 'true', description: 'Allow negative numbers' },
  { name: 'align', type: "'left' | 'center' | 'right'", default: "'left'", description: 'Text alignment' },
  { name: 'mouseWheel', type: 'Boolean', default: 'false', description: 'Enable mouse wheel increment/decrement' },
  { name: 'label', type: 'String', default: "''", description: 'Input label' },
  { name: 'placeholder', type: 'String', default: "''", description: 'Placeholder text' },
  { name: 'hint', type: 'String', default: "''", description: 'Hint text below input' },
  { name: 'disabled', type: 'Boolean', default: 'false', description: 'Disable the input' },
  { name: 'readonly', type: 'Boolean', default: 'false', description: 'Make input readonly' },
  { name: 'clearable', type: 'Boolean', default: 'false', description: 'Show clear button' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Input size' },
  { name: 'rounded', type: "'none' | 'sm' | 'md' | 'lg' | 'full'", default: "'sm'", description: 'Border radius' },
]

// Events reference
const eventsReference = [
  { name: 'update:modelValue', payload: 'Number | null', description: 'Emitted when value changes' },
  { name: 'change', payload: 'Number | null', description: 'Emitted when value is confirmed' },
  { name: 'blur', payload: 'FocusEvent', description: 'Emitted when input loses focus' },
  { name: 'focus', payload: 'FocusEvent', description: 'Emitted when input gains focus' },
]
</script>