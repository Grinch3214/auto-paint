<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { PAINT_CODE_BRANDS, PAINT_CODE_ZONES } from '@/data/paintCodes'
import { useContent } from '@/i18n'
import type { PaintCodeBrandId } from '@/types/paintCodes'

const content = useContent()

const selected = ref<PaintCodeBrandId>('toyota')

const codes = computed(() => content.value.colorMatch.codes)
const zones = computed(() => PAINT_CODE_BRANDS.find((b) => b.id === selected.value)?.zones ?? [])
const text = computed(() => codes.value.brands[selected.value])
</script>

<template>
  <section id="paint-code" class="section">
    <span class="tape">{{ codes.tape }}</span>
    <h2>{{ codes.title }}</h2>
    <p class="lead">{{ codes.lead }}</p>

    <div class="brands" role="group" :aria-label="codes.brandsLabel">
      <button
        v-for="b in PAINT_CODE_BRANDS"
        :key="b.id"
        type="button"
        class="brands__chip"
        :aria-pressed="b.id === selected"
        @click="selected = b.id"
      >
        {{ codes.brands[b.id].name }}
      </button>
    </div>

    <!-- aria-live: читалка экрана озвучит новую марку после клика -->
    <div class="code-card" aria-live="polite">
      <div class="code-card__head">
        <h3 class="code-card__brand">{{ text.name }}</h3>
        <p class="code-card__where">{{ text.where }}</p>
      </div>

      <div class="code-card__grid">
        <div>
          <p class="code-card__label">{{ codes.zonesLabel }}</p>
          <ul class="zones">
            <li
              v-for="z in PAINT_CODE_ZONES"
              :key="z"
              class="zones__item"
              :class="{ 'is-active': zones.includes(z) }"
            >
              <BaseIcon v-if="zones.includes(z)" name="check" class="zones__icon" />
              <span v-else class="zones__dot" aria-hidden="true" />
              {{ codes.zones[z] }}
            </li>
          </ul>
        </div>

        <dl class="code-card__facts">
          <div>
            <dt>{{ codes.labelTitle }}</dt>
            <dd>{{ text.label }}</dd>
          </div>
          <div>
            <dt>{{ codes.exampleTitle }}</dt>
            <dd class="code-card__example">{{ text.example }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <p class="fallback">{{ codes.fallback }}</p>
  </section>
</template>

<style scoped lang="scss">
.brands {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-6);

  &__chip {
    min-height: 44px;
    padding: 0 var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: 999px;
    background: var(--color-surface);
    color: var(--color-text);
    font: inherit;
    font-weight: 600;
    cursor: pointer;

    &[aria-pressed='true'] {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: var(--on-accent);
    }
  }
}

.code-card {
  margin-top: var(--space-6);
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);

  &__head {
    padding: var(--space-6);
    background: var(--hero-0);
    color: var(--hero-text);
    border-bottom: 3px solid var(--color-accent);
  }

  &__brand {
    margin-bottom: var(--space-2);
    font-family: var(--font-display);
    font-size: 1.25rem;
    text-transform: uppercase;
  }

  &__where {
    margin: 0;
    color: var(--hero-muted);
  }

  &__grid {
    display: grid;
    gap: var(--space-6);
    padding: var(--space-6);

    @include above(md) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__label,
  &__facts dt {
    margin: 0 0 var(--space-2);
    color: var(--color-text-muted);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  &__facts {
    display: grid;
    gap: var(--space-4);
    margin: 0;

    dd {
      margin: 0;
      font-weight: 600;
    }
  }

  &__example {
    font-family: var(--font-display);
    font-size: 1.25rem;
    color: var(--accent-ink);
  }
}

.zones {
  display: grid;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;

  &__item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    border: 1px dashed var(--color-border);
    border-radius: var(--radius);
    color: var(--color-text-muted);

    &.is-active {
      border-style: solid;
      border-color: var(--color-accent);
      color: var(--color-text);
      font-weight: 700;
    }
  }

  &__icon {
    flex: none;
    width: 20px;
    height: 20px;
    padding: 3px;
    border-radius: 50%;
    background: var(--color-accent);
    color: var(--on-accent);
  }

  &__dot {
    flex: none;
    width: 20px;
    height: 20px;
    border: 2px solid var(--color-border);
    border-radius: 50%;
  }
}

.fallback {
  max-width: 720px;
  margin-top: var(--space-4);
  padding: var(--space-4);
  background: var(--color-surface);
  border-left: 4px solid var(--color-tape);
}
</style>
