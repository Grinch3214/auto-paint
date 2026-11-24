<script setup lang="ts">
import { SITE } from '@/config/site'
import { useI18n } from '@/i18n'

const { t, locale } = useI18n()
</script>

<template>
  <div class="map-embed">
    <iframe
      class="map-embed__frame"
      :src="`${SITE.mapsEmbedUrl}&hl=${locale}`"
      :title="t((m) => m.contactInfo.mapTitle)"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    />
  </div>
</template>

<style scoped lang="scss">
.map-embed {
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  // пока карта грузится — сетка улиц вместо пустого прямоугольника
  background:
    repeating-linear-gradient(0deg, var(--hero-line) 0 1px, transparent 1px 48px),
    repeating-linear-gradient(90deg, var(--hero-line) 0 1px, transparent 1px 48px), var(--hero-0);

  &__frame {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
  }
}
</style>
