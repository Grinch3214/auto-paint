<script setup lang="ts">
import { computed } from 'vue'
import ContactsSection from '@/components/sections/ContactsSection.vue'
import EstimateSection from '@/components/sections/EstimateSection.vue'
import FaqSection from '@/components/sections/FaqSection.vue'
import PageHeroSection from '@/components/sections/PageHeroSection.vue'
import { useBusinessSchema } from '@/composables/useBusinessSchema'
import { SITE } from '@/config/site'
import { FAQ_CONTACTS } from '@/data/faq'
import { useContent } from '@/i18n'
import { useSeo } from '@/seo/useSeo'
import { fillBrand } from '@/utils/format'

const content = useContent()

const text = computed(() => content.value.contactsPage)

useSeo({
  title: () => fillBrand(text.value.seoTitle, SITE.brand),
  description: () => fillBrand(text.value.seoDescription, SITE.brand),
})

useBusinessSchema()
</script>

<template>
  <PageHeroSection page="contacts" :title="text.h1" :lead="text.lead" />
  <ContactsSection />
  <EstimateSection />
  <FaqSection :ids="FAQ_CONTACTS" />
</template>
