export type PriceGroupId =
  | 'front'
  | 'side'
  | 'roof'
  | 'small'
  | 'wheels'
  | 'spot'
  | 'full'
  | 'polish'
  | 'bodyDents'
  | 'bodyFrame'
  | 'bodyRust'

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
  | 'wheelR17'
  | 'wheelR19'
  | 'wheelRestore'
  | 'spotChip'
  | 'spotArea'
  | 'spotScratch'
  | 'fullExterior'
  | 'fullWithOpenings'
  | 'polishPanel'
  | 'polishLight'
  | 'polishDeep'
  | 'polishHeadlights'
  | 'polishGlass'
  | 'bodyDentFender'
  | 'bodyDentDoor'
  | 'bodyDentHood'
  | 'bodyDentTrunk'
  | 'bodyDentRoof'
  | 'bodyBumperRepair'
  | 'bodyBumperStraighten'
  | 'bodyFrameDiag'
  | 'bodyFrameFix'
  | 'bodyWeld'
  | 'bodyRustPatch'
  | 'bodyWeldAlu'
  | 'bodySillRepair'
  | 'bodySillReplace'
  | 'bodyArchRepair'
  | 'bodyRustSills'
  | 'bodyRustUnderbody'
  | 'bodySeams'

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
