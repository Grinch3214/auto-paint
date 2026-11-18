<script setup lang="ts">
import { computed } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'
import EstimateForm from '@/components/blocks/EstimateForm.vue'
import { SITE } from '@/config/site'
import { useContent } from '@/i18n'
import { whatsappLink } from '@/utils/messengers'

const content = useContent()

const waLink = computed(() => whatsappLink(SITE.phone, content.value.estimate.message))
</script>

<template>
  <section id="estimate" class="section estimate">
    <div class="estimate__intro">
      <span class="tape">{{ content.estimate.tape }}</span>
      <h2>{{ content.estimate.title }}</h2>
      <p class="lead">{{ content.estimate.lead }}</p>
    </div>

    <div class="estimate__form">
      <EstimateForm />

      <p class="estimate__or">{{ content.estimate.form.orMessenger }}</p>
      <div class="estimate__messengers">
        <a class="btn btn--ghost" :href="waLink" target="_blank" rel="noopener">
          <BaseIcon name="whatsapp" />
          WhatsApp
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.estimate {
  display: grid;
  gap: var(--space-6);

  @include above(lg) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
    gap: var(--space-12);
    align-items: start;
  }

  &__form {
    @include above(lg) {
      max-width: 560px;
    }
  }

  &__or {
    margin: var(--space-6) 0 var(--space-2);
    color: var(--color-text-muted);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: var(--caps);
  }

  &__messengers {
    display: grid;
    gap: var(--space-2);

    .btn {
      gap: var(--space-2);
    }
  }
}
</style>
