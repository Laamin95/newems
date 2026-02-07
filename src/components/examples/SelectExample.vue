<template>
  <div class="p-6 space-y-10 text-left">
    <h1 class="text-2xl font-bold ui-text-primary">Select Component Examples</h1>

    <!-- Basic Usage -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Basic Usage</h2>
      <div class="max-w-md space-y-4">
        <Select 
          v-model="basicValue" 
          :items="basicOptions" 
          placeholder="Select an option"
          id="basic-select"
        />
        <Select 
          v-model="basicWithLabel" 
          :items="basicOptions" 
          label="Choose a fruit"
          placeholder="Select a fruit"
        />
        <Select 
          v-model="basicPreselected" 
          :items="basicOptions" 
          label="Pre-selected"
        />
      </div>
      <div class="text-sm ui-text-secondary">
        Values: "{{ basicValue }}", "{{ basicWithLabel }}", "{{ basicPreselected }}"
      </div>
    </section>

    <!-- Object Options -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Object Options</h2>
      <div class="max-w-md space-y-4">
        <Select 
          v-model="objectValue" 
          :items="countryOptions" 
          label="Select Country"
          placeholder="Choose your country"
          item-title="name"
          item-value="code"
        />
        <Select 
          v-model="objectWithIcon" 
          :items="statusOptions" 
          label="Select Status"
          placeholder="Choose status"
          item-title="label"
          item-value="value"
        >
          <template #item="{ item }">
            <div class="flex items-center gap-2">
              <span :class="['w-2 h-2 rounded-full', item.color]"></span>
              {{ item.label }}
            </div>
          </template>
        </Select>
      </div>
      <div class="text-sm ui-text-secondary">
        Selected country: {{ objectValue }}, Status: {{ objectWithIcon }}
      </div>
    </section>

    <!-- Sizes -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Sizes</h2>
      <div class="max-w-md space-y-4">
        <Select v-model="sizeXs" :items="basicOptions" size="xs" label="Extra Small" placeholder="XS size" />
        <Select v-model="sizeSm" :items="basicOptions" size="sm" label="Small" placeholder="SM size" />
        <Select v-model="sizeMd" :items="basicOptions" size="md" label="Medium (Default)" placeholder="MD size" />
        <Select v-model="sizeLg" :items="basicOptions" size="lg" label="Large" placeholder="LG size" />
        <Select v-model="sizeXl" :items="basicOptions" size="xl" label="Extra Large" placeholder="XL size" />
      </div>
    </section>

    <!-- With Icons -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">With Icons</h2>
      <div class="max-w-md space-y-4">
        <Select 
          v-model="iconLeft" 
          :items="basicOptions" 
          label="With Prepend Icon"
          placeholder="Select fruit"
          prepend="shopping-bag"
        />
        <Select 
          v-model="iconRight" 
          :items="countryOptions" 
          label="With Append Icon"
          placeholder="Select country"
          item-title="name"
          item-value="code"
          append="globe-alt"
        />
        <Select 
          v-model="iconUser" 
          :items="userOptions" 
          label="Select User"
          placeholder="Choose a user"
          item-title="name"
          item-value="id"
          prepend="user"
        />
      </div>
    </section>

    <!-- Searchable / Filterable -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Searchable / Filterable</h2>
      <div class="max-w-md space-y-4">
        <Select 
          v-model="searchableValue" 
          :items="countryOptions" 
          label="Searchable Select"
          placeholder="Type to search..."
          item-title="name"
          item-value="code"
          searchable
        />
        <Select 
          v-model="searchableMulti" 
          :items="tagOptions" 
          label="Searchable Multi-Select"
          placeholder="Search and select tags..."
          item-title="name"
          item-value="id"
          searchable
          multiple
        />
      </div>
    </section>

    <!-- Multiple Selection -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Multiple Selection</h2>
      <div class="max-w-md space-y-4">
        <Select 
          v-model="multipleValue" 
          :items="basicOptions" 
          label="Select Multiple Fruits"
          placeholder="Select fruits"
          multiple
        />
        <Select 
          v-model="multipleChips" 
          :items="tagOptions" 
          label="With Chips"
          placeholder="Select tags"
          item-title="name"
          item-value="id"
          multiple
        />
        <Select 
          v-model="multipleLimited" 
          :items="basicOptions" 
          label="Multiple Selections"
          placeholder="Select multiple"
          multiple
          hint="You can select multiple items"
        />
      </div>
      <div class="text-sm ui-text-secondary">
        Multiple: {{ multipleValue }}, Tags: {{ multipleChips }}, Limited: {{ multipleLimited }}
      </div>
    </section>

    <!-- Cascading Selects -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">With Description & Hint</h2>
      <div class="max-w-md space-y-4">
        <Select 
          v-model="descValue" 
          :items="basicOptions" 
          label="Favorite Fruit"
          placeholder="Select a fruit"
          description="Choose your most favorite fruit"
        />
        <Select 
          v-model="hintValue" 
          :items="priorityOptions" 
          label="Priority Level"
          placeholder="Select priority"
          item-title="label"
          item-value="value"
          hint="Higher priority items are processed first"
        />
        <Select 
          v-model="bothDescHint" 
          :items="countryOptions" 
          label="Country of Residence"
          placeholder="Select country"
          item-title="name"
          item-value="code"
          description="This will be used for shipping"
          hint="You can change this later in settings"
        />
      </div>
    </section>

    <!-- Validation States -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Validation States</h2>
      <div class="max-w-md space-y-4">
        <Select 
          v-model="errorValue" 
          :items="basicOptions" 
          label="Required Field"
          placeholder="This field is required"
          :required="true"
          :error="!errorValue ? 'Please select an option' : ''"
        />
        <Select 
          v-model="successValue" 
          :items="countryOptions" 
          label="Verified Country"
          placeholder="Select country"
          item-title="name"
          item-value="code"
          :success="successValue ? 'Country verified!' : ''"
        />
        <Select 
          v-model="warningValue" 
          :items="priorityOptions" 
          label="Priority"
          placeholder="Select priority"
          item-title="label"
          item-value="value"
          :warning="warningValue === 'low' ? 'Low priority items may be delayed' : ''"
        />
      </div>
    </section>

    <!-- States -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">States</h2>
      <div class="max-w-md space-y-4">
        <Select 
          v-model="disabledValue" 
          :items="basicOptions" 
          label="Disabled"
          placeholder="Cannot select"
          :disabled="true"
        />
        <Select 
          v-model="readonlyValue" 
          :items="basicOptions" 
          label="Readonly"
          :readonly="true"
        />
        <Select 
          v-model="loadingValue" 
          :items="[]" 
          label="Loading"
          placeholder="Fetching options..."
          :loading="true"
        />
        <Select 
          v-model="clearableValue" 
          :items="basicOptions" 
          label="Clearable"
          placeholder="Select and clear"
          clearable
        />
      </div>
    </section>

    <!-- Rounded Variants -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Rounded Variants</h2>
      <div class="max-w-md space-y-4">
        <Select v-model="roundedNone" :items="basicOptions" label="None" placeholder="No rounding" rounded="none" />
        <Select v-model="roundedSm" :items="basicOptions" label="Small" placeholder="Small rounding" rounded="sm" />
        <Select v-model="roundedMd" :items="basicOptions" label="Medium" placeholder="Medium rounding" rounded="md" />
        <Select v-model="roundedLg" :items="basicOptions" label="Large" placeholder="Large rounding" rounded="lg" />
        <Select v-model="roundedFull" :items="basicOptions" label="Full" placeholder="Full rounding" rounded="full" />
      </div>
    </section>

    <!-- Custom Option Templates -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Custom Option Templates</h2>
      <div class="max-w-md space-y-4">
        <Select 
          v-model="customTemplateUser" 
          :items="userOptions" 
          label="Select User"
          placeholder="Choose a team member"
          item-title="name"
          item-value="id"
        >
          <template #item="{ item }">
            <div class="flex items-center gap-3 py-1">
              <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                {{ item.name.charAt(0) }}
              </div>
              <div>
                <div class="font-medium ui-text-primary">{{ item.name }}</div>
                <div class="text-xs ui-text-secondary">{{ item.role }}</div>
              </div>
            </div>
          </template>
        </Select>

        <Select 
          v-model="customTemplateCountry" 
          :items="countryOptionsWithFlag" 
          label="Select Country"
          placeholder="Choose a country"
          item-title="name"
          item-value="code"
        >
          <template #item="{ item }">
            <div class="flex items-center gap-2">
              <span class="text-xl">{{ item.flag }}</span>
              <span>{{ item.name }}</span>
              <span class="text-xs ui-text-secondary">({{ item.code }})</span>
            </div>
          </template>
        </Select>

        <Select 
          v-model="customTemplateColor" 
          :items="colorOptions" 
          label="Select Color"
          placeholder="Choose a color"
          item-title="name"
          item-value="value"
        >
          <template #item="{ item }">
            <div class="flex items-center gap-2">
              <span :class="['w-2 h-2 rounded-full', item.class]"></span>
              <span>{{ item.name }}</span>
            </div>
          </template>
        </Select>
      </div>
    </section>

    <!-- Async Options Loading -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Async Options Loading</h2>
      <div class="max-w-md space-y-4">
        <Select 
          v-model="asyncValue" 
          :items="asyncOptions" 
          label="Async Select"
          placeholder="Click to load options"
          item-title="name"
          item-value="id"
          :loading="asyncLoading"
          @open="loadAsyncOptions"
        />
        <Select 
          v-model="asyncSearchValue" 
          :items="asyncSearchOptions" 
          label="Async Search"
          placeholder="Type to search..."
          item-title="title"
          item-value="id"
          searchable
          :loading="asyncSearchLoading"
          @search="handleAsyncSearch"
        />
      </div>
    </section>

    <!-- Form Examples -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Registration Form Example</h2>
      <div class="max-w-md bg-color-2 rounded-xl border border-color-3 p-6">
        <h3 class="text-lg font-semibold ui-text-primary mb-4">Create Account</h3>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium ui-text-primary mb-1">First Name</label>
              <input 
                type="text" 
                class="w-full px-3 py-2 rounded-lg border border-color-3 bg-color-1 ui-text-primary"
                placeholder="John"
              />
            </div>
            <div>
              <label class="block text-sm font-medium ui-text-primary mb-1">Last Name</label>
              <input 
                type="text" 
                class="w-full px-3 py-2 rounded-lg border border-color-3 bg-color-1 ui-text-primary"
                placeholder="Doe"
              />
            </div>
          </div>
          <Select 
            v-model="formCountry" 
            :items="countryOptions" 
            label="Country"
            placeholder="Select your country"
            item-title="name"
            item-value="code"
            prepend="globe-alt"
            searchable
            :required="true"
          />
          <Select 
            v-model="formTimezone" 
            :items="timezoneOptions" 
            label="Timezone"
            placeholder="Select timezone"
            item-title="label"
            item-value="value"
            prepend="clock"
            searchable
          />
          <Select 
            v-model="formLanguage" 
            :items="languageOptions" 
            label="Preferred Language"
            placeholder="Select language"
            item-title="name"
            item-value="code"
          />
          <button class="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Create Account
          </button>
        </div>
      </div>
    </section>

    <!-- Filter Panel Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Filter Panel Example</h2>
      <div class="max-w-2xl bg-color-2 rounded-xl border border-color-3 p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold ui-text-primary">Filters</h3>
          <button 
            class="text-sm text-primary hover:underline"
            @click="clearFilters"
          >
            Clear All
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select 
            v-model="filterCategory" 
            :items="categoryOptions" 
            label="Category"
            placeholder="All categories"
            item-title="name"
            item-value="id"
            clearable
            size="sm"
          />
          <Select 
            v-model="filterStatus" 
            :items="statusOptions" 
            label="Status"
            placeholder="All statuses"
            item-title="label"
            item-value="value"
            clearable
            size="sm"
          >
            <template #item="{ item }">
              <div class="flex items-center gap-2">
                <span :class="['w-2 h-2 rounded-full', item.color]"></span>
                {{ item.label }}
              </div>
            </template>
          </Select>
          <Select 
            v-model="filterPriority" 
            :items="priorityOptions" 
            label="Priority"
            placeholder="All priorities"
            item-title="label"
            item-value="value"
            clearable
            size="sm"
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Select 
            v-model="filterTags" 
            :items="tagOptions" 
            label="Tags"
            placeholder="Select tags"
            item-title="name"
            item-value="id"
            multiple
            searchable
            size="sm"
          />
          <Select 
            v-model="filterAssignee" 
            :items="userOptions" 
            label="Assignee"
            placeholder="All assignees"
            item-title="name"
            item-value="id"
            clearable
            searchable
            size="sm"
          />
        </div>
        <div class="flex justify-end gap-3 mt-4 pt-4 border-t border-color-3">
          <button class="px-4 py-2 rounded-lg ui-text-secondary hover:bg-color-3 transition-colors">
            Cancel
          </button>
          <button class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Apply Filters
          </button>
        </div>
      </div>
    </section>

    <!-- E-commerce Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">E-commerce Product Options</h2>
      <div class="max-w-md bg-color-2 rounded-xl border border-color-3 p-6">
        <div class="flex gap-4 mb-4">
          <div class="w-24 h-24 bg-color-3 rounded-lg flex items-center justify-center text-4xl">
            👕
          </div>
          <div>
            <h3 class="font-semibold ui-text-primary">Classic T-Shirt</h3>
            <p class="text-sm ui-text-secondary">Premium cotton blend</p>
            <p class="text-lg font-bold text-primary mt-1">$29.99</p>
          </div>
        </div>
        <div class="space-y-4">
          <Select 
            v-model="productSize" 
            :items="sizeOptions" 
            label="Size"
            placeholder="Select size"
            item-title="label"
            item-value="value"
            :required="true"
          >
            <template #item="{ item }">
              <div class="flex items-center justify-between w-full">
                <span>{{ item.label }}</span>
                <span :class="['w-2 h-2 rounded-full', item.inStock ? 'text-green-500' : 'text-red-500']">
                  {{ item.inStock ? 'In Stock' : 'Out of Stock' }}
                </span>
              </div>
            </template>
          </Select>
          <Select 
            v-model="productColor" 
            :items="productColorOptions" 
            label="Color"
            placeholder="Select color"
            item-title="name"
            item-value="value"
            :required="true"
          >
            <template #item="{ item }">
              <div class="flex items-center gap-2">
                <span :class="['w-2 h-2 rounded-full', item.class]"></span>
                <span>{{ item.name }}</span>
              </div>
            </template>
          </Select>
          <Select 
            v-model="productQuantity" 
            :items="quantityOptions" 
            label="Quantity"
            placeholder="Select quantity"
          />
          <button class="w-full py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </section>

    <!-- Cascading Selects Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Cascading / Dependent Selects</h2>
      <div class="max-w-md bg-color-2 rounded-xl border border-color-3 p-6">
        <h3 class="text-lg font-semibold ui-text-primary mb-4">Location Selector</h3>
        <div class="space-y-4">
          <Select 
            v-model="cascadeCountry" 
            :items="cascadeCountryOptions" 
            label="Country"
            placeholder="Select country"
            item-title="name"
            item-value="code"
            @change="handleCountryChange"
          />
          <Select 
            v-model="cascadeState" 
            :items="cascadeStateOptions" 
            label="State/Province"
            placeholder="Select state"
            item-title="name"
            item-value="code"
            :disabled="!cascadeCountry"
            @change="handleStateChange"
          />
          <Select 
            v-model="cascadeCity" 
            :items="cascadeCityOptions" 
            label="City"
            placeholder="Select city"
            item-title="name"
            item-value="id"
            :disabled="!cascadeState"
          />
        </div>
        <div v-if="cascadeCity" class="mt-4 p-3 bg-color-3/50 rounded-lg">
          <p class="text-sm ui-text-primary">
            Selected: {{ getLocationDisplay() }}
          </p>
        </div>
      </div>
    </section>

    <!-- Settings Panel Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Settings Panel Example</h2>
      <div class="max-w-lg bg-color-2 rounded-xl border border-color-3 overflow-hidden">
        <div class="p-4 border-b border-color-3">
          <h3 class="font-semibold ui-text-primary">Notification Preferences</h3>
          <p class="text-sm ui-text-secondary">Configure how you receive notifications</p>
        </div>
        <div class="p-6 space-y-4">
          <Select 
            v-model="settingsEmailFreq" 
            :items="frequencyOptions" 
            label="Email Digest Frequency"
            placeholder="Select frequency"
            item-title="label"
            item-value="value"
            description="How often should we send you email digests?"
          />
          <Select 
            v-model="settingsNotifyTypes" 
            :items="notificationTypeOptions" 
            label="Notification Types"
            placeholder="Select types"
            item-title="label"
            item-value="value"
            multiple
            description="Which types of notifications do you want to receive?"
          />
          <Select 
            v-model="settingsTheme" 
            :items="themeOptions" 
            label="Theme"
            placeholder="Select theme"
            item-title="label"
            item-value="value"
          >
            <template #item="{ item }">
              <div class="flex items-center gap-2">
                <span>{{ item.icon }}</span>
                <span>{{ item.label }}</span>
              </div>
            </template>
          </Select>
        </div>
        <div class="p-4 border-t border-color-3 bg-color-3/30 flex justify-end gap-3">
          <button class="px-4 py-2 rounded-lg ui-text-secondary hover:bg-color-3 transition-colors">
            Reset to Default
          </button>
          <button class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Save Preferences
          </button>
        </div>
      </div>
    </section>

    <!-- Comparison Table Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Comparison Selector</h2>
      <div class="max-w-2xl">
        <p class="text-sm ui-text-secondary mb-4">Compare up to 3 products side by side</p>
        <div class="grid grid-cols-3 gap-4">
          <Select 
            v-model="compareProduct1" 
            :items="productOptions" 
            label="Product 1"
            placeholder="Select product"
            item-title="name"
            item-value="id"
            clearable
          />
          <Select 
            v-model="compareProduct2" 
            :items="availableProducts2" 
            label="Product 2"
            placeholder="Select product"
            item-title="name"
            item-value="id"
            clearable
            :disabled="!compareProduct1"
          />
          <Select 
            v-model="compareProduct3" 
            :items="availableProducts3" 
            label="Product 3"
            placeholder="Select product"
            item-title="name"
            item-value="id"
            clearable
            :disabled="!compareProduct2"
          />
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
              <th class="text-left p-3 ui-text-primary font-semibold">Props</th>
              <th class="text-left p-3 ui-text-primary font-semibold">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-color-3">
            <tr v-for="slot in slotsReference" :key="slot.name">
              <td class="p-3 font-mono text-primary">{{ slot.name }}</td>
              <td class="p-3 ui-text-secondary">{{ slot.props }}</td>
              <td class="p-3 ui-text-secondary">{{ slot.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Select } from '../../'

// Basic usage
const basicValue = ref(null)
const basicWithLabel = ref(null)
const basicPreselected = ref('apple')

const basicOptions = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']

// Object options
const objectValue = ref(null)
const objectWithIcon = ref(null)

const countryOptions = [
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'UK' },
  { name: 'Canada', code: 'CA' },
  { name: 'Australia', code: 'AU' },
  { name: 'Germany', code: 'DE' },
  { name: 'France', code: 'FR' },
  { name: 'Japan', code: 'JP' },
  { name: 'Brazil', code: 'BR' },
]

