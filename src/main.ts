import { createApp } from 'vue'
import './assets/tailwind.css'
import App from './App.vue'
import router from './router'
import { i18nPlugin } from './lib/i18n/i18nPlugin'
import { tooltipDirective } from './lib/tooltip-directive.ts'

const app = createApp(App)
app.use(router)
app.use(i18nPlugin)
app.directive('tooltip', tooltipDirective)
app.mount('#app')
