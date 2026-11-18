<script setup lang="ts">
import { computed } from 'vue'
import { SITE } from '@/config/site'
import { useContent, useI18n } from '@/i18n'
import { useSeo } from '@/seo/useSeo'
import { fillBrand, fillVars } from '@/utils/format'

const { t } = useI18n()
const content = useContent()

const text = computed(() => content.value.privacyPage)
const vars = computed(() => ({
  BRAND: SITE.brand,
  SITE: new URL(SITE.url).host,
  ADDRESS: t((m) => m.contactInfo.address),
  EMAIL: SITE.email,
  PHONE: SITE.phoneDisplay,
}))

useSeo({
  title: () => fillBrand(text.value.seoTitle, SITE.brand),
  description: () => fillBrand(text.value.seoDescription, SITE.brand),
})
</script>

<template>
  <article class="section privacy">
    <h1 class="privacy__h1">{{ text.h1 }}</h1>
    <p class="lead">{{ fillVars(text.lead, vars) }}</p>
    <p class="privacy__updated">{{ text.updated }}</p>

    <section v-for="s in text.sections" :key="s.title" class="privacy__part">
      <h2 class="privacy__title">{{ s.title }}</h2>
      <p v-for="p in s.paragraphs" :key="p">{{ fillVars(p, vars) }}</p>
      <ul v-if="s.items" class="privacy__list">
        <li v-for="item in s.items" :key="item">{{ item }}</li>
      </ul>
      <p v-for="p in s.after" :key="p">{{ fillVars(p, vars) }}</p>
    </section>
  </article>
</template>

<style scoped lang="scss">
.privacy {
  max-width: 760px;

  // «КОНФИДЕНЦИАЛЬНОСТИ» капсом не влезает в строку телефона
  &__h1 {
    hyphens: auto;
    overflow-wrap: break-word;

    @include below(sm) {
      font-size: 1.75rem;
    }
  }

  &__updated {
    color: var(--color-text-muted);
    font-size: 0.85rem;
  }

  &__part {
    margin-top: var(--space-8);
  }

  // h2 здесь — подзаголовки текста, а не разделов страницы
  &__title {
    font-size: 1.25rem;
    text-transform: none;
  }

  &__list {
    margin: 0 0 var(--space-4);
    padding-left: var(--space-6);

    li + li {
      margin-top: var(--space-2);
    }
  }
}
</style>
