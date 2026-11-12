import type { PageId } from '@/config/pages'
import { pagePath } from '@/config/pages'
import { SITE } from '@/config/site'
import { DEFAULT_LOCALE, LOCALES, X_DEFAULT_LOCALE, isPublished } from '@/i18n/locales'

export interface Alternate {
  hreflang: string
  href: string
}

/** hreflang-ссылки страницы: все опубликованные языки + x-default */
export function pageAlternates(id: PageId): Alternate[] {
  const list = LOCALES.filter((l) => l.published).map((l) => ({
    hreflang: l.hreflang,
    href: SITE.url + pagePath(id, l.code),
  }))
  // Пока EN не опубликован, x-default указывает на язык корня
  const xDefault = isPublished(X_DEFAULT_LOCALE) ? X_DEFAULT_LOCALE : DEFAULT_LOCALE
  list.push({ hreflang: 'x-default', href: SITE.url + pagePath(id, xDefault) })
  return list
}
