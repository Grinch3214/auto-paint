import type { ServicePageData } from '@/types/servicePages'
import type { ServicePageId } from '@/types/pages'

export const SERVICE_PAGES: Record<ServicePageId, ServicePageData> = {
  spotRepair: {
    heroWork: 'wingSpot',
    prices: ['spotChip', 'spotScratch', 'bumperCorner', 'spotPartial'],
    stages: ['inspection', 'filler', 'primer', 'colorMatch', 'paintBooth'],
    related: ['panelPaint', 'colorMatch'],
    faq: ['singlePart', 'colorMatch', 'photoEstimate', 'polishing'],
  },
}
