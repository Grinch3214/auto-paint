<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { onKeyStroke, useWindowScroll } from '@vueuse/core'
import BaseIcon from '@/components/BaseIcon.vue'
import { useNavLinks } from '@/composables/useNavLinks'
import { SITE } from '@/config/site'
import { useI18n } from '@/i18n'
import { visibleLocales } from '@/i18n/locales'
import { phoneLink } from '@/utils/messengers'
import LangSwitcher from './LangSwitcher.vue'
import MobileMenu from './MobileMenu.vue'
import SiteLogo from './SiteLogo.vue'

const route = useRoute()
const { t } = useI18n()
const { links } = useNavLinks()
const { y } = useWindowScroll()

const mounted = ref(false)
const menuOpen = ref(false)

const transparent = computed(
  () => route.meta.pageId === 'home' && !menuOpen.value && (!mounted.value || y.value < 8),
)
const showLangs = computed(() => visibleLocales().length > 1)

const closeMenu = () => (menuOpen.value = false)

onKeyStroke('Escape', closeMenu)

watch(() => route.fullPath, closeMenu)
// пока меню открыто, страница под ним не прокручивается
watch(menuOpen, (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : ''
})

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
      <LangSwitcher v-if="showLangs" class="header__langs" />
      <!-- на телефоне и планшете звонок — в нижней панели, здесь бургер -->
      <a class="btn btn--small header__call" :href="phoneLink(SITE.phone)">
        <BaseIcon name="phone" />
        {{ t((m) => m.contactInfo.call) }}
      </a>
      <button
        type="button"
        class="burger"
        :class="{ 'is-open': menuOpen }"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        :aria-label="menuOpen ? t((m) => m.menu.close) : t((m) => m.menu.open)"
        @click="menuOpen = !menuOpen"
      >
        <span class="burger__line" />
        <span class="burger__line" />
        <span class="burger__line" />
      </button>
    </div>
  </header>

  <MobileMenu :open="menuOpen" @close="closeMenu" />
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

  &__call {
    gap: var(--space-2);
  }

  &__call,
  &__langs {
    @include below(lg) {
      display: none;
    }
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
.burger {
  position: relative;
  display: none;
  width: 44px;
  height: 44px;
  margin-inline-end: calc(-1 * var(--space-2));
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  cursor: pointer;

  @include below(lg) {
    display: block;
  }

  &__line {
    position: absolute;
    left: 11px;
    width: 22px;
    height: 2px;
    border-radius: 2px;
    background: currentColor;

    @include motion {
      transition:
        transform 0.2s ease,
        opacity 0.2s ease;
    }

    &:nth-child(1) {
      top: 15px;
    }

    &:nth-child(2) {
      top: 21px;
    }

    &:nth-child(3) {
      top: 27px;
    }
  }

  // три полоски → крестик
  &.is-open &__line {
    &:nth-child(1) {
      transform: translateY(6px) rotate(45deg);
    }

    &:nth-child(2) {
      opacity: 0;
    }

    &:nth-child(3) {
      transform: translateY(-6px) rotate(-45deg);
    }
  }
}
</style>
