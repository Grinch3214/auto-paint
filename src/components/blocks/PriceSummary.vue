<script setup lang="ts">
import BaseIcon from '@/components/BaseIcon.vue'
import { pagePath } from '@/config/pages'
import { HOME_PRICE_ITEMS } from '@/data/prices'
import { useContent, useI18n } from '@/i18n'
import PriceList from './PriceList.vue'

const { locale } = useI18n()
const content = useContent()
</script>

<template>
  <div id="prices" class="summary">
    <div class="summary__head">
      <h3>{{ content.prices.title }}</h3>
      <p>{{ content.prices.intro }}</p>
      <RouterLink class="btn btn--ghost summary__all" :to="pagePath('prices', locale)">
        {{ content.prices.allPrices }}
        <BaseIcon name="arrow" />
      </RouterLink>
    </div>
    <PriceList :items="HOME_PRICE_ITEMS" />
  </div>
</template>

<style scoped lang="scss">
.summary {
  display: grid;
  gap: var(--space-6);
  margin-top: var(--space-8);

  @include above(lg) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
    gap: var(--space-12);
    align-items: start;
  }

  &__head p {
    color: var(--color-text-muted);
  }

  &__all {
    gap: var(--space-2);
    margin-top: var(--space-2);
  }
}
</style>
