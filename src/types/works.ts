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
}