const statusOptions = [
  { label: 'Active', value: 'active', color: 'bg-green-500' },
  { label: 'Pending', value: 'pending', color: 'bg-yellow-500' },
  { label: 'Inactive', value: 'inactive', color: 'bg-gray-500' },
  { label: 'Suspended', value: 'suspended', color: 'bg-red-500' },
]

// Sizes
const sizeXs = ref(null)
const sizeSm = ref(null)
const sizeMd = ref(null)
const sizeLg = ref(null)
const sizeXl = ref(null)

// Icons
const iconLeft = ref(null)
const iconRight = ref(null)
const iconUser = ref(null)

const userOptions = [
  { id: 1, name: 'John Doe', role: 'Admin', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', role: 'Editor', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', role: 'Viewer', email: 'bob@example.com' },
  { id: 4, name: 'Alice Brown', role: 'Editor', email: 'alice@example.com' },
  { id: 5, name: 'Charlie Wilson', role: 'Admin', email: 'charlie@example.com' },
]

// Searchable
const searchableValue = ref(null)
const searchableMulti = ref([])

const tagOptions = [
  { id: 1, name: 'JavaScript' },
  { id: 2, name: 'TypeScript' },
  { id: 3, name: 'Vue.js' },
  { id: 4, name: 'React' },
  { id: 5, name: 'Angular' },
  { id: 6, name: 'Node.js' },
  { id: 7, name: 'Python' },
  { id: 8, name: 'Go' },
  { id: 9, name: 'Rust' },
  { id: 10, name: 'Docker' },
]

