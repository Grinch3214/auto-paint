<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside, onKeyStroke } from '@vueuse/core'
import BaseIcon from '@/components/BaseIcon.vue'
import ContactSheet from '@/components/blocks/ContactSheet.vue'
import { SITE } from '@/config/site'
import { useI18n } from '@/i18n'
import { phoneLink } from '@/utils/messengers'

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
    <ContactSheet id="dock-sheet" class="dock__sheet" :open="open" @close="close" />

    <div class="dock__bar">
      <a class="btn dock__btn" :href="phoneLink(SITE.phone)">
        <BaseIcon name="phone" />
        {{ t((m) => m.contactInfo.call) }}
      </a>
      <button
        type="button"
        class="btn dock__btn dock__btn--light"
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
    border-top: 1px solid var(--hero-line);
  }

  &__btn {
    gap: var(--space-2);
    font: inherit;
    font-weight: 700;
    cursor: pointer;

    &--light {
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
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
