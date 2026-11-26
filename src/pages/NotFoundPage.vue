<script setup lang="ts">
import BaseIcon from '@/components/BaseIcon.vue'
import NotFoundArt from '@/components/blocks/NotFoundArt.vue'
import { pagePath } from '@/config/pages'
import { useI18n } from '@/i18n'
import { useSeo } from '@/seo/useSeo'

const { t, locale } = useI18n()

useSeo({
  title: () => t((m) => m.notFound.seoTitle),
  noindex: true,
})
</script>

<template>
  <section class="section not-found">
    <div class="not-found__text">
      <span class="tape">{{ t((m) => m.notFound.tape) }}</span>
      <h1 class="not-found__title">{{ t((m) => m.notFound.h1) }}</h1>
      <p class="lead">{{ t((m) => m.notFound.lead) }}</p>
      <div class="cta">
        <RouterLink class="btn" :to="pagePath('home', locale)">
          <BaseIcon name="chevronLeft" />
          {{ t((m) => m.notFound.back) }}
        </RouterLink>
        <RouterLink class="btn btn--ghost" :to="pagePath('prices', locale)">
          {{ t((m) => m.notFound.prices) }}
        </RouterLink>
      </div>
    </div>
    <NotFoundArt class="not-found__art" />
  </section>
</template>

<style scoped lang="scss">
.not-found {
  display: grid;
  gap: var(--space-8);
  align-items: center;
  min-height: 60vh;

  @include above(lg) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
    gap: var(--space-12);
  }

  &__title {
    margin: 0 0 var(--space-4);
    font-size: clamp(2rem, 5vw, 3.5rem);
  }

  &__art {
    max-width: 560px;
    justify-self: center;

    @include below(lg) {
      order: -1;
      max-width: 420px;
    }
  }

  .btn {
    gap: var(--space-2);
  }
}
</style>
