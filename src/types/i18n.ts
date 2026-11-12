import type { Ref, ShallowRef } from 'vue'
import type { Content } from './content'

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
  content: ShallowRef<Content | null>
  setLocale: (locale: Locale) => Promise<void>
}
