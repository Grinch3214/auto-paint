<script setup lang="ts">
import { pagePath } from '@/config/pages'
import { useI18n } from '@/i18n'
import { useSeo } from '@/seo/useSeo'

const { t, locale } = useI18n()

useSeo({
  title: () => t((m) => m.notFound.seoTitle),
  noindex: true,
})
</script>

<template>
  <h1>{{ t((m) => m.notFound.h1) }}</h1>
  <RouterLink :to="pagePath('home', locale)">{{ t((m) => m.notFound.back) }}</RouterLink>
</template>
