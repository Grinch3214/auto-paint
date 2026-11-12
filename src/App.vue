<script setup lang="ts">
// ВРЕМЕННО: тестовый дизайн главной (вариант B «Камера») в одном файле.
// Роутинг отключён. Старый App.vue: <SiteHeader /> + <main><RouterView /></main>.
// Фото в public/images/test/ — работы AutoSyndicate, только для теста.
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import carRaw from '@/assets/hero-car.svg?raw'
import '@fontsource-variable/unbounded'
import '@fontsource-variable/manrope'
import '@fontsource-variable/noto-sans-georgian'

// ---------- hero: SVG-машина и выкраски ----------
// Заводские цвета Ford Mustang 2010–2014 (код — на табличке в проёме водительской двери).
// HEX — приближение для экрана, не рецептура краски.
const swatches = [
  { name: 'Race Red', code: 'PQ', color: '#c8202a' },
  { name: 'Grabber Blue', code: 'CI', color: '#2a8bd6' },
  { name: 'Competition Orange', code: 'CY', color: '#f26a1b' },
  { name: 'Yellow Blaze', code: 'NQ', color: '#f2c414' },
  { name: 'Gotta Have It Green', code: 'HD', color: '#74a83a' },
  { name: 'Performance White', code: 'HP', color: '#f1f0eb' },
  { name: 'Ingot Silver', code: 'UX', color: '#b9bdc2' },
]
const swatchIndex = ref(0)
const swatch = computed(() => swatches[swatchIndex.value] ?? swatches[0]!)
const nextColor = () => (swatchIndex.value = (swatchIndex.value + 1) % swatches.length)

// SVG-машина: трафарет (potrace) из src/assets/hero-car.svg. Пути разобраны по деталям:
// кузов красится в цвет выкраски, остальное — стекло, шины, диски, фары, решётка.
const CAR_PATHS = [...carRaw.matchAll(/<path d="([^"]+)"/g)].map((m) => m[1]!.replace(/\s+/g, ' '))
type CarPart = 'paint' | 'glass' | 'trim' | 'grille' | 'tire' | 'rim' | 'lens' | 'light' | 'amber'
const PART_GROUPS: Record<Exclude<CarPart, 'paint'>, number[]> = {
  glass: [2, 3, 5, 6],
  trim: [4, 7, 11, 12, 13, 20, 23, 38, 69],
  grille: [39, 45, 61],
  tire: [24, 25, 41, 43, 50],
  rim: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 54, 57, 59, 60, 62, 66, 67, 70, 71, 72],
  lens: [44, 46, 53],
  light: [47],
  amber: [64, 65],
}
const partOf = new Map<number, CarPart>()
for (const [part, ids] of Object.entries(PART_GROUPS))
  for (const id of ids) partOf.set(id, part as CarPart)
const carParts = CAR_PATHS.map((d, i) => ({ d, part: partOf.get(i) ?? 'paint' }))
const paintPaths = carParts.filter((p) => p.part === 'paint')

