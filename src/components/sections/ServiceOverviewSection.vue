<script setup lang="ts">
import { computed } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'
import PriceList from '@/components/blocks/PriceList.vue'
import ServiceAside from '@/components/blocks/ServiceAside.vue'
import { pagePath } from '@/config/pages'
import { useContent, useI18n } from '@/i18n'
import type { ServicePageId } from '@/types/pages'
import type { PriceItemId } from '@/types/prices'

const props = defineProps<{
  id: ServicePageId
  prices?: readonly PriceItemId[]
  pricesInBlocks?: boolean
}>()

const { locale } = useI18n()
const content = useContent()

const text = computed(() => content.value.servicePages.items[props.id])
</script>

<template>
  <section class="section overview">
    <div class="overview__main">
      <div class="overview__block">
        <span class="tape">{{ content.servicePages.scope.tape }}</span>
        <h2>{{ content.servicePages.scope.includesTitle }}</h2>
        <ol class="includes">
          <li v-for="item in text.includes" :key="item">{{ item }}</li>
        </ol>
        <div class="cases">
          <h3 class="cases__title">{{ content.servicePages.scope.casesTitle }}</h3>
          <ul class="cases__list">
            <li v-for="item in text.cases" :key="item">
              <BaseIcon name="check" />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <div class="overview__block">
        <span class="tape">{{ content.servicePages.price.tape }}</span>
        <h2>{{ content.servicePages.price.title }}</h2>
        <template v-if="prices?.length">
          <PriceList :items="prices" />
          <p class="overview__note">{{ content.servicePages.price.note }}</p>
        </template>
        <div v-else-if="pricesInBlocks" class="ask">
          <p class="ask__title">{{ content.servicePages.price.inBlocksTitle }}</p>
          <p class="ask__text">{{ content.servicePages.price.inBlocksText }}</p>
          <RouterLink class="btn" :to="{ path: pagePath(id, locale), hash: '#blocks' }">
            {{ content.servicePages.price.inBlocksCta }}
          </RouterLink>
        </div>
        <div v-else class="ask">
          <p class="ask__title">{{ content.servicePages.price.askTitle }}</p>
          <p class="ask__text">{{ content.servicePages.price.askText }}</p>
          <RouterLink class="btn" :to="{ path: pagePath(id, locale), hash: '#estimate' }">
            {{ content.servicePages.price.askCta }}
          </RouterLink>
        </div>
      </div>
    </div>

    <ServiceAside class="overview__aside" />
  </section>
</template>

<style scoped lang="scss">
.overview {
  display: grid;
  gap: var(--space-12);

  @include above(lg) {
    grid-template-columns: minmax(0, 1fr) 360px;
    align-items: start;
  }

  &__main {
    display: grid;
    gap: var(--space-12);
  }

  // карточка прилипает, пока читают «что входит» и цены
  &__aside {
    @include above(lg) {
      position: sticky;
      top: calc(var(--header-h) + var(--space-6));
    }
  }

  &__note {
    margin: var(--space-3) 0 0;
    color: var(--color-text-muted);
    font-size: 0.85rem;
  }
}

.includes {
  display: grid;
  gap: var(--space-2);
  margin: var(--space-6) 0 0;
  padding: 0;
  list-style: none;
  counter-reset: includes;

  @include above(md) {
    grid-template-columns: repeat(2, 1fr);
  }

  li {
    display: flex;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    counter-increment: includes;

    &::before {
      content: counter(includes, decimal-leading-zero);
      color: var(--color-accent);
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }
  }
}

.cases {
  margin-top: var(--space-6);

  &__title {
    margin: 0 0 var(--space-3);
    font-size: 0.8rem;
    letter-spacing: 0.14em;
    text-transform: var(--caps);
    color: var(--color-text-muted);
  }

  // обычный список, не «таблетки»: пункты не нажимаются и не должны выглядеть кнопками
  &__list {
    display: grid;
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;

    @include above(md) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      column-gap: var(--space-6);
    }

    li {
      display: flex;
      align-items: flex-start;
      gap: var(--space-2);
    }

    :deep(svg) {
      flex: none;
      margin-top: 0.2em;
      color: var(--color-accent);
    }
  }
}

.ask {
  margin-top: var(--space-6);
  padding: var(--space-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-accent);
  border-radius: var(--radius);

  &__title {
    margin: 0 0 var(--space-2);
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 700;
  }

  &__text {
    margin: 0 0 var(--space-4);
    color: var(--color-text-muted);
  }
}
</style>
