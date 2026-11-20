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
  | 'fullWorthIt'
  | 'fullStripMetal'
  | 'fullColorChange'
  | 'spotVisible'
  | 'spotChipRust'
  | 'polishHowOften'
  | 'headlights'
  | 'bodyFrameWhen'
  | 'bodySillsRust'
  | 'wheelPowder'
  | 'wheelCurb'

export interface FaqEntry {
  question: string
  answer: string
}
