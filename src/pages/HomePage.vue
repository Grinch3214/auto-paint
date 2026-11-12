<script setup lang="ts">
import { computed, ref } from 'vue'
import { SITE } from '@/config/site'
import { ESTIMATE_PARTS } from '@/data/estimate'
import { SWATCHES } from '@/data/swatches'
import { WORKS } from '@/data/works'
import { useContent, useI18n } from '@/i18n'
import { useSeo } from '@/seo/useSeo'
import InsuranceNote from '@/components/blocks/InsuranceNote.vue'
import PriceHowto from '@/components/blocks/PriceHowto.vue'
import PriceTable from '@/components/blocks/PriceTable.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import StagesSection from '@/components/sections/StagesSection.vue'
import { imageSources, imageUrl } from '@/utils/image'
import { telegramShareLink, whatsappLink } from '@/utils/messengers'
import type { EstimatePartId } from '@/types/estimate'

const { t } = useI18n()
const content = useContent()

useSeo({
  title: () => t((m) => m.home.seoTitle),
  description: () => t((m) => m.home.seoDescription),
})

const swatchIndex = ref(0)
const lightbox = ref<HTMLDialogElement | null>(null)
const current = ref(0)
const picked = ref<EstimatePartId[]>([])

const swatch = computed(() => SWATCHES[swatchIndex.value] ?? SWATCHES[0]!)
const works = computed(() =>
  WORKS.map((w) => ({
    id: w.id,
    ...imageSources(w.folder, w.image),
    ...content.value.works[w.id],
    large: imageUrl(w.folder, w.image, 1200),
    big: w.size === 'big',
    wide: w.size === 'wide',
  })),
)
const currentWork = computed(() => works.value[current.value] ?? works.value[0]!)
const parts = computed(() =>
  ESTIMATE_PARTS.map((id) => ({ id, label: content.value.estimate.parts[id] })),
)
const message = computed(() => {
  const names = picked.value.map((id) => content.value.estimate.parts[id].toLowerCase())
  return content.value.estimate.message.replace('{parts}', names.length ? names.join(', ') : '…')
})
const waLink = computed(() => whatsappLink(SITE.phone, message.value))
const tgLink = computed(() => telegramShareLink(message.value))

function openWork(i: number) {
  current.value = i
  lightbox.value?.showModal()
}

function step(delta: number) {
  current.value = (current.value + delta + works.value.length) % works.value.length
}

function togglePart(id: EstimatePartId) {
  picked.value = picked.value.includes(id)
    ? picked.value.filter((x) => x !== id)
    : [...picked.value, id]
}
</script>

