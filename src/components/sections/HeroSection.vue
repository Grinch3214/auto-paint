<script setup lang="ts">
import { computed, ref } from 'vue'
import HeroCar from '@/components/HeroCar.vue'
import { pagePath } from '@/config/pages'
import { SWATCHES } from '@/data/swatches'
import { useContent, useI18n } from '@/i18n'

const { locale } = useI18n()
const content = useContent()

const swatchIndex = ref(0)

const swatch = computed(() => SWATCHES[swatchIndex.value] ?? SWATCHES[0]!)
const home = computed(() => pagePath('home', locale.value))

const nextColor = () => (swatchIndex.value = (swatchIndex.value + 1) % SWATCHES.length)
</script>

<template>
  <section class="hero" :style="{ '--car': swatch.color }">
    <div class="hero__lamps" aria-hidden="true"><i /><i /><i /></div>
    <p class="hero__eyebrow">{{ content.hero.eyebrow }}</p>
    <h1 class="hero__title">
      <template v-for="(line, i) in content.hero.titleLines" :key="line">
        <br v-if="i" />{{ line }}
      </template>
    </h1>

    <button class="hero__car" type="button" :aria-label="content.hero.recolor" @click="nextColor">
      <HeroCar />
    </button>

    <div class="hero__bottom">
      <div class="dots" role="radiogroup" :aria-label="content.hero.colorPicker">
        <button
          v-for="(s, i) in SWATCHES"
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
      <p class="hero__lead">{{ content.hero.lead }}</p>
      <div class="cta">
        <RouterLink class="btn" :to="{ path: home, hash: '#estimate' }">
          {{ content.hero.ctaEstimate }}
        </RouterLink>
        <RouterLink class="btn btn--ghost-dark" :to="{ path: home, hash: '#layers' }">
          {{ content.hero.ctaProcess }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  margin-top: calc(-1 * var(--header-h));
  padding: calc(var(--header-h) + 32px) var(--gutter) var(--space-12);
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
</style>
