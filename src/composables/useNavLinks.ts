import { computed } from 'vue'
import { pagePath } from '@/config/pages'
import { SERVICES } from '@/data/services'
import { useContent, useI18n } from '@/i18n'

/** Пункты меню: короткое — в шапке, полный список страниц — в подвале */
export function useNavLinks() {
  const { t, locale } = useI18n()
  const content = useContent()

  const home = computed(() => pagePath('home', locale.value))
  const toHome = (hash: string) => ({ path: home.value, hash })

  const links = computed(() => [
    { key: 'services', to: toHome('#services'), label: t((m) => m.nav.services) },
    {
      key: 'colorMatch',
      to: pagePath('colorMatch', locale.value),
      label: t((m) => m.nav.colorMatch),
    },
    { key: 'prices', to: pagePath('prices', locale.value), label: t((m) => m.nav.prices) },
    { key: 'contacts', to: pagePath('contacts', locale.value), label: t((m) => m.nav.contacts) },
  ])

  const serviceLinks = computed(() =>
    SERVICES.flatMap((s) =>
      s.page
        ? [
            {
              key: s.id,
              to: pagePath(s.page, locale.value),
              label: content.value.services.items[s.id].title,
            },
          ]
        : [],
    ),
  )

  const pageLinks = computed(() => [
    ...serviceLinks.value,
    { key: 'prices', to: pagePath('prices', locale.value), label: t((m) => m.nav.prices) },
    { key: 'contacts', to: pagePath('contacts', locale.value), label: t((m) => m.nav.contacts) },
  ])

  return { home, toHome, links, serviceLinks, pageLinks }
}
