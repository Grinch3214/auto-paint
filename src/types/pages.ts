import type { Component } from 'vue'
import type { Locale } from './i18n'

export type PageId = 'home' | 'contacts'

export interface PageDef {
  id: PageId
  slugs: Record<Locale, string>
  component: () => Promise<Component>
}
