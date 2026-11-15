export type PriceGroupId = 'front' | 'side' | 'roof' | 'small' | 'spot'

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
  | 'spotChip'
  | 'spotScratch'
  | 'bumperCorner'
  | 'spotPartial'

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
