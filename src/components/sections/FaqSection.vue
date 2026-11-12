<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { useAccordion } from '@/composables/useAccordion'
import { SITE } from '@/config/site'
import { PRICE_GROUPS } from '@/data/prices'
import { useContent, useI18n } from '@/i18n'
import { fillPrices } from '@/utils/format'
import { phoneLink, whatsappLink } from '@/utils/messengers'
import { faqSchema } from '@/utils/schema'
import type { FaqId } from '@/types/faq'

const props = defineProps<{ ids: readonly FaqId[] }>()

const { t } = useI18n()
const content = useContent()

// цены в ответах берём из таблицы, чтобы FAQ не расходился с прайсом
const items = computed(() =>
  props.ids.map((id) => {
    const entry = content.value.faq.items[id]
    return { id, question: entry.question, answer: fillPrices(entry.answer, PRICE_GROUPS) }
  }),
)

const { isOpen, toggle } = useAccordion(0)

useHead({
  script: computed(() => [
    { type: 'application/ld+json', innerHTML: JSON.stringify(faqSchema(items.value)) },
  ]),
})
</script>

<template>
  <section id="faq" class="section faq-layout">
    <div class="faq-aside">
      <span class="tape">{{ content.faq.tape }}</span>
      <h2>{{ content.faq.title }}</h2>
      <p class="lead">{{ content.faq.lead }}</p>
      <!-- на телефоне и планшете эти кнопки уже есть в нижней панели -->
      <div class="faq-aside__cta">
        <a class="btn" :href="phoneLink(SITE.phone)">
          <BaseIcon name="phone" />
          {{ t((m) => m.contactInfo.call) }}
        </a>
        <a class="btn btn--ghost" :href="whatsappLink(SITE.phone)" target="_blank" rel="noopener">
          <BaseIcon name="whatsapp" />
          {{ t((m) => m.nav.cta) }}
        </a>
      </div>
    </div>
    <div class="faq">
      <div
        v-for="(item, i) in items"
        :key="item.id"
        class="faq__item"
        :class="{ 'is-open': isOpen(i) }"
      >
        <h3 class="faq__h">
          <button
            type="button"
            class="faq__q"
            :aria-expanded="isOpen(i)"
            :aria-controls="`faq-${item.id}`"
            @click="toggle(i)"
          >
            <span>{{ item.question }}</span>
            <span class="faq__chev" aria-hidden="true" />
          </button>
        </h3>
        <!-- ответ всегда в HTML, только свёрнут: поисковик видит весь текст -->
        <div :id="`faq-${item.id}`" class="faq__body">
          <div class="faq__inner">
            <p class="faq__a">{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.faq-layout {
  @include above(lg) {
    display: grid;
    grid-template-columns: minmax(280px, 1fr) 2fr;
    gap: var(--space-12);
    align-items: start;
  }
}

.faq-aside {
  @include above(lg) {
    position: sticky;
    top: calc(var(--header-h) + var(--space-6));
  }

  &__cta {
    display: none;

    @include above(lg) {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-3);
      margin-top: var(--space-6);
    }

    .btn {
      gap: var(--space-2);
    }
  }
}

.faq {
  display: grid;
  gap: var(--space-2);
  margin-top: var(--space-6);

  @include above(lg) {
    margin-top: 0;
  }

  &__item {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);

    &.is-open {
      border-color: var(--color-accent);
    }
  }

  &__h {
    margin: 0;
    font: inherit;
  }

  &__q {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    width: 100%;
    padding: var(--space-4);
    border: 0;
    background: none;
    color: var(--color-text);
    font: inherit;
    font-weight: 700;
    text-align: left;
    cursor: pointer;
  }

  &__chev {
    position: relative;
    flex: none;
    width: 16px;
    height: 16px;
    color: var(--color-accent);

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
    display: grid;
    grid-template-rows: 0fr;

    @include motion {
      transition: grid-template-rows 0.3s ease;
    }
  }

  &__item.is-open &__body {
    grid-template-rows: 1fr;
  }

  &__inner {
    overflow: hidden;
  }

  &__a {
    margin: 0;
    padding: 0 var(--space-4) var(--space-4);
    color: var(--color-text-muted);
    max-width: 68ch;
  }
}
</style>
