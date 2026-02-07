import { computed, ref } from 'vue'
import { useI18n } from './i18n/useI18n.js'

export const sizes = {
  xs: 'text-xs px-2 py-1 ',
  sm: 'text-sm px-3 py-2 ',
  md: 'text-base-1 px-4 py-2',
  lg: 'text-md px-5 py-3',
  xl: 'text-lg px-6 py-4',
}

export const iconSizes = {
  xs: 10,
  sm: 15,
  md: 18,
  lg: 20,
  xl: 24,
}

export const roundedMap = {
  none: 'rounded-none',
  d: 'rounded-default',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full',
}

export const colorMap = {
  primary: {
    contained: 'bg-primary text-white transition-colors hover:bg-primary/60',
    outlined: 'border border-primary text-primary bg-transparent transition-colors hover:bg-primary/10',
    text: 'text-primary bg-transparent transition-colors hover:bg-primary/10',
    tonal: 'bg-surface text-primary transition-colors hover:bg-primary/10'
  },
  success: {
    contained: 'bg-green-500 text-white transition-colors hover:bg-green-600',
    outlined: 'border border-green-500 text-green-500 bg-transparent transition-colors hover:bg-green-100',
    text: 'text-green-500 bg-transparent transition-colors hover:bg-green-100',
    tonal: 'bg-green-100 text-green-500 transition-colors hover:bg-green-100'
  },
  danger: {
    contained: 'bg-red-500 text-white transition-colors hover:bg-red-600',
    outlined: 'border border-red-500 text-red-500 bg-transparent transition-colors hover:bg-red-100',
    text: 'text-red-500 bg-transparent transition-colors hover:bg-red-100',
    tonal: 'bg-red-100 text-red-500 transition-colors hover:bg-red-100'
  },
  warning: {
    contained: 'bg-yellow-500 text-white transition-colors hover:bg-yellow-600',
    outlined: 'border border-yellow-500 text-yellow-500 bg-transparent transition-colors hover:bg-yellow-100',
    text: 'text-yellow-500 bg-transparent transition-colors hover:bg-yellow-100',
    tonal: 'bg-yellow-100 text-yellow-500 transition-colors hover:bg-yellow-100'
  },
  info: {
    contained: 'bg-blue-500 text-white transition-colors hover:bg-blue-600',
    outlined: 'border border-blue-500 text-blue-500 bg-transparent transition-colors hover:bg-blue-100',
    text: 'text-blue-500 bg-transparent transition-colors hover:bg-blue-100',
    tonal: 'bg-blue-100 text-blue-500 transition-colors hover:bg-blue-100'
  },
  gray: {
    contained: 'bg-gray-500 dark:bg-gray-800 text-gray-50  transition-colors hover:bg-gray-600 dark:hover:bg-gray-700',
    outlined: 'border border-gray-500 text-gray-500 bg-transparent transition-colors hover:bg-gray-100',
    text: 'text-gray-500 bg-transparent transition-colors hover:bg-gray-100',
    tonal: 'bg-gray-100 text-gray-500 transition-colors hover:bg-gray-100'
  },
  disable: {
    contained: 'bg-gray-200 text-white transition-colors',
    outlined: 'border border-gray-400 text-gray-400 bg-transparent transition-colors',
    text: 'text-gray-400 bg-transparent transition-colors',
    tonal: 'bg-gray-400 text-gray-400 transition-colors'
  }
}

export const spacing = {
  none: '',
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
}
export const heights = {
  none: '',
  xs: 'h-6',
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
  xl: 'h-14',
}

export const margins = {
  none: '',
  xs: 'm-1',
  sm: 'm-2',
  md: 'm-4',
  lg: 'm-6',
  xl: 'm-8',
}

export const topRounded = {
    sm: 'rounded-t-sm',
    md: 'rounded-t-md',
    lg: 'rounded-t-lg',
    xl: 'rounded-t-xl',
    '2xl': 'rounded-t-2xl',
    '3xl': 'rounded-t-3xl',
    full: 'rounded-t-full',
    default: 'rounded-t-lg'
}

export const bottomRounded = {
    sm: 'rounded-b-sm',
    md: 'rounded-b-md',
    lg: 'rounded-b-lg',
    xl: 'rounded-b-xl',
    '2xl': 'rounded-b-2xl',
    '3xl': 'rounded-b-3xl',
    full: 'rounded-b-full',
    default: 'rounded-b-lg'
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
