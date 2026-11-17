import type { Service, ServiceId } from '@/types/services'

export const SERVICES: readonly Service[] = [
  { id: 'fullPaint', page: 'fullPaint' },
  { id: 'panelPaint', page: 'panelPaint' },
  { id: 'spotRepair', page: 'spotRepair' },
  { id: 'wheelPaint', page: 'wheelPaint' },
  { id: 'bodyRepair', page: 'bodyRepair' },
  { id: 'polishing', page: 'polishing' },
  { id: 'colorMatch', page: 'colorMatch' },
]

export const COLOR_MATCH_RELATED: readonly ServiceId[] = ['panelPaint', 'spotRepair', 'fullPaint']
