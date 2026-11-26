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
  // только на главной: на «Полной покраске» эта машина показана историей по шагам
  { id: 'mattingCloseup', folder: 'works', image: 'chevy-matting-closeup' },
  { id: 'mattingSide', folder: 'works', image: 'chevy-matting-side' },
  {
    id: 'chevySideAfter',
    folder: 'works',
    image: 'chevy-side-after',
    pages: ['bodyRepair', 'panelPaint'],
  },
  {
    id: 'chevyFuelDoor',
    folder: 'works',
    image: 'chevy-fuel-door',
    portrait: true,
    pages: ['bodyRepair', 'panelPaint'],
  },
  {
    id: 'chevyDoorsGloss',
    folder: 'works',
    image: 'chevy-doors-gloss',
    pages: ['bodyRepair', 'panelPaint'],
  },
  {
    id: 'chevyTailgate',
    folder: 'works',
    image: 'chevy-tailgate',
    pages: ['bodyRepair', 'panelPaint'],
  },
]
