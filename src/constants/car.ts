import type { CarPart } from '@/types/car'

/** Индексы <path> в src/assets/hero-car.svg по деталям; всё, чего здесь нет, — кузов (перекрашивается) */
export const CAR_PART_PATHS: Record<Exclude<CarPart, 'paint'>, readonly number[]> = {
  glass: [2, 3, 5, 6],
  trim: [4, 7, 11, 12, 13, 20, 23, 38, 69],
  grille: [39, 45, 61],
  tire: [24, 25, 41, 43, 50],
  rim: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 54, 57, 59, 60, 62, 66, 67, 70, 71, 72],
  lens: [44, 46, 53],
  light: [47],
  amber: [64, 65],
}
