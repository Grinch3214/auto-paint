import type { Component } from 'vue'
import type { Locale } from '@/i18n/locales'
import { getLocale } from '@/i18n/locales'

export type PageId = 'home' | 'contacts'

export interface PageDef {
  id: PageId
  /** Слаг на каждом языке. '' = главная языка */
  slugs: Record<Locale, string>
  component: () => Promise<Component>
}

// Новые страницы из брифа (п. 5) добавляются сюда
export const PAGES: readonly PageDef[] = [
  {
    id: 'home',
    slugs: { ru: '', ka: '', en: '', uk: '', be: '' },
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    id: 'contacts',
    slugs: {
      ru: 'kontakty',
      ka: 'kontaktebi',
      en: 'contacts',
      uk: 'kontakty',
      be: 'kantakty',
    },
    component: () => import('@/pages/ContactsPage.vue'),
  },
]

/**
 * Путь страницы на языке. Главная языка со слэшем ('/', '/ka/'),
 * остальные без ('/kontakty', '/ka/kontaktebi'): так их отдаёт Cloudflare Pages
 * из файлов dist/ka/index.html и dist/ka/kontaktebi.html.
 */
export function pagePath(id: PageId, locale: Locale): string {
  const page = PAGES.find((p) => p.id === id)
  if (!page) throw new Error(`Unknown page: ${id}`)
  const { prefix } = getLocale(locale)
  const slug = page.slugs[locale]
  return slug ? `${prefix}/${slug}` : `${prefix}/`
}
