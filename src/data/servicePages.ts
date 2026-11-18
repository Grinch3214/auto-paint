import { STAGES } from '@/data/stages'
import type { ServicePageData } from '@/types/servicePages'
import type { ServicePageId } from '@/types/pages'

export const SERVICE_PAGES: Record<ServicePageId, ServicePageData> = {
  fullPaint: {
    prices: ['fullExterior', 'fullWithOpenings'],
    blocks: ['fullWhen', 'fullOpenings', 'fullColorChange', 'fullPrep'],
    stages: STAGES,
    related: ['panelPaint', 'spotRepair', 'colorMatch'],
    faq: ['fullWorthIt', 'fullColorChange', 'price', 'colorMatch', 'paintBooth', 'polishing'],
  },
  panelPaint: {
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
    prices: ['polishPanel', 'polishLight', 'polishDeep'],
    blocks: ['polishBody', 'headlights', 'glass'],
    related: ['spotRepair', 'panelPaint', 'fullPaint'],
    faq: ['polishScratches', 'headlights', 'polishHowOften', 'photoEstimate', 'polishing'],
  },
}
