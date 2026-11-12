<script setup lang="ts">
import { computed, ref } from 'vue'
import PhotoLightbox from '@/components/blocks/PhotoLightbox.vue'
import { WORKS } from '@/data/works'
import { useContent } from '@/i18n'
import { imageSources, imageUrl } from '@/utils/image'

const content = useContent()

const lightbox = ref<InstanceType<typeof PhotoLightbox> | null>(null)

const works = computed(() =>
  WORKS.map((w) => ({
    id: w.id,
    ...imageSources(w.folder, w.image),
    ...content.value.works.items[w.id],
    big: w.size === 'big',
    wide: w.size === 'wide',
  })),
)
const photos = computed(() =>
  WORKS.map((w) => ({
    src: imageUrl(w.folder, w.image, 1200),
    alt: content.value.works.items[w.id].alt,
  })),
)

const openLabel = (alt: string) => content.value.works.openPhoto.replace('{alt}', alt)
</script>

<template>
  <section id="works" class="section">
    <span class="tape">{{ content.works.tape }}</span>
    <h2>{{ content.works.title }}</h2>
    <p class="lead">{{ content.works.lead }}</p>
    <ul class="works">
      <li
        v-for="(w, i) in works"
        :key="w.id"
        class="works__item"
        :class="{ 'works__item--big': w.big, 'works__item--wide': w.wide }"
      >
        <button
          type="button"
          class="works__btn"
          :aria-label="openLabel(w.alt)"
          @click="lightbox?.open(i)"
        >
          <img
            :src="w.src"
            :srcset="w.srcset"
            :sizes="w.big ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 50vw'"
            :alt="w.alt"
            width="800"
            height="600"
            loading="lazy"
          />
          <span class="tape works__tag">{{ w.tag }}</span>
        </button>
      </li>
    </ul>

    <PhotoLightbox ref="lightbox" :photos="photos" />
  </section>
</template>

<style scoped lang="scss">
.works {
  list-style: none;
  padding: 0;
  margin: var(--space-6) 0 0;
  display: grid;
  gap: var(--space-3);
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 150px;
  grid-auto-flow: dense;

  @include above(md) {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 210px;
  }

  &__item--big {
    grid-column: span 2;
    grid-row: span 2;
  }

  &__item--wide {
    grid-column: span 2;
  }

  &__btn {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
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
      transition: transform 0.5s ease;
    }

    &:hover img {
      @include motion {
        transform: scale(1.04);
      }
    }
  }

  &__tag {
    position: absolute;
    left: var(--space-3);
    bottom: var(--space-2);
    margin: 0;
    font-size: 0.85rem;
  }
}
</style>
