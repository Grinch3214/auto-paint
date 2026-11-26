export interface SeoInput {
  title: () => string
  description?: () => string
  image?: () => string | undefined
  /** 404 и служебные страницы: noindex, без canonical/hreflang */
  noindex?: boolean
}

export interface Alternate {
  hreflang: string
  href: string
}

export interface PrerenderEntry {
  path: string
  alternates: Alternate[]
}