// Multiple
const multipleValue = ref([])
const multipleChips = ref([])
const multipleLimited = ref([])

// Grouped
const groupedValue = ref(null)

const groupedOptions = [
  {
    category: 'Fruits',
    items: [
      { id: 1, name: 'Apple' },
      { id: 2, name: 'Banana' },
      { id: 3, name: 'Orange' },
    ]
  },
  {
    category: 'Vegetables',
    items: [
      { id: 4, name: 'Carrot' },
      { id: 5, name: 'Broccoli' },
      { id: 6, name: 'Spinach' },
    ]
  },
  {
    category: 'Dairy',
    items: [
      { id: 7, name: 'Milk' },
      { id: 8, name: 'Cheese' },
      { id: 9, name: 'Yogurt' },
    ]
  }
]

// Description & Hint
const descValue = ref(null)
const hintValue = ref(null)
const bothDescHint = ref(null)

const priorityOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Critical', value: 'critical' },
]

// Validation
const errorValue = ref(null)
const successValue = ref('US')
const warningValue = ref('low')

// States
const disabledValue = ref('apple')
const readonlyValue = ref('banana')
const loadingValue = ref(null)
const clearableValue = ref('cherry')

// Rounded
const roundedNone = ref(null)
const roundedSm = ref(null)
const roundedMd = ref(null)
const roundedLg = ref(null)
const roundedFull = ref(null)

