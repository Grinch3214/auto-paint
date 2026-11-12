<script setup lang="ts">
import { computed, ref } from 'vue'
import { SITE } from '@/config/site'
import { ESTIMATE_PARTS } from '@/data/estimate'
import { SWATCHES } from '@/data/swatches'
import { useContent, useI18n } from '@/i18n'
import { useSeo } from '@/seo/useSeo'
import InsuranceNote from '@/components/blocks/InsuranceNote.vue'
import PriceHowto from '@/components/blocks/PriceHowto.vue'
import PriceTable from '@/components/blocks/PriceTable.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import PassportSection from '@/components/sections/PassportSection.vue'
import StagesSection from '@/components/sections/StagesSection.vue'
import WorksSection from '@/components/sections/WorksSection.vue'
import { telegramShareLink, whatsappLink } from '@/utils/messengers'
import type { EstimatePartId } from '@/types/estimate'

const { t } = useI18n()
const content = useContent()

useSeo({
  title: () => t((m) => m.home.seoTitle),
  description: () => t((m) => m.home.seoDescription),
})

const swatchIndex = ref(0)
const picked = ref<EstimatePartId[]>([])

const swatch = computed(() => SWATCHES[swatchIndex.value] ?? SWATCHES[0]!)
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
  <div class="home" :style="{ '--car': swatch.color }">
    <HeroSection :swatch-index="swatchIndex" @select-color="swatchIndex = $event" />

    <ServicesSection>
      <PriceTable />
      <PriceHowto />
      <InsuranceNote />
    </ServicesSection>

    <StagesSection />

    <WorksSection />

    <PassportSection />

    <!-- ===== ОЦЕНКА ПО ФОТО ===== -->
    <section id="estimate" class="section">
      <span class="tape">оценка по фото</span>
      <h2>Что нужно покрасить?</h2>
      <p class="lead">Отметьте детали — мы подставим их в сообщение. Фото прикрепите уже в чате.</p>
      <div class="chips">
        <button
          v-for="p in parts"
          :key="p.id"
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
  </div>
</template>

<style scoped lang="scss">
.home {
  --car: #a8121c;
}

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
