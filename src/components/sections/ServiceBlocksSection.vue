<script setup lang="ts">
import { computed } from 'vue'
import PriceRows from '@/components/blocks/PriceRows.vue'
import { SERVICE_BLOCKS } from '@/data/blocks'
import { useContent } from '@/i18n'
import type { BlockId } from '@/types/blocks'
import type { SectionHeading } from '@/types/content'

// Разделы страницы услуги: «заголовок + текст + цены» (детали, виды полировки, кузовные работы…)
const props = defineProps<{ ids: readonly BlockId[]; heading: SectionHeading }>()

const content = useContent()

const blocks = computed(() =>
  props.ids.flatMap((id) => {
    const block = SERVICE_BLOCKS.find((b) => b.id === id)
    return block ? [{ ...block, ...content.value.blocks.items[id] }] : []
  }),
)
</script>

<template>
  <section id="blocks" class="section">
    <span class="tape">{{ heading.tape }}</span>
    <h2>{{ heading.title }}</h2>
    <p class="lead">{{ heading.lead }}</p>

    <!-- якоря: Google может показать ссылку прямо на раздел -->
    <nav class="blocks-nav" :aria-label="content.blocks.navLabel">
      <a v-for="b in blocks" :key="b.id" class="blocks-nav__chip" :href="`#${b.id}`">
        {{ b.title }}
      </a>
    </nav>

    <div class="blocks">
      <article
        v-for="b in blocks"
        :id="b.id"
        :key="b.id"
        class="block"
        :class="{ 'block--text': !b.prices?.length }"
      >
        <div class="block__body">
          <h3 class="block__title">{{ b.title }}</h3>
          <p class="block__text">{{ b.text }}</p>
        </div>
        <PriceRows v-if="b.prices?.length" class="block__prices" :items="b.prices" />
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.blocks-nav {
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

.blocks {
  display: grid;
  gap: var(--space-4);
  margin-top: var(--space-6);
}

.block {
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
    text-transform: var(--caps);
  }

  &__text {
    margin: 0;
    color: var(--color-text-muted);
  }

  // раздел без цен — текст на всю ширину
  &--text {
    @include above(lg) {
      grid-template-columns: minmax(0, 1fr);
    }

    .block__text {
      max-width: 75ch;
    }
  }
}
</style>