// ---------- этапы по скроллу: реальные фото ----------
const img = (name: string) => ({
  src: `/images/test/${name}-800.webp`,
  srcset: `/images/test/${name}-800.webp 800w, /images/test/${name}-1200.webp 1200w`,
})
// ---------- услуги ----------
// Ссылки ведут на будущие страницы услуг (бриф, п. 5)
const services = [
  {
    title: 'Полная покраска',
    text: 'Перекраска всего кузова в заводской или новый цвет. Разбираем навесное, готовим каждую панель и красим в камере.',
    fits: 'смена цвета, выгоревший кузов',
    href: '/polnaya-pokraska',
  },
  {
    title: 'Покраска детали',
    text: 'Дверь, крыло, капот или бампер. Подбираем цвет так, чтобы деталь не отличалась от соседних.',
    fits: 'после ДТП, замены или царапин',
    href: '/pokraska-detali',
  },
  {
    title: 'Локальная покраска',
    text: 'Скол или царапина на небольшом участке: красим только повреждение с плавным переходом, а не всю деталь.',
    fits: 'сколы, царапины, потёртости бампера',
    href: '/lokalnaya-pokraska',
  },
  {
    title: 'Подбор краски',
    text: 'Код по VIN, тестовый выкрас и сверка с вашей машиной. Подскажем, где найти код краски на вашей марке.',
    fits: 'когда нужен точный цвет',
    href: '/podbor-kraski',
  },
]
// Цены в лари за деталь, «от». fresh — новая деталь (после замены), own — б/у деталь
// (с подготовкой и мелким ремонтом). single — одна цена на строку, ask — считаем по фото.
interface PriceRow {
  name: string
  fresh?: number
  own?: number
  single?: number
  ask?: boolean
}
const priceGroups: { title: string; rows: PriceRow[] }[] = [
  {
    title: 'Передняя часть',
    rows: [
      { name: 'Капот', fresh: 490, own: 540 },
      { name: 'Бампер', fresh: 390, own: 440 },
      { name: 'Крыло переднее', fresh: 340, own: 340 },
    ],
  },
  {
    title: 'Боковина',
    rows: [
      { name: 'Дверь', fresh: 390, own: 390 },
      { name: 'Дверь снаружи и изнутри', single: 540 },
      { name: 'Крыло заднее', own: 440 },
      { name: 'Порог металлический', own: 390 },
      { name: 'Порог пластиковый', fresh: 240, own: 240 },
      { name: 'Стойка верхняя', own: 190 },
      { name: 'Дверной проём (половина)', own: 190 },
    ],
  },
  {
    title: 'Крыша и багажник',
    rows: [
      { name: 'Крыша', fresh: 790, own: 790 },
      { name: 'Крышка багажника', fresh: 390, own: 440 },
      { name: 'Крышка багажника с изнанкой', single: 490 },
    ],
  },
  {
    title: 'Мелкие детали',
    rows: [
      { name: 'Ручка двери', fresh: 30, own: 30 },
      { name: 'Датчики парковки, 4 шт.', fresh: 40 },
      { name: 'Накладки, молдинги', fresh: 40 },
      { name: 'Корпус зеркала', ask: true },
      { name: 'Спойлер', ask: true },
      { name: 'Колёсный диск', ask: true },
      { name: 'Суппорт', ask: true },
    ],
  },
]
const fmtPrice = (v?: number) => (v === undefined ? '—' : `от ${v}`)

const priceSteps = [
  'Сфотографируйте повреждение: 2–3 кадра, общий план и крупно',
  'Отправьте фото в WhatsApp или Telegram',
  'Получите предварительный расчёт',
]
// Порядок работы с клиентом: без одобренной сметы не начинаем
const estimateFlow = ['Оцениваем', 'Составляем смету', 'Согласовываем с вами', 'Начинаем работу']

