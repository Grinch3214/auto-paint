import { ref } from 'vue'
import type { Ref } from 'vue'

/** Листание по кругу и открытие <dialog> на нужном фото */
export function useLightbox(dialog: Ref<HTMLDialogElement | null>, count: () => number) {
  const current = ref(0)

  function open(i: number) {
    current.value = i
    dialog.value?.showModal()
  }

  function close() {
    dialog.value?.close()
  }

  function step(delta: number) {
    const n = count()
    if (n) current.value = (current.value + delta + n) % n
  }

  return { current, open, close, step }
}
