<script setup lang="ts">
import { computed } from 'vue'
import PriceRows from '@/components/blocks/PriceRows.vue'
import { PARTS } from '@/data/parts'
import { useContent } from '@/i18n'
import type { PartId } from '@/types/parts'

const props = defineProps<{ ids: readonly PartId[] }>()

const content = useContent()

const parts = computed(() =>
  props.ids.flatMap((id) => {
    const part = PARTS.find((p) => p.id === id)
    return part ? [{ ...part, ...content.value.parts.items[id] }] : []
  }),
)
</script>

<template>
  <section id="parts" class="section">
    <span class="tape">{{ content.parts.tape }}</span>
    <h2>{{ content.parts.title }}</h2>
    <p class="lead">{{ content.parts.lead }}</p>

    <!-- якоря: Google может показать ссылку прямо на деталь -->
    <nav class="parts-nav" :aria-label="content.parts.navLabel">
      <a v-for="p in parts" :key="p.id" class="parts-nav__chip" :href="`#${p.id}`">{{ p.title }}</a>
    </nav>

    <div class="parts">
      <article v-for="p in parts" :id="p.id" :key="p.id" class="part">
        <div class="part__body">
          <h3 class="part__title">{{ p.title }}</h3>
          <p class="part__text">{{ p.text }}</p>
        </div>
        <PriceRows class="part__prices" :items="p.prices" />
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.parts-nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-6);

  &__chip {
    padding: var(--space-2) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: 999px;
    background: var(--color-surface);
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      border-color: var(--color-accent);
      color: var(--accent-ink);
    }
  }
}

.parts {
  display: grid;
  gap: var(--space-4);
  margin-top: var(--space-6);
}

.part {
  display: grid;
  gap: var(--space-4);
  padding: var(--space-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-accent);
  border-radius: var(--radius);
  // под липкой шапкой якорь не прячет заголовок
  scroll-margin-top: calc(var(--header-h) + var(--space-4));

  @include above(lg) {
    grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
    gap: var(--space-8);
    align-items: start;
  }

  &__title {
    margin-bottom: var(--space-2);
    font-family: var(--font-display);
    font-size: 1.25rem;
    text-transform: uppercase;
  }

  &__text {
    margin: 0;
    color: var(--color-text-muted);
  }
}
</style>
