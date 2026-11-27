import type { Work } from '@/types/works'

// одинаковые плитки 4:3; на главной 6 в ряд — держим там 12 фото (home: false убирает лишние),
// на страницах услуг 4 в ряд; порядок — «история машины»
export const WORKS: readonly Work[] = [
  { id: 'frameSill', folder: 'works', image: 'pickup-frame-sill', pages: ['bodyRepair'] },
  { id: 'frameDoors', folder: 'works', image: 'pickup-frame-doors', pages: ['bodyRepair'] },
  {
    id: 'primerSill',
    folder: 'works',
    image: 'pickup-primer-sill',
    pages: ['bodyRepair'],
    home: false,
  },
  {
    id: 'primerFender',
    folder: 'works',
    image: 'pickup-primer-fender',
    portrait: true,
    pages: ['bodyRepair'],
    home: false,
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
  { id: 'mattingCloseup', folder: 'works', image: 'chevy-matting-closeup', home: false },
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
    home: false,
  },
  { id: 'polishPad', folder: 'works', image: 'polish-pad', pages: ['polishing'] },
  { id: 'polishDoors', folder: 'works', image: 'polish-doors', pages: ['polishing'] },
  { id: 'polishReflection', folder: 'works', image: 'polish-reflection', pages: ['polishing'] },
  {
    id: 'polishMirror',
    folder: 'works',
    image: 'polish-mirror',
    portrait: true,
    pages: ['polishing'],
  },
]
