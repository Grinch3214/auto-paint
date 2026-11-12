<script setup lang="ts">
import { pagePath } from '@/config/pages'
import { SITE } from '@/config/site'
import { useI18n } from '@/i18n'
import LangSwitcher from './LangSwitcher.vue'

const { t, locale } = useI18n()
</script>

<template>
  <header class="header">
    <RouterLink :to="pagePath('home', locale)" class="logo">{{ SITE.brand }}</RouterLink>
    <nav class="nav">
      <RouterLink :to="pagePath('home', locale)">{{ t((m) => m.nav.home) }}</RouterLink>
      <RouterLink :to="pagePath('contacts', locale)">{{ t((m) => m.nav.contacts) }}</RouterLink>
    </nav>
    <LangSwitcher />
  </header>
</template>

<style scoped lang="scss">
.header {
  @include container;
  display: flex;
  align-items: center;
  gap: var(--space-6);
  padding-block: var(--space-4);
}

.logo {
  font-weight: 700;
  margin-inline-end: auto;
}

.nav {
  display: flex;
  gap: var(--space-4);

  @include below(md) {
    display: none;
  }
}
</style>