// ---------- этапы работ ----------
const stages = [
  {
    title: 'Осмотр и оценка',
    text: 'Смотрим машину или фото, которые вы прислали, обсуждаем цвет и объём работ. Составляем смету и согласовываем её с вами — к работе приступаем только после вашего одобрения.',
    note: 'цена согласована до начала работ, без сюрпризов',
  },
  {
    title: 'Разборка и мойка',
    text: 'Снимаем молдинги, ручки, фонари и зеркала там, где это возможно, моем и обезжириваем кузов.',
    note: 'краска не обрывается на кромках, нет «ступенек» от скотча',
  },
  {
    title: 'Ремонт повреждений',
    text: 'Убираем ржавчину и зачищаем сколы до прочного слоя, выводим вмятины.',
    note: 'коррозия не вылезет из-под новой краски',
  },
  {
    title: 'Шпаклёвка и шлифовка',
    text: 'Выравниваем поверхность шпаклёвкой и шлифуем, проверяя деталь под лампой на просвет.',
    note: 'ровная геометрия: под лаком не видно волн',
  },
  {
    title: 'Грунт и маскировка',
    text: 'Грунт защищает металл и выравнивает риски. Шлифуем его по проявочному слою, всё, что не красим, закрываем бумагой и плёнкой.',
    note: 'дефекты ловим до цвета, а не после лака',
  },
  {
    title: 'Подбор цвета',
    text: 'Код краски по VIN, затем тестовый выкрас и сверка с вашей деталью. Материалы: Sikkens, PPG, Standox, Roberlo.',
    note: 'заводской цвет выгорает, поэтому сверяем с реальной машиной',
  },
  {
    title: 'База и лак в камере',
    text: 'Красим и сушим в покрасочной камере: одна машина за раз, вентиляция убирает пыль. Лак даёт глубину цвета и защиту.',
    note: 'без пыли и подтёков',
  },
  {
    title: 'Сборка и проверка',
    text: 'Собираем машину и проверяем покрытие под светом ламп со всех сторон, прежде чем отдать вам.',
    note: 'вы забираете машину, которую мы сами проверили',
  },
]
const num = (i: number) => String(i + 1).padStart(2, '0')
const stepsEl = ref<HTMLElement | null>(null)
const openStep = ref<number | null>(0) // аккордеон этапов на мобильном
const toggleStep = (i: number) => (openStep.value = openStep.value === i ? null : i)
const stepsReady = ref(false) // JS готов: можно прятать карточки до появления
const stepsIn = ref(false)
let observer: IntersectionObserver | null = null

// ---------- примеры работ ----------
const work = (name: string, alt: string, tag: string, size?: 'big' | 'wide') => ({
  ...img(name),
  large: `/images/test/${name}-1200.webp`,
  alt,
  tag,
  big: size === 'big',
  wide: size === 'wide',
})
const works = [
  work('hood-gloss', 'Капот после лака в камере', 'капот · лак', 'big'),
  work('side-gloss', 'Заднее крыло и дверь после лака', 'крыло · лак'),
  work('sedan-after-1', 'Белый седан после ремонта и покраски', 'седан · готово'),
  work('parts-gloss', 'Двери, крыло и бампер после лака', 'детали · лак', 'wide'),
  work('wing-spot', 'Локальная покраска крыла', 'локальный ремонт'),
  work('crossover-before', 'Кроссовер до ремонта: снят бампер', 'до ремонта'),
  work('side-base', 'Крыло в грунте и базе', 'грунт · база'),
  work('parts-base', 'Детали в базе перед лаком', 'детали · база'),
]
const lightbox = ref<HTMLDialogElement | null>(null)
const current = ref(0)
const currentWork = computed(() => works[current.value] ?? works[0]!)
function openWork(i: number) {
  current.value = i
  lightbox.value?.showModal()
}
function step(delta: number) {
  current.value = (current.value + delta + works.length) % works.length
}

