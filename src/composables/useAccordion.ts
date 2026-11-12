import { ref } from 'vue'

/** Открыт максимум один пункт; повторный клик закрывает его */
export function useAccordion(initial: number | null = null) {
  const open = ref<number | null>(initial)

  const isOpen = (i: number) => open.value === i
  const toggle = (i: number) => (open.value = isOpen(i) ? null : i)

  return { open, isOpen, toggle }
}
