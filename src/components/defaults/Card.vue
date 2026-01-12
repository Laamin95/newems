<template>
  <div
    :dir="selectedDirection !== '' ? selectedDirection : ''"
    :class="[faruma, margin, border, rounded ? `rounded-${rounded}` : '', shadow, cardClass, width, bg, `relative`,]"
  >
    <!-- Card Header -->
    <div
      v-if="$slots.header || title || (labels && (labels.en || labels.dv))"
      class="overflow-clip "
    >
      <slot name="header">
        <div
          :class="[headerClass, headerBg, headerPadding, topRoundedClass, headerBd , headerText, `overflow-hidden`]"
        >
          <h3 :class="[titleClass, headerTextSize ]">
            {{ selectedlabels.title ? selectedlabels.title : props.title }}
          </h3>
        </div>
      </slot>
    </div> <!-- Card Body -->
    <div :class="[bodyClass, padding, textColor, textSize]">
      <slot :attrs="controlAttrs">
        {{ selectedlabels.body ? selectedlabels.body : '' }}
      </slot>
    </div> <!-- Card Footer -->
    <div
      v-if="$slots.footer"
      :class="[footerClass, footerBg, footerText, footerTextSize, footerBd, footerMargin, footerPadding, bottomRoundedClass ]"
    >
      <slot name="footer">
        {{ selectedlabels.footer ? selectedlabels.footer : '' }}
      </slot>
    </div>
  </div>
</template>

<script setup>
// import { provide } from 'vue'
import { useLanguageSelected } from '@/lib/componentConfig'
import { computed, inject, ref, provide } from 'vue'
const { language } = inject('i18n')

// console.log('language in Card.vue', language.value)
// provide('lang', language)

    const props = defineProps({
        //main card props
        lang: { type: String, default: '' },
        labels: { type: [String, Object], default: () => ({
                en: {
                    title: '',
                    body: '',
                    footer: ''
                },
                dv: {
                    title: '',
                    body: '',
                    footer: ''
                }
        }) },
        id: { type: String, default: '' },
        width: { type: String, default: '' },
        title: { type: [String, Object], default: '' },
        cardClass: { type: String, default: '' },
        overflow: { type: String, default: 'overflow-auto' },
        bg: { type: String, default: 'bg-background-color' },
        border: { type: String, default: 'border border-input-border' },
        rounded: { type: String, default: 'd' },
        shadow: { type: String, default: '' },
        dir: { type: String, default: '' },
        item: { type: Object, default: null },

        //body props
        bodyClass: { type: String, default: '' },
        margin: { type: String, default: 'mx-0 my-6' },
        padding: { type: String, default: 'px-6 py-4' },
        textColor: { type: String, default: 'text-input-text' },
        textSize: { type: String, default: 'text-base' },

        // header props
        headerClass: { type: String, default: '' },
        titleClass: { type: String, default: '' },
        headerBg: { type: String, default: '' },
        headerText: { type: String, default: 'text-input-text' },
        headerTextSize: { type: String, default: 'text-lg font-semibold' },
        headerBd: { type: String, default: '' },
        headerMargin: { type: String, default: '' },
        headerPadding: { type: String, default: 'px-6 pt-4' },

        //footer props
        footerClass: { type: String, default: '' },
        footerBg: { type: String, default: '' },
        footerText: { type: String, default: 'text-input-text' },
        footerTextSize: { type: String, default: '' },
        footerBd: { type: String, default: '' },
        footerMargin: { type: String, default: '' },
        footerPadding: { type: String, default: 'px-6 py-4' },

    })

    const selectedDirection = computed(() => {
        let selected = ''
        if (props.dir == 'rtl') selected = 'rtl'
        else if (props.lang == 'dv') selected = 'rtl'
        else if (props.dir == 'ltr') selected = 'ltr'
        else if (props.lang == 'en') selected = 'ltr'
        else selected = ''
        return selected
    })

    const selectLanguage = computed(() => {
        let Selected = ''
        if (props.lang != ''){
            Selected = props.lang
        }
        else if (props.dir == 'rtl') {
            Selected = 'dv'
        }
        else if (props.dir == 'ltr') {
            Selected = 'en'
        }
        else {
            Selected = language.value
        }
        console.log('selectLanguage in Card222:', Selected)
        return (Selected === 'dv') ? 'dv' : 'en'
    })

    // Provide dir and lang to child components - MOVED HERE AFTER COMPUTED
    provide('parentDir', selectedDirection.value)
    provide('parentLang', selectLanguage.value)

    const controlAttrs = computed(() => ({
        id: props.id,
        dir: selectedDirection.value,
        lang: selectLanguage.value,
    }));

    const faruma = computed(() => {
       if (selectLanguage.value == 'dv') return 'faruma'
       return ''
    })

    const selectedlabels = computed(() => {
        return useLanguageSelected(props.labels, selectLanguage.value, '')
    })

    // console.log('selectedlabels in Card:', selectedlabels.value.title)

    const topRoundedClass = computed(() => {
        switch (props.rounded) {
            case 'sm': return 'rounded-t-sm'
            case 'md': return 'rounded-t-md'
            case 'lg': return 'rounded-t-lg'
            case 'xl': return 'rounded-t-xl'
            case '2xl': return 'rounded-t-2xl'
            case '3xl': return 'rounded-t-3xl'
            case 'full': return 'rounded-t-full'
            default: return 'rounded-t-lg'
        }

    })
    const bottomRoundedClass = computed(() => {
        switch (props.rounded) {
            case 'sm': return 'rounded-b-sm'
            case 'md': return 'rounded-b-md'
            case 'lg': return 'rounded-b-lg'
            case 'xl': return 'rounded-b-xl'
            case '2xl': return 'rounded-b-2xl'
            case '3xl': return 'rounded-b-3xl'
            case 'full': return 'rounded-b-full'
            default: return 'rounded-b-lg'
        }

    })

</script>
<style scoped></style>
