<script setup lang="ts">
import { computed } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'
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
      <li v-for="s in services" :key="s.id" class="service" :class="{ 'has-link': s.page }">
        <h3 class="service__title">
          <!-- ссылка растянута на всю карточку через ::after: нажимается вся карточка -->
          <RouterLink v-if="s.page" class="service__link" :to="pagePath(s.page, locale)">
            {{ s.title }}
          </RouterLink>
          <template v-else>{{ s.title }}</template>
        </h3>
        <p class="service__text">{{ s.text }}</p>
        <p class="service__fits mono">
          <span class="service__fits-label">{{ content.services.fitsLabel }}</span>
          {{ s.fits }}
        </p>
        <span v-if="s.page" class="service__more" aria-hidden="true">
          {{ content.services.more }}
        </span>
        <BaseIcon v-if="s.page" name="arrow" class="service__arrow" />
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

  @include above(lg) {
    grid-template-columns: repeat(3, 1fr);
  }

  // телефон: компактный список-навигация, описание — на странице услуги
  @include below(md) {
    gap: var(--space-2);
  }
}

.service {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: var(--space-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-top: 4px solid var(--color-accent);
  border-radius: var(--radius);

  @include motion {
    transition:
      transform 0.25s,
      border-color 0.25s;
  }

  &.has-link:hover {
    border-color: var(--color-accent);

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

  &__link {
    text-decoration: none;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
    }
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

  &__more {
    margin-top: auto;
    padding-top: var(--space-2);
    font-weight: 700;
    color: var(--accent-ink);
  }

  &__arrow {
    display: none;
  }

  @include below(md) {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    column-gap: var(--space-3);
    padding: var(--space-4);
    border-top: 1px solid var(--color-border);
    border-left: 4px solid var(--color-accent);

    &__title {
      margin: 0;
      font-size: 0.95rem;
    }

    &__text,
    &__fits-label,
    &__more {
      display: none;
    }

    &__fits {
      grid-column: 1;
      margin: var(--space-1) 0 0;
      color: var(--color-text-muted);
    }

    &__arrow {
      display: block;
      grid-column: 2;
      grid-row: 1 / span 2;
      color: var(--accent-ink);
    }
  }
}
</style>
