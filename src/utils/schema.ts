import type { FaqEntry } from '@/types/faq'

/** JSON-LD FAQPage: вопросы и ответы те же, что видны на странице */
export function faqSchema(entries: readonly FaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((e) => ({
      '@type': 'Question',
      name: e.question,
      acceptedAnswer: { '@type': 'Answer', text: e.answer },
    })),
  }
}

export interface BusinessSchemaInput {
  url: string
  name: string
  description: string
  telephone: string
  email: string
  logo: string
  image: string
  hasMap: string
  address: Record<string, string>
  geo: { latitude: number; longitude: number }
  openingHours: { days: readonly string[]; opens: string; closes: string }
  services: readonly { name: string; url?: string; minPrice?: number }[]
}

/**
 * JSON-LD AutoBodyShop: «анкета» мастерской для Google — адрес, точка, часы, телефон,
 * услуги с ценами «от». Данные те же, что видны на сайте.
 */
export function businessSchema(input: BusinessSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoBodyShop',
    '@id': `${input.url}/#business`,
    name: input.name,
    description: input.description,
    url: `${input.url}/`,
    telephone: input.telephone,
    email: input.email,
    logo: input.logo,
    image: input.image,
    hasMap: input.hasMap,
    priceRange: '₾₾',
    currenciesAccepted: 'GEL',
    address: { '@type': 'PostalAddress', ...input.address },
    geo: { '@type': 'GeoCoordinates', ...input.geo },
    areaServed: { '@type': 'City', name: 'Batumi' },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: input.openingHours.days,
        opens: input.openingHours.opens,
        closes: input.openingHours.closes,
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: input.name,
      itemListElement: input.services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, ...(s.url && { url: s.url }) },
        ...(s.minPrice !== undefined && {
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'GEL',
            minPrice: s.minPrice,
          },
        }),
      })),
    },
  }
}
