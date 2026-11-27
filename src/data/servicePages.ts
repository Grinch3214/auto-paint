import { STAGES } from '@/data/stages'
import type { ServicePageData } from '@/types/servicePages'
import type { ServicePageId } from '@/types/pages'

export const SERVICE_PAGES: Record<ServicePageId, ServicePageData> = {
  fullPaint: {
    heroWork: 'mattingCloseup',
    prices: ['fullExterior', 'fullWithOpenings'],
    blocks: ['fullWhen', 'fullOpenings', 'fullColorChange', 'fullPrep'],
    stages: STAGES,
    case: 'silverado',
    related: ['panelPaint', 'spotRepair', 'colorMatch'],
    faq: [
      'fullWorthIt',
      'fullStripMetal',
      'fullColorChange',
      'price',
      'colorMatch',
      'paintBooth',
      'polishing',
    ],
  },
  panelPaint: {
    heroWork: 'chevyFuelDoor',
    prices: ['bumper', 'hood', 'frontFender', 'door', 'roof'],
    blocks: ['bumper', 'hood', 'fender', 'door', 'roof', 'sill', 'small'],
    stages: ['inspection', 'repair', 'filler', 'primer', 'colorMatch', 'paintBooth'],
    related: ['spotRepair', 'wheelPaint', 'colorMatch'],
    faq: ['price', 'singlePart', 'colorMatch', 'bodyRepair', 'insurance'],
  },
  spotRepair: {
    prices: ['spotChip', 'spotArea', 'spotScratch'],
    blocks: ['spotPolishOrPaint', 'spotChips', 'spotScratches', 'spotLimits'],
    stages: ['inspection', 'filler', 'primer', 'colorMatch', 'paintBooth'],
    related: ['panelPaint', 'colorMatch'],
    faq: ['spotVisible', 'spotChipRust', 'singlePart', 'colorMatch', 'photoEstimate'],
  },
  wheelPaint: {
    heroWork: 'wheelsGloss',
    prices: ['wheel', 'wheelR17', 'wheelR19', 'caliper'],
    blocks: ['wheelPaint', 'curbRash', 'wheelColors', 'calipers', 'tireService'],
    stages: ['inspection', 'filler', 'primer', 'colorMatch', 'paintBooth', 'assembly'],
    related: ['panelPaint', 'polishing', 'fullPaint'],
    faq: ['wheelPowder', 'wheelColor', 'wheelCurb', 'wheelTires', 'wheels'],
  },
  bodyRepair: {
    heroWork: 'frameDoors',
    blocks: ['dents', 'frame', 'welding', 'sills', 'plastic', 'rustproofing'],
    stages: STAGES,
    related: ['panelPaint', 'fullPaint', 'spotRepair'],
    faq: ['bodyRepairOnly', 'bodyFrameWhen', 'bodySillsRust', 'bodyRepair', 'insurance'],
  },
  polishing: {
    heroWork: 'polishDoors',
    prices: ['polishPanel', 'polishLight', 'polishDeep'],
    blocks: ['polishBody', 'headlights', 'glass', 'preSale'],
    related: ['detailing', 'spotRepair', 'panelPaint'],
    faq: ['polishScratches', 'headlights', 'polishHowOften', 'photoEstimate', 'polishing'],
  },
  detailing: {
    blocks: [
      'ppfFull',
      'ppfParts',
      'ppfAfterPaint',
      'wrap',
      'lightsFilm',
      'ppfCare',
      'leather',
      'flood',
      'antiRain',
    ],
    related: ['polishing', 'fullPaint', 'panelPaint'],
    faq: ['paintOrFilm', 'filmOnRepaint', 'filmCare', 'fabricInterior', 'photoEstimate'],
  },
}
