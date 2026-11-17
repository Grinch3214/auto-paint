import { STAGES } from '@/data/stages'
import type { ServicePageData } from '@/types/servicePages'
import type { ServicePageId } from '@/types/pages'

export const SERVICE_PAGES: Record<ServicePageId, ServicePageData> = {
  fullPaint: {
    prices: ['fullExterior', 'fullWithOpenings'],
    stages: STAGES,
    related: ['panelPaint', 'spotRepair', 'colorMatch'],
    faq: ['price', 'duration', 'colorMatch', 'paintBooth', 'bodyRepair', 'polishing'],
  },
  panelPaint: {
    prices: ['bumper', 'hood', 'frontFender', 'door', 'roof'],
    parts: ['bumper', 'hood', 'fender', 'door', 'roof', 'sill', 'small'],
    stages: ['inspection', 'repair', 'filler', 'primer', 'colorMatch', 'paintBooth'],
    related: ['spotRepair', 'wheelPaint', 'colorMatch'],
    faq: ['price', 'singlePart', 'colorMatch', 'bodyRepair', 'insurance'],
  },
  spotRepair: {
    heroWork: 'wingSpot',
    prices: ['spotChip', 'spotArea', 'spotScratch'],
    stages: ['inspection', 'filler', 'primer', 'colorMatch', 'paintBooth'],
    related: ['panelPaint', 'colorMatch'],
    faq: ['singlePart', 'colorMatch', 'photoEstimate', 'polishing'],
  },
  wheelPaint: {
    prices: ['wheel', 'wheelR17', 'wheelR19', 'caliper'],
    stages: ['inspection', 'filler', 'primer', 'colorMatch', 'paintBooth', 'assembly'],
    related: ['panelPaint', 'polishing', 'fullPaint'],
    faq: ['wheels', 'wheelColor', 'wheelTires', 'photoEstimate'],
  },
  polishing: {
    prices: ['polishPanel', 'polishLight', 'polishDeep'],
    related: ['spotRepair', 'panelPaint', 'fullPaint'],
    faq: ['polishing', 'polishScratches', 'photoEstimate'],
  },
}
