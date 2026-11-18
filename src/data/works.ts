import type { Work } from '@/types/works'

// порядок и размеры подобраны под сетку 4 колонки без дыр (dense)
export const WORKS: readonly Work[] = [
  {
    id: 'frameDoors',
    folder: 'works',
    image: 'pickup-frame-doors',
    size: 'big',
    pages: ['bodyRepair'],
  },
  {
    id: 'primerFender',
    folder: 'works',
    image: 'pickup-primer-fender',
    size: 'tall',
    pages: ['bodyRepair'],
  },
  { id: 'frameSill', folder: 'works', image: 'pickup-frame-sill', pages: ['bodyRepair'] },
  { id: 'primerSill', folder: 'works', image: 'pickup-primer-sill', pages: ['bodyRepair'] },
  {
    id: 'wheelsBefore',
    folder: 'works',
    image: 'wheels-process',
    size: 'tall',
    pages: ['wheelPaint'],
  },
  { id: 'wheelsGloss', folder: 'works', image: 'wheels-gloss', size: 'big', pages: ['wheelPaint'] },
  {
    id: 'wheelsGlossSun',
    folder: 'works',
    image: 'wheels-gloss-sun',
    size: 'tall',
    pages: ['wheelPaint'],
  },
]
