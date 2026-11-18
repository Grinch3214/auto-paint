import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { pagePath } from '@/config/pages'
import { SITE } from '@/config/site'
import { PRICE_GROUPS } from '@/data/prices'
import { SERVICES } from '@/data/services'
import { useContent, useI18n } from '@/i18n'
import { minPrice } from '@/utils/format'
import { businessSchema } from '@/utils/schema'

/** Разметка AutoBodyShop в <head>: на главной и в контактах */
export function useBusinessSchema() {
  const { t, locale } = useI18n()
  const content = useContent()

  const schema = computed(() => {
    const allPrices = PRICE_GROUPS.flatMap((g) => g.items)
    return businessSchema({
      url: SITE.url,
      name: SITE.brand,
      description: t((m) => m.home.seoDescription),
      telephone: `+${SITE.phone}`,
      email: SITE.email,
      logo: `${SITE.url}/icon-512.png`,
      image: `${SITE.url}${SITE.ogImage}`,
      hasMap: SITE.mapsUrl,
      address: SITE.schemaAddress,
      geo: SITE.geo,
      openingHours: SITE.openingHours,
      services: SERVICES.map((s) => {
        const price = allPrices.find((p) => p.id === s.fromPrice)
        return {
          name: content.value.services.items[s.id].title,
          url: s.page ? SITE.url + pagePath(s.page, locale.value) : undefined,
          minPrice: price ? minPrice(price) : undefined,
        }
      }),
    })
  })

  useHead({
    script: computed(() => [
      { type: 'application/ld+json', innerHTML: JSON.stringify(schema.value) },
    ]),
  })
}
