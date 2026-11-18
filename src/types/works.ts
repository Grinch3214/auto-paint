import type { ServicePageId } from './pages'

export type WorkId =
  | 'frameDoors'
  | 'primerFender'
  | 'primerSill'
  | 'wheelsBefore'
  | 'wheelsGloss'
  | 'wheelsGlossSun'
  | 'frameSill'

export interface Work {
  id: WorkId
  folder: string
  image: string
  /** big — 2×2, wide — 2×1, tall — 1×2 (вертикальное фото 3:4) */
  size?: 'big' | 'wide' | 'tall'
  /** на каких страницах услуг показывать это фото */
  pages?: readonly ServicePageId[]
}
