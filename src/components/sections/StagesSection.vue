<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAccordion } from '@/composables/useAccordion'
import { useRevealOnce } from '@/composables/useRevealOnce'
import { STAGES } from '@/data/stages'
import { useContent } from '@/i18n'
import { padNumber } from '@/utils/format'
import type { StageId } from '@/types/stages'

const props = defineProps<{ ids?: readonly StageId[] }>()

const content = useContent()

const list = ref<HTMLElement | null>(null)

const partial = computed(() => !!props.ids && props.ids.length < STAGES.length)
const stages = computed(() =>
  (props.ids ?? STAGES).map((id) => ({ id, ...content.value.stages.items[id] })),
)

const { ready, visible } = useRevealOnce(list)
const { isOpen, toggle } = useAccordion(0)
</script>

<template>
  <section id="layers" class="section">
    <span class="tape">{{ content.stages.tape }}</span>
    <h2>{{ content.stages.title }}</h2>
    <p class="lead">{{ partial ? content.stages.leadPartial : content.stages.lead }}</p>
    <ol ref="list" class="steps" :class="{ 'is-ready': ready, 'is-in': visible }">
      <li
        v-for="(s, i) in stages"
        :key="s.id"
        class="steps__item"
        :class="{ 'is-open': isOpen(i) }"
        :style="{ '--d': i }"
      >
        <h3 class="steps__h">
          <button
            type="button"
            class="steps__head"
            :aria-expanded="isOpen(i)"
            :aria-controls="`step-${s.id}`"
            @click="toggle(i)"
          >
            <span class="steps__num" aria-hidden="true">{{ padNumber(i + 1) }}</span>
            <span class="steps__title">{{ s.title }}</span>
            <span class="steps__chev" aria-hidden="true" />
          </button>
        </h3>
        <div :id="`step-${s.id}`" class="steps__body">
          <div class="steps__inner">
            <p class="steps__text">{{ s.text }}</p>
            <p class="steps__note">
              <span class="tape">{{ content.stages.noteLabel }}</span>
              {{ s.note }}
            </p>
          </div>
        </div>
      </li>
    </ol>
  </section>
</template>

<style scoped lang="scss">
.steps {
  list-style: none;
  padding: 0;
  margin: var(--space-6) 0 0;
  display: grid;
  gap: var(--space-4);

  @include above(lg) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include above(xl) {
    grid-template-columns: repeat(4, 1fr);
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-6);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
  }

  @include motion {
    &.is-ready &__item {
      opacity: 0;
      transform: translateY(16px);
      transition:
        opacity 0.5s ease calc(var(--d) * 70ms),
        transform 0.5s ease calc(var(--d) * 70ms);
    }

    &.is-in &__item {
      opacity: 1;
      transform: none;
    }
  }

  &__h {
    margin: 0;
  }

  &__head {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
    width: 100%;
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: default;

    @include above(lg) {
      pointer-events: none;
    }
  }

  &__num {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 2.6rem;
    line-height: 1;
    color: var(--color-accent);
  }

  &__title {
    font-family: var(--font-display);
    font-size: 1.05rem;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 1.2;
    margin-top: var(--space-2);
  }

  &__chev {
    display: none;
  }

  &__body {
    display: grid;
    grid-template-rows: 1fr;
    flex: 1;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    min-height: 0;
    overflow: hidden;
    padding-top: var(--space-2);
  }

  // до lg — аккордеон: карточки по 4–5 строк в две колонки занимают слишком много высоты
  @include below(lg) {
    gap: var(--space-2);

    &__item {
      padding: 0;
    }

    &__head {
      flex-direction: row;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-4);
      cursor: pointer;
    }

    &__num {
      font-size: 1.6rem;
    }

    &__title {
      margin: 0;
      flex: 1;
    }

    &__chev {
      position: relative;
      display: block;
      flex: none;
      width: 16px;
      height: 16px;

      &::before,
      &::after {
        content: '';
        position: absolute;
        inset: 7px 0 auto;
        height: 2px;
        background: currentColor;

        @include motion {
          transition: transform 0.25s ease;
        }
      }

      &::after {
        transform: rotate(90deg);
      }
    }

    &__item.is-open &__chev {
      &::before {
        transform: rotate(45deg);
      }

      &::after {
        transform: rotate(135deg);
      }
    }

    &__body {
      grid-template-rows: 0fr;

      @include motion {
        transition: grid-template-rows 0.3s ease;
      }
    }

    &__item.is-open &__body {
      grid-template-rows: 1fr;
    }

    &__inner {
      padding: 0 var(--space-4);
    }

    &__item.is-open &__inner {
      padding-bottom: var(--space-4);
    }
  }

  &__text {
    margin: 0;
    color: var(--color-text-muted);
    font-size: 0.95rem;
  }

  &__note {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
    margin: auto 0 0;
    padding-top: var(--space-3);
    font-weight: 600;
    font-size: 0.9rem;

    .tape {
      flex: none;
      margin: 0;
      font-size: 0.75rem;
      font-weight: 400;
    }
  }
}
</style>
