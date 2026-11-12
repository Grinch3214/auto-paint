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

  // шапка этикетки в цвет машины из hero
  &__head {
    display: flex;
    justify-content: space-between;
    padding: var(--space-4) var(--space-6);
    background: var(--car);
    color: var(--on-accent);
    font-family: var(--font-display);
    font-weight: 700;
    transition: background 0.5s;
  }
}

.passport {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-2) var(--space-6);
  margin: var(--space-4) 0 0;
  padding: var(--space-6);
  font-family: var(--font-mono);
  font-size: 0.95rem;

  dt,
  dd {
    padding-bottom: var(--space-3);
    border-bottom: 1px solid var(--color-border);
  }

  dt {
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  dd {
    margin: 0;
  }

  @include below(sm) {
    grid-template-columns: 1fr;
    gap: 0;

    dt {
      border: none;
      padding-bottom: 0;
    }

    dd {
      margin-bottom: var(--space-3);
    }
  }
}
</style>
