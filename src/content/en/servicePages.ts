import type { Content } from '@/types/content'

export default {
  ctaEstimate: 'Free photo estimate',
  scope: {
    tape: 'what we do',
    includesTitle: 'What’s included',
    casesTitle: 'Good for',
  },
  price: {
    tape: 'price',
    title: 'How much it costs',
    listTitle: 'Guide prices',
    note: 'The price depends on the panel, the color and the condition of the finish. We give the exact amount from photos or at an inspection and agree it before work starts.',
    askTitle: 'We quote from photos or at an inspection',
    askText:
      'The cost depends on the condition of the body, the amount of prep and the color. Send us photos and we will reply with a preliminary estimate. The exact amount is agreed before work starts.',
    askCta: 'Send photos',
    inBlocksTitle: 'Prices by type of work',
    inBlocksText:
      'Below are starting prices for each type of work. The total depends on the damage: we give the exact amount from photos or at an inspection and agree it before work starts.',
    inBlocksCta: 'See prices',
  },
  related: {
    tape: 'more',
    title: 'What else we paint',
  },
  aside: {
    tape: 'visit us',
    title: 'Show us the car and we will quote on the spot',
    route: 'Directions',
    facts: [
      {
        title: 'Free estimate',
        text: 'from photos or at an inspection; we start only with your approval',
      },
      { title: 'Color by VIN and by panel', text: 'test spray-out checked against the car' },
      { title: 'Our own booth', text: 'painted and baked with no dust or runs' },
      { title: 'Polishing included', text: 'after our paint job, at no extra cost' },
    ],
  },
  items: {
    fullPaint: {
      seoTitle: 'Full Car Respray in Batumi — {BRAND}',
      seoDescription:
        'Full car respray in Batumi: factory or new color, with trim removal, dent repair and rustproofing before painting. Our own paint booth, free estimate from photos.',
      h1: 'Full car respray',
      lead: 'We repaint the whole body, in the factory color or a new one. We remove the trim, prepare every panel and paint the entire car in the paint booth.',
      blocks: {
        tape: 'in detail',
        title: 'How a full respray works',
        lead: 'What to know before repainting the whole car.',
      },
      includes: [
        'body inspection and estimate before work starts',
        'trim removal: moldings, handles, lights, mirrors',
        'dent repair and rustproofing where needed',
        'filler, primer and sanding on every panel',
        'factory color by VIN or a new color of your choice',
        'base coat and clear coat in the paint booth',
        'reassembly, polishing and a check under lamps',
      ],
      cases: [
        'color change',
        'faded or dull paint',
        'chips and scratches all over the body',
        'after repairs to several panels',
        'getting the car ready for sale',
      ],
    },
    panelPaint: {
      seoTitle: 'Bumper, Hood, Fender and Door Painting in Batumi — {BRAND}',
      seoDescription:
        'Car panel painting in Batumi: bumper, hood, fender, door, roof, sills. Prices per panel, color matching by VIN and to your car, our own paint booth.',
      h1: 'Panel painting: bumper, hood, fender, door',
      lead: 'We paint one panel or several so they match the rest of the body. Before painting we remove dents and rust, and match the color by VIN and to your car.',
      blocks: {
        tape: 'by panel',
        title: 'Panels we paint',
        lead: 'Starting prices per panel. The total depends on condition and color; we give the exact amount from photos or at an inspection.',
      },
      includes: [
        'panel inspection and estimate before work starts',
        'removing the panel or trim where needed',
        'dent repair and rustproofing as prep for painting',
        'crack repair on plastic bumpers',
        'filler, primer and sanding',
        'color matching by VIN and a test spray-out',
        'base coat and clear coat in the booth, polishing',
      ],
      cases: [
        'after an accident or a parking scrape',
        'after replacing a panel with a new or used one',
        'deep scratches and chips across the panel',
        'rust on a fender or sill',
        'a faded panel that no longer matches',
      ],
    },
    spotRepair: {
      seoTitle: 'Car Spot Repair in Batumi: Chips and Scratches — {BRAND}',
      seoDescription:
        'Spot repair in Batumi: we fix chips, scratches and scuffs without repainting the whole panel. Color matching by VIN and to your car, free estimate from photos on the site or via WhatsApp.',
      h1: 'Spot repair: chips and scratches',
      lead: 'When the damage is small, there is no need to paint the whole panel. We restore the finish only on the damaged area and blend it in so the edge of the repair does not catch the eye.',
      photoCaption: 'fender: primer before color',
      blocks: {
        tape: 'in detail',
        title: 'Chips and scratches',
        lead: 'How to tell what your car needs, and what we do with each type of damage.',
      },
      includes: [
        'damage inspection and estimate before work starts',
        'sanding the chip or scratch back to a sound layer',
        'filler and primer on the repair area',
        'color matching by VIN and a test spray-out',
        'base coat with a smooth blend and clear coat',
        'polishing the area after painting',
      ],
      cases: [
        'chips on the hood and fender',
        'scratches on a door or bumper',
        'scuffed bumper corners from parking',
        'minor clear coat damage',
      ],
    },
    wheelPaint: {
      seoTitle: 'Wheel and Brake Caliper Painting in Batumi — {BRAND}',
      seoDescription:
        'Alloy and steel wheel painting in Batumi: we remove curb rash and corrosion and paint in the factory or a new color, gloss or matte. Brake calipers in any color.',
      h1: 'Wheel and brake caliper painting',
      lead: 'We bring wheels back to factory look or paint them a new color. We remove curb rash, peeling clear coat and corrosion, paint with liquid paint and bake in the paint booth. We take the wheels off and put them back ourselves.',
      blocks: {
        tape: 'in detail',
        title: 'Wheels and calipers',
        lead: 'Starting prices per wheel. The total depends on size and condition.',
      },
      includes: [
        'wheel inspection and estimate before work starts',
        'wheel removal and tire fitting, charged separately',
        'washing and degreasing',
        'stripping old paint, clear coat and corrosion',
        'curb rash repair',
        'primer, liquid paint and clear coat in the paint booth',
        'brake calipers in the color of your choice',
      ],
      cases: [
        'curb rash',
        'peeling or yellowed clear coat',
        'corroded wheels',
        'color change: black, graphite, body color',
        'bright calipers',
      ],
    },
    bodyRepair: {
      seoTitle: 'Body Repair and Dent Removal in Batumi, Painting Included | {BRAND}',
      seoDescription:
        'Body repair and dent removal in Batumi ahead of painting: we pull dents, weld, straighten frames on a jig, repair sills and bumpers, and paint right away in our own booth.',
      h1: 'Body repair and dent removal before painting',
      lead: 'Dent and body repair: we pull, weld and fix body geometry, then paint right here in our shop. No need to drive the car between different garages.',
      blocks: {
        tape: 'types of work',
        title: 'What we do with the body',
        lead: 'Every job ends with painting, right here in our own booth.',
      },
      includes: [
        'body inspection and estimate before work starts',
        'dent repair and pulling',
        'frame straightening on a jig',
        'welding and rust-through repair',
        'sill and wheel arch repair',
        'plastic bumper welding and straightening',
        'rustproofing',
        'primer and painting in the booth right after the repair',
      ],
      cases: [
        'after an accident',
        'dents on doors and fenders',
        'rusty sills and arches',
        'a cracked bumper',
        'a misaligned body after an impact',
      ],
    },
    polishing: {
      seoTitle: 'Car Body, Headlight and Glass Polishing in Batumi — {BRAND}',
      seoDescription:
        'Car polishing in Batumi: body (light and deep), headlights and glass. We remove car wash swirls, scratches, holograms and haze to restore gloss and clarity. Any car welcome.',
      h1: 'Body, headlight and glass polishing',
      lead: 'We bring back gloss to the body and clarity to headlights and glass: removing car wash swirls, holograms, dullness and haze. We polish any car, not only after our paint jobs.',
      blocks: {
        tape: 'types of polishing',
        title: 'What we polish',
        lead: 'Body, headlights and glass, on any car. After our paint job, polishing the panel is included in the price.',
      },
      includes: [
        'inspection of the finish under a lamp',
        'washing and masking rubber, plastic and joints',
        'light polish: swirls and car wash marks',
        'deep abrasive polish: scratches and holograms',
        'headlight polishing: haze and yellowing',
        'glass polishing: wiper marks and fine scratches',
        'finishing polish and a check under lamps',
      ],
      cases: [
        'dull, matte-looking paint',
        'swirls and scratches from car washes',
        'cloudy or yellowed headlights',
        'wiper marks on the windshield',
        'before selling the car',
      ],
    },
  },
} satisfies Content['servicePages']
