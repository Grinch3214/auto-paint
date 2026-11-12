import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import type { PageId } from '@/config/pages'
import { pagePath } from '@/config/pages'
import { SITE } from '@/config/site'
import { getLocale } from '@/i18n/locales'
import { useI18n } from '@/i18n'
import { pageAlternates } from './alternates'

interface SeoInput {
  title: () => string
  description?: () => string
  /** 404 и служебные страницы: noindex, без canonical/hreflang */
  noindex?: boolean
}

/**
 * <head> страницы: title, description, canonical, hreflang, OG, lang.
 * Значения — computed: при смене языка на той же странице всё обновится.
 */
export function useSeo(input: SeoInput) {
  const route = useRoute()
  const { locale } = useI18n()

  const pageId = computed(() => route.meta.pageId as PageId | undefined)
  const canonical = computed(() =>
    pageId.value ? SITE.url + pagePath(pageId.value, locale.value) : undefined,
  )

  useHead({
    htmlAttrs: { lang: computed(() => getLocale(locale.value).hreflang) },
    title: computed(input.title),
    meta: computed(() => {
      const description = input.description?.()
      return [
        description && { name: 'description', content: description },
        input.noindex && { name: 'robots', content: 'noindex' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: SITE.brand },
        { property: 'og:title', content: input.title() },
        description && { property: 'og:description', content: description },
        canonical.value && { property: 'og:url', content: canonical.value },
      ].filter((m) => !!m)
    }),
    link: computed(() => {
      if (input.noindex || !pageId.value || !canonical.value) return []
      return [
        { rel: 'canonical', href: canonical.value },
        ...pageAlternates(pageId.value).map((a) => ({
          rel: 'alternate',
          hreflang: a.hreflang,
          href: a.href,
        })),
      ]
    }),
  })
}