// ---------- оценка по фото ----------
const parts = [
  'Капот',
  'Передний бампер',
  'Задний бампер',
  'Крыло переднее левое',
  'Крыло переднее правое',
  'Дверь передняя левая',
  'Дверь передняя правая',
  'Крыша',
  'Вся машина',
]
const picked = ref<string[]>([])
function togglePart(p: string) {
  picked.value = picked.value.includes(p)
    ? picked.value.filter((x) => x !== p)
    : [...picked.value, p]
}
const message = computed(
  () =>
    `Здравствуйте! Нужна оценка покраски: ${picked.value.length ? picked.value.join(', ').toLowerCase() : '…'}. Фото пришлю в этом чате.`,
)
const PHONE = '995000000000' // плейсхолдер
const waLink = computed(() => `https://wa.me/${PHONE}?text=${encodeURIComponent(message.value)}`)
const tgLink = computed(
  () => `https://t.me/share/url?url=&text=${encodeURIComponent(message.value)}`,
)

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
  <div class="page" :style="{ '--car': swatch.color }">
    <!-- ===== шапка ===== -->
    <header class="top">
      <span class="logo">{BRAND}</span>
      <nav class="top__nav">
        <a href="#layers">Как красим</a>
        <a href="#works">Работы</a>
        <a href="#estimate">Оценка по фото</a>
      </nav>
      <a class="btn btn--small" href="#estimate">Написать</a>
    </header>

    <!-- ===== HERO: камера ===== -->
    <section class="hero">
      <div class="hero__lamps" aria-hidden="true"><i /><i /><i /></div>
      <p class="hero__eyebrow">Покрасочная камера · Батуми</p>
      <h1 class="hero__title">Покраска<br />авто</h1>

      <button class="hero__car" type="button" aria-label="Перекрасить машину" @click="nextColor">
        <svg viewBox="-20 -10 1320 700" role="img" aria-hidden="true">
          <defs>
            <!-- всё, что красится: для светотени поверх цвета -->
            <clipPath id="h-paint">
              <path
                v-for="(p, i) in paintPaths"
                :key="i"
                :d="p.d"
                transform="translate(0 660) scale(.1 -.1)"
              />
            </clipPath>
            <linearGradient id="h-shade-v" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#fff" stop-opacity=".28" />
              <stop offset=".3" stop-color="#fff" stop-opacity=".1" />
              <stop offset=".48" stop-color="#fff" stop-opacity=".02" />
              <stop offset=".5" stop-color="#000" stop-opacity=".12" />
              <stop offset=".75" stop-color="#000" stop-opacity=".22" />
              <stop offset="1" stop-color="#000" stop-opacity=".55" />
            </linearGradient>
            <linearGradient id="h-shade-h" x1="0" x2="1">
              <stop offset="0" stop-color="#000" stop-opacity=".45" />
              <stop offset=".35" stop-color="#000" stop-opacity="0" />
              <stop offset=".8" stop-color="#fff" stop-opacity=".06" />
              <stop offset="1" stop-color="#000" stop-opacity=".25" />
            </linearGradient>
            <linearGradient id="h-glass-fill" x1="0" y1="0" x2=".4" y2="1">
              <stop offset="0" stop-color="#3a3f48" />
              <stop offset=".45" stop-color="#15171b" />
              <stop offset="1" stop-color="#08090b" />
            </linearGradient>
            <radialGradient id="h-rim" cx=".45" cy=".4" r=".6">
              <stop offset="0" stop-color="#e9ecef" />
              <stop offset=".6" stop-color="#9aa1aa" />
              <stop offset="1" stop-color="#4a4f57" />
            </radialGradient>
            <linearGradient id="h-lens" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#454b55" />
              <stop offset="1" stop-color="#0d0e11" />
            </linearGradient>
            <linearGradient id="h-sweep" x1="0" x2="1">
              <stop offset="0" stop-color="#fff" stop-opacity="0" />
              <stop offset=".5" stop-color="#fff" stop-opacity=".45" />
              <stop offset="1" stop-color="#fff" stop-opacity="0" />
            </linearGradient>
            <radialGradient id="h-spec" cx=".5" cy=".5" r=".5">
              <stop offset="0" stop-color="#fff" stop-opacity=".5" />
              <stop offset="1" stop-color="#fff" stop-opacity="0" />
            </radialGradient>
            <pattern id="h-honey" width="10" height="9" patternUnits="userSpaceOnUse">
              <rect width="10" height="9" fill="#08090a" />
              <path
                d="M2.5 0H7.5L10 4.5L7.5 9H2.5L0 4.5Z"
                fill="#202328"
                stroke="#08090a"
                stroke-width="1.2"
              />
            </pattern>
            <filter id="h-blur" x="-20%" y="-60%" width="140%" height="220%">
              <feGaussianBlur stdDeviation="14" />
            </filter>
            <filter id="h-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <!-- тень под машиной -->
          <ellipse
            cx="700"
            cy="640"
            rx="620"
            ry="34"
            fill="#000"
            opacity=".85"
            filter="url(#h-blur)"
          />
          <ellipse
            cx="60"
            cy="430"
            rx="110"
            ry="18"
            fill="#000"
            opacity=".7"
            filter="url(#h-blur)"
          />

          <!-- диски под трафаретом: спицы = зазоры, через них виден металл -->
          <ellipse cx="490" cy="489" rx="112" ry="126" fill="url(#h-rim)" />
          <ellipse cx="490" cy="489" rx="30" ry="34" fill="#2a2e34" />
          <ellipse cx="50" cy="334" rx="28" ry="82" fill="url(#h-rim)" />

          <!-- детали машины -->
          <g transform="translate(0 660) scale(.1 -.1)">
            <path v-for="(p, i) in carParts" :key="i" :d="p.d" :class="`car-${p.part}`" />
          </g>

          <!-- светотень и блики только по кузову -->
          <g clip-path="url(#h-paint)">
            <rect x="-20" y="-10" width="1320" height="700" fill="url(#h-shade-v)" />
            <rect x="-20" y="-10" width="1320" height="700" fill="url(#h-shade-h)" />
            <ellipse
              cx="820"
              cy="190"
              rx="260"
              ry="34"
              fill="url(#h-spec)"
              transform="rotate(12 820 190)"
            />
            <ellipse
              cx="560"
              cy="210"
              rx="180"
              ry="14"
              fill="url(#h-spec)"
              transform="rotate(14 560 210)"
            />
            <ellipse cx="1090" cy="300" rx="150" ry="12" fill="url(#h-spec)" opacity=".7" />
            <ellipse
              cx="760"
              cy="420"
              rx="160"
              ry="18"
              fill="url(#h-spec)"
              opacity=".5"
              transform="rotate(8 760 420)"
            />
            <ellipse
              cx="200"
              cy="230"
              rx="90"
              ry="10"
              fill="url(#h-spec)"
              opacity=".6"
              transform="rotate(10 200 230)"
            />
            <rect class="sweep" x="-420" y="-10" width="300" height="700" fill="url(#h-sweep)" />
          </g>

          <!-- отражения ламп камеры на лобовом -->
          <g fill="#fff" opacity=".18">
            <rect x="420" y="50" width="160" height="6" rx="3" transform="rotate(8 500 53)" />
            <rect x="600" y="80" width="120" height="6" rx="3" transform="rotate(14 660 83)" />
          </g>
        </svg>
      </button>

      <div class="hero__bottom">
        <div class="dots" role="radiogroup" aria-label="Выбор цвета">
          <button
            v-for="(s, i) in swatches"
            :key="s.code"
            class="dots__dot"
            role="radio"
            :aria-checked="i === swatchIndex"
            :aria-label="s.name"
            :title="`${s.name} · ${s.code}`"
            :style="{ '--sw': s.color }"
            @click="swatchIndex = i"
          />
        </div>
        <p class="hero__swatch mono">{{ swatch.name }} · {{ swatch.code }}</p>
        <p class="hero__lead">
          Профессиональная покраска автомобилей в Батуми по заводской технологии. Мастера с опытом
          от 12 лет. Цвет подбираем по VIN и по детали вашей машины.
        </p>
        <div class="cta">
          <a class="btn" href="#estimate">Оценка по фото</a>
          <a class="btn btn--ghost-dark" href="#layers">Как мы красим</a>
        </div>
      </div>
    </section>

    <!-- ===== УСЛУГИ ===== -->
    <section id="services" class="section">
      <span class="tape">услуги</span>
      <h2>Что красим</h2>
      <p class="lead">Выберите, что нужно, или просто пришлите фото — подскажем сами.</p>
      <ul class="services">
        <li v-for="s in services" :key="s.href" class="service">
          <h3 class="service__title">{{ s.title }}</h3>
          <p>{{ s.text }}</p>
          <p class="service__fits mono">{{ s.fits }}</p>
          <a class="service__link" :href="s.href">Подробнее →</a>
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
          <section v-for="g in priceGroups" :key="g.title" class="price-group">
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
                <tr v-for="r in g.rows" :key="r.name">
                  <th scope="row">{{ r.name }}</th>
                  <td v-if="r.ask" colspan="2" class="is-ask">по фото</td>
                  <td v-else-if="r.single !== undefined" colspan="2">{{ fmtPrice(r.single) }}</td>
                  <template v-else>
                    <td :class="{ 'is-empty': r.fresh === undefined }">{{ fmtPrice(r.fresh) }}</td>
                    <td :class="{ 'is-empty': r.own === undefined }">{{ fmtPrice(r.own) }}</td>
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
              <li v-for="(s, i) in priceSteps" :key="s">
                <span class="howto__num mono">{{ num(i) }}</span>
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
            <li v-for="(s, i) in estimateFlow" :key="s">
              <span class="howto__num mono">{{ num(i) }}</span>
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
        Восемь этапов, через которые проходит каждая машина. Красят мастера с опытом от 12 лет.
      </p>
      <ol ref="stepsEl" class="steps" :class="{ 'is-ready': stepsReady, 'is-in': stepsIn }">
        <li
          v-for="(s, i) in stages"
          :key="s.title"
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
              <span class="steps__num" aria-hidden="true">{{ num(i) }}</span>
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
          :key="w.src"
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
          <dd>опыт от 12 лет</dd>
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
          :key="p"
          class="chip"
          :aria-pressed="picked.includes(p)"
          @click="togglePart(p)"
        >
          {{ p }}
        </button>
      </div>
      <p class="preview mono">{{ message }}</p>
      <div class="cta">
        <a class="btn" :href="waLink" target="_blank" rel="noopener">WhatsApp</a>
        <a class="btn btn--ghost" :href="tgLink" target="_blank" rel="noopener">Telegram</a>
      </div>
    </section>

    <footer class="foot">
      <span>{BRAND} · покраска авто в Батуми</span>
      <span class="mono">тестовый макет</span>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.page {
  --car: #a8121c;
  --marker: 'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive;
  --font-display: 'Unbounded Variable', 'Noto Sans Georgian Variable', sans-serif;
  --font-text: 'Manrope Variable', 'Noto Sans Georgian Variable', sans-serif;
  // «технические» строки (паспорт, цены, номера) — тем же Manrope, цифры одной ширины
  --font-mono: 'Manrope Variable', 'Noto Sans Georgian Variable', sans-serif;

  font-variant-numeric: tabular-nums;

  font-family: var(--font-text);
}

