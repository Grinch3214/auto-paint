import type { PaintFilter } from '@/types/car'

export function paintFilter(p: PaintFilter): string {
  return `sepia(${p.sepia}) hue-rotate(${p.hue}deg) saturate(${p.saturate}) brightness(${p.brightness}) contrast(${p.contrast})`
}
