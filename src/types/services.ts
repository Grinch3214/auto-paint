import type { PageId } from './pages'

export type ServiceId = 'fullPaint' | 'panelPaint' | 'spotRepair' | 'colorMatch'

export interface Service {
  id: ServiceId
  page?: PageId
}
