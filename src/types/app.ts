import type { VueHeadClient } from '@unhead/vue'
import type { RouterHistory } from 'vue-router'

export interface AppOptions {
  history: RouterHistory
  head: VueHeadClient
  hydrate: boolean
}
