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

export const LOGO = {
  folder: 'brand',
  name: 'autoatelier',
  widths: [320, 640, 960],
  width: 2040,
  height: 547,
} as const

/** sizes для фото в сетке работ: на мобиле карусель (обычное 80%, вертикальное 45%) */
export const WORK_SIZES = {
  normal: '(min-width: 768px) 25vw, 80vw',
  tall: '(min-width: 768px) 25vw, 45vw',
  wide: '(min-width: 768px) 50vw, 80vw',
  big: '(min-width: 768px) 50vw, 80vw',
} as const
