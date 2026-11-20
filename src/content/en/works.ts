import type { Content } from '@/types/content'

export default {
  tape: 'from our booth',
  title: 'Our work',
  lead: 'Real cars and panels. Tap a photo to see it larger.',
  openPhoto: 'Open photo: {alt}',
  items: {
    frameDoors: {
      alt: 'Pickup on the frame bench: new doors fitted, repair area by the rear quarter',
      tag: 'frame bench · new doors',
    },
    primerFender: {
      alt: 'Pickup rear quarter in primer after body repair',
      tag: 'quarter · primer',
    },
    primerSill: { alt: 'Sill in primer, interior masked before painting', tag: 'sill · prep' },
    wheelsBefore: { alt: 'Wheels before painting: worn finish and chips', tag: 'before' },
    wheelsGloss: { alt: 'Wheel after painting in gloss black', tag: 'wheels · gloss black' },
    frameSill: { alt: 'Pickup sill and rear quarter before repair', tag: 'before repair' },
    mattingSide: {
      alt: 'White Chevrolet before painting: arch and sill trims removed, factory clear coat on the side scuffed',
      tag: 'prep · scuffing',
    },
    mattingCloseup: {
      alt: 'Painter scuffing the factory clear coat with an abrasive pad by the wheel arch',
      tag: 'scuffing the clear',
    },
  },
} satisfies Content['works']
