import type { Content } from '@/types/content'
import type { Locale } from '@/types/i18n'

export const contentLoaders: Record<Locale, () => Promise<{ default: Content }>> = {
  ru: () => import('./ru'),
  ka: () => import('./ru'),
  en: () => import('./ru'),
  uk: () => import('./ru'),
  be: () => import('./ru'),
}