// Custom templates
const customTemplateUser = ref(null)
const customTemplateCountry = ref(null)
const customTemplateColor = ref(null)

const countryOptionsWithFlag = [
  { name: 'United States', code: 'US', flag: '🇺🇸' },
  { name: 'United Kingdom', code: 'UK', flag: '🇬🇧' },
  { name: 'Canada', code: 'CA', flag: '🇨🇦' },
  { name: 'Australia', code: 'AU', flag: '🇦🇺' },
  { name: 'Germany', code: 'DE', flag: '🇩🇪' },
  { name: 'France', code: 'FR', flag: '🇫🇷' },
  { name: 'Japan', code: 'JP', flag: '🇯🇵' },
  { name: 'Brazil', code: 'BR', flag: '🇧🇷' },
]

const colorOptions = [
  { name: 'Red', value: 'red', class: 'bg-red-500' },
  { name: 'Blue', value: 'blue', class: 'bg-blue-500' },
  { name: 'Green', value: 'green', class: 'bg-green-500' },
  { name: 'Yellow', value: 'yellow', class: 'bg-yellow-500' },
  { name: 'Purple', value: 'purple', class: 'bg-purple-500' },
  { name: 'Pink', value: 'pink', class: 'bg-pink-500' },
]

// Async options
const asyncValue = ref(null)
const asyncOptions = ref([])
const asyncLoading = ref(false)

