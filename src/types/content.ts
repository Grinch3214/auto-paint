import type { FaqEntry, FaqId } from './faq'
import type { PaintCodeBrandId, PaintCodeZone } from './paintCodes'
import type { ServicePageId } from './pages'
import type { BlockId } from './blocks'
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
  /** скотч над карточкой, например «подготовка к покраске» */
  tag?: string
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
  tape: string
  titleLines: readonly string[]
  lead: string
  facts: readonly string[]
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
  /** ссылка с главной на полную таблицу */
  allPrices: string
  partHeader: string
  priceHeader: string
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
  leadPartial: string
  noteLabel: string
  items: Record<StageId, StageText>
}

export interface WorksContent extends SectionHeading {
  openPhoto: string
  items: Record<WorkId, WorkText>
}

export interface InsuranceContent {
  title: string
  docsBefore: string
  docs: readonly string[]
  docsJoiner: string
  docsAfter: string
}

export interface EstimateContent extends SectionHeading {
  message: string
  form: {
    photos: string
    photosAdd: string
    photosHint: string
    photosProcessing: string
    photoRemove: string
    photosLimit: string
    photoError: string
    text: string
    textPlaceholder: string
    phone: string
    phonePlaceholder: string
    submit: string
    sending: string
    sent: string
    error: string
    needPhone: string
    needContent: string
    orMessenger: string
    consent: string
    phoneCountry: string
    phoneInvalid: string
    consentLink: string
  }
}

export interface FaqContent extends SectionHeading {
  items: Record<FaqId, FaqEntry>
}

export interface VisitContent extends SectionHeading {
  addressLabel: string
  hoursLabel: string
  phoneLabel: string
  route: string
  allContacts: string
}

export interface ServicePageText extends PageIntro {
  photoCaption?: string
  /** заголовок блока разделов, если у страницы есть blocks */
  blocks?: SectionHeading
  includes: readonly string[]
  cases: readonly string[]
}

export interface ServicePagesContent {
  ctaEstimate: string
  scope: { tape: string; includesTitle: string; casesTitle: string }
  price: {
    tape: string
    title: string
    listTitle: string
    note: string
    askTitle: string
    askText: string
    askCta: string
    inBlocksTitle: string
    inBlocksText: string
    inBlocksCta: string
  }
  related: { tape: string; title: string }
  aside: {
    tape: string
    title: string
    route: string
    facts: readonly { title: string; text: string }[]
  }
  items: Record<ServicePageId, ServicePageText>
}

/** Начало отдельной страницы: SEO и hero. {BRAND} в seoTitle подставляется */
export interface PageIntro {
  seoTitle: string
  seoDescription: string
  h1: string
  lead: string
}

export interface TitledText {
  title: string
  text: string
}

export interface BlocksContent {
  items: Record<BlockId, TitledText>
}

export interface PaintCodeText {
  name: string
  where: string
  label: string
  example: string
}

export interface ColorMatchContent extends PageIntro {
  why: SectionHeading & { items: readonly TitledText[] }
  steps: SectionHeading & { items: readonly TitledText[] }
  codes: SectionHeading & {
    brandsLabel: string
    zonesLabel: string
    zones: Record<PaintCodeZone, string>
    labelTitle: string
    exampleTitle: string
    fallback: string
    brands: Record<PaintCodeBrandId, PaintCodeText>
  }
}

export interface PricesPageContent extends PageIntro {
  table: { tape: string; title: string }
  factors: SectionHeading & { items: readonly TitledText[] }
}

export interface ContactsPageContent extends PageIntro {
  channels: {
    tape: string
    title: string
    phone: string
    phoneHint: string
    whatsapp: string
    whatsappHint: string
    email: string
    emailHint: string
  }
  visit: {
    tape: string
    title: string
    hours: string
    address: string
    route: string
    notes: readonly string[]
  }
  map: { title: string; show: string; open: string; frameTitle: string }
}

export interface PrivacySection {
  title: string
  paragraphs?: readonly string[]
  items?: readonly string[]
  /** абзацы после списка */
  after?: readonly string[]
}

export interface PrivacyPageContent extends PageIntro {
  /** «Редакция от …» */
  updated: string
  sections: readonly PrivacySection[]
}

export interface Content {
  hero: HeroContent
  services: ServicesContent
  prices: PricesContent
  howto: HowtoContent
  insurance: InsuranceContent
  stages: StagesContent
  works: WorksContent
  estimate: EstimateContent
  faq: FaqContent
  visit: VisitContent
  servicePages: ServicePagesContent
  blocks: BlocksContent
  colorMatch: ColorMatchContent
  pricesPage: PricesPageContent
  contactsPage: ContactsPageContent
  privacyPage: PrivacyPageContent
}
