<script setup lang="ts">
import { computed } from 'vue'
import { pagePath } from '@/config/pages'
import { SERVICES } from '@/data/services'
import { useContent, useI18n } from '@/i18n'

const { locale } = useI18n()
const content = useContent()

const services = computed(() =>
  SERVICES.map((s) => ({ ...s, ...content.value.services.items[s.id] })),
)
</script>

<template>
  <section id="services" class="section">
    <span class="tape">{{ content.services.tape }}</span>
    <h2>{{ content.services.title }}</h2>
    <p class="lead">{{ content.services.lead }}</p>
    <ul class="services">
      <li v-for="s in services" :key="s.id" class="service">
        <h3 class="service__title">{{ s.title }}</h3>
        <p class="service__text">{{ s.text }}</p>
        <p class="service__fits mono">
          <span class="service__fits-label">{{ content.services.fitsLabel }}</span>
          {{ s.fits }}
        </p>
        <RouterLink v-if="s.page" class="service__link" :to="pagePath(s.page, locale)">
          {{ content.services.more }}
        </RouterLink>
      </li>
    </ul>
    <slot />
  </section>
</template>

<style scoped lang="scss">
.services {
  list-style: none;
  padding: 0;
  margin: var(--space-6) 0 0;
  display: grid;
  gap: var(--space-4);

  @include above(md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include above(xl) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.service {
  display: flex;
  flex-direction: column;
  padding: var(--space-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-top: 4px solid var(--color-accent);
  border-radius: var(--radius);
  transition: transform 0.25s;

  &:hover {
    @include motion {
      transform: translateY(-3px);
    }
  }

  &__title {
    font-family: var(--font-display);
    font-size: 1.1rem;
    text-transform: uppercase;
    margin-bottom: var(--space-3);
  }

  &__text {
    color: var(--color-text-muted);
  }

  &__fits {
    font-size: 0.8rem;
  }

  &__fits-label {
    color: var(--color-text-muted);
  }

  &__link {
    margin-top: auto;
    padding-top: var(--space-2);
    font-weight: 700;
    color: var(--accent-ink);
    text-decoration: none;
  }
}
</style>
