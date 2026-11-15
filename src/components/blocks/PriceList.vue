<script setup lang="ts">
import { computed } from 'vue'
import { PRICE_GROUPS } from '@/data/prices'
import { useContent, useI18n } from '@/i18n'
import { minPrice } from '@/utils/format'
import type { PriceItemId } from '@/types/prices'

const props = defineProps<{ items: readonly PriceItemId[] }>()

const { t } = useI18n()
const content = useContent()

// строки берём из общей таблицы цен — цифры не расходятся с главной и FAQ
const rows = computed(() => {
  const all = PRICE_GROUPS.flatMap((g) => g.items)
  return props.items.flatMap((id) => {
    const item = all.find((i) => i.id === id)
    if (!item) return []
    const value = item.ask ? undefined : minPrice(item)
    return [
      {
        id,
        name: content.value.prices.items[id],
        price:
          value === undefined
            ? content.value.prices.ask
            : t((m) => m.common.priceFromGel).replace('{value}', String(value)),
        ask: value === undefined,
      },
    ]
  })
})
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
