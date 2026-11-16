<script setup lang="ts">
import { computed } from 'vue'
import EstimateSection from '@/components/sections/EstimateSection.vue'
import FaqSection from '@/components/sections/FaqSection.vue'
import InfoCardsSection from '@/components/sections/InfoCardsSection.vue'
import PageHeroSection from '@/components/sections/PageHeroSection.vue'
import PaintCodeSection from '@/components/sections/PaintCodeSection.vue'
import RelatedServicesSection from '@/components/sections/RelatedServicesSection.vue'
import { SITE } from '@/config/site'
import { FAQ_COLOR_MATCH } from '@/data/faq'
import { COLOR_MATCH_RELATED } from '@/data/services'
import { useContent } from '@/i18n'
import { useSeo } from '@/seo/useSeo'
import { fillBrand } from '@/utils/format'

const content = useContent()

const text = computed(() => content.value.colorMatch)

useSeo({
  title: () => fillBrand(text.value.seoTitle, SITE.brand),
  description: () => text.value.seoDescription,
})
</script>

<template>
  <PageHeroSection page="colorMatch" :title="text.h1" :lead="text.lead" />
  <InfoCardsSection :heading="text.why" :items="text.why.items" />
  <InfoCardsSection :heading="text.steps" :items="text.steps.items" numbered />
  <PaintCodeSection />
  <EstimateSection />
  <RelatedServicesSection :ids="COLOR_MATCH_RELATED" />
  <FaqSection :ids="FAQ_COLOR_MATCH" />
</template>
