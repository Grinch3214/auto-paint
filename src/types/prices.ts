export type PriceGroupId = 'front' | 'side' | 'roof' | 'small'

export type PriceItemId =
  | 'hood'
  | 'bumper'
  | 'frontFender'
  | 'door'
  | 'doorBothSides'
  | 'rearFender'
  | 'sillMetal'
  | 'sillPlastic'
  | 'upperPillar'
  | 'doorOpeningHalf'
  | 'roof'
  | 'trunkLid'
  | 'trunkLidBothSides'
  | 'doorHandle'
  | 'parkingSensors'
  | 'moldings'
  | 'mirrorCover'
  | 'spoiler'
  | 'wheel'
  | 'caliper'

export interface PriceItem {
  id: PriceItemId
  fresh?: number
  used?: number
  single?: number
  ask?: boolean
}

export interface PriceGroup {
  id: PriceGroupId
  items: readonly PriceItem[]
}

/** Строка цены, готовая к выводу: «Бампер — от 390 ₾» */
export interface PriceRow {
  id: PriceItemId
  name: string
  price: string
  ask: boolean
}
