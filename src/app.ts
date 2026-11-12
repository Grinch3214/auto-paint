import { createApp as createClientApp, createSSRApp } from 'vue'
import App from './App.vue'
import { createI18n } from './i18n'
import { createRouter, localeFromPath } from './router'
import '@fontsource-variable/unbounded'
import '@fontsource-variable/manrope'
import '@fontsource-variable/noto-sans-georgian'
import '@/styles/base.scss'
import type { AppOptions } from '@/types/app'

export function createApp({ history, head, hydrate }: AppOptions) {
  const app = hydrate ? createSSRApp(App) : createClientApp(App)
  const router = createRouter(history)
  const i18n = createI18n()

  router.beforeEach(async (to) => {
    await i18n.setLocale(to.meta.locale ?? localeFromPath(to.path))
  })

  app.use(router).use(i18n).use(head)
  return { app, router }
}
