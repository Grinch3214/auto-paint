import { createMemoryHistory } from 'vue-router'
import { renderToString } from 'vue/server-renderer'
import { createHead, renderSSRHead } from '@unhead/vue/server'
import { createApp } from './app'
import { PAGES, pagePath } from './config/pages'
import { SITE } from './config/site'
import { LOCALES } from './i18n/locales'
import { pageAlternates } from './seo/alternates'
import type { PrerenderEntry } from './types/seo'

/** Рендер одного URL в HTML + теги <head>. Вызывается из scripts/prerender.mjs */
export async function render(url: string) {
  // charset/viewport уже есть в index.html
  const head = createHead({ disableDefaults: true })
  const { app, router } = createApp({ history: createMemoryHistory(), head, hydrate: true })
  await router.push(url)
  await router.isReady()
  const html = await renderToString(app)
  const headPayload = await renderSSRHead(head)
  return { html, head: headPayload }
}

/** Все опубликованные URL с языковыми альтернативами — для пререндера и sitemap */
export function getPrerenderEntries(): PrerenderEntry[] {
  const published = LOCALES.filter((l) => l.published)
  return PAGES.flatMap((page) =>
    published.map((l) => ({
      path: pagePath(page.id, l.code),
      alternates: pageAlternates(page.id),
    })),
  )
}

export const siteUrl = SITE.url
