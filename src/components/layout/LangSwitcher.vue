<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { pagePath } from '@/config/pages'
import { useI18n } from '@/i18n'
import { visibleLocales } from '@/i18n/locales'

const route = useRoute()
const { t, locale } = useI18n()

const links = computed(() =>
  visibleLocales().map((l) => ({
    ...l,
    to: pagePath(route.meta.pageId ?? 'home', l.code),
  })),
)
</script>

<template>
  <nav class="lang" :aria-label="t((m) => m.langSwitcher)">
    <RouterLink
      v-for="l in links"
      :key="l.code"
      :to="l.to"
      :hreflang="l.hreflang"
      :aria-current="l.code === locale ? 'true' : undefined"
      class="lang__link"
    >
      {{ l.label }}
    </RouterLink>
  </nav>
</template>

<style scoped lang="scss">
.lang {
  display: flex;
  padding: 2px;
  border: 1px solid rgb(255 255 255 / 0.18);
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.lang__link {
  min-width: 2.25rem;
  padding: 0.3rem 0.5rem;
  border-radius: 999px;
  text-align: center;
  text-decoration: none;
  opacity: 0.6;

  @include motion {
    transition:
      opacity 0.2s ease,
      background-color 0.2s ease;
  }

  &:hover {
    opacity: 1;
  }

  &[aria-current='true'] {
    opacity: 1;
    background: rgb(255 255 255 / 0.12);
  }
}
</style>
