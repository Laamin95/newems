import type { Directive, DirectiveBinding } from 'vue'
import { watch } from 'vue'
import { globalRtl } from '@/lib/rtl/rtl.ts'
import { useLanguageSelected } from '@/lib/componentConfig'
import { useI18n } from '@/lib/i18n/useI18n'

export type Placement = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipOptions {
  text?: string | Object
  placement?: Placement
  arrow?: boolean
  openOnHover?: boolean
  openOnFocus?: boolean
  openOnClick?: boolean
  showDelay?: number
  hideDelay?: number
  offset?: { x?: number; y?: number }
  disabled?: boolean
}

interface TooltipState {
  options: TooltipOptions
  tooltipEl: HTMLElement | null
  arrowEl: HTMLElement | null
  showTimer: number | null
  hideTimer: number | null
  open: boolean
  handlers: {
    mouseover?: (e: MouseEvent) => void
    mouseout?: (e: MouseEvent) => void
    focusin?: (e: Event) => void
    focusout?: (e: Event) => void
    click?: (e: Event) => void
    docClick?: (e: MouseEvent) => void
    keydown?: (e: KeyboardEvent) => void
  }
  lastTrigger: 'hover' | 'focus' | 'click' | 'manual' | null
  classModifiers: string[]
}

function normalizeOptions(binding: DirectiveBinding<string | TooltipOptions>): TooltipOptions {
  const v = binding.value
  const isObj = typeof v === 'object' && v !== null
  
  const hasOptionKeys = isObj && (
    'text' in v ||
    'placement' in v || 
    'arrow' in v || 
    'openOnHover' in v || 
    'showDelay' in v || 
    'hideDelay' in v ||
    'disabled' in v
  )
  
  const text = typeof v === 'string' 
    ? v 
    : hasOptionKeys && 'text' in v
      ? (v as TooltipOptions).text
      : hasOptionKeys
        ? 'default tooltip'
        : v
  
  const base: TooltipOptions = {
    text: text,
    placement: hasOptionKeys && (v as TooltipOptions).placement ? (v as TooltipOptions).placement : 'top',
    arrow: hasOptionKeys && (v as TooltipOptions).arrow !== undefined ? !!(v as TooltipOptions).arrow : true,
    openOnHover: hasOptionKeys && (v as TooltipOptions).openOnHover !== undefined ? !!(v as TooltipOptions).openOnHover : true,
    openOnFocus: hasOptionKeys && (v as TooltipOptions).openOnFocus !== undefined ? !!(v as TooltipOptions).openOnFocus : true,
    openOnClick: hasOptionKeys && (v as TooltipOptions).openOnClick !== undefined ? !!(v as TooltipOptions).openOnClick : false,
    showDelay: hasOptionKeys && (v as TooltipOptions).showDelay !== undefined ? Number((v as TooltipOptions).showDelay) : 80,
    hideDelay: hasOptionKeys && (v as TooltipOptions).hideDelay !== undefined ? Number((v as TooltipOptions).hideDelay) : 80,
    offset: hasOptionKeys && (v as TooltipOptions).offset ? (v as TooltipOptions).offset! : { x: 0, y: 0 },
    disabled: hasOptionKeys && (v as TooltipOptions).disabled !== undefined ? !!(v as TooltipOptions).disabled : false
  }
  return base
}

function applyTriggerModifiers(base: TooltipOptions, modifiers: Record<string, boolean>): TooltipOptions {
  const hasPreset = !!(modifiers?.hover || modifiers?.click || modifiers?.focus)
  if (!hasPreset) return base
  return {
    ...base,
    openOnHover: !!modifiers.hover,
    openOnClick: !!modifiers.click,
    openOnFocus: !!modifiers.focus
  }
}

function applyPlacementModifiers(base: TooltipOptions, modifiers: Record<string, boolean>): TooltipOptions {
  if (!modifiers) return base
  const order: Placement[] = ['top', 'bottom', 'left', 'right']
  const chosen = order.find(p => (modifiers as any)[p])
  if (!chosen) return base
  return { ...base, placement: chosen }
}

function getClassModifiers(modifiers: Record<string, boolean> | undefined): string[] {
  const supported = ['faruma']
  const mods: string[] = []
  if (!modifiers) return mods
  for (const key of supported) {
    if ((modifiers as any)[key]) mods.push(key)
  }
  return mods
}

function applyClassesToTooltip(state: TooltipState) {
  if (!state.tooltipEl) return
  const supported = ['faruma']
  for (const key of supported) {
    if (state.classModifiers.includes(key)) state.tooltipEl.classList.add(key)
    else state.tooltipEl.classList.remove(key)
  }
}

function getNormalizedPlacement(p: Placement): Placement {
  const rtl = !!globalRtl.value
  if (!rtl) return p
  if (p === 'left') return 'right'
  if (p === 'right') return 'left'
  return p
}

