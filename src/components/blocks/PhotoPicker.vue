<script setup lang="ts">
import { ref } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { ESTIMATE_PHOTOS } from '@/constants/estimate'
import { useContent } from '@/i18n'
import PhotoThumbs from './PhotoThumbs.vue'
import type { EstimatePhoto } from '@/types/estimate'

defineProps<{
  photos: readonly EstimatePhoto[]
  processing: boolean
  failed: boolean
  overLimit: boolean
  canAdd: boolean
}>()
const emit = defineEmits(['add', 'remove'])

const content = useContent()

const input = ref<HTMLInputElement | null>(null)
const dragging = ref(false)

function emitImages(files: FileList | null | undefined) {
  const images = Array.from(files ?? []).filter((f) => f.type.startsWith('image/') || !f.type)
  if (images.length) emit('add', images)
}

function onChange(event: Event) {
  const target = event.target as HTMLInputElement
  emitImages(target.files)
  target.value = ''
}

function onDrop(event: DragEvent) {
  dragging.value = false
  emitImages(event.dataTransfer?.files)
}
</script>

<template>
  <div
    class="picker"
    :class="{ 'is-dragging': dragging }"
    @dragover.prevent="dragging = true"
    @dragleave="dragging = false"
    @drop.prevent="onDrop"
  >
    <p class="picker__label">
      {{ content.estimate.form.photos }}
      <span v-if="photos.length" class="picker__count">
        {{ photos.length }} / {{ ESTIMATE_PHOTOS.maxCount }}
      </span>
    </p>

    <button
      v-if="!photos.length"
      type="button"
      class="drop"
      :disabled="processing"
      @click="input?.click()"
    >
      <span class="drop__icon"><BaseIcon name="camera" /></span>
      <span class="drop__text">
        <strong>{{ content.estimate.form.photosAdd }}</strong>
        <small>{{ content.estimate.form.photosHint }}</small>
      </span>
    </button>

    <PhotoThumbs
      v-else
      :photos="photos"
      :can-add="canAdd"
      :disabled="processing"
      @pick="input?.click()"
      @remove="emit('remove', $event)"
    />

    <input
      ref="input"
      type="file"
      accept="image/*"
      multiple
      class="visually-hidden"
      tabindex="-1"
      aria-hidden="true"
      @change="onChange"
    />

    <p
      v-if="processing || failed || overLimit"
      class="picker__status"
      :class="{ 'is-error': failed || overLimit }"
      aria-live="polite"
    >
      <span v-if="processing" class="picker__spinner" aria-hidden="true" />
      <template v-if="processing">{{ content.estimate.form.photosProcessing }}</template>
      <template v-else-if="failed">{{ content.estimate.form.photoError }}</template>
      <template v-else>
        {{ content.estimate.form.photosLimit.replace('{max}', String(ESTIMATE_PHOTOS.maxCount)) }}
      </template>
    </p>
  </div>
</template>

<style scoped lang="scss">
.picker {
  &__label {
    display: flex;
    justify-content: space-between;
    margin: 0 0 var(--space-2);
    color: var(--color-text-muted);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  &__count {
    color: var(--accent-ink);
    font-variant-numeric: tabular-nums;
  }

  &__status {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin: var(--space-2) 0 0;
    color: var(--color-text-muted);
    font-size: 0.85rem;

    &.is-error {
      color: var(--color-error);
    }
  }

  &__spinner {
    width: 14px;
    height: 14px;
    border: 2px solid var(--color-border);
    border-top-color: var(--color-accent);
    border-radius: 50%;

    @include motion {
      animation: spin 0.8s linear infinite;
    }
  }
}

.drop {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  width: 100%;
  padding: var(--space-4) var(--space-6);
  border: 2px dashed var(--color-border);
  border-radius: var(--radius);
  background:
    repeating-linear-gradient(
      -45deg,
      transparent 0 10px,
      color-mix(in srgb, var(--color-accent) 4%, transparent) 10px 20px
    ),
    var(--color-surface);
  color: var(--color-text);
  font: inherit;
  text-align: left;
  cursor: pointer;

  @include motion {
    transition:
      border-color 0.2s ease,
      background-color 0.2s ease;
  }

  &:hover,
  &:focus-visible,
  .is-dragging & {
    border-color: var(--color-accent);
    border-style: solid;
  }

  &:disabled {
    cursor: progress;
    opacity: 0.6;
  }

  &__icon {
    flex: none;
    display: grid;
    place-items: center;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: var(--color-accent);
    color: var(--on-accent);
    box-shadow: 0 0 0 6px color-mix(in srgb, var(--color-accent) 18%, transparent);
  }

  &__text {
    display: grid;
    gap: 2px;

    strong {
      font-family: var(--font-display);
      font-size: 1rem;
    }

    small {
      color: var(--color-text-muted);
      font-size: 0.85rem;
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
