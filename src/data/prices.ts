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
      // цены ждём от Димы — пока «по фото»
      { id: 'polishHeadlights', ask: true },
      { id: 'polishGlass', ask: true },
    ],
  },
  {
    id: 'body',
    items: [
      { id: 'bodyDent', ask: true },
      { id: 'bodyFrame', ask: true },
      { id: 'bodyWelding', ask: true },
      { id: 'bodySills', ask: true },
      { id: 'bodyPlastic', ask: true },
      { id: 'bodyRust', ask: true },
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
