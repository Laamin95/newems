<template>
  <div class="p-6 space-y-10 text-left">
    <h1 class="text-2xl font-bold ui-text-primary">Radio Component Examples</h1>

    <!-- Basic Usage -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Basic Usage</h2>
      <div class="flex flex-wrap items-center gap-6">
        <Radio v-model="basic" value="option1" label="Option 1" name="basic" />
        <Radio v-model="basic" value="option2" label="Option 2" name="basic" />
        <Radio v-model="basic" value="option3" label="Option 3" name="basic" />
      </div>
      <div class="text-sm ui-text-secondary">
        Selected: {{ basic }}
      </div>
    </section>

    <!-- With Description -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">With Description</h2>
      <div class="space-y-4 max-w-md">
        <Radio 
          v-model="plan" 
          value="free"
          name="plan"
          label="Free Plan" 
          description="Basic features for personal use"
        />
        <Radio 
          v-model="plan" 
          value="pro"
          name="plan"
          label="Pro Plan" 
          description="Advanced features for professionals"
        />
        <Radio 
          v-model="plan" 
          value="enterprise"
          name="plan"
          label="Enterprise Plan" 
          description="Full features with dedicated support"
        />
      </div>
      <div class="text-sm ui-text-secondary">
        Selected plan: {{ plan }}
      </div>
    </section>

    <!-- Sizes -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Sizes</h2>
      <div class="flex flex-wrap items-end gap-8">
        <div class="text-center">
          <Radio v-model="sizeDemo" value="xs" name="size" size="xs" />
          <p class="text-xs ui-text-secondary mt-2">XS</p>
        </div>
        <div class="text-center">
          <Radio v-model="sizeDemo" value="sm" name="size" size="sm" />
          <p class="text-xs ui-text-secondary mt-2">SM</p>
        </div>
        <div class="text-center">
          <Radio v-model="sizeDemo" value="md" name="size" size="md" />
          <p class="text-xs ui-text-secondary mt-2">MD</p>
        </div>
        <div class="text-center">
          <Radio v-model="sizeDemo" value="lg" name="size" size="lg" />
          <p class="text-xs ui-text-secondary mt-2">LG</p>
        </div>
        <div class="text-center">
          <Radio v-model="sizeDemo" value="xl" name="size" size="xl" />
          <p class="text-xs ui-text-secondary mt-2">XL</p>
        </div>
      </div>
    </section>

    <!-- Colors -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Colors</h2>
      <div class="flex flex-wrap items-center gap-6">
        <Radio v-model="colorDemo" value="primary" name="color" label="Primary" color="primary" />
        <Radio v-model="colorDemo" value="success" name="color" label="Success" color="success" />
        <Radio v-model="colorDemo" value="warning" name="color" label="Warning" color="warning" />
        <Radio v-model="colorDemo" value="danger" name="color" label="Danger" color="danger" />
        <Radio v-model="colorDemo" value="info" name="color" label="Info" color="info" />
      </div>
    </section>

    <!-- Label Positions -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Label Positions</h2>
      <div class="space-y-4 max-w-md">
        <Radio v-model="posDemo" value="right" name="position" label="Label on right (default)" />
        <Radio v-model="posDemo" value="left" name="position" label="Label on left" label-position="left" />
      </div>
    </section>

    <!-- States -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">States</h2>
      <div class="space-y-4">
        <div class="flex flex-wrap items-center gap-6">
          <Radio v-model="stateDisabled" value="off" name="disabled" label="Disabled (off)" :disabled="true" />
          <Radio v-model="stateDisabled" value="on" name="disabled" label="Disabled (on)" :disabled="true" />
        </div>
        <div class="flex flex-wrap items-center gap-6">
          <Radio v-model="stateReadonly" value="readonly" name="readonly" label="Readonly" :readonly="true" />
        </div>
      </div>
    </section>

    <!-- Validation -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Validation</h2>
      <div class="space-y-4 max-w-md">
        <div class="space-y-2">
          <Radio 
            v-model="validationDemo" 
            value="agree" 
            name="validation"
            label="I agree to the terms" 
            :required="true"
            :error="!validationDemo ? 'Please select an option' : false"
          />
          <Radio 
            v-model="validationDemo" 
            value="disagree" 
            name="validation"
            label="I disagree" 
          />
        </div>
        <div class="space-y-2">
          <Radio 
            v-model="hintDemo" 
            value="option1" 
            name="hint"
            label="Option with hint" 
            hint="This is a helpful hint message"
          />
          <Radio 
            v-model="hintDemo" 
            value="option2" 
            name="hint"
            label="Another option" 
          />
        </div>
      </div>
    </section>

    <!-- With Slot Content -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">With Slot Content</h2>
      <div class="space-y-4 max-w-md">
        <Radio v-model="slotDemo" value="terms" name="slot">
          I agree to the <a href="#" class="text-primary underline hover:text-primary/80">terms of service</a>
        </Radio>
        <Radio v-model="slotDemo" value="premium" name="slot">
          Enable <span class="font-bold text-primary">premium</span> features
        </Radio>
        <Radio v-model="slotDemo" value="notify" name="slot">
          <span class="flex items-center gap-2">
            <span class="text-lg">🔔</span>
            Enable notifications
          </span>
        </Radio>
      </div>
    </section>

    <!-- Pricing Plans Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Pricing Plans Example</h2>
      <div class="max-w-2xl">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            v-for="pricing in pricingPlans" 
            :key="pricing.id"
            :class="[
              'p-4 rounded-xl border-2 transition-all cursor-pointer',
              selectedPricing === pricing.id 
                ? 'border-primary bg-primary/5' 
                : 'border-color-3 hover:border-color-4'
            ]"
            @click="selectedPricing = pricing.id"
          >
            <div class="flex items-start gap-3">
              <Radio 
                v-model="selectedPricing" 
                :value="pricing.id" 
                name="pricing"
                class="mt-1"
              />
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <span class="font-semibold ui-text-primary">{{ pricing.name }}</span>
                  <span v-if="pricing.popular" class="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                </div>
                <p class="text-2xl font-bold ui-text-primary mt-2">
                  ${{ pricing.price }}
                  <span class="text-sm font-normal ui-text-secondary">/mo</span>
                </p>
                <p class="text-sm ui-text-secondary mt-1">{{ pricing.description }}</p>
                <ul class="mt-3 space-y-1">
                  <li 
                    v-for="feature in pricing.features" 
                    :key="feature"
                    class="text-xs ui-text-secondary flex items-center gap-1"
                  >
                    <span class="text-green-500">✓</span>
                    {{ feature }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Shipping Options Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Shipping Options Example</h2>
      <div class="max-w-md bg-color-2 rounded-xl border border-color-3 overflow-hidden">
        <div class="p-4 border-b border-color-3">
          <h3 class="font-semibold ui-text-primary">Select Shipping Method</h3>
        </div>
        <div class="divide-y divide-color-3">
          <div 
            v-for="shipping in shippingOptions" 
            :key="shipping.id"
            :class="[
              'p-4 cursor-pointer transition-colors',
              selectedShipping === shipping.id ? 'bg-primary/5' : 'hover:bg-color-3/50'
            ]"
            @click="selectedShipping = shipping.id"
          >
            <div class="flex items-center gap-3">
              <Radio 
                v-model="selectedShipping" 
                :value="shipping.id" 
                name="shipping"
              />
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <span class="font-medium ui-text-primary">{{ shipping.name }}</span>
                  <span class="font-semibold ui-text-primary">${{ shipping.price }}</span>
                </div>
                <p class="text-sm ui-text-secondary">{{ shipping.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Payment Method Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Payment Method Example</h2>
      <div class="max-w-md space-y-3">
        <div 
          v-for="payment in paymentMethods" 
          :key="payment.id"
          :class="[
            'p-4 rounded-lg border-2 cursor-pointer transition-all',
            selectedPayment === payment.id 
              ? 'border-primary bg-primary/5' 
              : 'border-color-3 hover:border-color-4'
          ]"
          @click="selectedPayment = payment.id"
        >
          <div class="flex items-center gap-3">
            <Radio 
              v-model="selectedPayment" 
              :value="payment.id" 
              name="payment"
            />
            <span class="text-2xl">{{ payment.icon }}</span>
            <div class="flex-1">
              <span class="font-medium ui-text-primary">{{ payment.name }}</span>
              <p class="text-sm ui-text-secondary">{{ payment.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Survey Question Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Survey Question Example</h2>
      <div class="max-w-md bg-color-2 rounded-xl border border-color-3 p-6">
        <h3 class="font-semibold ui-text-primary mb-2">How satisfied are you with our service?</h3>
        <p class="text-sm ui-text-secondary mb-4">Please select one option</p>
        <div class="space-y-3">
          <Radio 
            v-for="option in surveyOptions" 
            :key="option.value"
            v-model="surveyAnswer" 
            :value="option.value" 
            name="survey"
            :label="option.label"
            :color="option.color"
          />
        </div>
        <div v-if="surveyAnswer" class="mt-4 pt-4 border-t border-color-3">
          <p class="text-sm ui-text-secondary">
            You selected: <span class="font-medium ui-text-primary">{{ surveyOptions.find(o => o.value === surveyAnswer)?.label }}</span>
          </p>
        </div>
      </div>
    </section>

    <!-- Inline Radio Group -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Inline Radio Group</h2>
      <div class="max-w-lg space-y-6">
        <div>
          <label class="text-sm font-medium ui-text-primary block mb-2">Select priority:</label>
          <div class="flex flex-wrap gap-4">
            <Radio v-model="priority" value="low" name="priority" label="Low" color="success" size="sm" />
            <Radio v-model="priority" value="medium" name="priority" label="Medium" color="warning" size="sm" />
            <Radio v-model="priority" value="high" name="priority" label="High" color="danger" size="sm" />
          </div>
        </div>
        <div>
          <label class="text-sm font-medium ui-text-primary block mb-2">Select size:</label>
          <div class="flex flex-wrap gap-4">
            <Radio v-model="productSize" value="xs" name="productSize" label="XS" size="sm" />
            <Radio v-model="productSize" value="s" name="productSize" label="S" size="sm" />
            <Radio v-model="productSize" value="m" name="productSize" label="M" size="sm" />
            <Radio v-model="productSize" value="l" name="productSize" label="L" size="sm" />
            <Radio v-model="productSize" value="xl" name="productSize" label="XL" size="sm" />
          </div>
        </div>
      </div>
    </section>

    <!-- All Props Reference -->
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

  </div>
</template>

<script setup>
import { ref } from 'vue'
import Radio from '@/components/buttons/radio/Radio.vue'

// Basic
const basic = ref('option1')

// Plan
const plan = ref('pro')

// Size demo
const sizeDemo = ref('md')

// Color demo
const colorDemo = ref('primary')

// Position demo
const posDemo = ref('right')

// State demos
const stateDisabled = ref('on')
const stateReadonly = ref('readonly')

// Validation demos
const validationDemo = ref('')
const hintDemo = ref('option1')

// Slot demo
const slotDemo = ref('terms')

// Pricing plans
const selectedPricing = ref('pro')
const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 9,
    description: 'Perfect for individuals',
    features: ['5 Projects', '10GB Storage', 'Email Support']
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    description: 'Best for small teams',
    popular: true,
    features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'Analytics']
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    description: 'For large organizations',
    features: ['Everything in Pro', 'Unlimited Storage', '24/7 Support', 'Custom Integrations']
  }
]

