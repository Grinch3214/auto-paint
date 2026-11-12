<script setup lang="ts">
import { SITE } from '@/config/site'
import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>

<template>
  <footer class="footer">
    <span>{{ SITE.brand }} · {{ t((m) => m.footer.tagline) }}</span>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  @include container;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-4);
  padding-block: var(--space-8);
  border-top: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-size: 0.875rem;
}
</style>
