import { computed } from 'vue'
import { pagePath } from '@/config/pages'
import { useI18n } from '@/i18n'

/** Пункты меню: общие для шапки и подвала */
export function useNavLinks() {
  const { t, locale } = useI18n()

  const home = computed(() => pagePath('home', locale.value))
  const toHome = (hash: string) => ({ path: home.value, hash })

  const links = computed(() => [
    { key: 'process', to: toHome('#layers'), label: t((m) => m.nav.process) },
    { key: 'works', to: toHome('#works'), label: t((m) => m.nav.works) },
    { key: 'estimate', to: toHome('#estimate'), label: t((m) => m.nav.estimate) },
    { key: 'contacts', to: pagePath('contacts', locale.value), label: t((m) => m.nav.contacts) },
  ])

  return { home, toHome, links }
}