h1,
h2 {
  font-family: var(--font-display);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}

.mono {
  font-family: var(--font-mono);
}

.lead {
  color: var(--color-text-muted);
  max-width: 60ch;
  font-size: 1.125rem;
}

// ---------- скотч ----------
.tape {
  display: inline-block;
  padding: 4px 16px 5px;
  margin-bottom: var(--space-3);
  background: var(--color-tape);
  color: var(--on-tape);
  font-family: var(--marker);
  font-size: 0.95rem;
  transform: rotate(-1.5deg);
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.15);
  clip-path: polygon(
    0 8%,
    3% 0,
    6% 10%,
    10% 2%,
    100% 0,
    97% 12%,
    100% 25%,
    98% 40%,
    100% 55%,
    97% 70%,
    100% 85%,
    97% 100%,
    93% 92%,
    90% 100%,
    0 100%,
    3% 88%,
    0 72%,
    2% 55%,
    0 40%,
    3% 25%
  );
}

// ---------- кнопки ----------
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 var(--space-6);
  border-radius: var(--radius);
  background: var(--color-accent);
  color: var(--on-accent);
  font-weight: 700;
  text-decoration: none;
  border: 2px solid var(--color-accent);

  &--ghost {
    background: transparent;
    color: var(--color-text);
    border-color: var(--color-border);
  }

  &--ghost-dark {
    background: transparent;
    color: var(--hero-text);
    border-color: rgb(255 255 255 / 0.25);
  }

  &--small {
    min-height: 40px;
    padding: 0 var(--space-4);
  }
}