const loadAsyncOptions = async () => {
  asyncLoading.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  asyncOptions.value = [
    { id: 1, name: 'Option loaded from API 1' },
    { id: 2, name: 'Option loaded from API 2' },
    { id: 3, name: 'Option loaded from API 3' },
    { id: 4, name: 'Option loaded from API 4' },
  ]
  asyncLoading.value = false
}

const asyncSearchValue = ref(null)
const asyncSearchOptions = ref([])
const asyncSearchLoading = ref(false)

const handleAsyncSearch = async (query) => {
  if (!query || query.length < 2) {
    asyncSearchOptions.value = []
    return
  }
  
  asyncSearchLoading.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))
  asyncSearchOptions.value = [
    { id: 1, title: `Result for "${query}" - 1` },
    { id: 2, title: `Result for "${query}" - 2` },
    { id: 3, title: `Result for "${query}" - 3` },
  ]
  asyncSearchLoading.value = false
}

// Form examples
const formCountry = ref(null)
const formTimezone = ref(null)
const formLanguage = ref(null)

const timezoneOptions = [
  { label: 'Pacific Time (PT)', value: 'America/Los_Angeles' },
  { label: 'Mountain Time (MT)', value: 'America/Denver' },
  { label: 'Central Time (CT)', value: 'America/Chicago' },
  { label: 'Eastern Time (ET)', value: 'America/New_York' },
  { label: 'GMT', value: 'Europe/London' },
  { label: 'Central European Time (CET)', value: 'Europe/Paris' },
  { label: 'Japan Standard Time (JST)', value: 'Asia/Tokyo' },
]

