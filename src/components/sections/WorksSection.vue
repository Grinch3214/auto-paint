<script setup lang="ts">
import { computed, ref } from 'vue'
import PhotoLightbox from '@/components/blocks/PhotoLightbox.vue'
import { WORKS } from '@/data/works'
import { useContent } from '@/i18n'
import { imageSources, imageUrl } from '@/utils/image'
import type { ServicePageId } from '@/types/pages'

const props = defineProps<{ page?: ServicePageId }>()

const content = useContent()

const lightbox = ref<InstanceType<typeof PhotoLightbox> | null>(null)

const list = computed(() => {
  const page = props.page
  return page ? WORKS.filter((w) => w.pages?.includes(page)) : WORKS
})
const works = computed(() =>
  list.value.map((w) => ({
    id: w.id,
    ...imageSources(w.folder, w.image),
    ...content.value.works.items[w.id],
    big: w.size === 'big',
    wide: w.size === 'wide',
  })),
)
const photos = computed(() =>
  list.value.map((w) => ({
    src: imageUrl(w.folder, w.image, 1200),
    alt: content.value.works.items[w.id].alt,
  })),
)

const openLabel = (alt: string) => content.value.works.openPhoto.replace('{alt}', alt)
</script>

<template>
  <section v-if="works.length" id="works" class="section">
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
            :sizes="w.big ? '(min-width: 768px) 50vw, 80vw' : '(min-width: 768px) 25vw, 80vw'"
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
    gap: var(--space-3);
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 210px;
    grid-auto-flow: dense;
  }

  &__item {
    @include below(md) {
      flex: 0 0 80%;
      aspect-ratio: 4 / 3;
      scroll-snap-align: start;
    }
  }

  &__item--big {
    @include above(md) {
      grid-column: span 2;
      grid-row: span 2;
    }
  }

  &__item--wide {
    @include above(md) {
      grid-column: span 2;
    }
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
