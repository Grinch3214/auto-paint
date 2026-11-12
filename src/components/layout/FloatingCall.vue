<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import BaseIcon from '@/components/BaseIcon.vue'
import { SITE } from '@/config/site'
import { TOPBAR_HEIGHT } from '@/constants/layout'
import { useI18n } from '@/i18n'
import { phoneLink } from '@/utils/messengers'

const { t } = useI18n()
const { y } = useWindowScroll()

const mounted = ref(false)

// появляется, когда строка с телефоном в шапке ушла за экран
const visible = computed(() => mounted.value && y.value > TOPBAR_HEIGHT)

onMounted(() => (mounted.value = true))
</script>

<template>
  <a
    class="fab"
    :class="{ 'is-visible': visible }"
    :href="phoneLink(SITE.phone)"
    :aria-label="`${t((m) => m.contactInfo.call)} ${SITE.phoneDisplay}`"
    :title="SITE.phoneDisplay"
  >
    <BaseIcon name="phone" />
  </a>
</template>

<style scoped lang="scss">
.fab {
  position: fixed;
  right: var(--space-6);
  bottom: var(--space-6);
  z-index: 30;
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-accent);
  color: var(--on-accent);
  font-size: 1.25rem;
  box-shadow: var(--shadow-pop);
  opacity: 0;
  visibility: hidden;

  @include motion {
    transition:
      opacity 0.3s ease,
      visibility 0s linear 0.3s,
      background-color 0.2s ease;
  }

  &.is-visible {
    opacity: 1;
    visibility: visible;
    transition-delay: 0s;
  }

  &:hover {
    background: var(--accent-ink);
  }

  @include below(lg) {
    display: none;
  }
}
</style>
