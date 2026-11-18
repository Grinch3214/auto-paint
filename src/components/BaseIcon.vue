<script setup lang="ts">
import { ICONS } from '@/constants/icons'
import type { IconName } from '@/types/icons'

defineProps<{ name: IconName }>()
</script>

<template>
  <svg
    class="icon"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-for="d in ICONS[name]" :key="d" :d="d" />
  </svg>
</template>

<style scoped lang="scss">
.icon {
  flex: none;
  width: 1.25em;
  height: 1.25em;
}
</style>
