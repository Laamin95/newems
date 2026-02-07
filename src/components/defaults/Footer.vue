<template>
  <footer
    :class="[
      'border-t border-color transition-colors duration-300',
      'bg-color-2 text-ui-text-color',
      containerClass
    ]"
    :style="containerStyle"
  >
    <!-- Main Footer Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <!-- Grid Layout -->
      <div v-if="hasLinks" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <!-- Section Loop -->
        <div v-for="section in sections" :key="section.title" class="space-y-4">
          <!-- Section Title -->
          <h3 v-if="section.title" class="text-sm font-semibold text-ui-text-color uppercase tracking-wider">
            {{ section.title }}
          </h3>

          <!-- Links -->
          <ul class="space-y-2">
            <li v-for="link in section.links" :key="link.label">
              <a
                :href="link.href"
                :target="link.target"
                :rel="link.rel"
                class="text-sm text-ui-text-secondary hover:text-primary transition-colors duration-200"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>

          <!-- Social Icons (if provided) -->
          <div v-if="section.social" class="flex gap-4 pt-2">
            <a
              v-for="social in section.social"
              :key="social.icon"
              :href="social.href"
              :title="social.label"
              :target="social.target"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-color-3 text-ui-text-color hover:bg-primary hover:text-white transition-all duration-200"
            >
              <i :class="['text-sm', social.icon]" />
            </a>
          </div>
        </div>
      </div>

      <!-- Newsletter Signup (optional) -->
      <div v-if="newsletter" class="border-t border-color pt-8 mb-8">
        <div class="max-w-sm">
          <h3 class="text-sm font-semibold text-ui-text-color mb-2">
            {{ newsletter.title || 'Subscribe to our newsletter' }}
          </h3>
          <p class="text-sm text-ui-text-secondary mb-4">
            {{ newsletter.description || 'Get updates delivered to your inbox.' }}
          </p>

          <form @submit.prevent="handleNewsletterSubmit" class="flex gap-2">
            <input
              v-model="newsletterEmail"
              type="email"
              placeholder="Enter your email"
              class="flex-1 px-3 py-2 text-sm border border-color rounded-md bg-color-1 text-ui-text-color placeholder-ui-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              required
            />
            <button
              type="submit"
              class="px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary/90 transition-all duration-200"
            >
              Subscribe
            </button>
          </form>

          <p v-if="newsletterMessage" :class="['text-xs mt-2', newsletterError ? 'text-error' : 'text-success']">
            {{ newsletterMessage }}
          </p>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-color" />
    </div>

    <!-- Bottom Bar -->
    <div class="bg-color-1">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <!-- Copyright -->
          <p class="text-xs text-ui-text-secondary">
            {{ copyright || `© ${new Date().getFullYear()} All rights reserved.` }}
          </p>

          <!-- Bottom Links -->
          <div v-if="bottomLinks" class="flex gap-4 flex-wrap justify-center">
            <a
              v-for="link in bottomLinks"
              :key="link.label"
              :href="link.href"
              class="text-xs text-ui-text-secondary hover:text-primary transition-colors duration-200"
            >
              {{ link.label }}
            </a>
          </div>

          <!-- Language/Theme Switcher (optional) -->
          <div v-if="showThemeSwitcher" class="flex gap-2">
            <button
              @click="toggleTheme"
              class="p-2 rounded-md hover:bg-color-2 transition-colors"
              :title="isDark ? 'Light mode' : 'Dark mode'"
            >
              <i :class="isDark ? 'fas fa-sun' : 'fas fa-moon'" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
  import { ref, computed } from 'vue'

  const props = defineProps({
    sections: {
      type: Array,
      default: () => [
        {
          title: 'Product',
          links: [
            { label: 'Features', href: '#features' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'Security', href: '#security' },
            { label: 'Blog', href: '#blog' }
          ]
        },
        {
          title: 'Company',
          links: [
            { label: 'About', href: '#about' },
            { label: 'Careers', href: '#careers' },
            { label: 'Contact', href: '#contact' },
            { label: 'Press', href: '#press' }
          ]
        },
        {
          title: 'Legal',
          links: [
            { label: 'Privacy', href: '#privacy' },
            { label: 'Terms', href: '#terms' },
            { label: 'Cookie Policy', href: '#cookies' },
            { label: 'License', href: '#license' }
          ]
        },
        {
          title: 'Follow',
          social: [
            { icon: 'fab fa-twitter', href: '#twitter', label: 'Twitter', target: '_blank' },
            { icon: 'fab fa-github', href: '#github', label: 'GitHub', target: '_blank' },
            { icon: 'fab fa-linkedin', href: '#linkedin', label: 'LinkedIn', target: '_blank' },
            { icon: 'fab fa-facebook', href: '#facebook', label: 'Facebook', target: '_blank' }
          ]
        }
      ]
    },
    newsletter: {
      type: Object,
      default: null
    },
    bottomLinks: {
      type: Array,
      default: () => [
        { label: 'Privacy Policy', href: '#privacy' },
        { label: 'Terms of Service', href: '#terms' },
        { label: 'Cookie Settings', href: '#cookies' }
      ]
    },
    copyright: {
      type: String,
      default: ''
    },
    containerClass: {
      type: String,
      default: ''
    },
    containerStyle: {
      type: Object,
      default: () => ({})
    },
    showThemeSwitcher: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['newsletter-submit', 'theme-toggle', 'link-click'])

  // Newsletter state
  const newsletterEmail = ref('')
  const newsletterMessage = ref('')
  const newsletterError = ref(false)

  // Theme state
  const isDark = computed(() => {
    return document.documentElement.classList.contains('dark')
  })

  // Computed properties
  const hasLinks = computed(() => props.sections && props.sections.length > 0)

  // Methods
  function handleNewsletterSubmit() {
    if (!newsletterEmail.value) return

    emit('newsletter-submit', {
      email: newsletterEmail.value
    })

    // Mock success message
    newsletterError.value = false
    newsletterMessage.value = 'Thanks for subscribing!'
    newsletterEmail.value = ''

    setTimeout(() => {
      newsletterMessage.value = ''
    }, 3000)
  }

  function toggleTheme() {
    document.documentElement.classList.toggle('dark')
    emit('theme-toggle', isDark.value)
  }
</script>

<style scoped>
  footer {
    margin-top: auto;
  }

  /* Smooth transitions */
  a {
    transition-property: color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
  }

  /* Focus states */
  a:focus-visible {
    @apply outline-none ring-2 ring-primary ring-offset-2;
  }

  input:focus-visible {
    @apply outline-none;
  }
</style>