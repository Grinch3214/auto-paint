<script setup lang="ts">
import { useI18n } from '@/i18n'
import { useSeo } from '@/seo/useSeo'

const { t } = useI18n()

useSeo({
  title: () => t((m) => m.contacts.seoTitle),
  description: () => t((m) => m.contacts.seoDescription),
})
</script>

<template>
  <h1>{{ t((m) => m.contacts.h1) }}</h1>
  <p>{{ t((m) => m.contacts.lead) }}</p>
</template>
