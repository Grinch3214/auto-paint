<script setup lang="ts">
import { computed } from 'vue'
import { PRICE_GROUPS } from '@/data/prices'
import { useContent, useI18n } from '@/i18n'
import { formatPrice } from '@/utils/format'
import type { PriceGroupId } from '@/types/prices'

const props = defineProps<{ groups?: PriceGroupId[] }>()

const { t } = useI18n()
const content = useContent()

const priceGroups = computed(() =>
  PRICE_GROUPS.filter((g) => !props.groups || props.groups.includes(g.id)).map((g) => ({
    id: g.id,
    title: content.value.prices.groups[g.id],
    items: g.items.map((item) => ({ ...item, name: content.value.prices.items[item.id] })),
  })),
)

const price = (value?: number) =>
  formatPrice(
    value,
    t((m) => m.common.priceFrom),
  )
</script>

<template>
  <div id="prices" class="prices">
    <div class="prices__head">
      <h3>{{ content.prices.title }}</h3>
      <p>{{ content.prices.intro }}</p>
    </div>
    <div class="prices__groups">
      <section v-for="g in priceGroups" :key="g.id" class="price-group">
        <h4 class="price-group__title">
          <span class="tape">{{ g.title }}</span>
        </h4>
        <table class="price-group__table">
          <thead>
            <tr>
              <th scope="col">
                <span class="visually-hidden">{{ content.prices.partHeader }}</span>
              </th>
              <th scope="col">
                {{ content.prices.fresh.title }}<small>{{ content.prices.fresh.hint }}</small>
              </th>
              <th scope="col">
                {{ content.prices.used.title }}<small>{{ content.prices.used.hint }}</small>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in g.items" :key="r.id">
              <th scope="row">{{ r.name }}</th>
              <td v-if="r.ask" colspan="2" class="is-ask">{{ content.prices.ask }}</td>
              <td v-else-if="r.single !== undefined" colspan="2">{{ price(r.single) }}</td>
              <template v-else>
                <td :class="{ 'is-empty': r.fresh === undefined }">{{ price(r.fresh) }}</td>
                <td :class="{ 'is-empty': r.used === undefined }">{{ price(r.used) }}</td>
              </template>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
    <p class="prices__extra">
      <span class="prices__info" aria-hidden="true">i</span>
      {{ content.prices.note }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.prices {
  margin-top: var(--space-8);

  &__head {
    margin-bottom: var(--space-4);

    h3 {
      font-family: var(--font-display);
      text-transform: uppercase;
      font-size: 1.3rem;
      margin-bottom: var(--space-2);
    }

    p {
      color: var(--color-text-muted);
      max-width: 70ch;
      margin: 0;
    }
  }

  // колонки вместо сетки: группы разной высоты стыкуются без дыр
  &__groups {
    column-gap: var(--space-4);

    @include above(lg) {
      columns: 2;
    }
  }

  &__extra {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    margin: 0;
    padding: var(--space-3) var(--space-4);
    font-size: 0.9rem;
    color: var(--color-text-muted);
    background: var(--color-surface);
    border-radius: var(--radius);
  }

  &__info {
    flex: none;
    display: grid;
    place-items: center;
    width: 20px;
    height: 20px;
    margin-top: 1px;
    border: 1.5px solid currentColor;
    border-radius: 50%;
    font: 700 0.72rem/1 var(--font-mono);
  }
}

.price-group {
  break-inside: avoid;
  margin-bottom: var(--space-4);
  padding: var(--space-4) var(--space-4) var(--space-2);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);

  &__title {
    margin: 0 0 var(--space-2);
    font-weight: 400;

    .tape {
      margin: 0;
    }
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;

    th,
    td {
      padding: var(--space-2) 0;
      text-align: left;
      border-bottom: 1px dashed var(--color-border);
    }

    thead th {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--color-text-muted);
      vertical-align: bottom;
      width: 26%;

      &:first-child {
        width: auto;
      }

      small {
        display: block;
        font-size: 0.68rem;
        font-weight: 400;
        text-transform: none;
      }
    }

    tbody th {
      font-weight: 500;
      padding-right: var(--space-3);
    }

    tbody tr:last-child > * {
      border-bottom: 0;
    }

    td {
      font-family: var(--font-mono);
      font-weight: 600;
      white-space: nowrap;

      &.is-empty {
        color: var(--color-text-muted);
        font-weight: 400;
        opacity: 0.5;
      }

      &.is-ask {
        color: var(--accent-ink);
        font-weight: 400;
      }
    }
  }
}
</style>
