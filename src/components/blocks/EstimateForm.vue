<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import { useEstimatePhotos } from '@/composables/useEstimatePhotos'
import { pagePath } from '@/config/pages'
import { ESTIMATE_ENDPOINT } from '@/constants/estimate'
import { useContent, useI18n } from '@/i18n'
import PhoneInput from './PhoneInput.vue'
import PhotoPicker from './PhotoPicker.vue'
import type { EstimateFormStatus } from '@/types/estimate'
import type { PhoneValue } from '@/types/phone'

const { locale } = useI18n()
const content = useContent()
const { photos, processing, failed, overLimit, canAdd, add, remove, clear } = useEstimatePhotos()

const phoneId = useId()

const text = ref('')
const phone = ref<PhoneValue>({ international: '', valid: false })
const website = ref('')
const status = ref<EstimateFormStatus>('idle')
const showErrors = ref(false)

const form = computed(() => content.value.estimate.form)
const phoneMissing = computed(() => !phone.value.valid)
const phoneEmpty = computed(() => !phone.value.international)
const contentMissing = computed(() => !photos.value.length && !text.value.trim())

async function submit() {
  showErrors.value = true
  if (phoneMissing.value || contentMissing.value || processing.value) return

  const data = new FormData()
  photos.value.forEach((p, i) => data.append('photos', p.blob, `photo-${i + 1}.jpg`))
  data.append('text', text.value.trim())
  data.append('phone', phone.value.international)
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

    <div class="form__field">
      <label class="form__label" :for="phoneId">{{ form.phone }}</label>
      <PhoneInput
        v-model="phone"
        :input-id="phoneId"
        :country-label="form.phoneCountry"
        :placeholder="form.phonePlaceholder"
        :invalid="showErrors && phoneMissing"
      />
    </div>

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
      {{ phoneEmpty ? form.needPhone : phoneMissing ? form.phoneInvalid : form.needContent }}
    </p>
    <p v-else-if="status === 'sent'" class="form__note is-ok" role="status">{{ form.sent }}</p>
    <p v-else-if="status === 'error'" class="form__note is-error" role="alert">{{ form.error }}</p>

    <button type="submit" class="btn form__submit" :disabled="status === 'sending' || processing">
      {{ status === 'sending' ? form.sending : form.submit }}
    </button>
    <p class="form__consent">
      {{ form.consent }}
      <RouterLink :to="pagePath('privacy', locale)">{{ form.consentLink }}</RouterLink>
    </p>
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
    text-transform: var(--caps);
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

  &__consent {
    margin: calc(var(--space-2) * -1) 0 0;
    color: var(--color-text-muted);
    font-size: 0.8rem;
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
