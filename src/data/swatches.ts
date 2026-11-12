import type { Swatch } from '@/types/car'

// Заводские цвета Audi A4 (B9). Краска — синий рендер машины, перекрашенный фильтрами; подобрано на глаз
export const SWATCHES: readonly Swatch[] = [
  {
    name: 'Ibis White',
    color: '#f1f0eb',
    paint: { sepia: 0, hue: 0, saturate: 0, brightness: 3.6, contrast: 0.6 },
  },
  {
    name: 'Matador Red',
    color: '#8e1a1f',
    paint: { sepia: 0, hue: 128, saturate: 1.2, brightness: 0.72, contrast: 1 },
  },
  {
    name: 'Navarra Blue',
    color: '#1d3f9a',
    paint: { sepia: 0, hue: 0, saturate: 1.2, brightness: 0.65, contrast: 1.1 },
  },
  {
    name: 'Scuba Blue',
    color: '#5679ad',
    paint: { sepia: 0, hue: 0, saturate: 0.45, brightness: 1.3, contrast: 1 },
  },
  {
    name: 'Gotland Green',
    color: '#3d5a37',
    paint: { sepia: 0, hue: 245, saturate: 0.22, brightness: 0.9, contrast: 1 },
  },
  {
    name: 'Florett Silver',
    color: '#b9bdc2',
    paint: { sepia: 0, hue: 0, saturate: 0, brightness: 2.2, contrast: 1 },
  },
  {
    name: 'Mythos Black',
    color: '#2a2b2e',
    paint: { sepia: 0, hue: 0, saturate: 0, brightness: 0.45, contrast: 1 },
  },
]
