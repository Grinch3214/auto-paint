import type { Content } from '@/types/content'

export default {
  silverado: {
    tape: 'one car, start to finish',
    title: 'Chevrolet Silverado: from the frame bench to repainting the whole side',
    lead: 'The impact took the whole side. Straightening, new doors, sills and paint — all done here, the car never left the shop.',
    steps: {
      damage: {
        title: 'How it came in',
        text: 'The side was crushed from the front door to the rear arch: both doors needed replacing; the fender, sill and tailgate needed straightening.',
        alt: 'Chevrolet Silverado before repair: crushed side, sill and rear fender sanded to bare metal',
      },
      frame: {
        title: 'Frame bench',
        text: 'The car goes on the frame bench and we bring the body geometry back, so new parts sit on the factory points.',
        alt: 'Chevrolet Silverado on the frame bench: new front door fitted, the rear one still crushed',
      },
      newDoors: {
        title: 'New doors',
        text: "The rear door is replaced with a new one too — crushed doors aren't worth pulling. Both are aligned to the gaps with the fender and pillars.",
        alt: 'A new rear door fitted to the Chevrolet, fender and sill still in progress',
      },
      fender: {
        title: 'Fender straightening',
        text: "We bring the fender and arch back almost to factory shape with metalwork, so filler goes on in a thin layer — only to level the surface. A thick layer shrinks and cracks over time, so we don't do that. Then primer.",
        alt: 'Chevrolet rear fender after straightening, in filler and primer',
      },
      sills: {
        title: 'Sills',
        text: 'We restore the sills and door opening and prime them. The interior is sealed with film to keep dust out.',
        alt: 'Chevrolet sill in primer, interior covered with film',
      },
      prep: {
        title: 'Preparing the side',
        text: 'We remove the arch and sill trims and scuff the factory clear coat across the whole side so the paint lies evenly, with no line between old and new.',
        alt: 'White Chevrolet before painting: trims removed, factory clear coat on the side scuffed',
      },
      result: {
        title: 'The result',
        text: 'The whole side is painted to match the car: doors, fender, sill and tailgate.',
        alt: 'Chevrolet Silverado after repair and repainting the side',
      },
      details: {
        title: 'Details',
        text: 'The fuel door is body colour and the arches have new trims.',
        alt: 'Chevrolet rear fender after paint: body-colour fuel door, new arch trim',
      },
    },
  },
} satisfies Content['cases']
