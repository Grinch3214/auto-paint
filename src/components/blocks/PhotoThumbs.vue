<script setup lang="ts">
import BaseIcon from '@/components/BaseIcon.vue'
import { useContent } from '@/i18n'
import type { EstimatePhoto } from '@/types/estimate'

defineProps<{ photos: readonly EstimatePhoto[]; canAdd: boolean; disabled: boolean }>()
const emit = defineEmits(['pick', 'remove'])

const content = useContent()
</script>

<template>
  <ul class="grid">
    <li v-for="p in photos" :key="p.id" class="grid__item">
      <img :src="p.url" alt="" class="grid__img" width="120" height="120" />
      <button
        type="button"
        class="grid__remove"
        :aria-label="content.estimate.form.photoRemove"
        @click="emit('remove', p.id)"
      >
        <BaseIcon name="close" />
      </button>
    </li>
    <li v-if="canAdd" class="grid__item">
      <button
        type="button"
        class="grid__add"
        :disabled="disabled"
        :aria-label="content.estimate.form.photosAdd"
        @click="emit('pick')"
      >
        <BaseIcon name="camera" />
        <span aria-hidden="true">+</span>
      </button>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;

  &__item {
    position: relative;
    aspect-ratio: 1;
  }

  &__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--radius);
  }

  &__remove {
    position: absolute;
    top: 4px;
    right: 4px;
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    padding: 6px;
    border: 0;
    border-radius: 50%;
    background: var(--scrim);
    color: var(--hero-text);
    cursor: pointer;
  }

  &__add {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    width: 100%;
    height: 100%;
    border: 2px dashed var(--color-accent);
    border-radius: var(--radius);
    background: var(--color-surface);
    color: var(--accent-ink);
    font: inherit;
    font-size: 1.25rem;
    font-weight: 700;
    cursor: pointer;

    &:disabled {
      cursor: progress;
      opacity: 0.6;
    }
  }
}
</style>
