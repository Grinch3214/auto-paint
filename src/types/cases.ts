export type CaseId = 'silverado'

export type CaseStepId =
  | 'damage'
  | 'frame'
  | 'newDoors'
  | 'fender'
  | 'sills'
  | 'prep'
  | 'result'
  | 'details'

export interface CaseStep {
  id: CaseStepId
  folder: string
  image: string
}

export interface CaseData {
  steps: readonly CaseStep[]
}