const languageOptions = [
  { name: 'English', code: 'en' },
  { name: 'Spanish', code: 'es' },
  { name: 'French', code: 'fr' },
  { name: 'German', code: 'de' },
  { name: 'Japanese', code: 'ja' },
  { name: 'Chinese', code: 'zh' },
]

// Filter panel
const filterCategory = ref(null)
const filterStatus = ref(null)
const filterPriority = ref(null)
const filterTags = ref([])
const filterAssignee = ref(null)

const categoryOptions = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Clothing' },
  { id: 3, name: 'Home & Garden' },
  { id: 4, name: 'Sports' },
  { id: 5, name: 'Books' },
]

const clearFilters = () => {
  filterCategory.value = null
  filterStatus.value = null
  filterPriority.value = null
  filterTags.value = []
  filterAssignee.value = null
}

// E-commerce
const productSize = ref(null)
const productColor = ref(null)
const productQuantity = ref(1)

const sizeOptions = [
  { label: 'XS', value: 'xs', inStock: true },
  { label: 'S', value: 's', inStock: true },
  { label: 'M', value: 'm', inStock: true },
  { label: 'L', value: 'l', inStock: false },
  { label: 'XL', value: 'xl', inStock: true },
  { label: 'XXL', value: 'xxl', inStock: true },
]

