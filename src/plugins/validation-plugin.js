import validationRules from '../validations/validationRules'

export default {
  install(app) {
    // Make validation rules available globally via $rules
    app.config.globalProperties.$rules = validationRules
    
    // Also provide them for Composition API
    app.provide('validationRules', validationRules)
  }
}