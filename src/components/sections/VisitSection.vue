<script setup lang="ts">
import { computed } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { pagePath } from '@/config/pages'
import { SITE } from '@/config/site'
import { useContent, useI18n } from '@/i18n'
import { phoneLink } from '@/utils/messengers'

const { t, locale } = useI18n()
const content = useContent()

const rows = computed(() => [
  {
    key: 'address',
    icon: 'pin' as const,
    label: content.value.visit.addressLabel,
    value: t((m) => m.contactInfo.address),
  },
  {
    key: 'hours',
    icon: 'clock' as const,
    label: content.value.visit.hoursLabel,
    value: t((m) => m.contactInfo.hoursWork),
    note: t((m) => m.contactInfo.hoursOff),
  },
  {
    key: 'phone',
    icon: 'phone' as const,
    label: content.value.visit.phoneLabel,
    value: SITE.phoneDisplay,
    href: phoneLink(SITE.phone),
  },
])
</script>

<template>
  <section id="visit" class="section visit">
    <div class="visit__intro">
      <span class="tape">{{ content.visit.tape }}</span>
      <h2>{{ content.visit.title }}</h2>
      <p class="lead">{{ content.visit.lead }}</p>
    </div>

    <div class="visit__card">
      <dl class="visit__list">
        <div v-for="row in rows" :key="row.key" class="visit__row">
          <BaseIcon :name="row.icon" class="visit__icon" />
          <dt>{{ row.label }}</dt>
          <dd>
            <a v-if="row.href" class="visit__link" :href="row.href">{{ row.value }}</a>
            <template v-else>{{ row.value }}</template>
            <span v-if="row.note" class="visit__muted">{{ row.note }}</span>
          </dd>
        </div>
      </dl>

      <div class="visit__cta">
        <a class="btn" :href="SITE.mapsUrl" target="_blank" rel="noopener">
          <BaseIcon name="pin" />
          {{ content.visit.route }}
        </a>
        <a class="btn btn--ghost" :href="phoneLink(SITE.phone)">
          <BaseIcon name="phone" />
          {{ t((m) => m.contactInfo.call) }}
        </a>
      </div>

      <RouterLink class="visit__more" :to="pagePath('contacts', locale)">
        {{ content.visit.allContacts }}
        <BaseIcon name="arrow" />
      </RouterLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
.visit {
  @include above(lg) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-12);
    align-items: center;
  }

  &__card {
    margin-top: var(--space-6);
    padding: var(--space-6);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-top: 4px solid var(--color-accent);
    border-radius: var(--radius);

    @include above(lg) {
      margin-top: 0;
    }
  }

  &__list {
    display: grid;
    gap: var(--space-4);
    margin: 0;
  }

  // иконка слева на две строки, справа подпись и значение
  &__row {
    display: grid;
    grid-template-columns: 24px 1fr;
    column-gap: var(--space-3);

    dt {
      grid-column: 2;
      color: var(--color-text-muted);
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: var(--caps);
    }

    dd {
      grid-column: 2;
      margin: 0;
      font-weight: 600;
    }
  }

  &__icon {
    grid-row: 1 / span 2;
    margin-top: 2px;
    color: var(--color-accent);
  }

  &__muted {
    display: block;
    color: var(--color-text-muted);
    font-weight: 400;
  }

  &__link {
    text-decoration: none;
    font-variant-numeric: tabular-nums;
  }

  &__cta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin-top: var(--space-6);

    .btn {
      gap: var(--space-2);
    }
  }

  &__more {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    margin-top: var(--space-4);
    color: var(--accent-ink);
    font-weight: 700;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