const productColorOptions = [
  { name: 'White', value: 'white', class: 'bg-white' },
  { name: 'Black', value: 'black', class: 'bg-black' },
  { name: 'Navy', value: 'navy', class: 'bg-blue-900' },
  { name: 'Gray', value: 'gray', class: 'bg-gray-500' },
  { name: 'Red', value: 'red', class: 'bg-red-500' },
]

const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Cascading selects
const cascadeCountry = ref(null)
const cascadeState = ref(null)
const cascadeCity = ref(null)

const cascadeCountryOptions = [
  { name: 'United States', code: 'US' },
  { name: 'Canada', code: 'CA' },
]

const statesByCountry = {
  US: [
    { name: 'California', code: 'CA' },
    { name: 'New York', code: 'NY' },
    { name: 'Texas', code: 'TX' },
  ],
  CA: [
    { name: 'Ontario', code: 'ON' },
    { name: 'Quebec', code: 'QC' },
    { name: 'British Columbia', code: 'BC' },
  ]
}

const citiesByState = {
  CA: [
    { id: 1, name: 'Los Angeles' },
    { id: 2, name: 'San Francisco' },
    { id: 3, name: 'San Diego' },
  ],
  NY: [
    { id: 4, name: 'New York City' },
    { id: 5, name: 'Buffalo' },
    { id: 6, name: 'Albany' },
  ],
  TX: [
    { id: 7, name: 'Houston' },
    { id: 8, name: 'Dallas' },
    { id: 9, name: 'Austin' },
  ],
  ON: [
    { id: 10, name: 'Toronto' },
    { id: 11, name: 'Ottawa' },
  ],
  QC: [
    { id: 12, name: 'Montreal' },
    { id: 13, name: 'Quebec City' },
  ],
  BC: [
    { id: 14, name: 'Vancouver' },
    { id: 15, name: 'Victoria' },
  ],
}

const cascadeStateOptions = computed(() => {
  return cascadeCountry.value ? statesByCountry[cascadeCountry.value] || [] : []
})

const cascadeCityOptions = computed(() => {
  return cascadeState.value ? citiesByState[cascadeState.value] || [] : []
})

const handleCountryChange = () => {
  cascadeState.value = null
  cascadeCity.value = null
}

const handleStateChange = () => {
  cascadeCity.value = null
}

const getLocationDisplay = () => {
  const country = cascadeCountryOptions.find(c => c.code === cascadeCountry.value)?.name
  const state = cascadeStateOptions.value.find(s => s.code === cascadeState.value)?.name
  const city = cascadeCityOptions.value.find(c => c.id === cascadeCity.value)?.name
  return `${city}, ${state}, ${country}`
}

// Settings panel
const settingsEmailFreq = ref('daily')
const settingsNotifyTypes = ref(['email', 'push'])
const settingsTheme = ref('system')

const frequencyOptions = [
  { label: 'Instant', value: 'instant' },
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Never', value: 'never' },
]

const notificationTypeOptions = [
  { label: 'Email', value: 'email' },
  { label: 'Push Notifications', value: 'push' },
  { label: 'SMS', value: 'sms' },
  { label: 'In-App', value: 'inapp' },
]

const themeOptions = [
  { label: 'Light', value: 'light', icon: '☀️' },
  { label: 'Dark', value: 'dark', icon: '🌙' },
  { label: 'System', value: 'system', icon: '💻' },
]

// Comparison
const compareProduct1 = ref(null)
const compareProduct2 = ref(null)
const compareProduct3 = ref(null)

