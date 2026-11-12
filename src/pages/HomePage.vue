<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { pagePath } from '@/config/pages'
import { SITE } from '@/config/site'
import { ESTIMATE_PARTS } from '@/data/estimate'
import { PRICE_GROUPS } from '@/data/prices'
import { SERVICES } from '@/data/services'
import { STAGES } from '@/data/stages'
import { SWATCHES } from '@/data/swatches'
import { WORKS } from '@/data/works'
import { useContent, useI18n } from '@/i18n'
import { useSeo } from '@/seo/useSeo'
import HeroSection from '@/components/sections/HeroSection.vue'
import { formatPrice, padNumber } from '@/utils/format'
import { imageSources, imageUrl } from '@/utils/image'
import { telegramShareLink, whatsappLink } from '@/utils/messengers'
import type { EstimatePartId } from '@/types/estimate'

const { t, locale } = useI18n()
const content = useContent()

useSeo({
  title: () => t((m) => m.home.seoTitle),
  description: () => t((m) => m.home.seoDescription),
})

const swatchIndex = ref(0)
const stepsEl = ref<HTMLElement | null>(null)
const openStep = ref<number | null>(0)
// JS готов: только тогда прячем карточки до появления, без JS они видны сразу
const stepsReady = ref(false)
const stepsIn = ref(false)
const lightbox = ref<HTMLDialogElement | null>(null)
const current = ref(0)
const picked = ref<EstimatePartId[]>([])
let observer: IntersectionObserver | null = null

const swatch = computed(() => SWATCHES[swatchIndex.value] ?? SWATCHES[0]!)
const services = computed(() => SERVICES.map((s) => ({ ...s, ...content.value.services[s.id] })))
const priceGroups = computed(() =>
  PRICE_GROUPS.map((g) => ({
    id: g.id,
    title: content.value.prices.groups[g.id],
    items: g.items.map((item) => ({ ...item, name: content.value.prices.items[item.id] })),
  })),
)
const stages = computed(() => STAGES.map((id) => ({ id, ...content.value.stages[id] })))
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

const price = (value?: number) =>
  formatPrice(
    value,
    t((m) => m.common.priceFrom),
  )
const toggleStep = (i: number) => (openStep.value = openStep.value === i ? null : i)

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

