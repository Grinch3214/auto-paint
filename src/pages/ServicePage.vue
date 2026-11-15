<script setup lang="ts">
import { computed } from 'vue'
import EstimateSection from '@/components/sections/EstimateSection.vue'
import FaqSection from '@/components/sections/FaqSection.vue'
import RelatedServicesSection from '@/components/sections/RelatedServicesSection.vue'
import ServiceHeroSection from '@/components/sections/ServiceHeroSection.vue'
import ServiceOverviewSection from '@/components/sections/ServiceOverviewSection.vue'
import StagesSection from '@/components/sections/StagesSection.vue'
import WorksSection from '@/components/sections/WorksSection.vue'
import { SITE } from '@/config/site'
import { SERVICE_PAGES } from '@/data/servicePages'
import { useContent } from '@/i18n'
import { useSeo } from '@/seo/useSeo'
import { fillBrand } from '@/utils/format'
import type { ServicePageId } from '@/types/pages'

const props = defineProps<{ id: ServicePageId }>()

const content = useContent()

const page = computed(() => SERVICE_PAGES[props.id])
const text = computed(() => content.value.servicePages.items[props.id])

useSeo({
  title: () => fillBrand(text.value.seoTitle, SITE.brand),
  description: () => text.value.seoDescription,
})
</script>

<template>
  <ServiceHeroSection :id="id" :work="page.heroWork" />
  <ServiceOverviewSection :id="id" :prices="page.prices" />
  <StagesSection v-if="page.stages" :ids="page.stages" />
  <WorksSection :page="id" />
  <EstimateSection />
  <RelatedServicesSection v-if="page.related" :ids="page.related" />
  <FaqSection :ids="page.faq" />
</template>