const productOptions = [
  { id: 1, name: 'iPhone 15 Pro' },
  { id: 2, name: 'Samsung Galaxy S24' },
  { id: 3, name: 'Google Pixel 8' },
  { id: 4, name: 'OnePlus 12' },
  { id: 5, name: 'Xiaomi 14' },
]

const availableProducts2 = computed(() => {
  return productOptions.filter(p => p.id !== compareProduct1.value)
})

const availableProducts3 = computed(() => {
  return productOptions.filter(p => p.id !== compareProduct1.value && p.id !== compareProduct2.value)
})

// Props reference
const propsReference = [
  { name: 'modelValue', type: 'Any', default: 'null', description: 'v-model binding value' },
  { name: 'options', type: 'Array', default: '[]', description: 'Array of options to display' },
  { name: 'optionLabel', type: 'String', default: "'label'", description: 'Property name for option label (object options)' },
  { name: 'optionValue', type: 'String', default: "'value'", description: 'Property name for option value (object options)' },
  { name: 'label', type: 'String', default: "''", description: 'Label text' },
  { name: 'placeholder', type: 'String', default: "''", description: 'Placeholder text' },
  { name: 'description', type: 'String', default: "''", description: 'Description text below label' },
  { name: 'hint', type: 'String', default: "''", description: 'Hint text below input' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Select size' },
  { name: 'rounded', type: "'none' | 'sm' | 'md' | 'lg' | 'full'", default: "'md'", description: 'Border radius' },
  { name: 'multiple', type: 'Boolean', default: 'false', description: 'Allow multiple selection' },
  { name: 'maxSelections', type: 'Number', default: 'undefined', description: 'Maximum selections for multiple mode' },
  { name: 'chips', type: 'Boolean', default: 'false', description: 'Show selected items as chips' },
  { name: 'searchable', type: 'Boolean', default: 'false', description: 'Enable option filtering' },
  { name: 'grouped', type: 'Boolean', default: 'false', description: 'Enable grouped options' },
  { name: 'groupLabel', type: 'String', default: "'label'", description: 'Property name for group label' },
  { name: 'groupOptions', type: 'String', default: "'options'", description: 'Property name for group options' },
  { name: 'disabled', type: 'Boolean', default: 'false', description: 'Disable the select' },
  { name: 'readonly', type: 'Boolean', default: 'false', description: 'Make select readonly' },
  { name: 'loading', type: 'Boolean', default: 'false', description: 'Show loading state' },
  { name: 'clearable', type: 'Boolean', default: 'false', description: 'Show clear button' },
  { name: 'required', type: 'Boolean', default: 'false', description: 'Mark as required' },
  { name: 'error', type: 'String | Boolean', default: 'false', description: 'Error message' },
  { name: 'success', type: 'String | Boolean', default: 'false', description: 'Success message' },
  { name: 'warning', type: 'String | Boolean', default: 'false', description: 'Warning message' },
  { name: 'prependIcon', type: 'String', default: "''", description: 'Icon before input' },
  { name: 'appendIcon', type: 'String', default: "'chevron-down'", description: 'Icon after input' }
]

// Events reference
const eventsReference = [
  { name: 'update:modelValue', payload: 'Any', description: 'Emitted when value changes' },
  { name: 'change', payload: 'Any', description: 'Emitted when selection is confirmed' },
  { name: 'open', payload: 'void', description: 'Emitted when dropdown opens' },
  { name: 'close', payload: 'void', description: 'Emitted when dropdown closes' },
  { name: 'search', payload: 'String', description: 'Emitted when search query changes' },
  { name: 'clear', payload: 'void', description: 'Emitted when value is cleared' }
]

// Slots reference
const slotsReference = [
  { name: 'option', props: '{ option, index, selected }', description: 'Custom option rendering' },
  { name: 'selected', props: '{ selected }', description: 'Custom selected value display' },
  { name: 'prepend', props: '{}', description: 'Content before the input' },
  { name: 'append', props: '{}', description: 'Content after the input' },
  { name: 'no-options', props: '{}', description: 'Content when no options available' },
  { name: 'loading', props: '{}', description: 'Custom loading indicator' },
  { name: 'header', props: '{}', description: 'Dropdown header content' },
  { name: 'footer', props: '{}', description: 'Dropdown footer content' }
]
</script>