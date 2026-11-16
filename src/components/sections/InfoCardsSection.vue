<script setup lang="ts">
import { padNumber } from '@/utils/format'
import type { SectionHeading, TitledText } from '@/types/content'

defineProps<{
  heading: SectionHeading
  items: readonly TitledText[]
  numbered?: boolean
}>()
</script>

<template>
  <section class="section">
    <span class="tape">{{ heading.tape }}</span>
    <h2>{{ heading.title }}</h2>
    <p class="lead">{{ heading.lead }}</p>
    <component :is="numbered ? 'ol' : 'ul'" class="cards" :class="{ 'cards--numbered': numbered }">
      <li v-for="(item, i) in items" :key="item.title" class="cards__item">
        <span v-if="numbered" class="cards__num" aria-hidden="true">{{ padNumber(i + 1) }}</span>
        <h3 class="cards__title">{{ item.title }}</h3>
        <p class="cards__text">{{ item.text }}</p>
      </li>
    </component>
    <slot />
  </section>
</template>

<style scoped lang="scss">
.cards {
  display: grid;
  gap: var(--space-4);
  margin: var(--space-6) 0 0;
  padding: 0;
  list-style: none;

  @include above(md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include above(lg) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  &__item {
    padding: var(--space-6);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-top: 4px solid var(--color-accent);
    border-radius: var(--radius);
  }

  &--numbered &__item {
    border-top-color: var(--hero-0);
  }

  &__num {
    display: block;
    margin-bottom: var(--space-2);
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 700;
    line-height: 1;
    color: var(--color-accent);
  }

  &__title {
    margin-bottom: var(--space-2);
    font-family: var(--font-display);
    font-size: 1rem;
    text-transform: uppercase;
  }

  &__text {
    margin: 0;
    color: var(--color-text-muted);
    font-size: 0.95rem;
  }
}
</style>
