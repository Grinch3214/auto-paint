<script setup lang="ts">
import { SITE } from '@/config/site'
import { useContent } from '@/i18n'

const content = useContent()
</script>

<template>
  <section class="section">
    <span class="tape">{{ content.passport.tape }}</span>
    <h2>{{ content.passport.title }}</h2>
    <div class="label-card">
      <div class="label-card__head">
        <span>{{ SITE.brand }}</span>
        <span class="mono">{{ content.passport.label }}</span>
      </div>
      <dl class="passport">
        <template v-for="row in content.passport.rows" :key="row.term">
          <dt>{{ row.term }}</dt>
          <dd>{{ row.value }}</dd>
        </template>
      </dl>
    </div>
  </section>
</template>

<style scoped lang="scss">
.label-card {
  max-width: 640px;
  background: var(--color-surface);
  border: 2px solid var(--color-text);
  border-radius: var(--radius);
  overflow: hidden;

  &__head {
    display: flex;
    justify-content: space-between;
    gap: var(--space-4);
    padding: var(--space-4) var(--space-6);
    background: var(--hero-0);
    color: var(--hero-text);
    border-bottom: 3px solid var(--color-accent);
    font-family: var(--font-display);
    font-weight: 700;

    .mono {
      color: var(--hero-muted);
    }
  }
}

.passport {
  display: grid;
  grid-template-columns: auto 1fr;
  margin: 0;
  padding: var(--space-2) var(--space-6) var(--space-4);
  font-family: var(--font-mono);
  font-size: 0.95rem;

  dt,
  dd {
    padding-block: var(--space-3);
    border-bottom: 1px solid var(--color-border);
  }

  dt:last-of-type,
  dd:last-of-type {
    border-bottom: 0;
  }

  // без gap: линия строки идёт сплошной через обе колонки
  dt {
    padding-right: var(--space-6);
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  dd {
    margin: 0;
  }

  @include below(sm) {
    grid-template-columns: 1fr;
    dt {
      border: none;
      padding-bottom: 0;
    }

    dd {
      padding-top: var(--space-1);
    }
  }
}
</style>
