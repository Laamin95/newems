import { globalRtl } from './rtl'
import { computed, inject, ref, onMounted } from 'vue'

export function setRtl(value: boolean) {
    globalRtl.value = value

    localStorage.setItem('rtlSetting', JSON.stringify(value));

    // Update document direction and toggle a global font class
    if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('dir', value ? 'rtl' : 'ltr')
        document.documentElement.setAttribute('lang', (value == true) ? 'dv' : 'en')
        if (value) {
            document.documentElement.classList.add('rtl-font')
        } else {
            document.documentElement.classList.remove('rtl-font')
        }
    }
}
