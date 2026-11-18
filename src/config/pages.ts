import { getLocale } from '@/i18n/locales'
import type { Locale } from '@/types/i18n'
import type { PageDef, PageId } from '@/types/pages'

const servicePage = () => import('@/pages/ServicePage.vue')

export const PAGES: readonly PageDef[] = [
  {
    id: 'home',
    slugs: { ru: '', ka: '', en: '' },
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    id: 'contacts',
    slugs: {
      ru: 'kontakty',
      ka: 'kontaktebi',
      en: 'contacts',
    },
    component: () => import('@/pages/ContactsPage.vue'),
  },
  {
    id: 'fullPaint',
    slugs: { ru: 'polnaya-pokraska', ka: 'sruli-sheghebva', en: 'full-respray' },
    component: servicePage,
    props: { id: 'fullPaint' },
  },
  {
    id: 'panelPaint',
    slugs: { ru: 'pokraska-detali', ka: 'detalebis-sheghebva', en: 'panel-painting' },
    component: servicePage,
    props: { id: 'panelPaint' },
  },
  {
    id: 'spotRepair',
    slugs: { ru: 'lokalnaya-pokraska', ka: 'lokaluri-sheghebva', en: 'spot-repair' },
    component: servicePage,
    props: { id: 'spotRepair' },
  },
  {
    id: 'wheelPaint',
    slugs: { ru: 'pokraska-diskov', ka: 'diskebis-sheghebva', en: 'wheel-painting' },
    component: servicePage,
    props: { id: 'wheelPaint' },
  },
  {
    id: 'bodyRepair',
    slugs: { ru: 'kuzovnoy-remont', ka: 'dzaris-sheketeba', en: 'body-repair' },
    component: servicePage,
    props: { id: 'bodyRepair' },
  },
  {
    id: 'polishing',
    slugs: { ru: 'polirovka', ka: 'polireba', en: 'polishing' },
    component: servicePage,
    props: { id: 'polishing' },
  },
  {
    id: 'colorMatch',
    slugs: { ru: 'podbor-kraski', ka: 'peris-shercheva', en: 'paint-color-matching' },
    component: () => import('@/pages/ColorMatchPage.vue'),
  },
  {
    id: 'prices',
    slugs: { ru: 'ceny', ka: 'fasebi', en: 'prices' },
    component: () => import('@/pages/PricesPage.vue'),
  },
  {
    id: 'privacy',
    slugs: { ru: 'politika-konfidencialnosti', ka: 'konfidencialuroba', en: 'privacy-policy' },
    component: () => import('@/pages/PrivacyPage.vue'),
  },
]

export function pagePath(id: PageId, locale: Locale): string {
  const page = PAGES.find((p) => p.id === id)
  if (!page) throw new Error(`Unknown page: ${id}`)
  const { prefix } = getLocale(locale)
  const slug = page.slugs[locale]
  return slug ? `${prefix}/${slug}` : `${prefix}/`
}
