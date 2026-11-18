<script setup lang="ts">
import { useContent } from '@/i18n'

const content = useContent()
</script>

<template>
  <aside class="docs" aria-labelledby="docs-title">
    <svg class="docs__icon" viewBox="0 0 48 48" aria-hidden="true">
      <rect x="9" y="7" width="26" height="34" rx="3" />
      <path d="M17 7V4h10v3" />
      <path d="M15 17l2 2 4-4M15 26l2 2 4-4M15 35l2 2 4-4M25 17h5M25 26h5M25 35h5" />
      <path d="M40 16l3 3-11 11-4 1 1-4z" />
    </svg>
    <div>
      <h3 id="docs-title" class="docs__title">{{ content.insurance.title }}</h3>
      <p>
        {{ content.insurance.docsBefore }}
        <template v-for="(doc, i) in content.insurance.docs" :key="doc">
          <template v-if="i">{{ ' ' + content.insurance.docsJoiner + ' ' }}</template>
          <strong>{{ doc }}</strong>
        </template>
        {{ content.insurance.docsAfter }}
      </p>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.docs {
  display: flex;
  gap: var(--space-6);
  align-items: flex-start;
  margin-top: var(--space-6);
  padding: var(--space-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-accent);
  border-radius: var(--radius);

  @include below(sm) {
    flex-direction: column;
    gap: var(--space-3);
  }

  &__icon {
    flex: none;
    width: 56px;
    height: 56px;
    padding: 8px;
    background: var(--color-tape);
    border-radius: var(--radius);
    transform: rotate(-3deg);
    fill: none;
    stroke: var(--on-tape);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  &__title {
    font-family: var(--font-display);
    font-size: 1.1rem;
    text-transform: uppercase;
    margin-bottom: var(--space-2);
  }

  p {
    margin: 0 0 var(--space-2);
    color: var(--color-text-muted);

    &:last-child {
      margin-bottom: 0;
    }
  }

  strong {
    color: var(--color-text);
  }
}
</style>
