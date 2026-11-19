<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { pagePath } from '@/config/pages'
import { HERO_BG_VIDEO } from '@/constants/images'
import { useContent, useI18n } from '@/i18n'

const { locale } = useI18n()
const content = useContent()

const bgVideo = ref<HTMLVideoElement | null>(null)
const bgPlaying = ref(false)

const home = computed(() => pagePath('home', locale.value))

onMounted(() => {
  const el = bgVideo.value
  if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const phone = window.matchMedia('(max-width: 767.98px)').matches
  el.src = phone ? HERO_BG_VIDEO.square : HERO_BG_VIDEO.wide
  el.play()
    .then(() => (bgPlaying.value = true))
    .catch(() => {})
})
</script>

<template>
  <section class="hero">
    <video
      ref="bgVideo"
      class="hero__video"
      :class="{ 'is-playing': bgPlaying }"
      muted
      loop
      playsinline
      preload="none"
      aria-hidden="true"
    />
    <div class="hero__inner">
      <div class="hero__head">
        <span class="tape">{{ content.hero.tape }}</span>
        <h1 class="hero__title">
          <template v-for="(line, i) in content.hero.titleLines" :key="line">
            <br v-if="i" />{{ line }}
          </template>
        </h1>
      </div>

      <div class="hero__text">
        <p class="hero__lead">{{ content.hero.lead }}</p>
        <ul class="hero__facts">
          <li v-for="f in content.hero.facts" :key="f">
            <BaseIcon name="check" />
            {{ f }}
          </li>
        </ul>
        <div class="cta">
          <RouterLink class="btn" :to="{ path: home, hash: '#estimate' }">
            {{ content.hero.ctaEstimate }}
          </RouterLink>
          <RouterLink class="btn btn--ghost-dark" :to="{ path: home, hash: '#layers' }">
            {{ content.hero.ctaProcess }}
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  margin-top: calc(-1 * var(--header-h));
  padding-top: var(--header-h);
  color: var(--hero-text);
  // заглушка — первый кадр ролика; затемнение лежит поверх ролика в ::after
  background: url('/images/hero/booth-red-1280.webp') center / cover no-repeat var(--hero-0);

  @include below(lg) {
    background-position: 85% center;
  }

  // телефон: текста много и он внизу — квадратный ролик сверху, маляр и бампер над заголовком
  @include below(md) {
    background-image: url('/images/hero/booth-red-720sq.webp');
    background-position: center top;
    background-size: 100% auto;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    // слева темнее под текст, книзу уходит в цвет следующей секции
    background:
      linear-gradient(90deg, rgb(29 25 18 / 0.96), rgb(29 25 18 / 0.86) 45%, rgb(29 25 18 / 0.65)),
      linear-gradient(transparent 60%, var(--hero-0));

    // планшет: текст внизу, сверху светлее
    @include below(lg) {
      background: linear-gradient(
        rgb(29 25 18 / 0.7),
        rgb(29 25 18 / 0.55) 20%,
        rgb(29 25 18 / 0.85) 50%,
        var(--hero-0) 90%
      );
    }

    // телефон: квадратный ролик сверху, ниже — сплошной тёмный под текст
    @include below(md) {
      background: linear-gradient(
        rgb(29 25 18 / 0.65),
        rgb(29 25 18 / 0.4) 15%,
        rgb(29 25 18 / 0.75) 35%,
        var(--hero-0) 44%
      );
    }
  }

  border-bottom: 4px solid var(--color-accent);
  overflow: hidden;

  &__video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;

    // планшет: узкий кадр — держим в нём маляра справа
    @include below(lg) {
      object-position: 85% center;
    }

    @include below(md) {
      height: auto;
      aspect-ratio: 1;
    }

    @include motion {
      transition: opacity 0.8s ease;
    }

    &.is-playing {
      opacity: 1;
    }
  }

  &__inner {
    @include container;
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'head' 'text';
    align-content: end;
    gap: var(--space-6);
    min-height: calc(100svh - var(--header-h) - var(--dock-h));
    padding-block: var(--space-8);

    // десктоп: текст слева по центру высоты, справа — ролик
    @include above(lg) {
      grid-template-columns: minmax(0, 640px);
      align-content: center;
      min-height: calc(100dvh - var(--header-h));
      padding-block: var(--space-12);
    }
  }

  &__head {
    grid-area: head;
  }

  &__text {
    grid-area: text;
  }

  &__title {
    margin: 0;
    font-size: clamp(2.6rem, 8vw, 5.5rem);
    line-height: 0.92;
  }

  &__lead {
    max-width: 52ch;
    margin: 0;
    font-size: 1.1rem;
    opacity: 0.85;
  }

  &__facts {
    display: grid;
    gap: var(--space-2);
    margin: var(--space-4) 0 var(--space-6);
    padding: 0;
    list-style: none;

    li {
      display: flex;
      align-items: flex-start;
      gap: var(--space-2);
      color: var(--hero-muted);
    }

    :deep(svg) {
      flex: none;
      margin-top: 0.15em;
      color: var(--color-accent);
    }
  }
}
</style>
