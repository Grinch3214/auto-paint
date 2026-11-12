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
  /** новая деталь после замены */
  fresh?: number
  /** б/у деталь с подготовкой */
  used?: number
  /** одна цена на обе колонки */
  single?: number
  /** цену называем по фото */
  ask?: boolean
}

export interface PriceGroup {
  id: PriceGroupId
  items: readonly PriceItem[]
}
