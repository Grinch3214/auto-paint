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
  | 'wheelColor'
  | 'wheelTires'
  | 'polishScratches'
  | 'paintCode'
  | 'metallic'
  | 'bodyRepairOnly'

export interface FaqEntry {
  question: string
  answer: string
}
