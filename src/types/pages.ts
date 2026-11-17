import type { Component } from 'vue'
import type { Locale } from './i18n'

export type ServicePageId =
  | 'fullPaint'
  | 'panelPaint'
  | 'spotRepair'
  | 'wheelPaint'
  | 'bodyRepair'
  | 'polishing'

export type PageId = 'home' | 'contacts' | 'colorMatch' | 'prices' | ServicePageId

export interface PageDef {
  id: PageId
  slugs: Record<Locale, string>
  component: () => Promise<Component>
  props?: Record<string, unknown>
}
