import type { Content } from '@/types/content'

export default {
  items: {
    bumper: {
      title: 'Bumper',
      text: 'Our most common job: parking scratches, scuffed corners, cracks from minor accidents. We weld and level the plastic, apply a dedicated plastic primer and only then paint. Parking sensors are removed and painted to match.',
    },
    hood: {
      title: 'Hood',
      text: 'The hood is the first to catch stone chips on the highway. We sand chips back to a sound layer, level the surface and paint the whole panel. A shade difference shows immediately on a hood, so we check the color especially carefully.',
    },
    fender: {
      title: 'Fender',
      text: 'The front fender is usually bolted on, so we remove it and paint it separately. The rear quarter panel is part of the body: we work out dents, remove rust near the arch and paint it on the car, blending into the neighboring panels.',
    },
    door: {
      title: 'Door and door opening',
      text: 'We paint the outside of the door, or the inside too if it is a new panel. Handles and moldings come off so the paint does not stop at their edges. The door opening and pillars are painted separately when needed.',
    },
    roof: {
      title: 'Roof and trunk',
      text: 'The roof fades and cracks in the sun more than any other panel. We strip the old finish where it is peeling, prime and paint the whole roof. The trunk lid is painted on the outside or on both sides.',
    },
    sill: {
      title: 'Sills',
      text: 'Metal sills are the most likely to rust: we strip corrosion back to bare metal, treat it, level and paint. Plastic sill covers are painted separately.',
    },
    small: {
      title: 'Small parts',
      text: 'Mirror covers, handles, moldings, spoilers. Painted in the body color or a contrast, for example gloss black.',
    },
    fullWhen: {
      title: 'When a full respray makes sense',
      text: 'A full respray is better value when there is damage across the whole body: faded clear coat on the roof and hood, chips on every side, traces of poor earlier repaints. If the problem is on one or two panels, painting just those is cheaper, and we will tell you so at the inspection.',
    },
    fullOpenings: {
      title: 'Exterior only or with door jambs',
      text: 'Exterior only means we paint all outer body panels, which is enough if the color stays the same. With door jambs we also paint the door, hood and trunk openings. That is needed for a color change, so the old color does not show when a door is open.',
    },
    fullColorChange: {
      title: 'Color change',
      text: 'We can repaint in any color: a factory color from another model or your own. We match the shade and do a test spray-out so you can see the color in real life. A color change includes the door jambs. Check in advance whether the new color needs to be registered in the car’s documents.',
    },
    fullPrep: {
      title: 'Disassembly and prep',
      text: 'We remove moldings, handles, lights and mirrors where possible, so the paint does not stop at their edges. Each panel is prepared separately: dents worked out, rust removed, filler, primer and sanding. Prep is most of the work, and it decides how the car will look.',
    },
    spotPolishOrPaint: {
      title: 'Polish or paint: how to tell',
      text: 'Run a fingernail across the scratch. If it does not catch, the scratch is in the top layer of clear coat and polishing usually removes it. If it catches, or you can see primer or metal, polishing will not do: it needs spot repair. We can tell for sure from a photo.',
    },
    spotChips: {
      title: 'Stone chips',
      text: 'A chip is small damage down to the primer or metal, usually on the hood and front bumper from stones. We clean it, prime it and fill it with matching paint so the metal does not start to rust.',
    },
    spotScratches: {
      title: 'Scratches and scuffs',
      text: 'We paint only the damaged area and blend the color and clear coat into the surrounding area, so the edge of the repair is invisible. This is how we fix scratches on doors, scuffed bumper corners and parking marks.',
    },
    spotLimits: {
      title: 'When spot repair is not enough',
      text: 'If the damage covers most of the panel, or there is a dent or rust under the paint, it is more reliable to paint the whole panel. The price difference is small and the result is better. Send us a photo and we will tell you which option is better value.',
    },
    polishBody: {
      title: 'Body polishing',
      text: 'A light polish removes car wash swirls and restores gloss on a car in good condition. A deep, abrasive polish takes off a thin layer of clear coat along with scratches and holograms, for dull, worn paint. We can also polish a single panel.',
    },
    headlights: {
      title: 'Headlight polishing',
      text: 'Cloudy, yellowed plastic headlights give less light and make a car look older. Polishing removes the hazy outer layer and makes them clear again. If a headlight has condensation inside or is cracked, polishing will not help, and we will tell you at the inspection.',
    },
    glass: {
      title: 'Glass polishing',
      text: 'We remove fine scratches and wiper marks from the windshield and side windows and restore clarity. Deep scratches that catch a fingernail and chips cannot be polished out.',
    },
    dents: {
      title: 'Dent repair and pulling',
      text: 'We remove dents on doors, fenders, hood and roof: pushing them out from inside or pulling from outside, then leveling the surface. After dent repair the panel is primed and painted, so the metal does not rust and the repair cannot be seen.',
    },
    frame: {
      title: 'Frame jig and body geometry',
      text: 'After a serious impact the body can be pulled out of shape: doors and hood close unevenly and the gaps differ. On the frame jig we measure the geometry against reference points, pull the body back into place, and only then paint.',
    },
    welding: {
      title: 'Welding and rust-through',
      text: 'We cut out rotten metal and weld in new, and repair cracks and damaged body parts. Welds are ground, treated against corrosion and sealed, then primed and painted.',
    },
    sills: {
      title: 'Sills and wheel arches',
      text: 'Sills and arches are the first to rust. We strip them to bare metal, weld in patches or replace the sill if needed, treat against corrosion and paint in the body color.',
    },
    plastic: {
      title: 'Plastic bumpers',
      text: 'We weld cracks, restore broken mounts and straighten deformed plastic. Then a dedicated plastic primer and color-matched paint: the bumper looks like new.',
    },
    rustproofing: {
      title: 'Rustproofing',
      text: 'After welding and dent repair we treat the metal against corrosion and seal cavities and seams, so rust does not come through the new paint.',
    },
    wheelPaint: {
      title: 'Wheel painting in the booth',
      text: 'We use liquid paint in the paint booth, just like the body: primer, color and clear coat. The price is per wheel and depends on its size.',
    },
    curbRash: {
      title: 'Curb rash and corrosion',
      text: 'Before painting we strip the old paint and corrosion, smooth out curb rash, degrease and prime. Prep decides how long the finish will last, and we never cut corners on it.',
    },
    wheelColors: {
      title: 'Choosing a color',
      text: 'Anything: factory silver, graphite, black, bronze or the body color. Clear coat in gloss or matte. Send us a photo of the car and we will suggest options and do a test spray-out.',
    },
    calipers: {
      title: 'Brake calipers',
      text: 'We paint calipers in the color of your choice: red, yellow, blue or to match the wheels. A visible detail behind the spokes that instantly changes the look of the car.',
    },
    tireService: {
      title: 'Tires off and on, done here',
      text: 'We remove the wheels, take off the tires, paint the wheels and put everything back together, all in-house with no trips between garages. Tire fitting is charged separately.',
    },
  },
} satisfies Content['blocks']
