<script setup lang="ts">
import ContactDock from '@/components/layout/ContactDock.vue'
import FloatingContact from '@/components/layout/FloatingContact.vue'
import LangSuggest from '@/components/layout/LangSuggest.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import SiteHeader from '@/components/layout/SiteHeader.vue'
</script>

<template>
  <SiteHeader />
  <main>
    <RouterView />
  </main>
  <SiteFooter />
  <ContactDock />
  <FloatingContact />
  <LangSuggest />
</template>
