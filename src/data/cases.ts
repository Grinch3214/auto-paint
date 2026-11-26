import type { CaseData, CaseId } from '@/types/cases'

// история одной машины по шагам; фото — те же файлы, что в галерее работ
export const CASES = {
  silverado: {
    steps: [
      { id: 'damage', folder: 'works', image: 'pickup-frame-sill' },
      { id: 'frame', folder: 'works', image: 'pickup-frame-doors' },
      { id: 'newDoors', folder: 'works', image: 'chevy-new-rear-door' },
      { id: 'fender', folder: 'works', image: 'pickup-primer-fender' },
      { id: 'sills', folder: 'works', image: 'pickup-primer-sill' },
      { id: 'prep', folder: 'works', image: 'chevy-matting-side' },
      { id: 'result', folder: 'works', image: 'chevy-side-after' },
      { id: 'details', folder: 'works', image: 'chevy-fuel-door' },
    ],
  },
} as const satisfies Record<CaseId, CaseData>