function getLocalizedText(text: string | Object | undefined): string {
  if (!text) return 'empty-tooltip'
  return useLanguageSelected(text, '') || 'empty-tooltip'
}

function ensureTooltipEl(state: TooltipState) {
  if (state.tooltipEl) return
  const el = document.createElement('div')
  el.className = 'vts-tooltip'
  el.setAttribute('role', 'tooltip')
  el.style.position = 'absolute'
  el.style.top = '-9999px'
  el.style.left = '-9999px'
  el.style.visibility = 'hidden'
  el.style.zIndex = 'var(--vts-z-tooltip, 1000)'

  const content = document.createElement('div')
  content.className = 'vts-tooltip-content'
  
  // Add faruma class if global language is dv
  const { language } = useI18n()
  if (language.value === 'dv' || state.classModifiers.includes('faruma')) {
    content.classList.add('faruma')
  }
  
  content.textContent = getLocalizedText(state.options.text)
  el.appendChild(content)

  if (state.options.arrow) {
    const arrow = document.createElement('div')
    arrow.className = 'vts-tooltip-arrow'
    el.appendChild(arrow)
    state.arrowEl = arrow
  }

  document.body.appendChild(el)
  state.tooltipEl = el
  applyClassesToTooltip(state)
}

function updateText(state: TooltipState) {
  if (!state.tooltipEl) return
  const content = state.tooltipEl.querySelector('.vts-tooltip-content') as HTMLElement | null
  if (content) {
    content.textContent = getLocalizedText(state.options.text)
    
    // Update faruma class based on global language
    const { language } = useI18n()
    if (language.value === 'dv' || state.classModifiers.includes('faruma')) {
      content.classList.add('faruma')
    } else {
      content.classList.remove('faruma')
    }
  }
}

function computePosition(activator: HTMLElement, state: TooltipState) {
  if (!state.tooltipEl) return
  const tooltip = state.tooltipEl
  const rect = activator.getBoundingClientRect()
  const tooltipRect = tooltip.getBoundingClientRect()
  const scrollX = window.scrollX || window.pageXOffset
  const scrollY = window.scrollY || window.pageYOffset
  const placement = getNormalizedPlacement(state.options.placement || 'top')
  const offsetX = state.options.offset?.x ?? 0
  const offsetY = state.options.offset?.y ?? 0
  const gap = state.options.arrow ? 8 : 0

  let top = 0
  let left = 0

  switch (placement) {
    case 'top':
      top = rect.top + scrollY - tooltipRect.height - gap - offsetY
      left = rect.left + scrollX + rect.width / 2 - tooltipRect.width / 2 + offsetX
      break
    case 'bottom':
      top = rect.bottom + scrollY + gap + offsetY
      left = rect.left + scrollX + rect.width / 2 - tooltipRect.width / 2 + offsetX
      break
    case 'left':
      top = rect.top + scrollY + rect.height / 2 - tooltipRect.height / 2 + offsetY
      left = rect.left + scrollX - tooltipRect.width - gap - offsetX
      break
    case 'right':
      top = rect.top + scrollY + rect.height / 2 - tooltipRect.height / 2 + offsetY
      left = rect.right + scrollX + gap + offsetX
      break
  }

  tooltip.style.top = `${top}px`
  tooltip.style.left = `${left}px`
  tooltip.style.visibility = ''

  if (state.options.arrow && state.arrowEl) {
    const size = 8
    const arrow = state.arrowEl
    arrow.style.width = `${size}px`
    arrow.style.height = `${size}px`
    switch (placement) {
      case 'top':
        arrow.style.bottom = '-4px'
        arrow.style.left = '50%'
        arrow.style.top = ''
        arrow.style.right = ''
        arrow.style.transform = 'translateX(-50%) rotate(225deg)'
        break
      case 'bottom':
        arrow.style.top = '-4px'
        arrow.style.left = '50%'
        arrow.style.bottom = ''
        arrow.style.right = ''
        arrow.style.transform = 'translateX(-50%) rotate(45deg)'
        break
      case 'left':
        arrow.style.right = '-4px'
        arrow.style.top = '50%'
        arrow.style.left = ''
        arrow.style.bottom = ''
        arrow.style.transform = 'translateY(-50%) rotate(135deg)'
        break
      case 'right':
        arrow.style.left = '-4px'
        arrow.style.top = '50%'
        arrow.style.right = ''
        arrow.style.bottom = ''
        arrow.style.transform = 'translateY(-50%) rotate(315deg)'
        break
    }
  }
}

