import type { RouterHistory } from 'vue-router'
import type { VueHeadClient } from '@unhead/vue'
import { createApp as createClientApp, createSSRApp } from 'vue'
import App from './App.vue'
import { createI18n } from './i18n'
import { createRouter, localeFromPath } from './router'
import '@fontsource-variable/jetbrains-mono'
import '@/styles/base.scss'

interface Options {
  history: RouterHistory
  head: VueHeadClient
  /** true — гидрировать готовый HTML (пререндер, прод); false — обычный mount (vite dev) */
  hydrate: boolean
}

/** Общая фабрика для клиента и SSR: на каждый рендер свой экземпляр приложения */
export function createApp({ history, head, hydrate }: Options) {
  const app = hydrate ? createSSRApp(App) : createClientApp(App)
  const router = createRouter(history)
  const i18n = createI18n()

  router.beforeEach(async (to) => {
    await i18n.setLocale(to.meta.locale ?? localeFromPath(to.path))
  })

  app.use(router).use(i18n).use(head)
  return { app, router }
}