onMounted(() => {
  stepsReady.value = true
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        stepsIn.value = true
        observer?.disconnect()
      }
    },
    { rootMargin: '0px 0px -15% 0px' },
  )
  if (stepsEl.value) observer.observe(stepsEl.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="home" :style="{ '--car': swatch.color }">
    <HeroSection :swatch-index="swatchIndex" @select-color="swatchIndex = $event" />

    <!-- ===== УСЛУГИ ===== -->
    <section id="services" class="section">
      <span class="tape">услуги</span>
      <h2>Что красим</h2>
      <p class="lead">Выберите, что нужно, или просто пришлите фото — подскажем сами.</p>
      <ul class="services">
        <li v-for="s in services" :key="s.id" class="service">
          <h3 class="service__title">{{ s.title }}</h3>
          <p>{{ s.text }}</p>
          <p class="service__fits mono">{{ s.fits }}</p>
          <RouterLink v-if="s.page" class="service__link" :to="pagePath(s.page, locale)">
            Подробнее →
          </RouterLink>
        </li>
      </ul>

      <div id="prices" class="prices">
        <div class="prices__head">
          <h3>Цены на покраску</h3>
          <p>
            Цены в лари, за одну деталь. Итог зависит от состояния детали и класса машины — точную
            сумму назовём по фото или после осмотра.
          </p>
        </div>
        <div class="prices__groups">
          <section v-for="g in priceGroups" :key="g.id" class="price-group">
            <h4 class="price-group__title"><span class="tape">{{ g.title }}</span></h4>
            <table class="price-group__table">
              <thead>
                <tr>
                  <th scope="col"><span class="visually-hidden">Деталь</span></th>
                  <th scope="col">Новая<small>после замены</small></th>
                  <th scope="col">Б/У<small>с подготовкой</small></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in g.items" :key="r.id">
                  <th scope="row">{{ r.name }}</th>
                  <td v-if="r.ask" colspan="2" class="is-ask">по фото</td>
                  <td v-else-if="r.single !== undefined" colspan="2">{{ price(r.single) }}</td>
                  <template v-else>
                    <td :class="{ 'is-empty': r.fresh === undefined }">{{ price(r.fresh) }}</td>
                    <td :class="{ 'is-empty': r.used === undefined }">{{ price(r.used) }}</td>
                  </template>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
        <p class="prices__extra">
          <span class="prices__info" aria-hidden="true">i</span>
          Цены указаны для обычной эмали. Металлик, перламутр, трёхслойные цвета и матовый лак
          рассчитываем индивидуально.
        </p>
      </div>

      <div class="howto">
        <h3 class="howto__title">Как узнать точную цену</h3>
        <div class="howto__options">
          <article class="howto__opt">
            <span class="tape">быстро</span>
            <h4>По фото</h4>
            <ol class="howto__steps">
              <li v-for="(s, i) in content.prices.photoSteps" :key="s">
                <span class="howto__num mono">{{ padNumber(i + 1) }}</span>
                {{ s }}
              </li>
            </ol>
            <a class="btn btn--ghost howto__cta" href="#estimate">Отправить фото</a>
          </article>
          <article class="howto__opt howto__opt--best">
            <span class="tape">точнее всего</span>
            <h4>На месте</h4>
            <p>
              Приезжайте к нам: мастер осмотрит машину вживую, при хорошем свете и под лампами. Так
              видно то, что не попадает в кадр, — скрытые повреждения, старый ремонт, толщину
              краски. Сумма будет точной сразу.
            </p>
            <a class="btn howto__cta" href="/kontakty">Адрес и часы работы</a>
          </article>
        </div>

        <div class="howto__flow">
          <p class="howto__flow-title">Сначала смета — потом работа</p>
          <ol>
            <li v-for="(s, i) in content.prices.flow" :key="s">
              <span class="howto__num mono">{{ padNumber(i + 1) }}</span>
              {{ s }}
            </li>
          </ol>
          <p class="howto__flow-note">
            Работу начинаем только после того, как вы одобрили смету. Мы на связи на всех этапах:
            если при разборке найдём скрытые повреждения, сначала согласуем с вами, и только потом
            продолжим. Цена не меняется по ходу без вашего согласия.
          </p>
        </div>
      </div>

      <aside class="docs" aria-labelledby="docs-title">
        <svg class="docs__icon" viewBox="0 0 48 48" aria-hidden="true">
          <rect x="9" y="7" width="26" height="34" rx="3" />
          <path d="M17 7V4h10v3" />
          <path d="M15 17l2 2 4-4M15 26l2 2 4-4M15 35l2 2 4-4M25 17h5M25 26h5M25 35h5" />
          <path d="M40 16l3 3-11 11-4 1 1-4z" />
        </svg>
        <div>
          <h3 id="docs-title" class="docs__title">Документы для страховой</h3>
          <p>
            После ДТП подготовим документы для страховой компании и поможем урегулировать страховой
            случай.
          </p>
          <p>
            По покраске и сопутствующим работам выдаём <strong>акт выполненных работ</strong> и
            <strong>чек</strong> — для компенсации затрат на ремонт.
          </p>
        </div>
      </aside>
    </section>

    <!-- ===== ЭТАПЫ РАБОТ ===== -->
    <section id="layers" class="section">
      <span class="tape">этапы работ</span>
      <h2>Как мы красим</h2>
      <p class="lead">
        Восемь этапов, через которые проходит каждая машина. Работают маляры и рихтовщики с опытом
        от 12 лет.
      </p>
      <ol ref="stepsEl" class="steps" :class="{ 'is-ready': stepsReady, 'is-in': stepsIn }">
        <li
          v-for="(s, i) in stages"
          :key="s.id"
          class="steps__item"
          :class="{ 'is-open': openStep === i }"
          :style="{ '--d': i }"
        >
          <h3 class="steps__h">
            <button
              type="button"
              class="steps__head"
              :aria-expanded="openStep === i"
              :aria-controls="`step-${i}`"
              @click="toggleStep(i)"
            >
              <span class="steps__num" aria-hidden="true">{{ padNumber(i + 1) }}</span>
              <span class="steps__title">{{ s.title }}</span>
              <span class="steps__chev" aria-hidden="true" />
            </button>
          </h3>
          <div :id="`step-${i}`" class="steps__body">
            <div class="steps__inner">
              <p>{{ s.text }}</p>
              <p class="steps__note"><span class="tape">зачем</span> {{ s.note }}</p>
            </div>
          </div>
        </li>
      </ol>
    </section>

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

.steps {
  list-style: none;
  padding: 0;
  margin: var(--space-6) 0 0;
  display: grid;
  gap: var(--space-4);

  @include above(md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include above(xl) {
    grid-template-columns: repeat(4, 1fr);
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-6);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);

    p {
      margin: 0;
      color: var(--color-text-muted);
      font-size: 0.95rem;
    }
  }

  // появление по очереди: прячем, только когда JS готов, и только без reduced-motion
  @include motion {
    &.is-ready &__item {
      opacity: 0;
      transform: translateY(16px);
      transition:
        opacity 0.5s ease calc(var(--d) * 70ms),
        transform 0.5s ease calc(var(--d) * 70ms);
    }

    &.is-in &__item {
      opacity: 1;
      transform: none;
    }
  }

  &__h {
    margin: 0;
  }

  &__head {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
    width: 100%;
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: default;

    // на планшете и десктопе карточки всегда раскрыты — кнопка не нужна
    @include above(md) {
      pointer-events: none;
    }
  }

  &__num {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 2.6rem;
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: 1.5px var(--accent-ink);
  }

  &__title {
    font-family: var(--font-display);
    font-size: 1.05rem;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 1.2;
    margin-top: var(--space-2);
  }

  &__chev {
    display: none;
  }

  &__body {
    display: grid;
    grid-template-rows: 1fr;
    flex: 1;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    min-height: 0;
    overflow: hidden;
    padding-top: var(--space-2);
  }

  // ---------- мобильный: аккордеон ----------
  @include below(md) {
    gap: var(--space-2);

    &__item {
      padding: 0;
    }

    &__head {
      flex-direction: row;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-4);
      cursor: pointer;
    }

    &__num {
      font-size: 1.6rem;
    }

    &__title {
      margin: 0;
      flex: 1;
    }

    // плюс, превращается в крестик
    &__chev {
      position: relative;
      display: block;
      flex: none;
      width: 16px;
      height: 16px;

      &::before,
      &::after {
        content: '';
        position: absolute;
        inset: 7px 0 auto;
        height: 2px;
        background: currentColor;
        transition: transform 0.25s ease;
      }

      &::after {
        transform: rotate(90deg);
      }
    }

    &__item.is-open &__chev {
      &::before {
        transform: rotate(45deg);
      }

      &::after {
        transform: rotate(135deg);
      }
    }

    &__body {
      grid-template-rows: 0fr;

      @include motion {
        transition: grid-template-rows 0.3s ease;
      }
    }

    &__item.is-open &__body {
      grid-template-rows: 1fr;
    }

    &__inner {
      padding: 0 var(--space-4);
    }

    &__item.is-open &__inner {
      padding-bottom: var(--space-4);
    }
  }

  &__note {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
    margin-top: auto !important;
    padding-top: var(--space-3);
    color: var(--color-text) !important;
    font-weight: 600;
    font-size: 0.9rem !important;

    .tape {
      flex: none;
      margin: 0;
      font-size: 0.75rem;
      font-weight: 400;
    }
  }
}

