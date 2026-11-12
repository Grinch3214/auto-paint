import { CAR_PART_PATHS } from '@/constants/car'
import type { CarPart, CarPath } from '@/types/car'

/** Разбирает SVG машины на контуры и помечает, к какой детали относится каждый */
export function parseCarSvg(raw: string): CarPath[] {
  const partOf = new Map<number, CarPart>()
  for (const [part, indexes] of Object.entries(CAR_PART_PATHS))
    for (const i of indexes) partOf.set(i, part as CarPart)

  return [...raw.matchAll(/<path d="([^"]+)"/g)].map((m, i) => ({
    d: m[1]!.replace(/\s+/g, ' '),
    part: partOf.get(i) ?? 'paint',
  }))
}
