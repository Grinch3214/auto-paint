<script setup lang="ts">
import { computed } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { useNavLinks } from '@/composables/useNavLinks'
import { pagePath } from '@/config/pages'
import { SITE } from '@/config/site'
import { useI18n } from '@/i18n'
import { visibleLocales } from '@/i18n/locales'
import { phoneLink } from '@/utils/messengers'
import LangSwitcher from './LangSwitcher.vue'

defineProps<{ open: boolean }>()
const emit = defineEmits(['close'])

const { t, locale } = useI18n()
const { serviceLinks } = useNavLinks()

const showLangs = computed(() => visibleLocales().length > 1)
const otherLinks = computed(() => [
  { key: 'prices', to: pagePath('prices', locale.value), label: t((m) => m.nav.prices) },
  { key: 'contacts', to: pagePath('contacts', locale.value), label: t((m) => m.nav.contacts) },
])
</script>

<template>
  <Transition name="menu">
    <div v-if="open" id="mobile-menu" class="menu">
      <nav class="menu__nav">
        <p class="menu__label">{{ t((m) => m.menu.services) }}</p>
        <RouterLink
          v-for="l in serviceLinks"
          :key="l.key"
          :to="l.to"
          class="menu__link"
          @click="emit('close')"
        >
          {{ l.label }}
          <BaseIcon name="arrow" class="menu__arrow" />
        </RouterLink>

        <div class="menu__divider" />

        <RouterLink
          v-for="l in otherLinks"
          :key="l.key"
          :to="l.to"
          class="menu__link menu__link--main"
          @click="emit('close')"
        >
          {{ l.label }}
          <BaseIcon name="arrow" class="menu__arrow" />
        </RouterLink>
      </nav>

      <div class="menu__contacts">
        <a class="menu__phone" :href="phoneLink(SITE.phone)">
          <BaseIcon name="phone" />
          {{ SITE.phoneDisplay }}
        </a>
        <p class="menu__line">
          <BaseIcon name="clock" />
          {{ t((m) => m.contactInfo.hoursWork) }}, {{ t((m) => m.contactInfo.hoursOff) }}
        </p>
        <a class="menu__line" :href="SITE.mapsUrl" target="_blank" rel="noopener">
          <BaseIcon name="pin" />
          {{ t((m) => m.contactInfo.address) }}
        </a>
        <LangSwitcher v-if="showLangs" class="menu__langs" />
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.menu {
  position: fixed;
  inset: var(--header-h) 0 0;
  z-index: 19;
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: var(--space-6) var(--gutter) calc(var(--dock-h) + var(--space-8));
  background: var(--hero-0);
  color: var(--hero-text);

  @include above(lg) {
    display: none;
  }

  &__nav {
    display: flex;
    flex-direction: column;
  }

  &__label {
    margin: 0 0 var(--space-2);
    color: var(--hero-muted);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: var(--caps);
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    min-height: 48px;
    border-bottom: 1px solid var(--hero-line);
    font-size: 1.05rem;
    font-weight: 600;
    text-decoration: none;

    &.router-link-exact-active {
      color: var(--color-accent);
    }

    &--main {
      font-family: var(--font-display);
      text-transform: var(--caps);
    }
  }

  &__arrow {
    flex: none;
    color: var(--hero-muted);
  }

  &__divider {
    height: var(--space-4);
  }

  &__contacts {
    display: grid;
    gap: var(--space-3);
    padding-top: var(--space-6);
    border-top: 3px solid var(--color-accent);
  }

  &__phone,
  &__line {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    margin: 0;
    text-decoration: none;
  }

  &__phone {
    font-size: 1.25rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  &__line {
    color: var(--hero-muted);
    font-size: 0.9rem;
  }

  &__langs {
    justify-self: start;
    margin-top: var(--space-2);
  }
}

@include motion {
  .menu-enter-active,
  .menu-leave-active {
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
  }
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
