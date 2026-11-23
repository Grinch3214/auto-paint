import type { PriceItemId } from './prices'

export type BlockId =
  // покраска деталей
  | 'bumper'
  | 'hood'
  | 'fender'
  | 'door'
  | 'roof'
  | 'sill'
  | 'small'
  // полная покраска
  | 'fullWhen'
  | 'fullOpenings'
  | 'fullColorChange'
  | 'fullPrep'
  // локальная покраска
  | 'spotPolishOrPaint'
  | 'spotChips'
  | 'spotScratches'
  | 'spotLimits'
  // полировка
  | 'polishBody'
  | 'headlights'
  | 'glass'
  | 'preSale'
  // кузовной ремонт
  | 'dents'
  | 'frame'
  | 'welding'
  | 'sills'
  | 'plastic'
  | 'rustproofing'
  // диски
  | 'wheelPaint'
  | 'curbRash'
  | 'wheelColors'
  | 'calipers'
  | 'tireService'
  // детейлинг
  | 'ppfFull'
  | 'ppfParts'
  | 'ppfAfterPaint'
  | 'wrap'
  | 'lightsFilm'
  | 'ppfCare'
  | 'leather'
  | 'flood'
  | 'antiRain'

export interface ServiceBlock {
  id: BlockId
  prices?: readonly PriceItemId[]
}
