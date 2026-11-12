import type { RouteRecordRaw, RouterHistory } from 'vue-router'
import { createRouter as createVueRouter } from 'vue-router'
import type { PageId } from '@/config/pages'
import { PAGES, pagePath } from '@/config/pages'
import type { Locale } from '@/i18n/locales'
import { DEFAULT_LOCALE, LOCALES } from '@/i18n/locales'

declare module 'vue-router' {
  interface RouteMeta {
    locale?: Locale
    /** Нет у 404 */
    pageId?: PageId
  }
}

/** Язык по префиксу пути: '/ka/...' → 'ka', иначе язык корня */
export function localeFromPath(path: string): Locale {
  const prefixed = LOCALES.find(
    (l) => l.prefix && (path === l.prefix || path.startsWith(`${l.prefix}/`)),
  )
  return prefixed?.code ?? DEFAULT_LOCALE
}

function buildRoutes(): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  for (const page of PAGES) {
    for (const { code } of LOCALES) {
      routes.push({
        path: pagePath(page.id, code),
        name: `${page.id}:${code}`,
        component: page.component,
        meta: { locale: code, pageId: page.id },
      })
    }
  }
  routes.push({
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
  })
  return routes
}

export function createRouter(history: RouterHistory) {
  return createVueRouter({
    history,
    routes: buildRoutes(),
    scrollBehavior: (_to, _from, saved) => saved ?? { top: 0 },
  })
}
