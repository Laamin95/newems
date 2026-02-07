// plugins
import validationPlugin from './plugins/validation-plugin'
import { i18nPlugin } from './lib/i18n/i18nPlugin'
import { tooltipDirective } from './lib/tooltip-directive.ts'
import { useSnackbar } from '@/lib/useSnackbar'

import defaultsComponents from './components/index.js' // Export all components
export * from './components/index.js' // Export all components
export * from './components/examples/index.js' // Export all components
const snackbar = useSnackbar()
// provide('useSnackbar', snackbar)


export default {
  install(app) {

    app.config.globalProperties.$snackbar = snackbar
    app.use(defaultsComponents)
    app.use(validationPlugin)
    app.use(i18nPlugin)
    // app.provide('useSnackbar', snackbar)
    app.directive('tooltip', tooltipDirective)


  }
}