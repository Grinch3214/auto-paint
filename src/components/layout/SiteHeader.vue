<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useWindowScroll } from '@vueuse/core'
import BaseIcon from '@/components/BaseIcon.vue'
import { useNavLinks } from '@/composables/useNavLinks'
import { SITE } from '@/config/site'
import { useI18n } from '@/i18n'
import { visibleLocales } from '@/i18n/locales'
import { phoneLink } from '@/utils/messengers'
import LangSwitcher from './LangSwitcher.vue'
import SiteLogo from './SiteLogo.vue'

const route = useRoute()
const { t } = useI18n()
const { toHome, links } = useNavLinks()
const { y } = useWindowScroll()

const mounted = ref(false)

const transparent = computed(() => route.meta.pageId === 'home' && (!mounted.value || y.value < 8))
const showLangs = computed(() => visibleLocales().length > 1)

onMounted(() => (mounted.value = true))
</script>

<template>
  <div class="topbar">
    <div class="topbar__inner">
      <a class="topbar__item topbar__link" :href="SITE.mapsUrl" target="_blank" rel="noopener">
        <BaseIcon name="pin" />
        {{ t((m) => m.contactInfo.address) }}
      </a>
      <span class="topbar__item">
        <BaseIcon name="clock" />
        {{ t((m) => m.contactInfo.hoursWork) }}, {{ t((m) => m.contactInfo.hoursOff) }}
      </span>
      <a class="topbar__item topbar__phone" :href="phoneLink(SITE.phone)">
        <BaseIcon name="phone" />
        {{ SITE.phoneDisplay }}
      </a>
    </div>
  </div>

  <header class="header" :class="{ 'is-transparent': transparent }">
    <div class="header__inner">
      <SiteLogo class="header__logo" compact />
      <nav class="header__nav">
        <RouterLink v-for="l in links" :key="l.key" :to="l.to">{{ l.label }}</RouterLink>
      </nav>
      <LangSwitcher v-if="showLangs" />
      <RouterLink class="btn btn--small" :to="toHome('#estimate')">
        {{ t((m) => m.nav.cta) }}
      </RouterLink>
    </div>
  </header>
</template>

<style scoped lang="scss">
.topbar {
  background: var(--hero-0);
  color: var(--hero-muted);
  font-size: 0.8rem;
  border-bottom: 1px solid var(--hero-line);

  @include below(lg) {
    display: none;
  }

  &__inner {
    @include container;
    display: flex;
    align-items: center;
    gap: var(--space-6);
    min-height: var(--topbar-h);
  }

  &__item {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    text-decoration: none;
  }

  &__link:hover {
    color: var(--hero-text);
  }

  &__phone {
    margin-inline-start: auto;
    color: var(--hero-text);
    font-weight: 600;
  }
}

.header {
  position: sticky;
  top: 0;
  z-index: 20;
  color: var(--hero-text);
  background: var(--header-bg);
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
    gap: var(--space-4);
    min-height: var(--header-h);
  }

  &__logo {
    margin-inline-end: auto;
  }

  &__nav {
    display: flex;
    gap: var(--space-6);
    margin-inline-end: var(--space-4);

    a {
      text-decoration: none;
      opacity: 0.75;

      &:hover {
        opacity: 1;
      }
    }

    @include below(lg) {
      display: none;
    }
  }
}
</style>
