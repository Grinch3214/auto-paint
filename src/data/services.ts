import type { Service, ServiceId } from '@/types/services'

export const SERVICES: readonly Service[] = [
  { id: 'fullPaint', page: 'fullPaint', fromPrice: 'fullExterior' },
  { id: 'panelPaint', page: 'panelPaint', fromPrice: 'upperPillar' },
  { id: 'spotRepair', page: 'spotRepair', fromPrice: 'spotChip' },
  { id: 'wheelPaint', page: 'wheelPaint', fromPrice: 'wheel' },
  { id: 'bodyRepair', page: 'bodyRepair', fromPrice: 'bodyBumperRepair' },
  { id: 'polishing', page: 'polishing', fromPrice: 'polishPanel' },
  { id: 'colorMatch', page: 'colorMatch' },
]

export const COLOR_MATCH_RELATED: readonly ServiceId[] = ['panelPaint', 'spotRepair', 'fullPaint']
