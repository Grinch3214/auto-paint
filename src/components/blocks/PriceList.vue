<script setup lang="ts">
import { usePriceRows } from '@/composables/usePriceRows'
import { useContent } from '@/i18n'
import type { PriceItemId } from '@/types/prices'

const props = defineProps<{ items: readonly PriceItemId[] }>()

const content = useContent()
const rows = usePriceRows(() => props.items)
</script>

<template>
  <div class="price-list">
    <p class="price-list__head">
      <span>{{ content.servicePages.price.listTitle }}</span>
      <span class="price-list__currency" aria-hidden="true">₾</span>
    </p>
    <ul class="price-list__rows">
      <li v-for="r in rows" :key="r.id" class="price-list__row">
        <span class="price-list__name">{{ r.name }}</span>
        <span class="price-list__dots" aria-hidden="true" />
        <span class="price-list__value" :class="{ 'is-ask': r.ask }">{{ r.price }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
// оформлено как квитанция из мастерской: тёмная шапка, строки с точками до цены
.price-list {
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: var(--space-3) var(--space-6);
    background: var(--hero-0);
    color: var(--hero-text);
    border-bottom: 3px solid var(--color-accent);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  &__currency {
    font-size: 1.1rem;
    letter-spacing: 0;
    color: var(--color-accent);
  }

  &__rows {
    margin: 0;
    padding: var(--space-2) 0;
    list-style: none;
  }

  &__row {
    display: flex;
    align-items: baseline;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-6);
    border-left: 3px solid transparent;

    &:hover {
      background: var(--color-bg);
      border-left-color: var(--color-accent);
    }
  }

  &__name {
    font-weight: 600;
  }

  &__dots {
    flex: 1;
    min-width: var(--space-4);
    border-bottom: 2px dotted var(--color-border);
  }

  &__value {
    flex: none;
    font-family: var(--font-display);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: var(--accent-ink);
    white-space: nowrap;

    &.is-ask {
      font-family: var(--font-text);
      color: var(--color-text-muted);
    }
  }
}
</style>
