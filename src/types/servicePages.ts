import type { FaqId } from './faq'
import type { PartId } from './parts'
import type { PriceItemId } from './prices'
import type { ServiceId } from './services'
import type { StageId } from './stages'
import type { WorkId } from './works'

export interface ServicePageData {
  /** фото в hero из WORKS; нет → hero только с текстом */
  heroWork?: WorkId
  prices?: readonly PriceItemId[]
  /** карточки деталей с ценами — только у страницы деталей */
  parts?: readonly PartId[]
  stages?: readonly StageId[]
  related?: readonly ServiceId[]
  faq: readonly FaqId[]
}
