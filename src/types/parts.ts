import type { PriceItemId } from './prices'

export type PartId = 'bumper' | 'hood' | 'fender' | 'door' | 'roof' | 'sill' | 'small'

export interface Part {
  id: PartId
  /** строки общей таблицы цен, которые относятся к детали */
  prices: readonly PriceItemId[]
}
