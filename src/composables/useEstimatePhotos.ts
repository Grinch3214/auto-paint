import { computed, onBeforeUnmount, ref } from 'vue'
import { ESTIMATE_PHOTOS } from '@/constants/estimate'
import { compressImage } from '@/utils/compressImage'
import type { EstimatePhoto } from '@/types/estimate'

export function useEstimatePhotos() {
  const photos = ref<EstimatePhoto[]>([])
  const processing = ref(false)
  const failed = ref(false)
  const overLimit = ref(false)
  let nextId = 1

  const canAdd = computed(() => photos.value.length < ESTIMATE_PHOTOS.maxCount)

  async function add(files: readonly File[]) {
    failed.value = false
    overLimit.value = files.length > ESTIMATE_PHOTOS.maxCount - photos.value.length
    const queue = files.slice(0, ESTIMATE_PHOTOS.maxCount - photos.value.length)
    processing.value = true
    for (const file of queue) {
      try {
        const blob = await compressImage(file)
        photos.value = [...photos.value, { id: nextId++, blob, url: URL.createObjectURL(blob) }]
      } catch {
        failed.value = true
      }
    }
    processing.value = false
  }

  function remove(id: number) {
    const photo = photos.value.find((p) => p.id === id)
    if (photo) URL.revokeObjectURL(photo.url)
    photos.value = photos.value.filter((p) => p.id !== id)
    overLimit.value = false
  }

  function clear() {
    photos.value.forEach((p) => URL.revokeObjectURL(p.url))
    photos.value = []
  }

  onBeforeUnmount(clear)

  return { photos, processing, failed, overLimit, canAdd, add, remove, clear }
}
