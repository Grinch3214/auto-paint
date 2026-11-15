import type { ServicePageId } from './pages'

export type WorkId =
  | 'hoodGloss'
  | 'sideGloss'
  | 'sedanAfter'
  | 'partsGloss'
  | 'wingSpot'
  | 'crossoverBefore'
  | 'sideBase'
  | 'partsBase'

export interface Work {
  id: WorkId
  folder: string
  image: string
  size?: 'big' | 'wide'
  /** на каких страницах услуг показывать это фото */
  pages?: readonly ServicePageId[]
}
