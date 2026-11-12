import type { Ref, ShallowRef } from 'vue'

export type Locale = 'ru' | 'ka' | 'en' | 'uk' | 'be'

export interface LocaleInfo {
  code: Locale
  prefix: string
  hreflang: string
  label: string
  published: boolean
}

export type Messages = typeof import('@/i18n/messages/ru').default

export interface I18n {
  locale: Ref<Locale>
  messages: ShallowRef<Messages | null>
  setLocale: (locale: Locale) => Promise<void>
}
