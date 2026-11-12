<script setup lang="ts">
import { computed, ref } from 'vue'
import { SITE } from '@/config/site'
import { ESTIMATE_PARTS } from '@/data/estimate'
import { useContent } from '@/i18n'
import { telegramShareLink, whatsappLink } from '@/utils/messengers'
import type { EstimatePartId } from '@/types/estimate'

const content = useContent()

const picked = ref<EstimatePartId[]>([])

const parts = computed(() =>
  ESTIMATE_PARTS.map((id) => ({ id, label: content.value.estimate.parts[id] })),
)
const message = computed(() => {
  const names = picked.value.map((id) => content.value.estimate.parts[id].toLowerCase())
  return content.value.estimate.message.replace('{parts}', names.length ? names.join(', ') : '…')
})
const waLink = computed(() => whatsappLink(SITE.phone, message.value))
const tgLink = computed(() => telegramShareLink(message.value))

function togglePart(id: EstimatePartId) {
  picked.value = picked.value.includes(id)
    ? picked.value.filter((x) => x !== id)
    : [...picked.value, id]
}
</script>

<template>
  <section id="estimate" class="section">
    <span class="tape">{{ content.estimate.tape }}</span>
    <h2>{{ content.estimate.title }}</h2>
    <p class="lead">{{ content.estimate.lead }}</p>
    <div class="chips">
      <button
        v-for="p in parts"
        :key="p.id"
        type="button"
        class="chip"
        :aria-pressed="picked.includes(p.id)"
        @click="togglePart(p.id)"
      >
        {{ p.label }}
      </button>
    </div>
    <p class="preview mono">{{ message }}</p>
    <div class="cta">
      <a class="btn" :href="waLink" target="_blank" rel="noopener">WhatsApp</a>
      <a class="btn btn--ghost" :href="tgLink" target="_blank" rel="noopener">Telegram</a>
    </div>
  </section>
</template>

<style scoped lang="scss">
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.chip {
  min-height: 44px;
  padding: 0 var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-surface);
  color: var(--color-text);
  font: inherit;
  cursor: pointer;

  &[aria-pressed='true'] {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: var(--on-accent);
  }
}

.preview {
  margin-top: var(--space-6);
  padding: var(--space-4);
  max-width: 640px;
  background: var(--color-surface);
  border-left: 4px solid var(--color-tape);
  font-size: 0.9rem;
}
</style>
