<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useWindowScroll } from '@vueuse/core'
import { pagePath } from '@/config/pages'
import { SITE } from '@/config/site'
import { useI18n } from '@/i18n'
import { visibleLocales } from '@/i18n/locales'
import LangSwitcher from './LangSwitcher.vue'

const { t, locale } = useI18n()
const route = useRoute()

const home = computed(() => pagePath('home', locale.value))
const toHome = (hash: string) => ({ path: home.value, hash })

const mounted = ref(false)

onMounted(() => (mounted.value = true))
const { y } = useWindowScroll()
const transparent = computed(() => route.meta.pageId === 'home' && (!mounted.value || y.value < 8))

const showLangs = computed(() => visibleLocales().length > 1)
</script>

<template>
  <header class="header" :class="{ 'is-transparent': transparent }">
    <div class="header__inner">
      <RouterLink :to="home" class="header__logo">{{ SITE.brand }}</RouterLink>
      <nav class="header__nav">
        <RouterLink :to="toHome('#layers')">{{ t((m) => m.nav.process) }}</RouterLink>
        <RouterLink :to="toHome('#works')">{{ t((m) => m.nav.works) }}</RouterLink>
        <RouterLink :to="toHome('#estimate')">{{ t((m) => m.nav.estimate) }}</RouterLink>
        <RouterLink :to="pagePath('contacts', locale)">{{ t((m) => m.nav.contacts) }}</RouterLink>
      </nav>
      <LangSwitcher v-if="showLangs" />
      <RouterLink class="btn btn--small" :to="toHome('#estimate')">
        {{ t((m) => m.nav.cta) }}
      </RouterLink>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 20;
  color: var(--hero-text);
  background: rgb(29 25 18 / 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  @include motion {
    transition:
      background-color 0.25s ease,
      backdrop-filter 0.25s ease;
  }

  &.is-transparent {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  &__inner {
    @include container;
    display: flex;
    align-items: center;
    gap: var(--space-6);
    padding-block: var(--space-4);
  }

  &__logo {
    font-family: var(--font-display);
    font-weight: 800;
    letter-spacing: 0.04em;
    text-decoration: none;
    margin-inline-end: auto;
  }

  &__nav {
    display: flex;
    gap: var(--space-6);

    a {
      text-decoration: none;
      opacity: 0.75;

      &:hover {
        opacity: 1;
      }
    }

    @include below(md) {
      display: none;
    }
  }
}
</style>
