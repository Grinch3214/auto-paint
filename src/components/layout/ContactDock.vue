<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside, onKeyStroke } from '@vueuse/core'
import BaseIcon from '@/components/BaseIcon.vue'
import { SITE } from '@/config/site'
import { useI18n } from '@/i18n'
import { phoneLink, telegramLink, whatsappLink } from '@/utils/messengers'

const { t } = useI18n()

const root = ref<HTMLElement | null>(null)
const open = ref(false)

const close = () => (open.value = false)

onClickOutside(root, close)
onKeyStroke('Escape', close)
</script>

<template>
  <div class="dock-space" aria-hidden="true" />
  <Transition name="fade">
    <div v-if="open" class="dock-scrim" aria-hidden="true" />
  </Transition>
  <div ref="root" class="dock">
    <Transition name="sheet">
      <div v-if="open" id="dock-sheet" class="dock__sheet">
        <div class="dock__head">
          <p class="dock__title">{{ t((m) => m.contactDock.title) }}</p>
          <p class="dock__hours">
            <BaseIcon name="clock" />
            {{ t((m) => m.contactInfo.hoursWork) }}, {{ t((m) => m.contactInfo.hoursOff) }}
          </p>
        </div>
        <a
          class="dock__item"
          :href="whatsappLink(SITE.phone)"
          target="_blank"
          rel="noopener"
          @click="close"
        >
          <span class="dock__icon"><BaseIcon name="whatsapp" /></span>
          <span class="dock__text">
            <strong>WhatsApp</strong>
            <small>{{ t((m) => m.contactDock.whatsappHint) }}</small>
          </span>
          <BaseIcon name="arrow" class="dock__arrow" />
        </a>
        <a
          class="dock__item"
          :href="telegramLink(SITE.telegram)"
          target="_blank"
          rel="noopener"
          @click="close"
        >
          <span class="dock__icon"><BaseIcon name="telegram" /></span>
          <span class="dock__text">
            <strong>Telegram</strong>
            <small>{{ t((m) => m.contactDock.telegramHint) }}</small>
          </span>
          <BaseIcon name="arrow" class="dock__arrow" />
        </a>
        <a class="dock__item" :href="SITE.mapsUrl" target="_blank" rel="noopener" @click="close">
          <span class="dock__icon"><BaseIcon name="pin" /></span>
          <span class="dock__text">
            <strong>{{ t((m) => m.contactDock.route) }}</strong>
            <small>{{ t((m) => m.contactInfo.address) }}</small>
          </span>
          <BaseIcon name="arrow" class="dock__arrow" />
        </a>
      </div>
    </Transition>

    <div class="dock__bar">
      <a class="btn dock__btn dock__btn--call" :href="phoneLink(SITE.phone)">
        <BaseIcon name="phone" />
        {{ t((m) => m.contactInfo.call) }}
      </a>
      <button
        type="button"
        class="btn dock__btn"
        :aria-expanded="open"
        aria-controls="dock-sheet"
        @click="open = !open"
      >
        <BaseIcon :name="open ? 'close' : 'whatsapp'" />
        {{ t((m) => m.nav.cta) }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
// место под панель, чтобы она не закрывала низ подвала
.dock-space {
  height: calc(var(--dock-h) + env(safe-area-inset-bottom));
  background: var(--hero-0);

  @include above(lg) {
    display: none;
  }
}

.dock {
  position: fixed;
  inset: auto 0 0;
  z-index: 30;

  @include above(lg) {
    display: none;
  }

  &__bar {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-2);
    padding: var(--space-3) var(--gutter) calc(var(--space-3) + env(safe-area-inset-bottom));
    background: var(--header-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-top: 1px solid var(--hero-line);
  }

  &__btn {
    gap: var(--space-2);
    font: inherit;
    font-weight: 700;
    cursor: pointer;

    &--call {
      background: var(--color-surface);
      border-color: var(--color-surface);
      color: var(--color-text);

      .icon {
        color: var(--color-accent);
      }
    }
  }

  &__sheet {
    position: absolute;
    inset: auto var(--gutter) 100%;
    margin-bottom: var(--space-3);
    overflow: hidden;
    border-radius: var(--radius);
    background: var(--color-surface);
    color: var(--color-text);
    box-shadow: var(--shadow-pop);
  }

  // тёмная шапка в цвет hero и синяя полоска снизу — карточка не сливается с крафтом страницы
  &__head {
    padding: var(--space-3) var(--space-4);
    background: var(--hero-0);
    color: var(--hero-text);
    border-bottom: 3px solid var(--color-accent);

    p {
      margin: 0;
    }
  }

  &__title {
    font-family: var(--font-display);
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  &__hours {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-top: var(--space-1);
    color: var(--hero-muted);
    font-size: 0.8rem;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    text-decoration: none;

    & + & {
      border-top: 1px dashed var(--color-border);
    }
  }

  &__icon {
    flex: none;
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border: 1.5px solid var(--color-accent);
    border-radius: 50%;
    color: var(--color-accent);
  }

  &__text {
    flex: 1;

    strong,
    small {
      display: block;
    }

    strong {
      font-weight: 700;
    }

    small {
      color: var(--color-text-muted);
      font-size: 0.8rem;
    }
  }

  &__arrow {
    color: var(--color-text-muted);
  }
}

.dock-scrim {
  position: fixed;
  inset: 0;
  z-index: 29;
  background: var(--scrim);

  @include above(lg) {
    display: none;
  }
}

@include motion {
  .sheet-enter-active,
  .sheet-leave-active {
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
