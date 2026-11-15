<script setup lang="ts">
import { computed } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { pagePath } from '@/config/pages'
import { SITE } from '@/config/site'
import { WORKS } from '@/data/works'
import { useContent, useI18n } from '@/i18n'
import { imageSources } from '@/utils/image'
import { phoneLink } from '@/utils/messengers'
import type { ServicePageId } from '@/types/pages'
import type { WorkId } from '@/types/works'

const props = defineProps<{ id: ServicePageId; work?: WorkId }>()

const { t, locale } = useI18n()
const content = useContent()

const text = computed(() => content.value.servicePages.items[props.id])
const photo = computed(() => {
  const work = WORKS.find((w) => w.id === props.work)
  if (!work) return null
  return {
    ...imageSources(work.folder, work.image),
    alt: content.value.works.items[work.id].alt,
  }
})
</script>

<template>
  <section class="service-hero">
    <div class="service-hero__inner" :class="{ 'has-photo': photo }">
      <div class="service-hero__text">
        <h1 class="service-hero__title">{{ text.h1 }}</h1>
        <p class="service-hero__lead">{{ text.lead }}</p>
        <div class="cta">
          <RouterLink class="btn" :to="{ path: pagePath(id, locale), hash: '#estimate' }">
            {{ content.servicePages.ctaEstimate }}
          </RouterLink>
          <a class="btn btn--ghost-dark service-hero__call" :href="phoneLink(SITE.phone)">
            <BaseIcon name="phone" />
            {{ t((m) => m.contactInfo.call) }}
          </a>
        </div>
      </div>

      <figure v-if="photo" class="snapshot">
        <!-- первый экран: без lazy, иначе страдает LCP -->
        <img
          class="snapshot__img"
          :src="photo.src"
          :srcset="photo.srcset"
          sizes="(min-width: 480px) 440px, 90vw"
          :alt="photo.alt"
          width="800"
          height="600"
          fetchpriority="high"
        />
        <figcaption v-if="text.photoCaption" class="tape snapshot__caption">
          {{ text.photoCaption }}
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped lang="scss">
.service-hero {
  color: var(--hero-text);
  background:
    radial-gradient(ellipse 60% 70% at 50% 0%, rgb(255 255 255 / 0.1), transparent 70%),
    linear-gradient(var(--hero-0), var(--hero-1));
  border-bottom: 4px solid var(--color-accent);
  overflow: hidden;

  &__inner {
    @include container;
    padding-block: var(--space-12);

    @include above(lg) {
      padding-block: calc(var(--space-12) * 1.5);

      &.has-photo {
        display: grid;
        grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
        gap: var(--space-12);
        align-items: center;
      }
    }
  }

  &__title {
    max-width: 18ch;
    font-size: clamp(2rem, 6vw, 3.5rem);
    line-height: 1.05;
  }

  &__lead {
    max-width: 60ch;
    color: var(--hero-muted);
    font-size: 1.125rem;
  }

  &__call {
    gap: var(--space-2);
  }
}

// фото как распечатка, приклеенная малярным скотчем к стене камеры
.snapshot {
  position: relative;
  max-width: 440px;
  margin: var(--space-12) auto 0;
  padding: 10px 10px 40px;
  background: var(--color-surface);
  border-radius: 2px;
  box-shadow: var(--shadow-pop);

  @include above(lg) {
    margin: 0 0 0 auto;
    transform: rotate(2deg);
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -12px;
    width: 96px;
    height: 26px;
    background: var(--color-tape);
    opacity: 0.9;
    box-shadow: 0 1px 2px rgb(0 0 0 / 0.25);
  }

  &::before {
    left: -18px;
    transform: rotate(-35deg);
  }

  &::after {
    right: -18px;
    transform: rotate(35deg);
  }

  &__img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }

  &__caption {
    position: absolute;
    left: 16px;
    bottom: 6px;
    margin: 0;
  }
}
</style>
