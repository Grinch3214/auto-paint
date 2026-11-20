export const IMAGES_BASE = '/images'

export const IMAGE_WIDTHS = [400, 800, 1200] as const

export const LOGO = {
  folder: 'brand',
  name: 'autoatelier',
  widths: [320, 640, 960],
  width: 2040,
  height: 547,
} as const

/** sizes для фото в сетке работ: на мобиле карусель (обычное 80%, вертикальное 45%) */
export const WORK_SIZES = {
  landscape: '(min-width: 768px) 25vw, 80vw',
  portrait: '(min-width: 768px) 25vw, 45vw',
} as const

export const HERO_BG_VIDEO = {
  wide: '/video/booth-red-1280.mp4',
  square: '/video/booth-red-720sq.mp4',
} as const
