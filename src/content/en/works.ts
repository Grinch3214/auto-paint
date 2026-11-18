import type { Content } from '@/types/content'

export default {
  tape: 'from our booth',
  title: 'Our work',
  lead: 'Real cars and panels. Tap a photo to see it larger.',
  openPhoto: 'Open photo: {alt}',
  items: {
    hoodGloss: { alt: 'Hood after clear coat in the booth', tag: 'hood · clear coat' },
    sideGloss: { alt: 'Rear quarter panel and door after clear coat', tag: 'fender · clear coat' },
    sedanAfter: { alt: 'White sedan after repair and painting', tag: 'sedan · done' },
    partsGloss: { alt: 'Doors, fender and bumper after clear coat', tag: 'panels · clear coat' },
    wingSpot: { alt: 'Spot repair on a fender', tag: 'spot repair' },
    crossoverBefore: { alt: 'Crossover before repair, bumper removed', tag: 'before repair' },
    sideBase: { alt: 'Fender in primer and base coat', tag: 'primer · base' },
    partsBase: { alt: 'Panels in base coat before clear', tag: 'panels · base' },
  },
} satisfies Content['works']
