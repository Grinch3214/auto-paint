<script setup lang="ts">
import { computed, onMounted, ref, shallowRef } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'
import {
  DEFAULT_PHONE_COUNTRY,
  PHONE_COUNTRIES,
  PHONE_COUNTRIES_EUROPE,
  PHONE_COUNTRIES_TOP,
  PHONE_COUNTRY_CODES,
} from '@/data/phoneCountries'
import { useI18n } from '@/i18n'
import { getLocale } from '@/i18n/locales'
import {
  flagEmoji,
  formatPhoneInput,
  loadPhoneLib,
  parsePhoneValue,
  phoneCountryOptions,
  phoneExample,
  rawPhoneValue,
} from '@/utils/phone'
import type { CountryCode } from 'libphonenumber-js/min'
import type { PhoneValue } from '@/types/phone'

const props = defineProps<{
  inputId: string
  countryLabel: string
  placeholder: string
  invalid?: boolean
}>()

const model = defineModel<PhoneValue>({ required: true })

const { locale } = useI18n()

const country = ref<CountryCode>(DEFAULT_PHONE_COUNTRY)
const text = ref('')
const lib = shallowRef<Awaited<ReturnType<typeof loadPhoneLib>> | null>(null)
// полный список стран — только после монтирования: названия берём из Intl браузера
const mounted = ref(false)

const current = computed(() => PHONE_COUNTRIES.find((c) => c.code === country.value)!)
const options = computed(() =>
  phoneCountryOptions(
    PHONE_COUNTRIES_TOP,
    PHONE_COUNTRIES_EUROPE,
    getLocale(locale.value).hreflang,
  ),
)
const hint = computed(() =>
  lib.value ? phoneExample(lib.value[0], lib.value[1], country.value) : props.placeholder,
)

function update() {
  model.value = lib.value
    ? parsePhoneValue(lib.value[0], text.value, country.value)
    : rawPhoneValue(text.value, current.value.dial)
}

function reformat(raw: string) {
  if (!lib.value) {
    text.value = raw
    return
  }
  const result = formatPhoneInput(lib.value[0], raw, country.value, PHONE_COUNTRY_CODES)
  text.value = result.text
  country.value = result.country
}

async function ensureLib() {
  if (lib.value) return
  lib.value = await loadPhoneLib()
  reformat(text.value)
  update()
}

function onInput(event: Event) {
  const el = event.target as HTMLInputElement
  if (el.selectionStart === el.value.length) reformat(el.value)
  else text.value = el.value
  update()
}

function onCountryChange(event: Event) {
  country.value = (event.target as HTMLSelectElement).value as CountryCode
  reformat(text.value)
  update()
}

onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <div class="phone" :class="{ 'is-invalid': invalid }">
    <div class="phone__country">
      <span class="phone__flag" aria-hidden="true">{{ flagEmoji(country) }}</span>
      <span class="phone__dial">+{{ current.dial }}</span>
      <BaseIcon name="chevron" class="phone__chevron" />
      <select
        class="phone__select"
        :value="country"
        :aria-label="countryLabel"
        @focus="ensureLib"
        @change="onCountryChange"
      >
        <template v-if="mounted">
          <option v-for="o in options.top" :key="o.code" :value="o.code">{{ o.label }}</option>
          <option disabled>──────────</option>
          <option v-for="o in options.europe" :key="o.code" :value="o.code">{{ o.label }}</option>
        </template>
        <option v-else :value="country">+{{ current.dial }}</option>
      </select>
    </div>
    <input
      :id="inputId"
      class="phone__input"
      type="tel"
      inputmode="tel"
      autocomplete="tel-national"
      :value="text"
      :placeholder="hint"
      :aria-invalid="invalid"
      @focus="ensureLib"
      @input="onInput"
    />
  </div>
</template>

<style scoped lang="scss">
.phone {
  display: flex;
  min-height: 48px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);

  &:focus-within {
    border-color: var(--color-accent);
    outline: 2px solid color-mix(in srgb, var(--color-accent) 25%, transparent);
  }

  &.is-invalid {
    border-color: var(--color-error);
  }

  &__country {
    position: relative;
    display: flex;
    flex: none;
    align-items: center;
    gap: var(--space-2);
    padding: 0 var(--space-3) 0 var(--space-4);
    border-right: 1px solid var(--color-border);
    font-variant-numeric: tabular-nums;

    border-radius: var(--radius) 0 0 var(--radius);

    &:hover {
      background: var(--color-bg);
    }
  }

  &__flag {
    font-size: 1.15rem;
    line-height: 1;
  }

  &__chevron {
    color: var(--color-text-muted);
  }

  &__select {
    position: absolute;
    inset: 0;
    width: 100%;
    opacity: 0;
    cursor: pointer;
    font: inherit;
  }

  &__input {
    flex: 1;
    width: 0;
    min-width: 0;
    padding: var(--space-3) var(--space-4);
    border: 0;
    background: transparent;
    color: var(--color-text);
    font: inherit;

    &:focus {
      outline: none;
    }
  }
}
</style>
