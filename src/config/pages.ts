import { getLocale } from '@/i18n/locales'
import type { Locale } from '@/types/i18n'
import type { PageDef, PageId } from '@/types/pages'

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
