import type { Work } from '@/types/works'

export const WORKS: readonly Work[] = [
  { id: 'hoodGloss', folder: 'test', image: 'hood-gloss', size: 'big' },
  { id: 'sideGloss', folder: 'test', image: 'side-gloss' },
  { id: 'sedanAfter', folder: 'test', image: 'sedan-after-1', pages: ['spotRepair'] },
  { id: 'partsGloss', folder: 'test', image: 'parts-gloss', size: 'wide' },
  { id: 'wingSpot', folder: 'test', image: 'wing-spot', pages: ['spotRepair'] },
  { id: 'crossoverBefore', folder: 'test', image: 'crossover-before' },
  { id: 'sideBase', folder: 'test', image: 'side-base' },
  { id: 'partsBase', folder: 'test', image: 'parts-base' },
]
