<script setup lang="ts">
import { computed } from 'vue'
import { pagePath } from '@/config/pages'
import { SERVICES } from '@/data/services'
import { useContent, useI18n } from '@/i18n'
import type { ServiceId } from '@/types/services'

const props = defineProps<{ ids: readonly ServiceId[] }>()

const { locale } = useI18n()
const content = useContent()

const services = computed(() =>
  props.ids.map((id) => ({
    id,
    page: SERVICES.find((s) => s.id === id)?.page,
    ...content.value.services.items[id],
  })),
)
</script>

<template>
  <section class="section">
    <span class="tape">{{ content.servicePages.related.tape }}</span>
    <h2>{{ content.servicePages.related.title }}</h2>
    <ul class="related">
      <li v-for="s in services" :key="s.id" class="related__item">
        <h3 class="related__title">{{ s.title }}</h3>
        <p class="related__text">{{ s.text }}</p>
        <RouterLink v-if="s.page" class="related__link" :to="pagePath(s.page, locale)">
          {{ content.services.more }}
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.related {
  display: grid;
  gap: var(--space-4);
  margin: var(--space-6) 0 0;
  padding: 0;
  list-style: none;

  @include above(md) {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }

  &__item {
    display: flex;
    flex-direction: column;
    padding: var(--space-6);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-top: 4px solid var(--color-accent);
    border-radius: var(--radius);
  }

  &__title {
    margin-bottom: var(--space-3);
    font-family: var(--font-display);
    font-size: 1.1rem;
    text-transform: uppercase;
  }

  &__text {
    margin: 0;
    color: var(--color-text-muted);
  }

  &__link {
    margin-top: auto;
    padding-top: var(--space-3);
    color: var(--accent-ink);
    font-weight: 700;
    text-decoration: none;
  }
}
</style>
