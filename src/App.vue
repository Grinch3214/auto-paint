<script setup lang="ts">
import ContactDock from '@/components/layout/ContactDock.vue'
import FloatingCall from '@/components/layout/FloatingCall.vue'
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
  <FloatingCall />
</template>
