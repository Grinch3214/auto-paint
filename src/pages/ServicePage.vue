<script setup lang="ts">
import { computed } from 'vue'
import CaseStudySection from '@/components/sections/CaseStudySection.vue'
import EstimateSection from '@/components/sections/EstimateSection.vue'
import FaqSection from '@/components/sections/FaqSection.vue'
import PageHeroSection from '@/components/sections/PageHeroSection.vue'
import RelatedServicesSection from '@/components/sections/RelatedServicesSection.vue'
import ServiceBlocksSection from '@/components/sections/ServiceBlocksSection.vue'
import ServiceOverviewSection from '@/components/sections/ServiceOverviewSection.vue'
import StagesSection from '@/components/sections/StagesSection.vue'
import WorksSection from '@/components/sections/WorksSection.vue'
import { SITE } from '@/config/site'
import { SERVICE_BLOCKS } from '@/data/blocks'
import { SERVICE_PAGES } from '@/data/servicePages'
import { WORKS } from '@/data/works'
import { useContent } from '@/i18n'
import { useSeo } from '@/seo/useSeo'
import { fillBrand } from '@/utils/format'
import { ogImageUrl } from '@/utils/image'
import type { ServicePageId } from '@/types/pages'

const props = defineProps<{ id: ServicePageId }>()

const content = useContent()

const page = computed(() => SERVICE_PAGES[props.id])
const text = computed(() => content.value.servicePages.items[props.id])
const pricesInBlocks = computed(() =>
  (page.value.blocks ?? []).some((id) => SERVICE_BLOCKS.find((b) => b.id === id)?.prices?.length),
)

useSeo({
  title: () => fillBrand(text.value.seoTitle, SITE.brand),
  description: () => text.value.seoDescription,
  image: () => {
    const work = WORKS.find((w) => w.id === page.value.heroWork)
    return work && ogImageUrl(work.image)
  },
})
</script>

<template>
  <PageHeroSection
    :page="id"
    :title="text.h1"
    :lead="text.lead"
    :work="page.heroWork"
    :caption="text.photoCaption"
  />
  <ServiceOverviewSection :id="id" :prices="page.prices" :prices-in-blocks="pricesInBlocks" />
  <ServiceBlocksSection
    v-if="page.blocks && text.blocks"
    :ids="page.blocks"
    :heading="text.blocks"
  />
  <StagesSection v-if="page.stages" :ids="page.stages" />
  <CaseStudySection v-if="page.case" :id="page.case" />
  <WorksSection :page="id" />
  <EstimateSection />
  <RelatedServicesSection v-if="page.related" :ids="page.related" />
  <FaqSection :ids="page.faq" />
</template>
