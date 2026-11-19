<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import BaseIcon from '@/components/BaseIcon.vue'
import { pagePath } from '@/config/pages'
import { useI18n } from '@/i18n'
import {
  LANG_SUGGEST,
  LANG_SUGGEST_BROWSER_LANGS,
  LANG_SUGGEST_STORAGE_KEY,
} from '@/i18n/langSuggest'
import { DEFAULT_LOCALE } from '@/i18n/locales'

const route = useRoute()
const { locale } = useI18n()

const suggested = ref(false)

const visible = computed(() => suggested.value && locale.value !== DEFAULT_LOCALE)
const ruPath = computed(() => pagePath(route.meta.pageId ?? 'home', DEFAULT_LOCALE))

function dismiss() {
  suggested.value = false
  try {
    localStorage.setItem(LANG_SUGGEST_STORAGE_KEY, '1')
  } catch {}
}

// решаем один раз, по странице входа: кто сам переключил язык на сайте, подсказку не увидит.
// Только после гидрации — язык браузера на пререндере неизвестен
onMounted(() => {
  if (locale.value === DEFAULT_LOCALE) return
  try {
    if (localStorage.getItem(LANG_SUGGEST_STORAGE_KEY)) return
  } catch {}
  const browser = navigator.languages?.length ? navigator.languages : [navigator.language]
  const primary = browser[0]?.toLowerCase().split('-')[0] ?? ''
  suggested.value = (LANG_SUGGEST_BROWSER_LANGS as readonly string[]).includes(primary)
})
</script>

<template>
  <div v-if="visible" class="suggest" lang="ru" role="region" :aria-label="LANG_SUGGEST.text">
    <p class="suggest__text">{{ LANG_SUGGEST.text }}</p>
    <RouterLink class="btn suggest__go" :to="ruPath" hreflang="ru" @click="dismiss">
      {{ LANG_SUGGEST.go }}
    </RouterLink>
    <button type="button" class="suggest__close" :aria-label="LANG_SUGGEST.close" @click="dismiss">
      <BaseIcon name="close" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.suggest {
  position: fixed;
  z-index: 31;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-1) var(--space-2) var(--space-4);
  border: 1px solid var(--hero-line);
  border-radius: var(--radius);
  background: var(--hero-0);
  color: var(--hero-text);
  box-shadow: var(--shadow-pop);

  // мобила и планшет: над нижней панелью с кнопками, по ширине экрана с отступами
  @include below(lg) {
    left: var(--gutter);
    right: var(--gutter);
    bottom: calc(var(--dock-h) + env(safe-area-inset-bottom) + var(--space-3));
  }

  // десктоп: слева внизу, справа — кнопка связи
  @include above(lg) {
    left: var(--space-6);
    bottom: var(--space-6);
    max-width: calc(100vw - 2 * var(--space-6) - 80px);
  }

  &__text {
    flex: 1;
    min-width: 0;
    margin: 0;
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 1.3;
  }

  &__go {
    flex: none;
    min-height: 40px;
    padding: var(--space-2) var(--space-4);
  }

  &__close {
    display: grid;
    flex: none;
    place-items: center;
    width: 40px;
    height: 40px;
    padding: 0;
    border: 0;
    border-radius: var(--radius);
    appearance: none;
    background: none;
    color: var(--hero-muted);
    font-size: 1.1rem;

    &:hover {
      color: var(--hero-text);
    }
  }
}
</style>
