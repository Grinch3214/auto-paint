export interface PriceRow {
  name: string
  fresh?: number
  own?: number
  single?: number
  ask?: boolean
}

export interface PriceGroup {
  title: string
  rows: PriceRow[]
}
