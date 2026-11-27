import type { ServicePageId } from './pages'

export type WorkId =
  | 'frameDoors'
  | 'primerFender'
  | 'primerSill'
  | 'wheelsBefore'
  | 'wheelsGloss'
  | 'frameSill'
  | 'mattingSide'
  | 'mattingCloseup'
  | 'chevySideAfter'
  | 'chevyDoorsGloss'
  | 'chevyFuelDoor'
  | 'chevyTailgate'
  | 'polishPad'
  | 'polishDoors'
  | 'polishReflection'
  | 'polishMirror'

export interface Work {
  id: WorkId
  folder: string
  image: string
  /** вертикальное фото 3:4: на телефоне плитка уже и выше, на десктопе обрезается до 4:3 */
  portrait?: boolean
  /** на каких страницах услуг показывать это фото */
  pages?: readonly ServicePageId[]
  /** false — только на страницах услуг, не в галерее главной */
  home?: boolean
}
