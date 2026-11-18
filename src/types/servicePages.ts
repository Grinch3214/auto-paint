import type { FaqId } from './faq'
import type { BlockId } from './blocks'
import type { PriceItemId } from './prices'
import type { ServiceId } from './services'
import type { StageId } from './stages'
import type { WorkId } from './works'

export interface ServicePageData {
  /** фото в hero из WORKS; нет → hero только с текстом */
  heroWork?: WorkId
  prices?: readonly PriceItemId[]
  /** разделы «заголовок + текст + цены» в своём порядке; заголовок блока — в тексте страницы */
  blocks?: readonly BlockId[]
  stages?: readonly StageId[]
  related?: readonly ServiceId[]
  faq: readonly FaqId[]
}