<template>
  <div class="home" :style="{ '--car': swatch.color }">
    <HeroSection :swatch-index="swatchIndex" @select-color="swatchIndex = $event" />

    <ServicesSection>
      <PriceTable />
      <PriceHowto />
      <InsuranceNote />
    </ServicesSection>

    <StagesSection />

    <!-- ===== ПРИМЕРЫ РАБОТ ===== -->
    <section id="works" class="section">
      <span class="tape">из нашей камеры</span>
      <h2>Примеры работ</h2>
      <p class="lead">Реальные машины и детали. Нажмите на фото, чтобы посмотреть крупно.</p>
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
            :aria-label="`Открыть фото: ${w.alt}`"
            @click="openWork(i)"
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

      <dialog
        ref="lightbox"
        class="lb"
        aria-label="Просмотр фото"
        @keydown.left="step(-1)"
        @keydown.right="step(1)"
        @click.self="lightbox?.close()"
      >
        <img :src="currentWork.large" :alt="currentWork.alt" class="lb__img" />
        <p class="lb__caption">
          <span>{{ currentWork.alt }}</span>
          <span class="mono">{{ current + 1 }} / {{ works.length }}</span>
        </p>
        <button
          type="button"
          class="lb__btn lb__btn--prev"
          aria-label="Предыдущее фото"
          @click="step(-1)"
        >
          ‹
        </button>
        <button
          type="button"
          class="lb__btn lb__btn--next"
          aria-label="Следующее фото"
          @click="step(1)"
        >
          ›
        </button>
        <button type="button" class="lb__close" aria-label="Закрыть" @click="lightbox?.close()">
          ✕
        </button>
      </dialog>
    </section>

    <!-- ===== ПАСПОРТ ===== -->
    <section class="section">
      <span class="tape">технический паспорт</span>
      <h2>Коротко о работе</h2>
      <div class="label-card">
        <div class="label-card__head">
          <span>{BRAND}</span>
          <span class="mono">BATUMI · PAINT</span>
        </div>
        <dl class="passport passport--big">
          <dt>Мастера</dt>
          <dd>маляры и рихтовщики, опыт от 12 лет</dd>
          <dt>Материалы</dt>
          <dd>Sikkens · PPG · Standox · Roberlo</dd>
          <dt>Код цвета</dt>
          <dd>по VIN → сверка по детали</dd>
          <dt>Камера</dt>
          <dd>покраска + сушка, 1 машина</dd>
          <dt>Оценка</dt>
          <dd>по фото в WhatsApp / Telegram</dd>
        </dl>
      </div>
    </section>

    <!-- ===== ОЦЕНКА ПО ФОТО ===== -->
    <section id="estimate" class="section">
      <span class="tape">оценка по фото</span>
      <h2>Что нужно покрасить?</h2>
      <p class="lead">Отметьте детали — мы подставим их в сообщение. Фото прикрепите уже в чате.</p>
      <div class="chips">
        <button
          v-for="p in parts"
          :key="p.id"
          class="chip"
          :aria-pressed="picked.includes(p.id)"
          @click="togglePart(p.id)"
        >
          {{ p.label }}
        </button>
      </div>
      <p class="preview mono">{{ message }}</p>
      <div class="cta">
        <a class="btn" :href="waLink" target="_blank" rel="noopener">WhatsApp</a>
        <a class="btn btn--ghost" :href="tgLink" target="_blank" rel="noopener">Telegram</a>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.home {
  --car: #a8121c;
}

.passport {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-2) var(--space-6);
  margin: var(--space-4) 0 0;
  padding: var(--space-4);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius);
  font-family: var(--font-mono);
  font-size: 0.85rem;

  dt {
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  dd {
    margin: 0;
  }

  &--big {
    border: none;
    padding: var(--space-6);
    font-size: 0.95rem;

    dt,
    dd {
      padding-bottom: var(--space-3);
      border-bottom: 1px solid var(--color-border);
    }

    @include below(sm) {
      grid-template-columns: 1fr;
      gap: 0;

      dt {
        border: none;
        padding-bottom: 0;
      }

      dd {
        padding-bottom: var(--space-3);
        margin-bottom: var(--space-3);
      }
    }
  }
}

.label-card {
  max-width: 640px;
  background: var(--color-surface);
  border: 2px solid var(--color-text);
  border-radius: var(--radius);
  overflow: hidden;

  &__head {
    display: flex;
    justify-content: space-between;
    padding: var(--space-4) var(--space-6);
    background: var(--car);
    color: #fff;
    font-family: var(--font-display);
    font-weight: 700;
    transition: background 0.5s;
  }
}

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
    background: #111;
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

// просмотр фото
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
    color: #ecebe8;
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
    background: rgb(255 255 255 / 0.92);
    color: #111;
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

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.chip {
  min-height: 44px;
  padding: 0 var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-surface);
  color: var(--color-text);
  font: inherit;
  cursor: pointer;

  &[aria-pressed='true'] {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: var(--on-accent);
  }
}

.preview {
  margin-top: var(--space-6);
  padding: var(--space-4);
  max-width: 640px;
  background: var(--color-surface);
  border-left: 4px solid var(--color-tape);
  font-size: 0.9rem;
}
</style>
