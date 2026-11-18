import type { ServiceBlock } from '@/types/blocks'

// Цены — из общей таблицы (data/prices.ts); тексты — content/<lang>/blocks.ts.
// Цену указываем либо в «Сколько стоит» страницы, либо в разделе — не в обоих местах.
// Какие разделы на какой странице и в каком порядке — data/servicePages.ts
export const SERVICE_BLOCKS: readonly ServiceBlock[] = [
  { id: 'bumper', prices: ['bumper', 'parkingSensors'] },
  { id: 'hood', prices: ['hood'] },
  { id: 'fender', prices: ['frontFender', 'rearFender'] },
  { id: 'door', prices: ['door', 'doorBothSides', 'doorOpeningHalf', 'upperPillar'] },
  { id: 'roof', prices: ['roof', 'trunkLid', 'trunkLidBothSides'] },
  { id: 'sill', prices: ['sillMetal', 'sillPlastic'] },
  { id: 'small', prices: ['mirrorCover', 'doorHandle', 'moldings', 'spoiler'] },

  { id: 'fullWhen' },
  { id: 'fullOpenings' },
  { id: 'fullColorChange' },
  { id: 'fullPrep' },

  { id: 'spotPolishOrPaint' },
  { id: 'spotChips' },
  { id: 'spotScratches' },
  { id: 'spotLimits' },

  { id: 'polishBody' },
  { id: 'headlights', prices: ['polishHeadlights'] },
  { id: 'glass', prices: ['polishGlass'] },
  { id: 'polishAfterPaint' },

  { id: 'dents', prices: ['bodyDent'] },
  { id: 'frame', prices: ['bodyFrame'] },
  { id: 'welding', prices: ['bodyWelding'] },
  { id: 'sills', prices: ['bodySills'] },
  { id: 'plastic', prices: ['bodyPlastic'] },
  { id: 'rustproofing', prices: ['bodyRust'] },

  { id: 'wheelPaint' },
  { id: 'curbRash' },
  { id: 'wheelColors' },
  { id: 'calipers' },
  { id: 'tireService' },
]
