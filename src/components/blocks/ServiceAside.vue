<script setup lang="ts">
import BaseIcon from '@/components/BaseIcon.vue'
import { SITE } from '@/config/site'
import { useContent, useI18n } from '@/i18n'
import { phoneLink, whatsappLink } from '@/utils/messengers'

const { t } = useI18n()
const content = useContent()
</script>

<template>
  <aside class="aside">
    <div class="aside__card">
      <div class="aside__head">
        <span class="tape">{{ content.servicePages.aside.tape }}</span>
        <p class="aside__title">{{ content.servicePages.aside.title }}</p>
      </div>

      <!-- на телефоне и планшете эти кнопки уже есть в нижней панели -->
      <div class="aside__cta">
        <a class="btn" :href="phoneLink(SITE.phone)">
          <BaseIcon name="phone" />
          {{ SITE.phoneDisplay }}
        </a>
        <a class="btn btn--ghost" :href="whatsappLink(SITE.phone)" target="_blank" rel="noopener">
          <BaseIcon name="whatsapp" />
          {{ t((m) => m.contactInfo.whatsapp) }}
        </a>
      </div>

      <ul class="aside__info">
        <li>
          <BaseIcon name="clock" class="aside__icon" />
          <span>
            {{ t((m) => m.contactInfo.hoursWork) }}
            <small>{{ t((m) => m.contactInfo.hoursOff) }}</small>
          </span>
        </li>
        <li>
          <BaseIcon name="pin" class="aside__icon" />
          <span>
            {{ t((m) => m.contactInfo.address) }}
            <a class="aside__route" :href="SITE.mapsUrl" target="_blank" rel="noopener">
              {{ content.servicePages.aside.route }}
              <BaseIcon name="arrow" />
            </a>
          </span>
        </li>
      </ul>
    </div>

    <ul class="aside__facts">
      <li v-for="f in content.servicePages.aside.facts" :key="f.title" class="aside__fact">
        <BaseIcon name="check" class="aside__check" />
        <strong>{{ f.title }}</strong>
        <small>{{ f.text }}</small>
      </li>
    </ul>
  </aside>
</template>

<style scoped lang="scss">
.aside {
  display: grid;
  gap: var(--space-4);

  &__card {
    overflow: hidden;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
  }

  &__head {
    padding: var(--space-6) var(--space-6) var(--space-4);
    background:
      radial-gradient(ellipse 80% 90% at 50% 0%, rgb(255 255 255 / 0.1), transparent 70%),
      var(--hero-0);
    color: var(--hero-text);
    border-bottom: 3px solid var(--color-accent);

    .tape {
      margin-bottom: var(--space-2);
    }
  }

  &__title {
    margin: 0;
    font-family: var(--font-display);
    font-size: 1.15rem;
    font-weight: 700;
    line-height: 1.25;
  }

  &__cta {
    display: none;

    @include above(lg) {
      display: grid;
      gap: var(--space-2);
      padding: var(--space-6) var(--space-6) 0;
    }

    .btn {
      gap: var(--space-2);
    }
  }

  &__info {
    display: grid;
    gap: var(--space-4);
    margin: 0;
    padding: var(--space-6);
    list-style: none;

    li {
      display: flex;
      gap: var(--space-3);
      font-weight: 600;
    }

    small {
      display: block;
      color: var(--color-text-muted);
      font-size: 0.85rem;
      font-weight: 400;
    }
  }

  &__icon {
    flex: none;
    margin-top: 2px;
    color: var(--color-accent);
  }

  &__route {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    margin-top: var(--space-1);
    color: var(--accent-ink);
    font-size: 0.9rem;
    font-weight: 700;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &__facts {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-2);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__fact {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: var(--space-4);
    background: var(--color-surface);
    border: 1px dashed var(--color-border);
    border-radius: var(--radius);

    strong {
      font-size: 0.9rem;
      line-height: 1.25;
    }

    small {
      color: var(--color-text-muted);
      font-size: 0.8rem;
      line-height: 1.35;
    }
  }

  &__check {
    width: 20px;
    height: 20px;
    padding: 3px;
    margin-bottom: var(--space-1);
    border-radius: 50%;
    background: var(--color-accent);
    color: var(--on-accent);
  }
}
</style>
