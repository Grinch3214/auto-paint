<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside, onKeyStroke } from '@vueuse/core'
import BaseIcon from '@/components/BaseIcon.vue'
import ContactSheet from '@/components/blocks/ContactSheet.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()

const root = ref<HTMLElement | null>(null)
const open = ref(false)

const close = () => (open.value = false)

onClickOutside(root, close)
onKeyStroke('Escape', close)
</script>

<template>
  <div ref="root" class="floating">
    <ContactSheet
      id="floating-sheet"
      class="floating__sheet"
      :open="open"
      with-call
      @close="close"
    />
    <button
      type="button"
      class="floating__btn"
      :class="{ 'is-open': open }"
      :aria-label="t((m) => (open ? m.lightbox.close : m.contactDock.title))"
      :aria-expanded="open"
      aria-controls="floating-sheet"
      @click="open = !open"
    >
      <BaseIcon :name="open ? 'close' : 'whatsapp'" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.floating {
  position: fixed;
  right: var(--space-6);
  bottom: var(--space-6);
  z-index: 30;

  @include below(lg) {
    display: none;
  }

  &__sheet {
    position: absolute;
    right: 0;
    bottom: calc(100% + var(--space-3));
    width: 320px;
  }

  &__btn {
    display: grid;
    place-items: center;
    width: 56px;
    height: 56px;
    border: 0;
    border-radius: 50%;
    background: var(--color-accent);
    color: var(--on-accent);
    font-size: 1.4rem;
    box-shadow: var(--shadow-pop);
    cursor: pointer;

    @include motion {
      transition: background-color 0.2s ease;
    }

    &:hover,
    &.is-open {
      background: var(--accent-ink);
    }
  }
}
</style>
