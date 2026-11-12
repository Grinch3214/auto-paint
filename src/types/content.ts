import type { EstimatePartId } from './estimate'
import type { PriceGroupId, PriceItemId } from './prices'
import type { ServiceId } from './services'
import type { StageId } from './stages'
import type { WorkId } from './works'

export interface SectionHeading {
  tape: string
  title: string
  lead: string
}

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

export interface HeroContent {
  eyebrow: string
  titleLines: readonly string[]
  lead: string
  recolor: string
  colorPicker: string
  ctaEstimate: string
  ctaProcess: string
}

export interface ServicesContent extends SectionHeading {
  fitsLabel: string
  more: string
  items: Record<ServiceId, ServiceText>
}

export interface PriceColumn {
  title: string
  hint: string
}

export interface PricesContent {
  title: string
  intro: string
  partHeader: string
  fresh: PriceColumn
  used: PriceColumn
  ask: string
  note: string
  groups: Record<PriceGroupId, string>
  items: Record<PriceItemId, string>
}

export interface HowtoOption {
  tape: string
  title: string
  cta: string
}

export interface HowtoContent {
  title: string
  photo: HowtoOption & { steps: readonly string[] }
  onSite: HowtoOption & { text: string }
  flowTitle: string
  flow: readonly string[]
  flowNote: string
}

export interface StagesContent extends SectionHeading {
  noteLabel: string
  items: Record<StageId, StageText>
}

export interface WorksContent extends SectionHeading {
  /** {alt} — подпись фото */
  openPhoto: string
  items: Record<WorkId, WorkText>
}

export interface PassportContent {
  tape: string
  title: string
  label: string
  rows: readonly { term: string; value: string }[]
}

export interface InsuranceContent {
  title: string
  lead: string
  /** «{before} <strong>док1</strong> {joiner} <strong>док2</strong> {after}» */
  docsBefore: string
  docs: readonly string[]
  docsJoiner: string
  docsAfter: string
}

export interface EstimateContent extends SectionHeading {
  parts: Record<EstimatePartId, string>
  message: string
}

export interface Content {
  hero: HeroContent
  services: ServicesContent
  prices: PricesContent
  howto: HowtoContent
  insurance: InsuranceContent
  stages: StagesContent
  works: WorksContent
  passport: PassportContent
  estimate: EstimateContent
}
