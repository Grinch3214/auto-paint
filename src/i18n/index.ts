import { computed, inject, ref, shallowRef } from 'vue'
import { contentLoaders } from '@/content'
import { SITE } from '@/config/site'
import { DEFAULT_LOCALE } from './locales'
import type { App, InjectionKey } from 'vue'
import type { Content } from '@/types/content'
import type { I18n, Locale, Messages } from '@/types/i18n'

// Каждый словарь — отдельный чанк: страница грузит только свой язык
const loaders: Record<Locale, () => Promise<{ default: Messages }>> = {
  ru: () => import('./messages/ru'),
  ka: () => import('./messages/ka'),
  en: () => import('./messages/en'),
  uk: () => import('./messages/uk'),
  be: () => import('./messages/be'),
}

const KEY: InjectionKey<I18n> = Symbol('i18n')

const fill = (text: string) => text.replaceAll('{BRAND}', SITE.brand)

export function createI18n() {
  const cache = new Map<Locale, { messages: Messages; content: Content }>()
  const i18n: I18n = {
    locale: ref(DEFAULT_LOCALE),
    messages: shallowRef(null),
    content: shallowRef(null),
    async setLocale(locale) {
      let loaded = cache.get(locale)
      if (!loaded) {
        const [messages, content] = await Promise.all([loaders[locale](), contentLoaders[locale]()])
        loaded = { messages: messages.default, content: content.default }
        cache.set(locale, loaded)
      }
      i18n.messages.value = loaded.messages
      i18n.content.value = loaded.content
      i18n.locale.value = locale
    },
  }
  return {
    ...i18n,
    install(app: App) {
      app.provide(KEY, i18n)
    },
  }
}

function injectI18n() {
  const i18n = inject(KEY)
  if (!i18n) throw new Error('i18n is not installed')
  return i18n
}

export function useI18n() {
  const i18n = injectI18n()
  /** t(m => m.home.h1): ключи проверяются TypeScript'ом */
  const t = (pick: (m: Messages) => string) => {
    const messages = i18n.messages.value
    if (!messages) throw new Error('Messages are not loaded yet')
    return fill(pick(messages))
  }
  return { t, locale: i18n.locale }
}

/** Тексты контента текущего языка (content/<lang>/) */
export function useContent() {
  const i18n = injectI18n()
  return computed(() => {
    const content = i18n.content.value
    if (!content) throw new Error('Content is not loaded yet')
    return content
  })
}
