<script setup lang="ts">
import { useI18n } from '@/i18n'
import { useSeo } from '@/seo/useSeo'

const { t } = useI18n()

useSeo({
  title: () => t((m) => m.home.seoTitle),
  description: () => t((m) => m.home.seoDescription),
})
</script>

<template>
  <h1>{{ t((m) => m.home.h1) }}</h1>
  <p class="lead">{{ t((m) => m.home.lead) }}</p>
</template>

<style scoped lang="scss">
.lead {
  color: var(--color-text-muted);
}
</style>
