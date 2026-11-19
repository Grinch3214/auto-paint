import type { Content } from '@/types/content'

export default {
  tape: 'services',
  title: 'What we paint',
  lead: "Not sure what you need: one panel, just a chip or the whole car? Send a photo and we'll advise you and give a quote.",
  fitsLabel: 'good for:',
  more: 'Learn more →',
  items: {
    fullPaint: {
      title: 'Full respray',
      text: 'Repainting the whole body in the factory color or a new one. We remove trim, prepare every panel and paint in the booth.',
      fits: 'color change, sun-faded paint',
    },
    panelPaint: {
      title: 'Panel painting',
      text: 'Door, fender, hood or bumper. We match the color so the panel looks the same as the ones next to it.',
      fits: 'after an accident (with dent repair), after replacement or scratches',
    },
    spotRepair: {
      title: 'Spot repair',
      text: 'A chip or scratch on a small area: we paint only the damage and blend it in, not the whole panel.',
      fits: 'chips, scratches, scuffed bumpers',
    },
    wheelPaint: {
      title: 'Wheel painting',
      text: 'Alloy and steel wheels, brake calipers. We remove curb rash and corrosion and paint in the factory or a new color.',
      fits: 'scuffed and peeling wheels, color change',
    },
    bodyRepair: {
      title: 'Body repair and dent removal',
      text: 'We pull dents, weld, fix body geometry, repair sills and bumpers, and paint right here in our shop.',
      fits: 'after an accident, dents, rust',
      tag: 'prep for painting',
    },
    polishing: {
      title: 'Polishing',
      text: 'Body, headlights and glass: we remove swirl marks, holograms and haze to bring back gloss and clarity.',
      fits: 'dull paint, cloudy headlights, wiper marks',
    },
    colorMatch: {
      title: 'Color matching',
      text: 'Paint code by VIN, a test spray-out and a check against your car. We can tell you where to find the paint code on your make.',
      fits: 'when you need an exact color',
    },
  },
} satisfies Content['services']
