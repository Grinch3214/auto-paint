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
  { id: 'preSale', prices: ['polishPreSale'] },

  {
    id: 'dents',
    prices: ['bodyDentFender', 'bodyDentDoor', 'bodyDentHood', 'bodyDentTrunk', 'bodyDentRoof'],
  },
  { id: 'frame', prices: ['bodyFrameDiag', 'bodyFrameFix'] },
  { id: 'welding', prices: ['bodyWeld', 'bodyRustPatch', 'bodyWeldAlu'] },
  { id: 'sills', prices: ['bodySillRepair', 'bodySillReplace', 'bodyArchRepair'] },
  { id: 'plastic', prices: ['bodyBumperRepair', 'bodyBumperStraighten'] },
  { id: 'rustproofing', prices: ['bodyRustSills', 'bodyRustUnderbody', 'bodySeams'] },

  { id: 'wheelPaint' },
  { id: 'curbRash', prices: ['wheelRestore'] },
  { id: 'wheelColors' },
  { id: 'calipers' },
  { id: 'tireService' },

  { id: 'ppfFull', prices: ['ppfFull', 'ppfFullMatte', 'ppfFront'] },
  {
    id: 'ppfParts',
    prices: [
      'ppfFrontBumper',
      'ppfHood',
      'ppfFenders',
      'ppfDoors',
      'ppfRearFenders',
      'ppfRoof',
      'ppfRearBumper',
      'ppfTrunkLid',
      'ppfSills',
      'ppfInnerSills',
      'ppfArches',
      'ppfMirrors',
      'ppfPillars',
      'ppfGlossTrim',
      'ppfRoofStrip',
      'ppfHandleCups',
      'ppfLoadingZone',
    ],
  },
  { id: 'ppfAfterPaint' },
  { id: 'wrap', prices: ['ppfColor', 'vinylFull'] },
  {
    id: 'lightsFilm',
    prices: ['headlightTint', 'taillightTint', 'ppfHeadlights', 'ppfTaillights'],
  },
  { id: 'ppfCare' },
  { id: 'leather', prices: ['leatherSeats', 'leatherFull'] },
  { id: 'flood', prices: ['floodDrying', 'ozone'] },
  { id: 'antiRain', prices: ['antiRainWindshield', 'antiRainAll'] },
]
