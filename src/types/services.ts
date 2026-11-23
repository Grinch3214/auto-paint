import type { PageId } from './pages'
import type { PriceItemId } from './prices'

export type ServiceId =
  | 'fullPaint'
  | 'panelPaint'
  | 'spotRepair'
  | 'wheelPaint'
  | 'bodyRepair'
  | 'polishing'
  | 'detailing'
  | 'colorMatch'

export interface Service {
  id: ServiceId
  page?: PageId
  /** самая низкая цена услуги из таблицы — для разметки schema.org «от …» */
  fromPrice?: PriceItemId
}
