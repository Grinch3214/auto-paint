import type { PageId } from './pages'

export type ServiceId =
  | 'fullPaint'
  | 'panelPaint'
  | 'spotRepair'
  | 'wheelPaint'
  | 'bodyRepair'
  | 'polishing'
  | 'colorMatch'

export interface Service {
  id: ServiceId
  page?: PageId
}
