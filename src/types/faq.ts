export type FaqId =
  | 'price'
  | 'singlePart'
  | 'colorMatch'
  | 'bodyRepair'
  | 'paintBooth'
  | 'photoEstimate'
  | 'insurance'
  | 'wheels'
  | 'polishing'
  | 'foreignPlates'
  | 'duration'

export interface FaqEntry {
  question: string
  answer: string
}
