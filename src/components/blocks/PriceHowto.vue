<script setup lang="ts">
import { computed } from 'vue'
import { pagePath } from '@/config/pages'
import { useContent, useI18n } from '@/i18n'
import { padNumber } from '@/utils/format'

const { locale } = useI18n()
const content = useContent()

const home = computed(() => pagePath('home', locale.value))
</script>

<template>
  <div class="howto">
    <h3 class="howto__title">{{ content.howto.title }}</h3>
    <div class="howto__options">
      <article class="howto__opt">
        <span class="tape">{{ content.howto.photo.tape }}</span>
        <h4>{{ content.howto.photo.title }}</h4>
        <ol class="howto__steps">
          <li v-for="(s, i) in content.howto.photo.steps" :key="s">
            <span class="howto__num mono">{{ padNumber(i + 1) }}</span>
            {{ s }}
          </li>
        </ol>
        <RouterLink class="btn btn--ghost howto__cta" :to="{ path: home, hash: '#estimate' }">
          {{ content.howto.photo.cta }}
        </RouterLink>
      </article>
      <article class="howto__opt howto__opt--best">
        <span class="tape">{{ content.howto.onSite.tape }}</span>
        <h4>{{ content.howto.onSite.title }}</h4>
        <p>{{ content.howto.onSite.text }}</p>
        <RouterLink class="btn howto__cta" :to="pagePath('contacts', locale)">
          {{ content.howto.onSite.cta }}
        </RouterLink>
      </article>
    </div>

    <div class="howto__flow">
      <p class="howto__flow-title">{{ content.howto.flowTitle }}</p>
      <ol>
        <li v-for="(s, i) in content.howto.flow" :key="s">
          <span class="howto__num mono">{{ padNumber(i + 1) }}</span>
          {{ s }}
        </li>
      </ol>
      <p class="howto__flow-note">{{ content.howto.flowNote }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.howto {
  margin-top: var(--space-8);

  @include above(md) {
    padding: var(--space-6);
    border: 1px dashed var(--color-border);
    border-radius: var(--radius);
  }

  &__title {
    font-family: var(--font-display);
    text-transform: uppercase;
    font-size: 1.3rem;
    margin-bottom: var(--space-4);
  }

  &__options {
    display: grid;
    gap: var(--space-4);

    @include above(md) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__opt {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-4);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);

    .tape {
      margin: 0;
      font-size: 0.85rem;
    }

    h4 {
      margin: 0;
      font-family: var(--font-display);
      font-size: 1.15rem;
      text-transform: uppercase;
    }

    p {
      margin: 0;
      color: var(--color-text-muted);
    }

    @include above(md) {
      padding: var(--space-6);
    }

    &--best {
      border-color: var(--color-accent);
      box-shadow: 0 0 0 1px var(--color-accent);
    }
  }

  &__steps {
    display: grid;
    gap: var(--space-2);
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      gap: var(--space-3);
      align-items: baseline;
    }
  }

  &__num {
    flex: none;
    color: var(--accent-ink);
    font-size: 0.85rem;
  }

  &__cta {
    margin-top: auto;
  }

  &__flow {
    margin-top: var(--space-6);

    ol {
      display: grid;
      gap: var(--space-2);
      list-style: none;
      padding: 0;
      margin: var(--space-3) 0;

      @include above(md) {
        grid-template-columns: repeat(4, 1fr);
      }

      li {
        position: relative;
        display: flex;
        gap: var(--space-2);
        align-items: baseline;
        padding: var(--space-3) var(--space-4);
        font-weight: 600;
        background: var(--color-surface);
        border-radius: var(--radius);
      }

      li:last-child {
        background: var(--color-tape);
        color: var(--on-tape);

        .howto__num {
          color: inherit;
        }
      }
    }
  }

  &__flow-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: 1rem;
    text-transform: uppercase;
  }

  &__flow-note {
    margin: 0;
    color: var(--color-text-muted);
  }
}
</style>
