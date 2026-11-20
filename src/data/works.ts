import type { Work } from '@/types/works'

// одинаковые плитки 4:3, 4 в ряд — держим число фото кратным 4; порядок — «история машины»
export const WORKS: readonly Work[] = [
  { id: 'frameSill', folder: 'works', image: 'pickup-frame-sill', pages: ['bodyRepair'] },
  { id: 'frameDoors', folder: 'works', image: 'pickup-frame-doors', pages: ['bodyRepair'] },
  { id: 'primerSill', folder: 'works', image: 'pickup-primer-sill', pages: ['bodyRepair'] },
  {
    id: 'primerFender',
    folder: 'works',
    image: 'pickup-primer-fender',
    portrait: true,
    pages: ['bodyRepair'],
  },
  {
    id: 'wheelsBefore',
    folder: 'works',
    image: 'wheels-process',
    portrait: true,
    pages: ['wheelPaint'],
  },
  { id: 'wheelsGloss', folder: 'works', image: 'wheels-gloss', pages: ['wheelPaint'] },
  {
    id: 'mattingCloseup',
    folder: 'works',
    image: 'chevy-matting-closeup',
    pages: ['fullPaint'],
  },
  { id: 'mattingSide', folder: 'works', image: 'chevy-matting-side', pages: ['fullPaint'] },
]
