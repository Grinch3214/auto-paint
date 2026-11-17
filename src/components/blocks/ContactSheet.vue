<script setup lang="ts">
import { computed } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { SITE } from '@/config/site'
import { useI18n } from '@/i18n'
import { phoneLink, whatsappLink } from '@/utils/messengers'

const props = defineProps<{ open: boolean; withCall?: boolean }>()
const emit = defineEmits(['close'])

const { t } = useI18n()

const items = computed(() => [
  ...(props.withCall
    ? [
        {
          key: 'call',
          icon: 'phone' as const,
          href: phoneLink(SITE.phone),
          title: t((m) => m.contactInfo.call),
          hint: SITE.phoneDisplay,
          external: false,
        },
      ]
    : []),
  {
    key: 'whatsapp',
    icon: 'whatsapp' as const,
    href: whatsappLink(SITE.phone),
    title: 'WhatsApp',
    hint: t((m) => m.contactDock.whatsappHint),
    external: true,
  },
  {
    key: 'route',
    icon: 'pin' as const,
    href: SITE.mapsUrl,
    title: t((m) => m.contactDock.route),
    hint: t((m) => m.contactInfo.address),
    external: true,
  },
])
</script>

<template>
  <Transition name="sheet">
    <div v-if="open" class="sheet">
      <div class="sheet__head">
        <p class="sheet__title">{{ t((m) => m.contactDock.title) }}</p>
        <p class="sheet__hours">
          <BaseIcon name="clock" />
          {{ t((m) => m.contactInfo.hoursWork) }}, {{ t((m) => m.contactInfo.hoursOff) }}
        </p>
      </div>
      <a
        v-for="i in items"
        :key="i.key"
        class="sheet__item"
        :href="i.href"
        :target="i.external ? '_blank' : undefined"
        :rel="i.external ? 'noopener' : undefined"
        @click="emit('close')"
      >
        <span class="sheet__icon"><BaseIcon :name="i.icon" /></span>
        <span class="sheet__text">
          <strong>{{ i.title }}</strong>
          <small>{{ i.hint }}</small>
        </span>
        <BaseIcon name="arrow" class="sheet__arrow" />
      </a>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.sheet {
  overflow: hidden;
  border-radius: var(--radius);
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: var(--shadow-pop);

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

    &:hover {
      background: var(--color-bg);
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

@include motion {
  .sheet-enter-active,
  .sheet-leave-active {
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
  }
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
