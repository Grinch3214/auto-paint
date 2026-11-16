<script setup lang="ts">
import { usePriceRows } from '@/composables/usePriceRows'
import type { PriceItemId } from '@/types/prices'

const props = defineProps<{ items: readonly PriceItemId[] }>()

const rows = usePriceRows(() => props.items)
</script>

<template>
  <ul class="rows">
    <li v-for="r in rows" :key="r.id" class="rows__row">
      <span>{{ r.name }}</span>
      <span class="rows__dots" aria-hidden="true" />
      <span class="rows__value" :class="{ 'is-ask': r.ask }">{{ r.price }}</span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.rows {
  display: grid;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;

  &__row {
    display: flex;
    align-items: baseline;
    gap: var(--space-2);
    font-size: 0.95rem;
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
