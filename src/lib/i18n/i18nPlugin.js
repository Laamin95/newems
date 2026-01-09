import { useI18n } from './useI18n'
import { setRtl } from '../rtl/setRtl'
import { watch } from 'vue'

export const i18nPlugin = {
  install(app) {
    const { t, setLanguage, language } = useI18n()

    // Changing RTL with language change
    watch (language, (newLang) => {
        if (newLang === 'dv') {
            setRtl(true)
        } else {
            setRtl(false)
        }

    })


    // Provide i18n with useLanguageSelect
    app.provide('i18n', {
      t,
      setLanguage,
      language,
      // useLanguageSelect
    })

    // Global properties
    app.config.globalProperties.$t = t
    app.config.globalProperties.$setLanguage = setLanguage
    app.config.globalProperties.$language = language
    // app.config.globalProperties.$useLanguageSelect = useLanguageSelect
  }
}