// Shipping options
const selectedShipping = ref('standard')
const shippingOptions = [
  { id: 'standard', name: 'Standard Shipping', price: 5.99, time: '5-7 business days' },
  { id: 'express', name: 'Express Shipping', price: 12.99, time: '2-3 business days' },
  { id: 'overnight', name: 'Overnight Shipping', price: 24.99, time: 'Next business day' }
]

// Payment methods
const selectedPayment = ref('card')
const paymentMethods = [
  { id: 'card', name: 'Credit Card', description: 'Visa, Mastercard, Amex', icon: '💳' },
  { id: 'paypal', name: 'PayPal', description: 'Pay with your PayPal account', icon: '🅿️' },
  { id: 'apple', name: 'Apple Pay', description: 'Quick and secure payment', icon: '🍎' },
  { id: 'crypto', name: 'Cryptocurrency', description: 'Bitcoin, Ethereum, etc.', icon: '₿' }
]

// Survey
const surveyAnswer = ref('')
const surveyOptions = [
  { value: 'very-satisfied', label: 'Very Satisfied', color: 'success' },
  { value: 'satisfied', label: 'Satisfied', color: 'success' },
  { value: 'neutral', label: 'Neutral', color: 'info' },
  { value: 'unsatisfied', label: 'Unsatisfied', color: 'warning' },
  { value: 'very-unsatisfied', label: 'Very Unsatisfied', color: 'danger' }
]

