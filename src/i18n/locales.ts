import type { Locale, LocaleInfo } from '@/types/i18n'

// Порядок = порядок наполнения текстами
export const LOCALES: readonly LocaleInfo[] = [
  { code: 'ru', prefix: '', hreflang: 'ru', label: 'RU', published: true },
  { code: 'ka', prefix: '/ka', hreflang: 'ka', label: 'GE', published: true },
  { code: 'en', prefix: '/en', hreflang: 'en', label: 'EN', published: true },
]

export const DEFAULT_LOCALE: Locale = 'ru'

/** Какую версию Google показывает, если язык пользователя не из наших */
export const X_DEFAULT_LOCALE: Locale = 'en'

export function getLocale(code: Locale): LocaleInfo {
  const info = LOCALES.find((l) => l.code === code)
  if (!info) throw new Error(`Unknown locale: ${code}`)
  return info
}

export const isPublished = (code: Locale) => getLocale(code).published

/** Языки, видимые в переключателе: в dev все, в проде только опубликованные */
export const visibleLocales = () => LOCALES.filter((l) => l.published || import.meta.env.DEV)
