import type { PriceGroup, PriceGroupId } from '@/types/prices'

// Цены в лари за деталь. Ориентир: конкурент минус 10 лари, сверить с Димой
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
      { id: 'mirrorCover', ask: true },
      { id: 'spoiler', ask: true },
      { id: 'wheel', ask: true },
      { id: 'caliper', ask: true },
    ],
  },
  {
    // ЗАГЛУШКИ: цены на локальный ремонт придуманы для макета — сверить с Димой до запуска
    id: 'spot',
    items: [
      { id: 'spotChip', single: 60 },
      { id: 'spotScratch', single: 90 },
      { id: 'bumperCorner', single: 150 },
      { id: 'spotPartial', single: 190 },
    ],
  },
]

/** Сокращённая таблица на главной: локальный ремонт — на своей странице */
export const HOME_PRICE_GROUPS: readonly PriceGroupId[] = ['front', 'side', 'roof', 'small']
