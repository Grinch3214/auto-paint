export type Locale = 'ru' | 'ka' | 'en' | 'uk' | 'be'

export interface LocaleInfo {
  code: Locale
  /** Префикс URL: '' для языка в корне, '/ka' и т.д. для остальных */
  prefix: string
  /** Значение для <html lang> и hreflang */
  hreflang: string
  /** Подпись в переключателе языков */
  label: string
  /**
   * Готов ли язык к публикации. Неопубликованный язык доступен в dev,
   * но не пререндерится и не попадает в sitemap/hreflang.
   */
  published: boolean
}

// Порядок = порядок наполнения текстами
export const LOCALES: readonly LocaleInfo[] = [
  { code: 'ru', prefix: '', hreflang: 'ru', label: 'RU', published: true },
  { code: 'ka', prefix: '/ka', hreflang: 'ka', label: 'ქარ', published: false },
  { code: 'en', prefix: '/en', hreflang: 'en', label: 'EN', published: false },
  { code: 'uk', prefix: '/uk', hreflang: 'uk', label: 'UA', published: false },
  { code: 'be', prefix: '/be', hreflang: 'be', label: 'BY', published: false },
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
