<template>
  <div class="p-6 space-y-10 text-left">
    <h1 class="text-2xl font-bold ui-text-primary">Button Component Examples</h1>

    <!-- Basic Usage -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Basic Usage</h2>
      <div class="flex flex-wrap items-center gap-4">
        <Button>Default Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    </section>

    <!-- Colors -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Colors</h2>
      <div class="flex flex-wrap items-center gap-4">
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="danger">Danger</Button>
        <Button color="info">Info</Button>
      </div>
      <div class="flex flex-wrap items-center gap-4 mt-4">
        <Button variant="outline" color="primary">Primary</Button>
        <Button variant="outline" color="secondary">Secondary</Button>
        <Button variant="outline" color="success">Success</Button>
        <Button variant="outline" color="warning">Warning</Button>
        <Button variant="outline" color="danger">Danger</Button>
        <Button variant="outline" color="info">Info</Button>
      </div>
    </section>

    <!-- Sizes -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Sizes</h2>
      <div class="flex flex-wrap items-end gap-4">
        <div class="text-center">
          <Button size="xs">Extra Small</Button>
          <p class="text-xs ui-text-secondary mt-2">XS</p>
        </div>
        <div class="text-center">
          <Button size="sm">Small</Button>
          <p class="text-xs ui-text-secondary mt-2">SM</p>
        </div>
        <div class="text-center">
          <Button size="md">Medium</Button>
          <p class="text-xs ui-text-secondary mt-2">MD</p>
        </div>
        <div class="text-center">
          <Button size="lg">Large</Button>
          <p class="text-xs ui-text-secondary mt-2">LG</p>
        </div>
        <div class="text-center">
          <Button size="xl">Extra Large</Button>
          <p class="text-xs ui-text-secondary mt-2">XL</p>
        </div>
      </div>
    </section>

    <!-- With Icons -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">With Icons</h2>
      <div class="flex flex-wrap items-center gap-4">
        <Button prepend-icon="plus">Add New</Button>
        <Button append-icon="arrow-right">Continue</Button>
        <Button prepend-icon="arrow-down-tray" append-icon="arrow-down">Download</Button>
        <Button icon="heart" />
        <Button icon="cog" variant="outline" />
        <Button icon="trash" color="danger" />
      </div>
    </section>

    <!-- Loading State -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Loading State</h2>
      <div class="flex flex-wrap items-center gap-4">
        <Button :loading="true">Loading...</Button>
        <Button :loading="true" variant="secondary">Processing</Button>
        <Button :loading="true" variant="outline">Please Wait</Button>
        <Button :loading="isLoading" @click="simulateLoading">
          {{ isLoading ? 'Saving...' : 'Click to Load' }}
        </Button>
      </div>
    </section>

    <!-- Disabled State -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Disabled State</h2>
      <div class="flex flex-wrap items-center gap-4">
        <Button :disabled="true">Disabled</Button>
        <Button :disabled="true" variant="secondary">Disabled</Button>
        <Button :disabled="true" variant="outline">Disabled</Button>
        <Button :disabled="true" variant="ghost">Disabled</Button>
        <Button :disabled="true" color="success">Disabled</Button>
      </div>
    </section>

    <!-- Rounded Variants -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Rounded Variants</h2>
      <div class="flex flex-wrap items-center gap-4">
        <Button rounded="none">None</Button>
        <Button rounded="sm">Small</Button>
        <Button rounded="md">Medium</Button>
        <Button rounded="lg">Large</Button>
        <Button rounded="full">Full</Button>
      </div>
    </section>

    <!-- Full Width -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Full Width</h2>
      <div class="max-w-md space-y-3">
        <Button full-width>Full Width Button</Button>
        <Button full-width variant="outline">Full Width Outline</Button>
        <Button full-width color="success" prepend-icon="check">Submit Form</Button>
      </div>
    </section>

    <!-- Button Groups -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Button Groups</h2>
      <div class="space-y-4">
        <div class="inline-flex rounded-lg overflow-hidden border border-color-3">
          <Button variant="ghost" rounded="none" class="border-r border-color-3">Left</Button>
          <Button variant="ghost" rounded="none" class="border-r border-color-3">Center</Button>
          <Button variant="ghost" rounded="none">Right</Button>
        </div>
        <div class="inline-flex rounded-lg overflow-hidden">
          <Button rounded="none" color="primary">Bold</Button>
          <Button rounded="none" variant="outline">Italic</Button>
          <Button rounded="none" variant="outline">Underline</Button>
        </div>
      </div>
    </section>

    <!-- Icon Buttons -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Icon Buttons</h2>
      <div class="flex flex-wrap items-center gap-4">
        <Button icon="plus" size="xs" />
        <Button icon="plus" size="sm" />
        <Button icon="plus" size="md" />
        <Button icon="plus" size="lg" />
        <Button icon="plus" size="xl" />
      </div>
      <div class="flex flex-wrap items-center gap-4 mt-4">
        <Button icon="heart" color="danger" />
        <Button icon="star" color="warning" />
        <Button icon="check" color="success" />
        <Button icon="information-circle" color="info" />
        <Button icon="cog" variant="outline" />
        <Button icon="trash" variant="ghost" color="danger" />
      </div>
      <div class="flex flex-wrap items-center gap-4 mt-4">
        <Button icon="plus" rounded="full" />
        <Button icon="heart" rounded="full" color="danger" />
        <Button icon="star" rounded="full" color="warning" variant="outline" />
      </div>
    </section>

    <!-- Social Buttons Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Social Buttons Example</h2>
      <div class="flex flex-wrap items-center gap-4">
        <Button class="bg-[#1877F2] hover:bg-[#166FE5] text-white">
          <template #prepend>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </template>
          Facebook
        </Button>
        <Button class="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white">
          <template #prepend>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
          </template>
          Twitter
        </Button>
        <Button class="bg-[#333] hover:bg-[#24292e] text-white">
          <template #prepend>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </template>
          GitHub
        </Button>
        <Button class="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white">
          <template #prepend>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </template>
          Instagram
        </Button>
      </div>
    </section>

    <!-- Action Bar Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Action Bar Example</h2>
      <div class="max-w-lg bg-color-2 rounded-xl border border-color-3 p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Button size="sm" variant="ghost" icon="arrow-left" />
            <span class="font-medium ui-text-primary">Document.pdf</span>
          </div>
          <div class="flex items-center gap-2">
            <Button size="sm" variant="ghost" icon="pencil" />
            <Button size="sm" variant="ghost" icon="trash" color="danger" />
            <Button size="sm" variant="ghost" icon="share" />
            <Button size="sm" prepend-icon="arrow-down-tray">Download</Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Card Actions Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Card Actions Example</h2>
      <div class="max-w-sm bg-color-2 rounded-xl border border-color-3 overflow-hidden">
        <div class="aspect-video bg-color-3 flex items-center justify-center">
          <span class="text-4xl">🖼️</span>
        </div>
        <div class="p-4">
          <h3 class="font-semibold ui-text-primary">Beautiful Sunset</h3>
          <p class="text-sm ui-text-secondary mt-1">A stunning view of the sunset over the mountains.</p>
          <div class="flex items-center gap-2 mt-4">
            <Button size="sm" color="primary" class="flex-1">View Details</Button>
            <Button size="sm" variant="outline" icon="heart" />
            <Button size="sm" variant="outline" icon="bookmark" />
          </div>
        </div>
      </div>
    </section>

    <!-- Modal Footer Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Modal Footer Example</h2>
      <div class="max-w-md bg-color-2 rounded-xl border border-color-3 overflow-hidden">
        <div class="p-4 border-b border-color-3">
          <h3 class="font-semibold ui-text-primary">Confirm Action</h3>
        </div>
        <div class="p-4">
          <p class="ui-text-secondary">Are you sure you want to delete this item? This action cannot be undone.</p>
        </div>
        <div class="p-4 border-t border-color-3 bg-color-3/30 flex justify-end gap-3">
          <Button variant="ghost">Cancel</Button>
          <Button color="danger">Delete</Button>
        </div>
      </div>
    </section>

    <!-- Form Submit Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Form Submit Example</h2>
      <div class="max-w-md bg-color-2 rounded-xl border border-color-3 p-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium ui-text-primary mb-1">Email</label>
            <input 
              type="email" 
              class="w-full px-3 py-2 rounded-lg border border-color-3 bg-color-1 ui-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label class="block text-sm font-medium ui-text-primary mb-1">Password</label>
            <input 
              type="password" 
              class="w-full px-3 py-2 rounded-lg border border-color-3 bg-color-1 ui-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your password"
            />
          </div>
          <div class="flex items-center justify-between pt-2">
            <Button variant="link" size="sm">Forgot password?</Button>
            <Button color="primary" :loading="isSubmitting" @click="simulateSubmit">
              {{ isSubmitting ? 'Signing in...' : 'Sign In' }}
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Pagination Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Pagination Example</h2>
      <div class="flex items-center gap-1">
        <Button size="sm" variant="ghost" icon="chevron-left" :disabled="currentPage === 1" @click="currentPage = Math.max(1, currentPage - 1)" />
        <Button 
          v-for="page in 5" 
          :key="page"
          size="sm" 
          :variant="currentPage === page ? 'primary' : 'ghost'"
          :color="currentPage === page ? 'primary' : undefined"
          @click="currentPage = page"
        >
          {{ page }}
        </Button>
        <Button size="sm" variant="ghost" icon="chevron-right" :disabled="currentPage === 5" @click="currentPage = Math.min(5, currentPage + 1)" />
      </div>
    </section>

    <!-- Toolbar Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Toolbar Example</h2>
      <div class="max-w-2xl bg-color-2 rounded-xl border border-color-3 p-2 flex items-center gap-2 flex-wrap">
        <div class="flex items-center gap-1 border-r border-color-3 pr-2">
          <Button size="sm" variant="ghost" icon="bold" />
          <Button size="sm" variant="ghost" icon="italic" />
          <Button size="sm" variant="ghost" icon="underline" />
        </div>
        <div class="flex items-center gap-1 border-r border-color-3 pr-2">
          <Button size="sm" variant="ghost" icon="list-bullet" />
          <Button size="sm" variant="ghost" icon="numbered-list" />
        </div>
        <div class="flex items-center gap-1 border-r border-color-3 pr-2">
          <Button size="sm" variant="ghost" icon="link" />
          <Button size="sm" variant="ghost" icon="photo" />
          <Button size="sm" variant="ghost" icon="code-bracket" />
        </div>
        <div class="flex items-center gap-1">
          <Button size="sm" variant="ghost" icon="arrow-uturn-left" />
          <Button size="sm" variant="ghost" icon="arrow-uturn-right" />
        </div>
        <div class="flex-1" />
        <Button size="sm" color="primary">Publish</Button>
      </div>
    </section>

    <!-- Floating Action Button Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Floating Action Button Example</h2>
      <div class="relative h-48 bg-color-2 rounded-xl border border-color-3 overflow-hidden">
        <div class="p-4">
          <p class="ui-text-secondary text-sm">FAB buttons are typically positioned at the bottom-right corner.</p>
        </div>
        <div class="absolute bottom-4 right-4 flex flex-col gap-2 items-end">
          <Button size="sm" rounded="full" variant="outline" icon="chat-bubble-left" class="shadow-lg" />
          <Button size="sm" rounded="full" variant="outline" icon="pencil" class="shadow-lg" />
          <Button size="lg" rounded="full" icon="plus" color="primary" class="shadow-lg" />
        </div>
      </div>
    </section>

    <!-- Split Button Example -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold ui-text-primary border-b border-color-3 pb-2">Split Button Example</h2>
      <div class="flex items-center gap-4">
        <div class="inline-flex rounded-lg overflow-hidden">
          <Button rounded="none" color="primary">Save</Button>
          <Button rounded="none" color="primary" icon="chevron-down" class="border-l border-white/20" />
        </div>
        <div class="inline-flex rounded-lg overflow-hidden">
          <Button rounded="none" variant="outline">Export</Button>
          <Button rounded="none" variant="outline" icon="chevron-down" class="border-l border-color-3" />
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
import Button from '@/components/buttons/Button.vue'

