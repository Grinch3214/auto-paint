<script setup lang="ts">
import { computed } from 'vue'
import PriceHowto from '@/components/blocks/PriceHowto.vue'
import PriceTable from '@/components/blocks/PriceTable.vue'
import EstimateSection from '@/components/sections/EstimateSection.vue'
import FaqSection from '@/components/sections/FaqSection.vue'
import InfoCardsSection from '@/components/sections/InfoCardsSection.vue'
import PageHeroSection from '@/components/sections/PageHeroSection.vue'
import { SITE } from '@/config/site'
import { FAQ_PRICES } from '@/data/faq'
import { useContent } from '@/i18n'
import { useSeo } from '@/seo/useSeo'
import { fillBrand } from '@/utils/format'

const content = useContent()

const text = computed(() => content.value.pricesPage)

useSeo({
  title: () => fillBrand(text.value.seoTitle, SITE.brand),
  description: () => text.value.seoDescription,
})
</script>

<template>
  <PageHeroSection page="prices" :title="text.h1" :lead="text.lead" />
  <section class="section">
    <span class="tape">{{ text.table.tape }}</span>
    <h2>{{ text.table.title }}</h2>
    <PriceTable />
  </section>
  <InfoCardsSection :heading="text.factors" :items="text.factors.items">
    <PriceHowto />
  </InfoCardsSection>
  <EstimateSection />
  <FaqSection :ids="FAQ_PRICES" />
</template>