function open(el: HTMLElement, state: TooltipState, source: TooltipState['lastTrigger'] = null) {
  if (state.options.disabled) return
  if (state.showTimer) window.clearTimeout(state.showTimer)
  if (state.hideTimer) window.clearTimeout(state.hideTimer)
  state.showTimer = window.setTimeout(() => {
    state.lastTrigger = source
    ensureTooltipEl(state)
    state.open = true
    computePosition(el, state)
  }, state.options.showDelay ?? 80)
}

function close(state: TooltipState) {
  if (state.showTimer) window.clearTimeout(state.showTimer)
  if (state.hideTimer) window.clearTimeout(state.hideTimer)
  state.hideTimer = window.setTimeout(() => {
    state.open = false
    if (state.tooltipEl) state.tooltipEl.style.visibility = 'hidden'
    state.lastTrigger = null
  }, state.options.hideDelay ?? 80)
}

function cleanup(el: HTMLElement, state: TooltipState) {
  el.removeEventListener('mouseover', state.handlers.mouseover as EventListener)
  el.removeEventListener('mouseout', state.handlers.mouseout as EventListener)
  el.removeEventListener('focusin', state.handlers.focusin as EventListener)
  el.removeEventListener('focusout', state.handlers.focusout as EventListener)
  el.removeEventListener('click', state.handlers.click as EventListener)
  document.removeEventListener('click', state.handlers.docClick as EventListener)
  document.removeEventListener('keydown', state.handlers.keydown as EventListener)

  // Stop watching language changes
  if ((state as any).unwatchLanguage) {
    ;(state as any).unwatchLanguage()
  }

  if (state.tooltipEl && state.tooltipEl.parentNode) {
    state.tooltipEl.parentNode.removeChild(state.tooltipEl)
  }

  if (state.showTimer) window.clearTimeout(state.showTimer)
  if (state.hideTimer) window.clearTimeout(state.hideTimer)

  ;(el as any).__tooltipState = undefined
}

export const tooltipDirective: Directive<HTMLElement, string | TooltipOptions> = {
  mounted(el, binding) {
    const options = applyPlacementModifiers(
      applyTriggerModifiers(normalizeOptions(binding), binding.modifiers || {}),
      binding.modifiers || {}
    )
    
    const state: TooltipState = {
      options,
      tooltipEl: null,
      arrowEl: null,
      showTimer: null,
      hideTimer: null,
      open: false,
      handlers: {},
      lastTrigger: null,
      classModifiers: getClassModifiers(binding.modifiers)
    }

    // Watch for global language changes
    const { language } = useI18n()
    const unwatchLanguage = watch(language, () => {
      updateText(state)
      if (state.open) computePosition(el, state)
    })

    // Store unwatch function for cleanup
    ;(state as any).unwatchLanguage = unwatchLanguage

    // Event handlers
    state.handlers.mouseover = (evt: MouseEvent) => {
      if (!state.options.openOnHover) return
      open(el, state, 'hover')
    }

    state.handlers.mouseout = (evt: MouseEvent) => {
      if (!state.options.openOnHover) return
      const related = evt.relatedTarget as Node | null
      if (related && el.contains(related)) return
      close(state)
    }
    state.handlers.focusin = () => state.options.openOnFocus && open(el, state, 'focus')
    state.handlers.focusout = () => state.options.openOnFocus && close(state)
    state.handlers.click = () => {
      if (!state.options.openOnClick) return
      if (state.open) close(state)
      else open(el, state, 'click')
    }
    state.handlers.docClick = e => {
      if (!state.open) return
      const target = e.target as Node
      if (state.tooltipEl && state.tooltipEl.contains(target)) return
      if (el.contains(target)) return
      close(state)
    }
    state.handlers.keydown = e => {
      if (e.key === 'Escape') close(state)
    }

    el.addEventListener('mouseover', state.handlers.mouseover as EventListener)
    el.addEventListener('mouseout', state.handlers.mouseout as EventListener)
    el.addEventListener('focusin', state.handlers.focusin)
    el.addEventListener('focusout', state.handlers.focusout)
    el.addEventListener('click', state.handlers.click)
    document.addEventListener('click', state.handlers.docClick as EventListener, { passive: true })
    document.addEventListener('keydown', state.handlers.keydown as EventListener)

    ;(el as any).__tooltipState = state
  },
  
  updated(el, binding) {
    const state = (el as any).__tooltipState as TooltipState | undefined
    if (!state) return
    state.options = applyPlacementModifiers(
      applyTriggerModifiers(normalizeOptions(binding), binding.modifiers || {}),
      binding.modifiers || {}
    )
    state.classModifiers = getClassModifiers(binding.modifiers)
    updateText(state)
    applyClassesToTooltip(state)
    if (state.open) computePosition(el, state)
  },
  
  unmounted(el) {
    const state = (el as any).__tooltipState as TooltipState | undefined
    if (!state) return
    cleanup(el, state)
  }
}

export default tooltipDirective