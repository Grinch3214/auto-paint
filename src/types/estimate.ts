export interface EstimatePhoto {
  id: number
  blob: Blob
  url: string
}

export type EstimateFormStatus = 'idle' | 'sending' | 'sent' | 'error'
