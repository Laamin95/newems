import { computed, ref } from 'vue'
import { useI18n } from './i18n/useI18n.js'

export const sizes = {
  xs: 'vts-text-caption vts-pl-2 vts-pr-2 vts-pt-1 vts-pb-1',
  sm: 'vts-text-body-2 vts-pl-3 vts-pr-3 vts-pt-2 vts-pb-2',
  md: 'vts-text-body-1 vts-pl-4 vts-pr-4 vts-pt-2 vts-pb-2',
  lg: 'vts-text-body-1 vts-pl-5 vts-pr-5 vts-pt-3 vts-pb-3',
  xl: 'vts-text-body-1 vts-pl-6 vts-pr-6 vts-pt-4 vts-pb-4',
}

export const iconSizes = {
  xs: 10,
  sm: 15,
  md: 18,
  lg: 20,
  xl: 24,
}

export const roundedMap = {
  none: 'vts-rounded-none',
  sm: 'vts-rounded-sm',
  md: 'vts-rounded-md',
  lg: 'vts-rounded-lg',
  xl: 'vts-rounded-xl',
  '2xl': 'vts-rounded-2xl',
  '3xl': 'vts-rounded-3xl',
  full: 'vts-rounded-full',
}

export const colorMap = {
  primary: {
    contained: 'vts-bg-primary vts-text-on-primary vts-transition-colors vts-hover-bg-primary',
    outlined: 'vts-border vts-border-color vts-text-primary vts-bg-transparent vts-transition-colors vts-hover-bg-surface',
    text: 'vts-text-primary vts-bg-transparent vts-transition-colors vts-hover-bg-surface',
    tonal: 'vts-bg-surface vts-text-primary vts-transition-colors vts-hover-bg-surface'
  },
  success: {
    contained: 'vts-bg-success vts-text-on-success vts-transition-colors vts-hover-bg-success',
    outlined: 'vts-border vts-border-color vts-text-success vts-bg-transparent vts-transition-colors vts-hover-bg-surface',
    text: 'vts-text-success vts-bg-transparent vts-transition-colors vts-hover-bg-surface',
    tonal: 'vts-bg-surface vts-text-success vts-transition-colors vts-hover-bg-surface'
  },
  danger: {
    contained: 'vts-bg-error vts-text-on-error vts-transition-colors vts-hover-bg-error',
    outlined: 'vts-border vts-border-color vts-text-error vts-bg-transparent vts-transition-colors vts-hover-bg-surface',
    text: 'vts-text-error vts-bg-transparent vts-transition-colors vts-hover-bg-surface',
    tonal: 'vts-bg-surface vts-text-error vts-transition-colors vts-hover-bg-surface'
  },
  warning: {
    contained: 'vts-bg-warning vts-text-on-warning vts-transition-colors vts-hover-bg-warning',
    outlined: 'vts-border vts-border-color vts-text-warning vts-bg-transparent vts-transition-colors vts-hover-bg-surface',
    text: 'vts-text-warning vts-bg-transparent vts-transition-colors vts-hover-bg-surface',
    tonal: 'vts-bg-surface vts-text-warning vts-transition-colors vts-hover-bg-surface'
  },
  info: {
    contained: 'vts-bg-info vts-text-on-info vts-transition-colors vts-hover-bg-info',
    outlined: 'vts-border vts-border-color vts-text-info vts-bg-transparent vts-transition-colors vts-hover-bg-surface',
    text: 'vts-text-info vts-bg-transparent vts-transition-colors vts-hover-bg-surface',
    tonal: 'vts-bg-surface vts-text-info vts-transition-colors vts-hover-bg-surface'
  },
  gray: {
    contained: 'vts-bg-surface vts-text vts-transition-colors vts-hover-bg-surface',
    outlined: 'vts-border vts-border-color vts-text-secondary vts-bg-transparent vts-transition-colors vts-hover-bg-surface',
    text: 'vts-text-secondary vts-bg-transparent vts-transition-colors vts-hover-bg-surface',
    tonal: 'vts-bg-surface vts-text-secondary vts-transition-colors vts-hover-bg-surface'
  },
  disable: {
    contained: 'vts-bg-disabled vts-text-on-disabled vts-transition-colors',
    outlined: 'vts-border vts-border-color vts-text-disabled vts-bg-transparent vts-transition-colors',
    text: 'vts-text-disabled vts-bg-transparent vts-transition-colors',
    tonal: 'vts-bg-surface vts-text-disabled vts-transition-colors'
  }
}

export const spacing = {
  none: '',
  xs: 'vts-p-1',
  sm: 'vts-p-2',
  md: 'vts-p-4',
  lg: 'vts-p-6',
  xl: 'vts-p-8',
}
export const heights = {
  none: '',
  xs: 'vts-h-6',
  sm: 'vts-h-8',
  md: 'vts-h-10',
  lg: 'vts-h-12',
  xl: 'vts-h-14',
}

export const margins = {
  none: '',
  xs: 'vts-m-1',
  sm: 'vts-m-2',
  md: 'vts-m-4',
  lg: 'vts-m-6',
  xl: 'vts-m-8',
}

export const useLanguageSelected = (item, lang, label = null) => {

    const { language } = useI18n()

    const selectLanguage = computed(() => {
        let Selected = ''
        if (lang != ''){
            Selected = lang
        }
        else {
            Selected = language.value
        }
        return (Selected === 'dv') ? 'dv' : 'en'
    })

    if (typeof item === 'string' && item !== '') {
        return item
    }

    if (!item) return ''

    const key = selectLanguage.value === 'dv' ? 'dv' : 'en'

    return label ? item[key][label] : item[key]
}
