import type { PriceGroup, PriceItemId } from '@/types/prices'

export const PRICE_GROUPS: readonly PriceGroup[] = [
  {
    id: 'front',
    items: [
      { id: 'hood', fresh: 490, used: 540 },
      { id: 'bumper', fresh: 390, used: 440 },
      { id: 'frontFender', fresh: 340, used: 340 },
    ],
  },
  {
    id: 'side',
    items: [
      { id: 'door', fresh: 390, used: 390 },
      { id: 'doorBothSides', single: 540 },
      { id: 'rearFender', used: 440 },
      { id: 'sillMetal', used: 390 },
      { id: 'sillPlastic', fresh: 240, used: 240 },
      { id: 'upperPillar', used: 190 },
      { id: 'doorOpeningHalf', used: 190 },
    ],
  },
  {
    id: 'roof',
    items: [
      { id: 'roof', fresh: 790, used: 790 },
      { id: 'trunkLid', fresh: 390, used: 440 },
      { id: 'trunkLidBothSides', single: 490 },
    ],
  },
  {
    id: 'small',
    items: [
      { id: 'doorHandle', fresh: 30, used: 30 },
      { id: 'parkingSensors', fresh: 40 },
      { id: 'moldings', fresh: 40 },
      { id: 'mirrorCover', single: 100 },
      { id: 'spoiler', single: 150 },
    ],
  },
  {
    id: 'wheels',
    items: [
      { id: 'wheel', single: 180 },
      { id: 'wheelR17', single: 210 },
      { id: 'wheelR19', single: 250 },
      { id: 'wheelRestore', single: 120 },
      { id: 'caliper', single: 100 },
    ],
  },
  {
    id: 'spot',
    items: [
      { id: 'spotChip', single: 50 },
      { id: 'spotArea', single: 180 },
      { id: 'spotScratch', single: 250 },
    ],
  },
  {
    id: 'full',
    items: [
      { id: 'fullExterior', single: 4500 },
      { id: 'fullWithOpenings', single: 6000 },
    ],
  },
  {
    id: 'polish',
    items: [
      { id: 'polishPanel', single: 100 },
      { id: 'polishLight', single: 500 },
      { id: 'polishDeep', single: 800 },
      { id: 'polishHeadlights', single: 100 },
      { id: 'polishGlass', single: 200 },
      { id: 'polishPreSale', ask: true },
    ],
  },
  {
    id: 'bodyDents',
    items: [
      { id: 'bodyDentFender', single: 150 },
      { id: 'bodyDentDoor', single: 180 },
      { id: 'bodyDentHood', single: 250 },
      { id: 'bodyDentTrunk', single: 200 },
      { id: 'bodyDentRoof', single: 350 },
      { id: 'bodyBumperRepair', single: 100 },
      { id: 'bodyBumperStraighten', single: 120 },
    ],
  },
  {
    id: 'bodyFrame',
    items: [
      { id: 'bodyFrameDiag', single: 100 },
      { id: 'bodyFrameFix', single: 650 },
      { id: 'bodyWeld', single: 100 },
      { id: 'bodyRustPatch', single: 200 },
      { id: 'bodyWeldAlu', single: 150 },
    ],
  },
  {
    id: 'bodyRust',
    items: [
      { id: 'bodySillRepair', single: 200 },
      { id: 'bodySillReplace', single: 400 },
      { id: 'bodyArchRepair', single: 200 },
      { id: 'bodyRustSills', single: 200 },
      { id: 'bodyRustUnderbody', single: 350 },
      { id: 'bodySeams', single: 100 },
    ],
  },
  // плёнка: прайс соседей в $ × курс НБГ 2,59 (21.11.2026) − 10%, округлено до 10 ₾.
  // Полосы на капот и крыло и кромки дверей не клеим — их в таблице нет
  {
    id: 'ppf',
    items: [
      { id: 'ppfFull', single: 5600 },
      { id: 'ppfFullMatte', single: 5970 },
      { id: 'ppfFront', single: 2240 },
      { id: 'ppfColor', single: 5600 },
      { id: 'vinylFull', single: 4670 },
    ],
  },
  {
    id: 'ppfParts',
    items: [
      { id: 'ppfFrontBumper', single: 620 },
      { id: 'ppfHood', single: 620 },
      { id: 'ppfFenders', single: 340 },
      { id: 'ppfDoors', single: 1120 },
      { id: 'ppfRearFenders', single: 670 },
      { id: 'ppfRoof', single: 750 },
      { id: 'ppfRearBumper', single: 540 },
      { id: 'ppfTrunkLid', single: 390 },
      { id: 'ppfSills', single: 370 },
      { id: 'ppfInnerSills', single: 150 },
      { id: 'ppfArches', single: 370 },
      { id: 'ppfMirrors', single: 150 },
      { id: 'ppfPillars', single: 150 },
      { id: 'ppfGlossTrim', single: 150 },
      { id: 'ppfRoofStrip', single: 70 },
      { id: 'ppfHandleCups', single: 70 },
      { id: 'ppfLoadingZone', single: 70 },
      { id: 'ppfHeadlights', single: 150 },
      { id: 'ppfTaillights', single: 150 },
    ],
  },
  {
    id: 'detailing',
    items: [
      { id: 'headlightTint', single: 150 },
      { id: 'taillightTint', single: 150 },
      { id: 'leatherSeats', single: 250 },
      { id: 'leatherFull', single: 350 },
      { id: 'floodDrying', ask: true },
      { id: 'ozone', single: 50 },
      { id: 'antiRainWindshield', single: 75 },
      { id: 'antiRainAll', single: 150 },
    ],
  },
]

/** Главные цены на главной; полная таблица — на /ceny */
export const HOME_PRICE_ITEMS: readonly PriceItemId[] = [
  'bumper',
  'hood',
  'frontFender',
  'door',
  'roof',
  'fullExterior',
  'wheel',
  'spotChip',
]