// Inline groups
const priority = ref('medium')
const productSize = ref('m')

// Props reference
const propsReference = [
  { name: 'modelValue', type: 'String | Number | Boolean', default: "''", description: 'v-model binding value' },
  { name: 'value', type: 'String | Number | Boolean', default: 'undefined', description: 'Value of this radio option' },
  { name: 'name', type: 'String', default: "''", description: 'Name attribute for grouping radios' },
  { name: 'label', type: 'String', default: "''", description: 'Label text' },
  { name: 'description', type: 'String', default: "''", description: 'Description text below label' },
  { name: 'labelPosition', type: "'left' | 'right'", default: "'right'", description: 'Position of the label' },
  { name: 'disabled', type: 'Boolean', default: 'false', description: 'Disable the radio' },
  { name: 'readonly', type: 'Boolean', default: 'false', description: 'Make radio readonly' },
  { name: 'required', type: 'Boolean', default: 'false', description: 'Show required indicator' },
  { name: 'error', type: 'String | Boolean', default: 'false', description: 'Error message' },
  { name: 'hint', type: 'String', default: "''", description: 'Hint text' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Size of the radio' },
  { name: 'color', type: "'primary' | 'success' | 'warning' | 'danger' | 'info'", default: "'primary'", description: 'Color theme' },
  { name: 'margin', type: 'String', default: "''", description: 'Margin classes' }
]
</script>