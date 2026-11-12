export const IMAGES_BASE = '/images'

export const IMAGE_WIDTHS = [400, 800, 1200] as const

export const HERO_CAR = {
  folder: 'hero',
  name: 'audi',
  paint: 'audi-paint',
  widths: [800, 1200, 1600],
  sizes: '(max-width: 880px) 98vw, 860px',
  width: 1600,
  height: 940,
} as const
