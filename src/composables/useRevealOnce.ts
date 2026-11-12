import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { Ref } from 'vue'

/**
 * Один раз отмечает, что элемент доехал до экрана.
 * ready становится true только после монтирования: до этого (и без JS) контент виден сразу.
 */
export function useRevealOnce(target: Ref<HTMLElement | null>, rootMargin = '0px 0px -15% 0px') {
  const ready = ref(false)
  const visible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    ready.value = true
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          visible.value = true
          observer?.disconnect()
        }
      },
      { rootMargin },
    )
    if (target.value) observer.observe(target.value)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { ready, visible }
}
