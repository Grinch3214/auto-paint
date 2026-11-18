import type { Content } from '@/types/content'

export default {
  tape: 'process',
  title: 'How we paint',
  lead: 'Eight stages every car goes through. The work is done by painters and body repairers with 12+ years of experience.',
  leadPartial:
    'The stages this job goes through. The work is done by painters and body repairers with 12+ years of experience.',
  noteLabel: 'why',
  items: {
    inspection: {
      title: 'Inspection and estimate',
      text: 'We look at the car or the photos you sent and discuss the color and scope of work. We write an estimate and agree it with you. Work starts only after you approve it.',
      note: 'the price is agreed before work starts, no surprises',
    },
    disassembly: {
      title: 'Disassembly and washing',
      text: 'Where possible we remove moldings, handles, lights and mirrors, then wash and degrease the body.',
      note: 'no hard paint edges or tape lines',
    },
    repair: {
      title: 'Dent repair and rustproofing',
      text: 'Body repairers work out dents and, when needed, weld and fix body geometry. We remove rust, sand chips back to a sound layer and treat the metal against corrosion, all in-house before painting.',
      note: 'rust will not come through the new paint',
    },
    filler: {
      title: 'Filler and sanding',
      text: 'We level the surface with filler and sand it, checking the panel under a lamp against the light.',
      note: 'straight panels: no waves under the clear coat',
    },
    primer: {
      title: 'Primer and masking',
      text: 'Primer protects the metal and fills sanding marks. We sand it using a guide coat and cover everything we are not painting with paper and film.',
      note: 'we catch defects before the color, not after the clear coat',
    },
    colorMatch: {
      title: 'Color matching',
      text: 'Paint code by VIN, then a test spray-out checked against your panel. Materials: Sikkens, PPG, Standox, Roberlo.',
      note: 'factory paint fades, so we match it to the actual car',
    },
    paintBooth: {
      title: 'Base coat and clear coat in the booth',
      text: 'We paint and bake in a paint booth: one car at a time, with ventilation that removes dust. The clear coat adds depth and protection.',
      note: 'no dust and no runs',
    },
    assembly: {
      title: 'Reassembly and final check',
      text: 'We reassemble the car and inspect the finish under lamps from every side before handing it back.',
      note: 'you collect a car we have checked ourselves',
    },
  },
} satisfies Content['stages']
