import { ref, computed } from 'vue'
import { messages } from './defaultLables'

const currentLanguage = ref(localStorage.getItem('language') || 'en')

export const useI18n = () => {
  const t = (key, lang = '') => {
    // Use provided lang or fall back to current language
    const selectedLang = lang || currentLanguage.value
    const keys = key.split('.')
    let value = messages[selectedLang]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  const setLanguage = (lang) => {
    if (messages[lang]) {
      currentLanguage.value = lang
      localStorage.setItem('language', lang)
      document.documentElement.lang = lang
    }
  }

  const language = computed(() => currentLanguage.value)

  return {
    t,
    setLanguage,
    language,
  }
}