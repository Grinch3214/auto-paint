<script setup lang="ts">
import { computed, ref } from 'vue'
import PhotoLightbox from '@/components/blocks/PhotoLightbox.vue'
import { CASE_SIZES } from '@/constants/images'
import { CASES } from '@/data/cases'
import { useContent } from '@/i18n'
import { padNumber } from '@/utils/format'
import { imageSources, imageUrl } from '@/utils/image'
import type { CaseId } from '@/types/cases'

const props = defineProps<{ id: CaseId }>()

const content = useContent()

const lightbox = ref<InstanceType<typeof PhotoLightbox> | null>(null)

const text = computed(() => content.value.cases[props.id])
const steps = computed(() =>
  CASES[props.id].steps.map((s) => ({
    id: s.id,
    ...imageSources(s.folder, s.image),
    ...text.value.steps[s.id],
  })),
)
const photos = computed(() =>
  CASES[props.id].steps.map((s) => ({
    src: imageUrl(s.folder, s.image, 1200),
    alt: text.value.steps[s.id].alt,
  })),
)
</script>

<template>
  <section id="case" class="section">
    <span class="tape">{{ text.tape }}</span>
    <h2>{{ text.title }}</h2>
    <p class="lead">{{ text.lead }}</p>
    <ol class="case">
      <li v-for="(s, i) in steps" :key="s.id" class="case__step">
        <button
          type="button"
          class="case__photo"
          :aria-label="content.works.openPhoto.replace('{alt}', s.alt)"
          @click="lightbox?.open(i)"
        >
          <img
            :src="s.src"
            :srcset="s.srcset"
            :sizes="CASE_SIZES"
            :alt="s.alt"
            width="800"
            height="600"
            loading="lazy"
          />
          <span class="case__num" aria-hidden="true">{{ padNumber(i + 1) }}</span>
        </button>
        <h3 class="case__title">{{ s.title }}</h3>
        <p class="case__text">{{ s.text }}</p>
      </li>
    </ol>

    <PhotoLightbox ref="lightbox" :photos="photos" />
  </section>
</template>

<style scoped lang="scss">
.case {
  list-style: none;
  padding: 0;
  margin: var(--space-6) 0 0;

  // телефон: лента с прокруткой, как галерея работ
  @include below(md) {
    display: flex;
    gap: var(--space-3);
    margin-inline: calc(-1 * var(--gutter));
    padding-inline: var(--gutter);
    scroll-padding-inline: var(--gutter);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    overscroll-behavior-x: contain;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  @include above(md) {
    display: grid;
    gap: var(--space-6) var(--space-4);
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @include above(lg) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  &__step {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);

    @include below(md) {
      flex: 0 0 80%;
      scroll-snap-align: start;
    }
  }

  &__photo {
    position: relative;
    display: block;
    aspect-ratio: 4 / 3;
    width: 100%;
    margin-bottom: var(--space-2);
    padding: 0;
    border: 0;
    border-radius: var(--radius);
    overflow: hidden;
    background: var(--hero-0);
    cursor: zoom-in;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;

      @include motion {
        transition: transform 0.5s ease;
      }
    }

    &:hover img {
      @include motion {
        transform: scale(1.04);
      }
    }
  }

  &__num {
    position: absolute;
    left: var(--space-3);
    top: var(--space-2);
    color: var(--hero-text);
    font-family: var(--font-display);
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 1;
    text-shadow: 0 1px 8px rgb(0 0 0 / 0.6);
  }

  &__title {
    margin: 0;
    font-size: 1.05rem;
    text-transform: var(--caps);
  }

  &__text {
    margin: 0;
    color: var(--color-text-muted);
    font-size: 0.95rem;
  }
}
</style>
