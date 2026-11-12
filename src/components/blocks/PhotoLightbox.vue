<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLightbox } from '@/composables/useLightbox'
import { useI18n } from '@/i18n'
import type { LightboxPhoto } from '@/types/images'

const props = defineProps<{ photos: readonly LightboxPhoto[] }>()

const { t } = useI18n()

const dialog = ref<HTMLDialogElement | null>(null)

const { current, open, close, step } = useLightbox(dialog, () => props.photos.length)

const photo = computed(() => props.photos[current.value] ?? props.photos[0])

defineExpose({ open })
</script>

<template>
  <dialog
    ref="dialog"
    class="lb"
    :aria-label="t((m) => m.lightbox.label)"
    @keydown.left="step(-1)"
    @keydown.right="step(1)"
    @click.self="close"
  >
    <template v-if="photo">
      <img :src="photo.src" :alt="photo.alt" class="lb__img" />
      <p class="lb__caption">
        <span>{{ photo.alt }}</span>
        <span class="mono">{{ current + 1 }} / {{ photos.length }}</span>
      </p>
    </template>
    <button
      type="button"
      class="lb__btn lb__btn--prev"
      :aria-label="t((m) => m.lightbox.prev)"
      @click="step(-1)"
    >
      ‹
    </button>
    <button
      type="button"
      class="lb__btn lb__btn--next"
      :aria-label="t((m) => m.lightbox.next)"
      @click="step(1)"
    >
      ›
    </button>
    <button type="button" class="lb__close" :aria-label="t((m) => m.lightbox.close)" @click="close">
      ✕
    </button>
  </dialog>
</template>

<style scoped lang="scss">
.lb {
  width: min(1100px, 92vw);
  max-width: none;
  padding: 0;
  border: 0;
  background: transparent;
  overflow: visible;

  &::backdrop {
    background: rgb(0 0 0 / 0.88);
  }

  &__img {
    display: block;
    width: 100%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: var(--radius);
  }

  &__caption {
    display: flex;
    justify-content: space-between;
    gap: var(--space-4);
    margin: var(--space-3) 0 0;
    color: var(--hero-text);
  }

  &__btn,
  &__close {
    position: absolute;
    display: grid;
    place-items: center;
    width: 48px;
    height: 48px;
    border: 0;
    border-radius: 50%;
    background: var(--color-surface);
    color: var(--color-text);
    font-size: 1.6rem;
    cursor: pointer;
  }

  &__btn {
    top: 50%;
    translate: 0 -50%;

    &--prev {
      left: 8px;
    }

    &--next {
      right: 8px;
    }
  }

  &__close {
    top: -56px;
    right: 0;
    font-size: 1.1rem;
  }
}
</style>
