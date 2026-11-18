import type { Content } from '@/types/content'

export default {
  seoTitle: 'Car Painting Prices in Batumi — {BRAND}',
  seoDescription:
    'Car painting prices in Batumi: bumper, hood, fender, door, roof, wheels, spot repair, full respray and polishing. What the price depends on and how to get an exact quote from photos.',
  h1: 'Car painting prices',
  lead: 'Prices in GEL: per panel, wheels, spot repair, full respray and polishing. These are guide prices: we give the exact amount from photos or after an inspection and agree it before work starts.',
  table: {
    tape: 'price list',
    title: 'All prices',
  },
  factors: {
    tape: 'what affects the price',
    title: 'How the price is calculated',
    lead: 'Two panels that look the same can cost differently. Here is what affects the total.',
    items: [
      {
        title: 'Condition of the panel',
        text: 'A new replacement panel costs less. A used or damaged one needs prep work: dent repair, filler, rust removal.',
      },
      {
        title: 'Color',
        text: 'Prices are for solid colors. Metallic, pearl, tri-coat colors and matte clear coat are quoted separately.',
      },
      {
        title: 'Size and class of the car',
        text: 'A crossover hood is bigger than a hatchback hood, and premium cars take more work to strip trim.',
      },
      {
        title: 'Number of panels',
        text: 'Several panels at once work out cheaper: prep, color matching and booth time are shared.',
      },
    ],
  },
} satisfies Content['pricesPage']
