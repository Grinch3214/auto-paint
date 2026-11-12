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
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: 0.875rem;
}

.lang__link {
  opacity: 0.6;

  text-decoration: none;

  &[aria-current='true'] {
    opacity: 1;
    font-weight: 700;
  }
}
</style>
