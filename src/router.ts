import type { RouteRecordRaw, RouterHistory } from 'vue-router'
import { createRouter as createVueRouter } from 'vue-router'
import { PAGES, pagePath } from '@/config/pages'
import { HEADER_HEIGHT } from '@/constants/layout'
import { DEFAULT_LOCALE, visibleLocales } from '@/i18n/locales'
import type { Locale } from '@/types/i18n'
import type { PageId } from '@/types/pages'

declare module 'vue-router' {
  interface RouteMeta {
    locale?: Locale
    pageId?: PageId
  }
}

export function localeFromPath(path: string): Locale {
  const prefixed = visibleLocales().find(
    (locale) => locale.prefix && (path === locale.prefix || path.startsWith(`${locale.prefix}/`)),
  )
  return prefixed?.code ?? DEFAULT_LOCALE
}

function buildRoutes(): RouteRecordRaw[] {
  const pageRoutes = PAGES.flatMap((page) =>
    visibleLocales().map(({ code }) => ({
      path: pagePath(page.id, code),
      name: `${page.id}:${code}`,
      component: page.component,
      meta: { locale: code, pageId: page.id },
    })),
  )
  return [
    ...pageRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFoundPage.vue'),
    },
  ]
}

export function createRouter(history: RouterHistory) {
  return createVueRouter({
    history,
    routes: buildRoutes(),
    scrollBehavior: (to, _from, saved) => {
      if (saved) return saved
      if (to.hash) return { el: to.hash, top: HEADER_HEIGHT, behavior: 'smooth' }
      return { top: 0 }
    },
  })
}
