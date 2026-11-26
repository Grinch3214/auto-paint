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

/** sizes для шагов истории машины: телефон — лента 80%, планшет — 2 в ряд, десктоп — 4 */
export const CASE_SIZES = '(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 80vw'

/** то же для главной: на десктопе 6 в ряд */
export const WORK_SIZES_DENSE = {
  landscape: '(min-width: 1024px) 17vw, (min-width: 768px) 25vw, 80vw',
  portrait: '(min-width: 1024px) 17vw, (min-width: 768px) 25vw, 45vw',
} as const

export const OG_FOLDER = 'og'
export const HOME_OG_IMAGE = 'chevy-side-after'

export const HERO_BG_VIDEO = {
  wide: '/video/booth-red-1280.mp4',
  square: '/video/booth-red-720sq.mp4',
} as const