.cta {
  display: flex;
  flex-wrap: wrap;
  justify-content: inherit;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

// ---------- шапка (поверх тёмного hero) ----------
.top {
  @include container;
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: var(--space-6);
  padding-block: var(--space-4);
  color: var(--hero-text);
}

.logo {
  font-family: var(--font-display);
  font-weight: 800;
  letter-spacing: 0.04em;
  margin-inline-end: auto;
}

.top__nav {
  display: flex;
  gap: var(--space-6);

  a {
    text-decoration: none;
    opacity: 0.75;

    &:hover {
      opacity: 1;
    }
  }

  @include below(md) {
    display: none;
  }
}

// ---------- HERO: камера (всегда тёмная) ----------
.hero {
  position: relative;
  margin-top: -72px;
  padding: 104px var(--gutter) var(--space-12);
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--hero-text);
  background:
    radial-gradient(ellipse 70% 45% at 50% 0%, rgb(255 255 255 / 0.12), transparent 70%),
    radial-gradient(ellipse 50% 30% at 50% 78%, rgb(255 255 255 / 0.05), transparent 70%),
    linear-gradient(var(--hero-0), var(--hero-1) 60%, var(--hero-0));
  overflow: hidden;

  &__lamps {
    position: absolute;
    inset: 0 0 auto;
    display: flex;
    justify-content: center;
    gap: 12vw;

    i {
      width: 18vw;
      height: 5px;
      background: #f5f5f0;
      box-shadow:
        0 0 24px 6px rgb(255 255 255 / 0.45),
        0 0 90px 24px rgb(255 255 255 / 0.12);
      border-radius: 0 0 4px 4px;
    }
  }

  &__eyebrow {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    opacity: 0.6;
  }

  &__title {
    font-size: clamp(2.6rem, 9.5vw, 7rem);
    line-height: 0.92;
    margin-bottom: 0;
  }

  &__car {
    width: min(860px, 98vw);
    margin-top: var(--space-4);
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;

    svg {
      display: block;
      width: 100%;
      height: auto;
      overflow: visible;
    }
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    margin-top: var(--space-4);
  }

  &__swatch {
    font-size: 0.8rem;
    opacity: 0.55;
    margin: 0;
  }

  &__lead {
    max-width: 56ch;
    opacity: 0.8;
    margin: var(--space-2) 0 0;
    font-size: 1.05rem;
  }
}

