export type CarPart =
  | 'paint'
  | 'glass'
  | 'trim'
  | 'grille'
  | 'tire'
  | 'rim'
  | 'lens'
  | 'light'
  | 'amber'

export interface CarPath {
  d: string
  part: CarPart
}

export interface Swatch {
  name: string
  code: string
  color: string
}
