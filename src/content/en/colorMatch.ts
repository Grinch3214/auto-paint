import type { Content } from '@/types/content'

export default {
  seoTitle: 'Car Paint Color Matching by VIN in Batumi — {BRAND}',
  seoDescription:
    'Car paint color matching in Batumi: paint code by VIN, test spray-out and a check against your car. Where to find the paint code on Toyota, Hyundai, Kia, VW, BMW, Mercedes and other makes.',
  h1: 'Color matching: by VIN and to your car',
  lead: 'The paint code is only the start. We match the shade to the actual color of your body so a new panel looks the same as its neighbors, in sun and in shade.',
  why: {
    tape: 'why',
    title: 'Why the code alone is not enough',
    lead: 'One paint code can come in several shades, and after a few years your car is no longer the color it left the factory in.',
    items: [
      {
        title: 'Paint fades',
        text: 'Sun, car washes and polishing change the shade over the years. Fresh paint mixed “by the code” will stand out next to an older panel.',
      },
      {
        title: 'Factory variants',
        text: 'The same code from different plants and years gives slightly different colors. That is why paint makers offer several shade variants for popular codes.',
      },
      {
        title: 'Metallic and pearl',
        text: 'The particles in the paint settle differently depending on how it is applied. We match these colors with extra care and quote them separately.',
      },
    ],
  },
  steps: {
    tape: 'how we match',
    title: 'Color matching in 4 steps',
    lead: 'We work with Sikkens, PPG, Standox and Roberlo.',
    items: [
      {
        title: 'Code by VIN',
        text: 'We find the factory paint code from the label or the car’s VIN.',
      },
      {
        title: 'Mixing',
        text: 'We mix the paint to the code’s formula and pick the shade variant closest to your car.',
      },
      {
        title: 'Test spray-out',
        text: 'We spray a test panel exactly the way we will paint the part, with the same coats and clear.',
      },
      {
        title: 'Check and adjust',
        text: 'We hold the test panel against the body in daylight and under a lamp. If needed, we adjust the shade and spray the panel again.',
      },
    ],
  },
  codes: {
    tape: 'reference',
    title: 'Where to find the paint code',
    lead: 'Choose your make to see where the code label usually is and what the code looks like.',
    brandsLabel: 'Car make',
    zonesLabel: 'Where to look',
    zones: {
      door: 'Driver’s door opening',
      hood: 'Under the hood',
      trunk: 'Trunk',
    },
    labelTitle: 'How it is labeled',
    exampleTitle: 'Example code',
    fallback:
      'Can’t find the label? Send us the VIN: it is visible under the windshield or in the registration document. We will find the paint code ourselves.',
    brands: {
      toyota: {
        name: 'Toyota / Lexus',
        where: 'Sticker on the B-pillar in the driver’s door opening.',
        label: 'C/TR: the characters before the slash',
        example: '040, 1F7, 218',
      },
      hyundai: {
        name: 'Hyundai / Kia',
        where: 'Sticker on the B-pillar in the driver’s door opening.',
        label: 'PAINT or EXT',
        example: 'PGU, NKA, W8',
      },
      vag: {
        name: 'VW / Audi / Skoda',
        where:
          'Sticker under the trunk floor, in the spare wheel well. Also on the first page of the service book.',
        label: '4-character code, usually starting with L',
        example: 'LC9A, LY9B, LA7W',
      },
      bmw: {
        name: 'BMW',
        where:
          'Under the hood, on the strut tower or the radiator support. Sometimes in the driver’s door opening.',
        label: '3-character code and the color name',
        example: '475, 300, A96',
      },
      mercedes: {
        name: 'Mercedes-Benz',
        where: 'In the driver’s door opening or under the hood on the radiator support.',
        label: '3–4 digit code',
        example: '197, 040, 775',
      },
      nissan: {
        name: 'Nissan / Infiniti',
        where: 'In the driver’s door opening or under the hood on the firewall.',
        label: 'COLOR',
        example: 'KH3, QAB, K23',
      },
      honda: {
        name: 'Honda / Acura',
        where: 'Sticker in the driver’s door opening.',
        label: 'Letters and numbers, often ending in P or M',
        example: 'NH731P, B-588P',
      },
      mazda: {
        name: 'Mazda',
        where: 'In the driver’s door opening or under the hood on the firewall.',
        label: 'COLOR',
        example: '41V, 46G, 25D',
      },
      mitsubishi: {
        name: 'Mitsubishi',
        where: 'Plate under the hood, on the firewall.',
        label: 'EXT or COLOR',
        example: 'W37, X42, U17',
      },
      ford: {
        name: 'Ford',
        where: 'Sticker in the driver’s door opening.',
        label: 'PAINT or EXT PNT',
        example: 'UA, YZ',
      },
      chevrolet: {
        name: 'Chevrolet',
        where: 'In the driver’s door opening; on older models, an SPID sticker in the glovebox.',
        label: 'Code with WA or BC/CC',
        example: 'GAZ, WA8555',
      },
      subaru: {
        name: 'Subaru',
        where: 'Under the hood on the strut tower or in the driver’s door opening.',
        label: '3-character code',
        example: 'K1X, D4S, 61K',
      },
    },
  },
} satisfies Content['colorMatch']
