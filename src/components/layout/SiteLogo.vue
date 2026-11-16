<script setup lang="ts">
import { useNavLinks } from '@/composables/useNavLinks'
import { SITE } from '@/config/site'
import { LOGO } from '@/constants/images'
import { useI18n } from '@/i18n'
import { imageSources } from '@/utils/image'

defineProps<{ tagline?: boolean; compact?: boolean }>()

const { t } = useI18n()
const { home } = useNavLinks()

const logo = imageSources(LOGO.folder, LOGO.name, LOGO.widths)
</script>

<template>
  <RouterLink :to="home" class="logo" :class="{ 'logo--compact': compact }">
    <img
      class="logo__img"
      :src="logo.src"
      :srcset="logo.srcset"
      :sizes="compact ? '160px' : '220px'"
      :alt="SITE.brand"
      :width="LOGO.width"
      :height="LOGO.height"
      :loading="compact ? undefined : 'lazy'"
    />
    <span v-if="tagline" class="logo__tagline">{{ t((m) => m.footer.tagline) }}</span>
  </RouterLink>
</template>

<style scoped lang="scss">
.logo {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-1);
  text-decoration: none;

  &__img {
    display: block;
    width: auto;
    height: 56px;
  }

  &--compact &__img {
    height: 40px;

    @include below(sm) {
      height: 32px;
    }
  }

  &__tagline {
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    opacity: 0.6;
  }
}
</style>
