<script setup lang="ts">
import BaseIcon from '@/components/BaseIcon.vue'
import { useNavLinks } from '@/composables/useNavLinks'
import { SITE } from '@/config/site'
import { useI18n } from '@/i18n'
import { mailLink, phoneLink, whatsappLink } from '@/utils/messengers'
import SiteLogo from './SiteLogo.vue'

const { t } = useI18n()
const { pageLinks } = useNavLinks()
</script>

<template>
  <footer class="footer">
    <div class="footer__grid">
      <div class="footer__col">
        <SiteLogo tagline />
        <p class="footer__about">{{ t((m) => m.footer.about) }}</p>
      </div>

      <nav class="footer__col" :aria-label="t((m) => m.footer.navTitle)">
        <h2 class="footer__title">{{ t((m) => m.footer.navTitle) }}</h2>
        <RouterLink v-for="l in pageLinks" :key="l.key" :to="l.to" class="footer__link">
          {{ l.label }}
        </RouterLink>
      </nav>

      <div class="footer__col">
        <h2 class="footer__title">{{ t((m) => m.footer.hoursTitle) }}</h2>
        <p>{{ t((m) => m.contactInfo.hoursWork) }}</p>
        <p class="footer__muted">{{ t((m) => m.contactInfo.hoursOff) }}</p>
        <p class="footer__address">{{ t((m) => m.contactInfo.address) }}</p>
        <a class="footer__line footer__link" :href="SITE.mapsUrl" target="_blank" rel="noopener">
          <BaseIcon name="pin" />
          {{ t((m) => m.contactInfo.maps) }}
        </a>
      </div>

      <div class="footer__col footer__col--contacts">
        <h2 class="footer__title">{{ t((m) => m.footer.contactsTitle) }}</h2>
        <a class="footer__line footer__phone" :href="phoneLink(SITE.phone)">
          <BaseIcon name="phone" />
          {{ SITE.phoneDisplay }}
        </a>
        <a
          class="footer__line footer__link"
          :href="whatsappLink(SITE.phone)"
          target="_blank"
          rel="noopener"
        >
          <BaseIcon name="whatsapp" />
          {{ t((m) => m.contactInfo.whatsapp) }}
        </a>
        <a class="footer__line footer__link" :href="mailLink(SITE.email)">
          <BaseIcon name="mail" />
          {{ SITE.email }}
        </a>
        <a class="btn btn--small footer__btn" :href="phoneLink(SITE.phone)">
          {{ t((m) => m.contactInfo.call) }}
        </a>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="footer__bottom-inner">
        <p>{{ t((m) => m.footer.note) }}</p>
        <p>© {{ SITE.copyrightYear }} {{ SITE.brand }}. {{ t((m) => m.footer.rights) }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: var(--hero-0);
  color: var(--hero-text);
  font-size: 0.9rem;

  p {
    margin: 0;
  }

  &__grid {
    @include container;
    display: grid;
    gap: var(--space-8);
    padding-block: var(--space-12);

    @include above(md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include above(lg) {
      grid-template-columns: 1.3fr 1fr 1fr 1.2fr;
    }
  }

  &__col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);

    // на телефоне контакты нужнее всего — поднимаем их наверх
    &--contacts {
      @include below(md) {
        order: -1;
      }
    }
  }

  &__about {
    margin-top: var(--space-2);
    max-width: 32ch;
    color: var(--hero-muted);
  }

  &__muted {
    color: var(--hero-muted);
  }

  &__title {
    margin: 0 0 var(--space-2);
    font-family: var(--font-text);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  &__line {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
  }

  &__address {
    margin-top: var(--space-3);
  }

  &__link {
    color: var(--hero-muted);
    text-decoration: none;

    &:hover {
      color: var(--hero-text);
    }
  }

  &__phone {
    font-size: 1.05rem;
    font-weight: 700;
    text-decoration: none;
  }

  &__btn {
    margin-top: var(--space-3);
  }

  &__bottom {
    border-top: 1px solid var(--hero-line);
    color: var(--hero-muted);
    font-size: 0.78rem;
  }

  &__bottom-inner {
    @include container;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--space-2) var(--space-8);
    padding-block: var(--space-6);
  }
}
</style>
