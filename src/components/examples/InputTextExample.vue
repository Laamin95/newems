<template>
  <div class="p-6 space-y-10 text-left">
    <h1 class="text-2xl font-bold ui-text-primary">InputText Component Examples</h1>

    <!-- Basic Usage -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Basic Usage</h2>
      <div class="max-w-md space-y-4">
        <InputText v-model="basicValue" placeholder="Enter text..." />
        <InputText v-model="basicWithLabel" label="Username" placeholder="Enter username" />
        <InputText v-model="basicWithValue" label="Pre-filled" />
      </div>
      <div class="text-sm ui-text-secondary">
        Values: "{{ basicValue }}", "{{ basicWithLabel }}", "{{ basicWithValue }}"
      </div>
    </section>

    <!-- Input Types -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Input Types</h2>
      <div class="max-w-md space-y-4">
        <InputText v-model="typeText" type="text" label="Text" placeholder="Regular text" />
        <InputText v-model="typeEmail" type="email" label="Email" placeholder="email@example.com" />
        <InputText v-model="typePassword" type="password" label="Password" placeholder="Enter password" />
        <InputText v-model="typeNumber" type="number" label="Number" placeholder="Enter a number" />
        <InputText v-model="typeTel" type="tel" label="Phone" placeholder="+1 (555) 000-0000" />
        <InputText v-model="typeUrl" type="url" label="URL" placeholder="https://example.com" />
        <InputText v-model="typeSearch" type="search" label="Search" placeholder="Search..." />
      </div>
    </section>

    <!-- Sizes -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Sizes</h2>
      <div class="max-w-md space-y-4">
        <InputText v-model="sizeXs" size="xs" label="Extra Small" placeholder="XS size input" />
        <InputText v-model="sizeSm" size="sm" label="Small" placeholder="SM size input" />
        <InputText v-model="sizeMd" size="md" label="Medium (Default)" placeholder="MD size input" />
        <InputText v-model="sizeLg" size="lg" label="Large" placeholder="LG size input" />
        <InputText v-model="sizeXl" size="xl" label="Extra Large" placeholder="XL size input" />
      </div>
    </section>

    <!-- With Icons -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">With Icons</h2>
      <div class="max-w-md space-y-4">
        <InputText 
          v-model="iconLeft" 
          label="Left Icon" 
          placeholder="Search..."
          prepend-icon="magnifying-glass"
        />
        <InputText 
          v-model="iconRight" 
          label="Right Icon" 
          placeholder="Enter email"
          append-icon="envelope"
        />
        <InputText 
          v-model="iconBoth" 
          label="Both Icons" 
          placeholder="Enter amount"
          prepend-icon="currency-dollar"
          append-icon="calculator"
        />
        <InputText 
          v-model="iconUser" 
          label="User Input" 
          placeholder="Enter username"
          prepend-icon="user"
        />
        <InputText 
          v-model="iconLock" 
          type="password"
          label="Password" 
          placeholder="Enter password"
          prepend-icon="lock-closed"
        />
      </div>
    </section>

    <!-- With Prefix/Suffix -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">With Prefix/Suffix</h2>
      <div class="max-w-md space-y-4">
        <InputText 
          v-model="prefixValue" 
          label="Website" 
          placeholder="yoursite"
          prefix="https://"
        />
        <InputText 
          v-model="suffixValue" 
          label="Email" 
          placeholder="username"
          suffix="@gmail.com"
        />
        <InputText 
          v-model="bothValue" 
          label="Price" 
          placeholder="0.00"
          prefix="$"
          suffix="USD"
        />
        <InputText 
          v-model="domainValue" 
          label="Subdomain" 
          placeholder="myapp"
          suffix=".example.com"
        />
      </div>
    </section>

    <!-- With Description & Hint -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">With Description & Hint</h2>
      <div class="max-w-md space-y-4">
        <InputText 
          v-model="descValue" 
          label="Username" 
          placeholder="Enter username"
          description="Choose a unique username for your account"
        />
        <InputText 
          v-model="hintValue" 
          label="Password" 
          type="password"
          placeholder="Enter password"
          hint="Must be at least 8 characters"
        />
        <InputText 
          v-model="bothDescHint" 
          label="Email Address" 
          type="email"
          placeholder="you@example.com"
          description="We'll use this for account notifications"
          hint="You can change this later in settings"
        />
      </div>
    </section>

    <!-- Validation States -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Validation States</h2>
      <div class="max-w-md space-y-4">
        <InputText 
          v-model="errorValue" 
          label="Email" 
          type="email"
          placeholder="Enter email"
          :error="errorValue && !isValidEmail(errorValue) ? 'Please enter a valid email address' : ''"
        />
        <InputText 
          v-model="successValue" 
          label="Username (Available)" 
          placeholder="Enter username"
          :success="successValue.length >= 3 ? 'Username is available!' : ''"
        />
        <InputText 
          v-model="warningValue" 
          label="Password" 
          type="password"
          placeholder="Enter password"
          :warning="warningValue.length > 0 && warningValue.length < 8 ? 'Password is weak' : ''"
        />
        <InputText 
          v-model="requiredValue" 
          label="Required Field" 
          placeholder="This field is required"
          :required="true"
          :error="requiredTouched && !requiredValue ? 'This field is required' : ''"
          @blur="requiredTouched = true"
        />
      </div>
    </section>

    <!-- Character Counter -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Character Counter</h2>
      <div class="max-w-md space-y-4">
        <InputText 
          v-model="counterValue" 
          label="Bio" 
          placeholder="Write a short bio..."
          :maxlength="100"
          show-count
        />
        <InputText 
          v-model="counterMin" 
          label="Username" 
          placeholder="Enter username"
          :minlength="3"
          :maxlength="20"
          show-count
          hint="Between 3-20 characters"
        />
        <InputText 
          v-model="counterNoMax" 
          label="Description" 
          placeholder="Enter description"
          show-count
        />
      </div>
    </section>

    <!-- Clearable -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Clearable</h2>
      <div class="max-w-md space-y-4">
        <InputText 
          v-model="clearableValue" 
          label="Search" 
          placeholder="Type to search..."
          clearable
          prepend-icon="magnifying-glass"
        />
        <InputText 
          v-model="clearableEmail" 
          label="Email" 
          type="email"
          placeholder="Enter email"
          clearable
        />
      </div>
      <div class="text-sm ui-text-secondary">
        Values: "{{ clearableValue }}", "{{ clearableEmail }}"
      </div>
    </section>

    <!-- States -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">States</h2>
      <div class="max-w-md space-y-4">
        <InputText 
          v-model="disabledValue" 
          label="Disabled" 
          placeholder="Disabled input"
          :disabled="true"
        />
        <InputText 
          v-model="readonlyValue" 
          label="Readonly" 
          :readonly="true"
        />
        <InputText 
          v-model="loadingValue" 
          label="Loading" 
          placeholder="Fetching data..."
          :loading="true"
        />
      </div>
    </section>

    <!-- Rounded Variants -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Rounded Variants</h2>
      <div class="max-w-md space-y-4">
        <InputText v-model="roundedNone" label="None" placeholder="No rounding" rounded="none" />
        <InputText v-model="roundedSm" label="Small" placeholder="Small rounding" rounded="sm" />
        <InputText v-model="roundedMd" label="Medium (Default)" placeholder="Medium rounding" rounded="md" />
        <InputText v-model="roundedLg" label="Large" placeholder="Large rounding" rounded="lg" />
        <InputText v-model="roundedFull" label="Full" placeholder="Full rounding" rounded="full" />
      </div>
    </section>

    <!-- With Slots -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">With Slots</h2>
      <div class="max-w-md space-y-4">
        <InputText v-model="slotPrepend" label="With Prepend Slot" placeholder="Enter amount">
          <template #prepend>
            <span class="text-green-500 font-bold">$</span>
          </template>
        </InputText>
        <InputText v-model="slotAppend" label="With Append Slot" placeholder="Enter weight">
          <template #append>
            <span class="text-sm ui-text-secondary">kg</span>
          </template>
        </InputText>
        <InputText v-model="slotBoth" label="With Both Slots" placeholder="Enter value">
          <template #prepend>
            <span class="text-lg">🔢</span>
          </template>
          <template #append>
            <button class="text-primary hover:text-primary/80 text-sm font-medium">
              Apply
            </button>
          </template>
        </InputText>
      </div>
    </section>

    <!-- Login Form Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Login Form Example</h2>
      <div class="max-w-md bg-color-2 rounded-xl border border-color-3 p-6">
        <h3 class="text-lg font-semibold ui-text-primary mb-4">Sign In</h3>
        <div class="space-y-4">
          <InputText 
            v-model="loginEmail" 
            label="Email Address" 
            type="email"
            placeholder="you@example.com"
            prepend-icon="envelope"
            :error="loginEmailError"
          />
          <InputText 
            v-model="loginPassword" 
            label="Password" 
            type="password"
            placeholder="Enter your password"
            prepend-icon="lock-closed"
            :error="loginPasswordError"
          />
          <div class="flex items-center justify-between pt-2">
            <label class="flex items-center gap-2 text-sm ui-text-secondary cursor-pointer">
              <input type="checkbox" class="rounded" />
              Remember me
            </label>
            <a href="#" class="text-sm text-primary hover:underline">Forgot password?</a>
          </div>
          <button 
            class="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            @click="validateLogin"
          >
            Sign In
          </button>
        </div>
      </div>
    </section>

    <!-- Registration Form Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Registration Form Example</h2>
      <div class="max-w-md bg-color-2 rounded-xl border border-color-3 p-6">
        <h3 class="text-lg font-semibold ui-text-primary mb-4">Create Account</h3>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <InputText 
              v-model="regFirstName" 
              label="First Name" 
              placeholder="John"
              :required="true"
            />
            <InputText 
              v-model="regLastName" 
              label="Last Name" 
              placeholder="Doe"
              :required="true"
            />
          </div>
          <InputText 
            v-model="regEmail" 
            label="Email" 
            type="email"
            placeholder="john@example.com"
            :required="true"
            description="We'll send a verification email"
          />
          <InputText 
            v-model="regUsername" 
            label="Username" 
            placeholder="johndoe"
            :required="true"
            :minlength="3"
            :maxlength="20"
            show-count
            hint="3-20 characters, letters and numbers only"
          />
          <InputText 
            v-model="regPassword" 
            label="Password" 
            type="password"
            placeholder="Create a strong password"
            :required="true"
            :error="regPassword && regPassword.length < 8 ? 'Password must be at least 8 characters' : ''"
          />
          <InputText 
            v-model="regConfirmPassword" 
            label="Confirm Password" 
            type="password"
            placeholder="Repeat your password"
            :required="true"
            :error="regConfirmPassword && regConfirmPassword !== regPassword ? 'Passwords do not match' : ''"
          />
        </div>
      </div>
    </section>

    <!-- Search Box Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Search Box Example</h2>
      <div class="max-w-lg">
        <InputText 
          v-model="searchQuery" 
          type="search"
          placeholder="Search products, categories, brands..."
          prepend-icon="magnifying-glass"
          clearable
          size="lg"
          rounded="full"
        />
        <div v-if="searchQuery" class="mt-4 bg-color-2 rounded-lg border border-color-3 p-4">
          <p class="text-sm ui-text-secondary mb-2">Search results for: "{{ searchQuery }}"</p>
          <div class="space-y-2">
            <div 
              v-for="i in 3" 
              :key="i"
              class="p-3 bg-color-3/50 rounded-lg hover:bg-color-3 cursor-pointer transition-colors"
            >
              <p class="ui-text-primary text-sm">Result item {{ i }} for "{{ searchQuery }}"</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Payment Form Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Payment Form Example</h2>
      <div class="max-w-md bg-color-2 rounded-xl border border-color-3 p-6">
        <h3 class="text-lg font-semibold ui-text-primary mb-4">Payment Details</h3>
        <div class="space-y-4">
          <InputText 
            v-model="paymentCard" 
            label="Card Number" 
            placeholder="1234 5678 9012 3456"
            prepend-icon="credit-card"
            :maxlength="19"
          />
          <div class="grid grid-cols-2 gap-4">
            <InputText 
              v-model="paymentExpiry" 
              label="Expiry Date" 
              placeholder="MM/YY"
              :maxlength="5"
            />
            <InputText 
              v-model="paymentCvv" 
              label="CVV" 
              type="password"
              placeholder="123"
              :maxlength="4"
              hint="3-4 digits on back of card"
            />
          </div>
          <InputText 
            v-model="paymentName" 
            label="Cardholder Name" 
            placeholder="Name on card"
          />
          <InputText 
            v-model="paymentZip" 
            label="Billing ZIP Code" 
            placeholder="12345"
            :maxlength="10"
          />
        </div>
      </div>
    </section>

    <!-- Address Form Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Address Form Example</h2>
      <div class="max-w-lg bg-color-2 rounded-xl border border-color-3 p-6">
        <h3 class="text-lg font-semibold ui-text-primary mb-4">Shipping Address</h3>
        <div class="space-y-4">
          <InputText 
            v-model="addressStreet" 
            label="Street Address" 
            placeholder="123 Main Street"
            prepend-icon="home"
          />
          <InputText 
            v-model="addressApt" 
            label="Apt, Suite, Unit (Optional)" 
            placeholder="Apartment 4B"
          />
          <div class="grid grid-cols-2 gap-4">
            <InputText 
              v-model="addressCity" 
              label="City" 
              placeholder="New York"
            />
            <InputText 
              v-model="addressState" 
              label="State/Province" 
              placeholder="NY"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <InputText 
              v-model="addressZip" 
              label="ZIP/Postal Code" 
              placeholder="10001"
            />
            <InputText 
              v-model="addressCountry" 
              label="Country" 
              placeholder="United States"
            />
          </div>
          <InputText 
            v-model="addressPhone" 
            label="Phone Number" 
            type="tel"
            placeholder="+1 (555) 123-4567"
            prepend-icon="phone"
            hint="For delivery updates"
          />
        </div>
      </div>
    </section>

    <!-- Profile Settings Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Profile Settings Example</h2>
      <div class="max-w-lg bg-color-2 rounded-xl border border-color-3 overflow-hidden">
        <div class="p-4 border-b border-color-3">
          <h3 class="font-semibold ui-text-primary">Profile Information</h3>
          <p class="text-sm ui-text-secondary">Update your account's profile information</p>
        </div>
        <div class="p-6 space-y-4">
          <InputText 
            v-model="profileName" 
            label="Display Name" 
            placeholder="Your display name"
            prepend-icon="user"
            description="This is how others will see you"
          />
          <InputText 
            v-model="profileEmail" 
            label="Email Address" 
            type="email"
            placeholder="you@example.com"
            prepend-icon="envelope"
            :readonly="true"
            hint="Contact support to change your email"
          />
          <InputText 
            v-model="profileWebsite" 
            label="Website" 
            type="url"
            placeholder="https://yourwebsite.com"
            prefix="https://"
          />
          <InputText 
            v-model="profileBio" 
            label="Bio" 
            placeholder="Tell us about yourself..."
            :maxlength="160"
            show-count
          />
        </div>
        <div class="p-4 border-t border-color-3 bg-color-3/30 flex justify-end gap-3">
          <button class="px-4 py-2 rounded-lg ui-text-secondary hover:bg-color-3 transition-colors">
            Cancel
          </button>
          <button class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </section>

    <!-- Inline Edit Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Inline Edit Example</h2>
      <div class="max-w-md bg-color-2 rounded-xl border border-color-3 p-4">
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <span class="text-sm ui-text-secondary w-20">Name:</span>
            <InputText 
              v-if="isEditingName" 
              v-model="inlineName" 
              size="sm"
              class="flex-1"
              @blur="isEditingName = false"
              @keyup.enter="isEditingName = false"
            />
            <div v-else class="flex-1 flex items-center gap-2">
              <span class="ui-text-primary">{{ inlineName }}</span>
              <button 
                class="text-primary hover:text-primary/80"
                @click="isEditingName = true"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-sm ui-text-secondary w-20">Title:</span>
            <InputText 
              v-if="isEditingTitle" 
              v-model="inlineTitle" 
              size="sm"
              class="flex-1"
              @blur="isEditingTitle = false"
              @keyup.enter="isEditingTitle = false"
            />
            <div v-else class="flex-1 flex items-center gap-2">
              <span class="ui-text-primary">{{ inlineTitle }}</span>
              <button 
                class="text-primary hover:text-primary/80"
                @click="isEditingTitle = true"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
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

    <!-- Slots Reference -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Slots Reference</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-color-2">
            <tr>
              <th class="text-left p-3 ui-text-primary font-semibold">Slot</th>
              <th class="text-left p-3 ui-text-primary font-semibold">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-color-3">
            <tr v-for="slot in slotsReference" :key="slot.name">
              <td class="p-3 font-mono text-primary">{{ slot.name }}</td>
              <td class="p-3 ui-text-secondary">{{ slot.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import InputText from '@/components/fields/InputText.vue'

// Basic usage
const basicValue = ref('')
const basicWithLabel = ref('')
const basicWithValue = ref('Pre-filled value')

// Input types
const typeText = ref('')
const typeEmail = ref('')
const typePassword = ref('')
const typeNumber = ref('')
const typeTel = ref('')
const typeUrl = ref('')
const typeSearch = ref('')

// Sizes
const sizeXs = ref('')
const sizeSm = ref('')
const sizeMd = ref('')
const sizeLg = ref('')
const sizeXl = ref('')

// Icons
const iconLeft = ref('')
const iconRight = ref('')
const iconBoth = ref('')
const iconUser = ref('')
const iconLock = ref('')

// Prefix/Suffix
const prefixValue = ref('')
const suffixValue = ref('')
const bothValue = ref('')
const domainValue = ref('')

// Description & Hint
const descValue = ref('')
const hintValue = ref('')
const bothDescHint = ref('')

// Validation
const errorValue = ref('invalid-email')
const successValue = ref('validuser')
const warningValue = ref('weak')
const requiredValue = ref('')
const requiredTouched = ref(false)

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Character counter
const counterValue = ref('')
const counterMin = ref('')
const counterNoMax = ref('Some text here')

// Clearable
const clearableValue = ref('Clear me!')
const clearableEmail = ref('test@example.com')

// States
const disabledValue = ref('Disabled content')
const readonlyValue = ref('Readonly content')
const loadingValue = ref('')

// Rounded
const roundedNone = ref('')
const roundedSm = ref('')
const roundedMd = ref('')
const roundedLg = ref('')
const roundedFull = ref('')

// Slots
const slotPrepend = ref('')
const slotAppend = ref('')
const slotBoth = ref('')

// Login form
const loginEmail = ref('')
const loginPassword = ref('')
const loginEmailError = ref('')
const loginPasswordError = ref('')

const validateLogin = () => {
  loginEmailError.value = ''
  loginPasswordError.value = ''
  
  if (!loginEmail.value) {
    loginEmailError.value = 'Email is required'
  } else if (!isValidEmail(loginEmail.value)) {
    loginEmailError.value = 'Please enter a valid email'
  }
  
  if (!loginPassword.value) {
    loginPasswordError.value = 'Password is required'
  }
}

// Registration form
const regFirstName = ref('')
const regLastName = ref('')
const regEmail = ref('')
const regUsername = ref('')
const regPassword = ref('')
const regConfirmPassword = ref('')

// Search
const searchQuery = ref('')

// Payment form
const paymentCard = ref('')
const paymentExpiry = ref('')
const paymentCvv = ref('')
const paymentName = ref('')
const paymentZip = ref('')

// Address form
const addressStreet = ref('')
const addressApt = ref('')
const addressCity = ref('')
const addressState = ref('')
const addressZip = ref('')
const addressCountry = ref('')
const addressPhone = ref('')

// Profile settings
const profileName = ref('John Doe')
const profileEmail = ref('john@example.com')
const profileWebsite = ref('')
const profileBio = ref('')

// Inline edit
const inlineName = ref('John Doe')
const inlineTitle = ref('Software Engineer')
const isEditingName = ref(false)
const isEditingTitle = ref(false)

// Props reference
const propsReference = [
  { name: 'modelValue', type: 'String | Number', default: "''", description: 'v-model binding value' },
  { name: 'type', type: "'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'", default: "'text'", description: 'Input type' },
  { name: 'label', type: 'String', default: "''", description: 'Label text' },
  { name: 'placeholder', type: 'String', default: "''", description: 'Placeholder text' },
  { name: 'description', type: 'String', default: "''", description: 'Description text below label' },
  { name: 'hint', type: 'String', default: "''", description: 'Hint text below input' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Input size' },
  { name: 'rounded', type: "'none' | 'sm' | 'md' | 'lg' | 'full'", default: "'md'", description: 'Border radius' },
  { name: 'prependIcon', type: 'String', default: "''", description: 'Icon before input' },
  { name: 'appendIcon', type: 'String', default: "''", description: 'Icon after input' },
  { name: 'prefix', type: 'String', default: "''", description: 'Text prefix inside input' },
  { name: 'suffix', type: 'String', default: "''", description: 'Text suffix inside input' },
  { name: 'disabled', type: 'Boolean', default: 'false', description: 'Disable the input' },
  { name: 'readonly', type: 'Boolean', default: 'false', description: 'Make input readonly' },
  { name: 'loading', type: 'Boolean', default: 'false', description: 'Show loading spinner' },
  { name: 'required', type: 'Boolean', default: 'false', description: 'Show required indicator' },
  { name: 'clearable', type: 'Boolean', default: 'false', description: 'Show clear button' },
  { name: 'showCount', type: 'Boolean', default: 'false', description: 'Show character count' },
  { name: 'minlength', type: 'Number', default: 'undefined', description: 'Minimum character length' },
  { name: 'maxlength', type: 'Number', default: 'undefined', description: 'Maximum character length' },
  { name: 'error', type: 'String | Boolean', default: 'false', description: 'Error message' },
  { name: 'success', type: 'String | Boolean', default: 'false', description: 'Success message' },
  { name: 'warning', type: 'String | Boolean', default: 'false', description: 'Warning message' }
]

// Events reference
const eventsReference = [
  { name: 'update:modelValue', payload: 'String | Number', description: 'Emitted when value changes' },
  { name: 'input', payload: 'Event', description: 'Native input event' },
  { name: 'change', payload: 'Event', description: 'Native change event' },
  { name: 'focus', payload: 'FocusEvent', description: 'Emitted when input is focused' },
  { name: 'blur', payload: 'FocusEvent', description: 'Emitted when input loses focus' },
  { name: 'clear', payload: 'void', description: 'Emitted when clear button is clicked' }
]

// Slots reference
const slotsReference = [
  { name: 'prepend', description: 'Content before the input (inside the input container)' },
  { name: 'append', description: 'Content after the input (inside the input container)' },
  { name: 'label', description: 'Custom label content' },
  { name: 'hint', description: 'Custom hint content' }
]
</script>