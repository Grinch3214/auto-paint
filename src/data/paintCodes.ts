import type { PaintCodeBrand } from '@/types/paintCodes'

// Марки, которые чаще всего встречаются в Батуми. Тексты — content/<lang>/colorMatch.ts
export const PAINT_CODE_BRANDS: readonly PaintCodeBrand[] = [
  { id: 'toyota', zones: ['door'] },
  { id: 'hyundai', zones: ['door'] },
  { id: 'vag', zones: ['trunk'] },
  { id: 'bmw', zones: ['hood', 'door'] },
  { id: 'mercedes', zones: ['door', 'hood'] },
  { id: 'nissan', zones: ['door', 'hood'] },
  { id: 'honda', zones: ['door'] },
  { id: 'mazda', zones: ['door', 'hood'] },
  { id: 'mitsubishi', zones: ['hood'] },
  { id: 'ford', zones: ['door'] },
  { id: 'chevrolet', zones: ['door'] },
  { id: 'subaru', zones: ['hood', 'door'] },
]

export const PAINT_CODE_ZONES = ['door', 'hood', 'trunk'] as const
