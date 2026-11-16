import type { FaqId } from '@/types/faq'

// Набор вопросов у каждой страницы свой; тексты — content/<lang>/faq.ts
export const FAQ_HOME: readonly FaqId[] = [
  'price',
  'singlePart',
  'colorMatch',
  'bodyRepair',
  'paintBooth',
  'photoEstimate',
  'duration',
  'insurance',
  'wheels',
  'polishing',
  'foreignPlates',
]

export const FAQ_COLOR_MATCH: readonly FaqId[] = [
  'paintCode',
  'colorMatch',
  'metallic',
  'singlePart',
]

export const FAQ_PRICES: readonly FaqId[] = [
  'price',
  'photoEstimate',
  'metallic',
  'duration',
  'polishing',
]

export const FAQ_CONTACTS: readonly FaqId[] = ['foreignPlates', 'photoEstimate', 'insurance']
