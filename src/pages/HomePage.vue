<script setup lang="ts">
import InsuranceNote from '@/components/blocks/InsuranceNote.vue'
import PriceHowto from '@/components/blocks/PriceHowto.vue'
import PriceTable from '@/components/blocks/PriceTable.vue'
import EstimateSection from '@/components/sections/EstimateSection.vue'
import FaqSection from '@/components/sections/FaqSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import PassportSection from '@/components/sections/PassportSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import StagesSection from '@/components/sections/StagesSection.vue'
import VisitSection from '@/components/sections/VisitSection.vue'
import WorksSection from '@/components/sections/WorksSection.vue'
import { FAQ_HOME } from '@/data/faq'
import { HOME_PRICE_GROUPS } from '@/data/prices'
import { useI18n } from '@/i18n'
import { useSeo } from '@/seo/useSeo'

const { t } = useI18n()

useSeo({
  title: () => t((m) => m.home.seoTitle),
  description: () => t((m) => m.home.seoDescription),
})
</script>

<template>
  <HeroSection />

  <ServicesSection>
    <PriceTable :groups="HOME_PRICE_GROUPS" />
    <PriceHowto />
    <InsuranceNote />
  </ServicesSection>

  <StagesSection />
  <WorksSection />
  <PassportSection />
  <EstimateSection />
  <FaqSection :ids="FAQ_HOME" />
  <VisitSection />
</template>
