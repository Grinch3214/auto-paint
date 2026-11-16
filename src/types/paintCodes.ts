export type PaintCodeBrandId =
  | 'toyota'
  | 'hyundai'
  | 'vag'
  | 'bmw'
  | 'mercedes'
  | 'nissan'
  | 'honda'
  | 'mazda'
  | 'mitsubishi'
  | 'ford'
  | 'chevrolet'
  | 'subaru'

/** где может быть табличка с кодом */
export type PaintCodeZone = 'door' | 'hood' | 'trunk'

export interface PaintCodeBrand {
  id: PaintCodeBrandId
  zones: readonly PaintCodeZone[]
}
