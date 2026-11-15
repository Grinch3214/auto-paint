import type { Component } from 'vue'
import type { Locale } from './i18n'

export type ServicePageId = 'spotRepair'

export type PageId = 'home' | 'contacts' | ServicePageId

export interface PageDef {
  id: PageId
  slugs: Record<Locale, string>
  component: () => Promise<Component>
  props?: Record<string, unknown>
}
