<script setup lang="ts">
import { computed, ref } from 'vue'
import { useEstimatePhotos } from '@/composables/useEstimatePhotos'
import { ESTIMATE_ENDPOINT } from '@/constants/estimate'
import { useContent } from '@/i18n'
import PhotoPicker from './PhotoPicker.vue'
import type { EstimateFormStatus } from '@/types/estimate'

const content = useContent()
const { photos, processing, failed, overLimit, canAdd, add, remove, clear } = useEstimatePhotos()

const text = ref('')
const phone = ref('')
const website = ref('')
const status = ref<EstimateFormStatus>('idle')
const showErrors = ref(false)

const form = computed(() => content.value.estimate.form)
const phoneMissing = computed(() => phone.value.replace(/\D/g, '').length < 6)
const contentMissing = computed(() => !photos.value.length && !text.value.trim())

async function submit() {
  showErrors.value = true
  if (phoneMissing.value || contentMissing.value || processing.value) return

  const data = new FormData()
  photos.value.forEach((p, i) => data.append('photos', p.blob, `photo-${i + 1}.jpg`))
  data.append('text', text.value.trim())
  data.append('phone', phone.value.trim())
  data.append('page', window.location.pathname)
  data.append('website', website.value)

  status.value = 'sending'
  try {
    const res = await fetch(ESTIMATE_ENDPOINT, { method: 'POST', body: data })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    status.value = 'sent'
    text.value = ''
    showErrors.value = false
    clear()
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <form class="form" novalidate @submit.prevent="submit">
    <PhotoPicker
      :photos="photos"
      :processing="processing"
      :failed="failed"
      :over-limit="overLimit"
      :can-add="canAdd"
      @add="add"
      @remove="remove"
    />

    <label class="form__field">
      <span class="form__label">{{ form.text }}</span>
      <textarea
        v-model="text"
        class="form__input form__input--area"
        rows="3"
        :placeholder="form.textPlaceholder"
      />
    </label>

    <label class="form__field">
      <span class="form__label">{{ form.phone }}</span>
      <input
        v-model="phone"
        class="form__input"
        type="tel"
        autocomplete="tel"
        inputmode="tel"
        :placeholder="form.phonePlaceholder"
        :aria-invalid="showErrors && phoneMissing"
      />
    </label>

    <input
      v-model="website"
      class="visually-hidden"
      type="text"
      name="website"
      tabindex="-1"
      autocomplete="off"
      aria-hidden="true"
    />

    <p v-if="showErrors && (phoneMissing || contentMissing)" class="form__note is-error">
      {{ phoneMissing ? form.needPhone : form.needContent }}
    </p>
    <p v-else-if="status === 'sent'" class="form__note is-ok" role="status">{{ form.sent }}</p>
    <p v-else-if="status === 'error'" class="form__note is-error" role="alert">{{ form.error }}</p>

    <button type="submit" class="btn form__submit" :disabled="status === 'sending' || processing">
      {{ status === 'sending' ? form.sending : form.submit }}
    </button>
  </form>
</template>

<style scoped lang="scss">
.form {
  display: grid;
  gap: var(--space-4);

  &__field {
    display: grid;
    gap: var(--space-2);
  }

  &__label {
    color: var(--color-text-muted);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  &__input {
    width: 100%;
    min-height: 48px;
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    background: var(--color-surface);
    color: var(--color-text);
    font: inherit;

    &:focus {
      border-color: var(--color-accent);
      outline: 2px solid color-mix(in srgb, var(--color-accent) 25%, transparent);
    }

    &[aria-invalid='true'] {
      border-color: var(--color-error);
    }

    &--area {
      resize: vertical;
    }
  }

  &__note {
    margin: 0;
    padding: var(--space-3) var(--space-4);
    border-left: 4px solid currentColor;
    background: var(--color-surface);
    font-size: 0.9rem;

    &.is-error {
      color: var(--color-error);
    }

    &.is-ok {
      color: var(--color-ok);
    }
  }

  &__submit {
    width: 100%;

    &:disabled {
      opacity: 0.6;
      cursor: progress;
    }
  }
}
</style>
