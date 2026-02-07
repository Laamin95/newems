<template>
  <div class="space-y-12">
    <!-- Example 1: Basic Footer -->
    <div class="border border-color rounded-lg p-6">
      <h2 class="text-2xl font-bold mb-4 ui-text-color">Basic Footer</h2>
      <Footer
        :sections="basicSections"
        :bottom-links="bottomLinks"
        copyright="© 2026 Your Company. All rights reserved."
      />
    </div>

    <!-- Example 2: Footer with Newsletter -->
    <div class="border border-color rounded-lg p-6">
      <h2 class="text-2xl font-bold mb-4 ui-text-color">Footer with Newsletter</h2>
      <Footer
        :sections="companySections"
        :newsletter="newsletterConfig"
        :bottom-links="bottomLinks"
        @newsletter-submit="handleNewsletterSubmit"
      />
    </div>

    <!-- Example 3: Minimal Footer -->
    <div class="border border-color rounded-lg p-6">
      <h2 class="text-2xl font-bold mb-4 ui-text-color">Minimal Footer</h2>
      <Footer
        :sections="minimalSections"
        :bottom-links="minimalBottomLinks"
      />
    </div>

    <!-- Example 4: Footer with Theme Switcher -->
    <div class="border border-color rounded-lg p-6">
      <h2 class="text-2xl font-bold mb-4 ui-text-color">Footer with Theme Switcher</h2>
      <Footer
        :sections="basicSections"
        :bottom-links="bottomLinks"
        :show-theme-switcher="true"
        @theme-toggle="handleThemeToggle"
      />
    </div>

    <!-- Event Log -->
    <div class="border border-color rounded-lg p-6">
      <h2 class="text-2xl font-bold mb-4 ui-text-color">Event Log</h2>
      <div class="bg-color-1 rounded-md p-4 h-48 overflow-y-auto border border-color">
        <div v-if="eventLog.length === 0" class="text-ui-text-secondary text-sm">
          No events yet...
        </div>
        <div v-for="(log, i) in eventLog" :key="i" class="text-xs text-ui-text-secondary mb-1">
          {{ log }}
        </div>
      </div>
      <button
        @click="eventLog = []"
        class="mt-4 px-4 py-2 text-sm bg-slate-500 text-white rounded hover:bg-slate-600"
      >
        Clear Log
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { Footer } from '../../'

  const eventLog = ref([])

  // Footer configurations
  const basicSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Security', href: '#security' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#about' },
        { label: 'Blog', href: '#blog' },
        { label: 'Careers', href: '#careers' }
      ]
    },
    {
      title: 'Connect',
      links: [
        { label: 'Twitter', href: '#twitter' },
        { label: 'GitHub', href: '#github' },
        { label: 'LinkedIn', href: '#linkedin' }
      ]
    }
  ]

  const companySections = [
    {
      title: 'Solutions',
      links: [
        { label: 'Enterprise', href: '#enterprise' },
        { label: 'Startup', href: '#startup' },
        { label: 'Developer', href: '#developer' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#docs' },
        { label: 'API Reference', href: '#api' },
        { label: 'Examples', href: '#examples' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Contact', href: '#contact' },
        { label: 'Support', href: '#support' }
      ]
    },
    {
      title: 'Follow Us',
      social: [
        { icon: 'fab fa-twitter', href: 'https://twitter.com', label: 'Twitter', target: '_blank' },
        { icon: 'fab fa-github', href: 'https://github.com', label: 'GitHub', target: '_blank' },
        { icon: 'fab fa-linkedin', href: 'https://linkedin.com', label: 'LinkedIn', target: '_blank' }
      ]
    }
  ]

  const minimalSections = [
    {
      title: 'Product',
      links: [
        { label: 'Docs', href: '#docs' },
        { label: 'API', href: '#api' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '#privacy' },
        { label: 'Terms', href: '#terms' }
      ]
    }
  ]

  const bottomLinks = [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Contact', href: '#contact' }
  ]

  const minimalBottomLinks = [
    { label: 'Privacy', href: '#privacy' },
    { label: 'Terms', href: '#terms' }
  ]

  const newsletterConfig = {
    title: 'Stay Updated',
    description: 'Subscribe to get the latest updates and news.'
  }

  // Event handlers
  function handleNewsletterSubmit(event) {
    addLog(`Newsletter submitted: ${event.email}`)
  }

  function handleThemeToggle(isDark) {
    addLog(`Theme toggled: ${isDark ? 'dark' : 'light'} mode`)
  }

  function addLog(message) {
    eventLog.value.unshift(`[${new Date().toLocaleTimeString()}] ${message}`)
    if (eventLog.value.length > 20) {
      eventLog.value.pop()
    }
  }
</script>