// Loading state demo
const isLoading = ref(false)
const simulateLoading = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}

// Form submit demo
const isSubmitting = ref(false)
const simulateSubmit = () => {
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
  }, 2000)
}

// Pagination demo
const currentPage = ref(1)

// Props reference
const propsReference = [
  { name: 'label', type: 'String', default: "''", description: 'Button label text (alternative to slot)' },
  { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'link'", default: "'primary'", description: 'Button style variant' },
  { name: 'color', type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'", default: "'primary'", description: 'Color theme' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Button size' },
  { name: 'rounded', type: "'none' | 'sm' | 'md' | 'lg' | 'full'", default: "'md'", description: 'Border radius' },
  { name: 'disabled', type: 'Boolean', default: 'false', description: 'Disable the button' },
  { name: 'loading', type: 'Boolean', default: 'false', description: 'Show loading spinner' },
  { name: 'fullWidth', type: 'Boolean', default: 'false', description: 'Make button full width' },
  { name: 'icon', type: 'String', default: "''", description: 'Icon name for icon-only button' },
  { name: 'prependIcon', type: 'String', default: "''", description: 'Icon before the label' },
  { name: 'appendIcon', type: 'String', default: "''", description: 'Icon after the label' },
  { name: 'type', type: "'button' | 'submit' | 'reset'", default: "'button'", description: 'HTML button type' }
]

// Events reference
const eventsReference = [
  { name: 'click', payload: 'MouseEvent', description: 'Emitted when button is clicked' }
]

// Slots reference
const slotsReference = [
  { name: 'default', description: 'Button content/label' },
  { name: 'prepend', description: 'Content before the label (replaces prependIcon)' },
  { name: 'append', description: 'Content after the label (replaces appendIcon)' }
]
</script>