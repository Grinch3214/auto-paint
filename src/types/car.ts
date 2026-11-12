export interface PaintFilter {
  sepia: number
  hue: number
  saturate: number
  brightness: number
  contrast: number
}

export interface Swatch {
  name: string
  color: string
  paint: PaintFilter
}
