import { createWebHistory } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import { createApp } from './app'

const root = document.getElementById('app')!
// В проде #app уже содержит пререндеренный HTML, в vite dev он пустой
const hydrate = root.firstElementChild !== null

const { app, router } = createApp({
  history: createWebHistory(),
  head: createHead(),
  hydrate,
})

await router.isReady()
app.mount(root)
