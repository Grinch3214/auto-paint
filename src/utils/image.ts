import { IMAGE_WIDTHS, IMAGES_BASE, OG_FOLDER } from '@/constants/images'
import type { ImageSources } from '@/types/images'

/** Файлы лежат как public/images/<folder>/<name>-<ширина>.webp */
export function imageUrl(folder: string, name: string, width: number): string {
  return `${IMAGES_BASE}/${folder}/${name}-${width}.webp`
}

export function imageSources(
  folder: string,
  name: string,
  widths: readonly number[] = IMAGE_WIDTHS,
): ImageSources {
  const fallback = widths[Math.floor(widths.length / 2)] ?? widths[0] ?? IMAGE_WIDTHS[1]
  return {
    src: imageUrl(folder, name, fallback),
    srcset: widths.map((w) => `${imageUrl(folder, name, w)} ${w}w`).join(', '),
  }
}

/** Превью страницы (og:image): public/images/og/<name>.jpg */
export function ogImageUrl(name: string): string {
  return `${IMAGES_BASE}/${OG_FOLDER}/${name}.jpg`
}
