<script setup lang="ts">
import InsuranceNote from '@/components/blocks/InsuranceNote.vue'
import PriceHowto from '@/components/blocks/PriceHowto.vue'
import PriceSummary from '@/components/blocks/PriceSummary.vue'
import EstimateSection from '@/components/sections/EstimateSection.vue'
import FaqSection from '@/components/sections/FaqSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import StagesSection from '@/components/sections/StagesSection.vue'
import VisitSection from '@/components/sections/VisitSection.vue'
import WorksSection from '@/components/sections/WorksSection.vue'
import { useBusinessSchema } from '@/composables/useBusinessSchema'
import { HOME_OG_IMAGE } from '@/constants/images'
import { FAQ_HOME } from '@/data/faq'
import { useI18n } from '@/i18n'
import { useSeo } from '@/seo/useSeo'
import { ogImageUrl } from '@/utils/image'

const { t } = useI18n()

useSeo({
  title: () => t((m) => m.home.seoTitle),
  description: () => t((m) => m.home.seoDescription),
  image: () => ogImageUrl(HOME_OG_IMAGE),
})

useBusinessSchema()
</script>

<template>
  <HeroSection />

  <ServicesSection>
    <PriceSummary />
    <PriceHowto />
    <InsuranceNote />
  </ServicesSection>

  <StagesSection />
  <WorksSection />
  <EstimateSection />
  <FaqSection :ids="FAQ_HOME" />
  <VisitSection />
</template>