.services {
  list-style: none;
  padding: 0;
  margin: var(--space-6) 0 0;
  display: grid;
  gap: var(--space-4);

  @include above(md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include above(xl) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.service {
  display: flex;
  flex-direction: column;
  padding: var(--space-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-top: 4px solid var(--car);
  border-radius: var(--radius);
  transition:
    border-color 0.5s,
    transform 0.25s;

  &:hover {
    @include motion {
      transform: translateY(-3px);
    }
  }

  &__title {
    font-family: var(--font-display);
    font-size: 1.1rem;
    text-transform: uppercase;
    margin-bottom: var(--space-3);
  }

  p {
    color: var(--color-text-muted);
  }

  &__fits {
    font-size: 0.8rem;
    color: var(--color-text) !important;

    &::before {
      content: 'подходит: ';
      color: var(--color-text-muted);
    }
  }

  &__link {
    margin-top: auto;
    padding-top: var(--space-2);
    font-weight: 700;
    color: var(--accent-ink);
    text-decoration: none;
  }
}

.prices {
  margin-top: var(--space-8);

  &__head {
    margin-bottom: var(--space-4);

    h3 {
      font-family: var(--font-display);
      text-transform: uppercase;
      font-size: 1.3rem;
      margin-bottom: var(--space-2);
    }

    p {
      color: var(--color-text-muted);
      max-width: 70ch;
      margin: 0;
    }
  }

  // колонки вместо сетки: группы разной высоты стыкуются без дыр
  &__groups {
    column-gap: var(--space-4);

    @include above(lg) {
      columns: 2;
    }
  }

  &__extra {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    margin: 0;
    padding: var(--space-3) var(--space-4);
    font-size: 0.9rem;
    color: var(--color-text-muted);
    background: var(--color-surface);
    border-radius: var(--radius);
  }

  &__info {
    flex: none;
    display: grid;
    place-items: center;
    width: 20px;
    height: 20px;
    margin-top: 1px;
    border: 1.5px solid currentColor;
    border-radius: 50%;
    font: 700 0.72rem/1 var(--font-mono);
  }
}

.price-group {
  break-inside: avoid;
  margin-bottom: var(--space-4);
  padding: var(--space-4) var(--space-4) var(--space-2);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);

  &__title {
    margin: 0 0 var(--space-2);
    font-weight: 400;

    .tape {
      margin: 0;
    }
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;

    th,
    td {
      padding: var(--space-2) 0;
      text-align: left;
      border-bottom: 1px dashed var(--color-border);
    }

    thead th {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--color-text-muted);
      vertical-align: bottom;
      width: 26%;

      &:first-child {
        width: auto;
      }

      small {
        display: block;
        font-size: 0.68rem;
        font-weight: 400;
        text-transform: none;
      }
    }

    tbody th {
      font-weight: 500;
      padding-right: var(--space-3);
    }

    tbody tr:last-child > * {
      border-bottom: 0;
    }

    td {
      font-family: var(--font-mono);
      font-weight: 600;
      white-space: nowrap;

      &.is-empty {
        color: var(--color-text-muted);
        font-weight: 400;
        opacity: 0.5;
      }

      &.is-ask {
        color: var(--accent-ink);
        font-weight: 400;
      }
    }
  }
}

.docs {
  display: flex;
  gap: var(--space-6);
  align-items: flex-start;
  margin-top: var(--space-6);
  padding: var(--space-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-accent);
  border-radius: var(--radius);

  @include below(sm) {
    flex-direction: column;
    gap: var(--space-3);
  }

  // иконка на «кусочке скотча»: тёмный контур читается на любом фоне
  &__icon {
    flex: none;
    width: 56px;
    height: 56px;
    padding: 8px;
    background: var(--color-tape);
    border-radius: var(--radius);
    transform: rotate(-3deg);
    fill: none;
    stroke: var(--on-tape);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  &__title {
    font-family: var(--font-display);
    font-size: 1.1rem;
    text-transform: uppercase;
    margin-bottom: var(--space-2);
  }

  p {
    margin: 0 0 var(--space-2);
    color: var(--color-text-muted);

    &:last-child {
      margin-bottom: 0;
    }
  }

  strong {
    color: var(--color-text);
  }
}

.howto {
  margin-top: var(--space-8);
  padding: var(--space-6);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius);

  &__title {
    font-family: var(--font-display);
    text-transform: uppercase;
    font-size: 1.3rem;
    margin-bottom: var(--space-4);
  }

  &__options {
    display: grid;
    gap: var(--space-4);

    @include above(md) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__opt {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-6);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);

    .tape {
      margin: 0;
      font-size: 0.85rem;
    }

    h4 {
      margin: 0;
      font-family: var(--font-display);
      font-size: 1.15rem;
      text-transform: uppercase;
    }

    p {
      margin: 0;
      color: var(--color-text-muted);
    }

    &--best {
      border-color: var(--color-accent);
      box-shadow: 0 0 0 1px var(--color-accent);
    }
  }

  &__steps {
    display: grid;
    gap: var(--space-2);
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      gap: var(--space-3);
      align-items: baseline;
    }
  }

  &__num {
    flex: none;
    color: var(--accent-ink);
    font-size: 0.85rem;
  }

  &__cta {
    margin-top: auto;
  }

  &__flow {
    margin-top: var(--space-6);

    ol {
      display: grid;
      gap: var(--space-2);
      list-style: none;
      padding: 0;
      margin: var(--space-3) 0;

      @include above(md) {
        grid-template-columns: repeat(4, 1fr);
      }

      li {
        position: relative;
        display: flex;
        gap: var(--space-2);
        align-items: baseline;
        padding: var(--space-3) var(--space-4);
        font-weight: 600;
        background: var(--color-surface);
        border-radius: var(--radius);
      }

      li:last-child {
        background: var(--color-tape);
        color: var(--on-tape);

        .howto__num {
          color: inherit;
        }
      }
    }
  }

  &__flow-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: 1rem;
    text-transform: uppercase;
  }

  &__flow-note {
    margin: 0;
    color: var(--color-text-muted);
  }
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
