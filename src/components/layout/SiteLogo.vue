<script setup lang="ts">
import BaseIcon from '@/components/BaseIcon.vue'
import { useNavLinks } from '@/composables/useNavLinks'
import { SITE } from '@/config/site'
import { useI18n } from '@/i18n'

defineProps<{ tagline?: boolean; compact?: boolean }>()

const { t } = useI18n()
const { home } = useNavLinks()
</script>

<template>
  <RouterLink
    :to="home"
    class="logo"
    :class="{ 'logo--compact': compact }"
    :aria-label="SITE.brand"
  >
    <span class="logo__mark"><BaseIcon name="drop" /></span>
    <span class="logo__text">
      <span class="logo__name">{{ SITE.brand }}</span>
      <span v-if="tagline" class="logo__tagline">{{ t((m) => m.footer.tagline) }}</span>
    </span>
  </RouterLink>
</template>

<style scoped lang="scss">
.logo {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;

  // на узком экране в шапке остаётся только значок, иначе не влезает кнопка
  &--compact &__text {
    @include below(sm) {
      display: none;
    }
  }

  &__mark {
    flex: none;
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--color-accent);
    color: var(--on-accent);
  }

  &__text {
    display: flex;
    flex-direction: column;
  }

  &__name {
    font-family: var(--font-display);
    font-weight: 800;
    letter-spacing: 0.04em;
  }

  &__tagline {
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    opacity: 0.6;
  }
}
</style>
