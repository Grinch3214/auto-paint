import type { App, InjectionKey } from 'vue'
import { inject, ref, shallowRef } from 'vue'
import { DEFAULT_LOCALE } from './locales'
import { SITE } from '@/config/site'
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

/** Подставляет плейсхолдеры из конфига сайта ({BRAND}) */
const fill = (text: string) => text.replaceAll('{BRAND}', SITE.brand)

export function createI18n() {
  const cache = new Map<Locale, Messages>()
  const i18n: I18n = {
    locale: ref(DEFAULT_LOCALE),
    messages: shallowRef(null),
    async setLocale(locale) {
      let messages = cache.get(locale)
      if (!messages) {
        messages = (await loaders[locale]()).default
        cache.set(locale, messages)
      }
      i18n.messages.value = messages
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

export function useI18n() {
  const i18n = inject(KEY)
  if (!i18n) throw new Error('i18n is not installed')
  /** t(m => m.home.h1): ключи проверяются TypeScript'ом */
  const t = (pick: (m: Messages) => string) => {
    const messages = i18n.messages.value
    if (!messages) throw new Error('Messages are not loaded yet')
    return fill(pick(messages))
  }
  return { t, locale: i18n.locale }
}
