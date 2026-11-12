import type { EstimatePartId } from './estimate'
import type { PriceGroupId, PriceItemId } from './prices'
import type { ServiceId } from './services'
import type { StageId } from './stages'
import type { WorkId } from './works'

export interface ServiceText {
  title: string
  text: string
  fits: string
}

export interface StageText {
  title: string
  text: string
  note: string
}

export interface WorkText {
  alt: string
  tag: string
}

export interface PricesContent {
  groups: Record<PriceGroupId, string>
  items: Record<PriceItemId, string>
  photoSteps: readonly string[]
  flow: readonly string[]
}

export interface EstimateContent {
  parts: Record<EstimatePartId, string>
  message: string
}

export interface HeroContent {
  eyebrow: string
  titleLines: readonly string[]
  lead: string
  recolor: string
  colorPicker: string
  ctaEstimate: string
  ctaProcess: string
}

export interface Content {
  hero: HeroContent
  services: Record<ServiceId, ServiceText>
  prices: PricesContent
  stages: Record<StageId, StageText>
  works: Record<WorkId, WorkText>
  estimate: EstimateContent
}
