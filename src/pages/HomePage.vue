<script setup lang="ts">
import { computed, ref } from 'vue'
import InsuranceNote from '@/components/blocks/InsuranceNote.vue'
import PriceHowto from '@/components/blocks/PriceHowto.vue'
import PriceTable from '@/components/blocks/PriceTable.vue'
import EstimateSection from '@/components/sections/EstimateSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import PassportSection from '@/components/sections/PassportSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import StagesSection from '@/components/sections/StagesSection.vue'
import WorksSection from '@/components/sections/WorksSection.vue'
import { SWATCHES } from '@/data/swatches'
import { useI18n } from '@/i18n'
import { useSeo } from '@/seo/useSeo'

const { t } = useI18n()

useSeo({
  title: () => t((m) => m.home.seoTitle),
  description: () => t((m) => m.home.seoDescription),
})

const swatchIndex = ref(0)

// цвет машины из hero подхватывают полоски карточек услуг и шапка паспорта
const swatch = computed(() => SWATCHES[swatchIndex.value] ?? SWATCHES[0]!)
</script>

<template>
  <div :style="{ '--car': swatch.color }">
    <HeroSection :swatch-index="swatchIndex" @select-color="swatchIndex = $event" />

    <ServicesSection>
      <PriceTable />
      <PriceHowto />
      <InsuranceNote />
    </ServicesSection>

    <StagesSection />
    <WorksSection />
    <PassportSection />
    <EstimateSection />
  </div>
</template>