// SVG-машина
.car-paint {
  fill: var(--car);
  transition: fill 0.5s ease;
}

.car-glass {
  fill: url(#h-glass-fill);
}

.car-trim {
  fill: #15171b;
}

.car-grille {
  fill: url(#h-honey);
}

.car-tire {
  fill: #0b0c0e;
}

.car-rim {
  fill: #17191d;
}

.car-lens {
  fill: url(#h-lens);
}

.car-light {
  fill: #c9d1dc;
  opacity: 0.75;
}

.car-amber {
  fill: #e7781f;
}

.sweep {
  @include motion {
    animation: sweep 5s ease-in-out infinite;
  }
}

@keyframes sweep {
  0%,
  35% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(1900px);
  }
}

.dots {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);

  &__dot {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid rgb(255 255 255 / 0.25);
    background:
      radial-gradient(circle at 35% 30%, rgb(255 255 255 / 0.45), transparent 45%), var(--sw);
    cursor: pointer;
    padding: 0;

    &[aria-checked='true'] {
      outline: 2px solid #fff;
      outline-offset: 3px;
    }
  }
}

// ---------- этапы работ ----------
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

// ---------- услуги ----------
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

// ---------- цены ----------
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

.visually-hidden {
  @include visually-hidden;
}

// ---------- документы для страховой ----------
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

// ---------- паспорт ----------
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

// ---------- секции ----------
.section {
  @include container;
  padding-block: var(--space-12);

  h2 {
    font-size: clamp(1.75rem, 4vw, 2.75rem);
  }
}

// ---------- примеры работ ----------
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

// ---------- оценка ----------
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

.foot {
  @include container;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-4);
  padding-block: var(--space-8);
  border-top: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

</style>
