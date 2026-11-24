<script setup lang="ts">
import { computed } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'
import MapEmbed from '@/components/blocks/MapEmbed.vue'
import { SITE } from '@/config/site'
import { useContent, useI18n } from '@/i18n'
import { mailLink, phoneLink, whatsappLink } from '@/utils/messengers'

const { t } = useI18n()
const content = useContent()

const text = computed(() => content.value.contactsPage)
const channels = computed(() => [
  {
    key: 'phone',
    icon: 'phone' as const,
    title: text.value.channels.phone,
    value: SITE.phoneDisplay,
    hint: text.value.channels.phoneHint,
    href: phoneLink(SITE.phone),
    external: false,
  },
  {
    key: 'whatsapp',
    icon: 'whatsapp' as const,
    title: text.value.channels.whatsapp,
    value: SITE.phoneDisplay,
    hint: text.value.channels.whatsappHint,
    href: whatsappLink(SITE.phone),
    external: true,
  },
  {
    key: 'email',
    icon: 'mail' as const,
    title: text.value.channels.email,
    value: SITE.email,
    hint: text.value.channels.emailHint,
    href: mailLink(SITE.email),
    external: false,
  },
])
</script>

<template>
  <section class="section">
    <span class="tape">{{ text.channels.tape }}</span>
    <h2>{{ text.channels.title }}</h2>
    <ul class="channels">
      <li v-for="c in channels" :key="c.key">
        <a
          class="channel"
          :href="c.href"
          :target="c.external ? '_blank' : undefined"
          :rel="c.external ? 'noopener' : undefined"
        >
          <span class="channel__icon"><BaseIcon :name="c.icon" /></span>
          <span class="channel__title">{{ c.title }}</span>
          <strong class="channel__value">{{ c.value }}</strong>
          <small class="channel__hint">{{ c.hint }}</small>
        </a>
      </li>
    </ul>
  </section>

  <section class="section visit">
    <div class="visit__info">
      <span class="tape">{{ text.visit.tape }}</span>
      <h2>{{ text.visit.title }}</h2>
      <dl class="visit__list">
        <div class="visit__row">
          <BaseIcon name="pin" class="visit__icon" />
          <dt>{{ text.visit.address }}</dt>
          <dd>{{ t((m) => m.contactInfo.address) }}</dd>
        </div>
        <div class="visit__row">
          <BaseIcon name="clock" class="visit__icon" />
          <dt>{{ text.visit.hours }}</dt>
          <dd>
            {{ t((m) => m.contactInfo.hoursWork) }}
            <span class="visit__muted">{{ t((m) => m.contactInfo.hoursOff) }}</span>
          </dd>
        </div>
      </dl>
      <ul class="visit__notes">
        <li v-for="note in text.visit.notes" :key="note">{{ note }}</li>
      </ul>
      <div class="cta">
        <a class="btn" :href="SITE.mapsRouteUrl" target="_blank" rel="noopener">
          <BaseIcon name="pin" />
          {{ text.visit.route }}
        </a>
        <a class="btn btn--ghost" :href="phoneLink(SITE.phone)">
          <BaseIcon name="phone" />
          {{ t((m) => m.contactInfo.call) }}
        </a>
      </div>
    </div>

    <MapEmbed class="map" />
  </section>
</template>

<style scoped lang="scss">
.channels {
  display: grid;
  gap: var(--space-3);
  margin: var(--space-6) 0 0;
  padding: 0;
  list-style: none;

  @include above(md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include above(lg) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.channel {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  height: 100%;
  padding: var(--space-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  text-decoration: none;

  &:hover {
    border-color: var(--color-accent);
  }

  @include below(md) {
    display: grid;
    grid-template-columns: 40px minmax(0, 1fr);
    column-gap: var(--space-4);
    row-gap: 0;
    align-items: center;
    padding: var(--space-4);
  }

  &__icon {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    margin-bottom: var(--space-2);
    border-radius: 50%;
    background: var(--color-accent);
    color: var(--on-accent);

    @include below(md) {
      grid-row: 1 / span 3;
      margin-bottom: 0;
    }
  }

  &__title {
    color: var(--color-text-muted);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: var(--caps);
  }

  &__value {
    font-size: 1.05rem;
    font-variant-numeric: tabular-nums;
    overflow-wrap: anywhere;
  }

  &__hint {
    color: var(--color-text-muted);
    font-size: 0.85rem;
  }
}

.visit {
  display: grid;
  gap: var(--space-8);

  @include above(lg) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
    gap: var(--space-12);
    align-items: start;
  }

  &__list {
    display: grid;
    gap: var(--space-4);
    margin: var(--space-6) 0 0;
  }

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
      font-size: 1.1rem;
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
    font-size: 1rem;
    font-weight: 400;
  }

  &__notes {
    display: grid;
    gap: var(--space-2);
    margin: var(--space-6) 0 0;
    padding: 0;
    list-style: none;

    li {
      padding: var(--space-3) var(--space-4);
      background: var(--color-surface);
      border-left: 4px solid var(--color-tape);
      font-size: 0.95rem;
    }
  }

  .btn {
    gap: var(--space-2);
  }
}

.map {
  aspect-ratio: 4 / 3;

  // десктоп: карта едет рядом, пока читают адрес и подсказки
  @include above(lg) {
    position: sticky;
    top: calc(var(--header-h) + var(--space-6));
  }
}
</style>
