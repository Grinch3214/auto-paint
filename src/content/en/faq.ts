import type { Content } from '@/types/content'

export default {
  tape: 'questions',
  title: 'FAQ',
  lead: 'Price, color and prep in brief. Can’t find an answer? Message or call us.',
  items: {
    price: {
      question: 'How much does car painting cost in Batumi?',
      answer:
        'We price per panel: front fender from {frontFender} GEL, bumper from {bumper}, hood from {hood}, roof from {roof}. A full exterior respray starts at {fullExterior} GEL. The total depends on the condition of the panel, the color and the class of the car. We give the exact amount from photos or after an inspection and agree it with you before work starts.',
    },
    singlePart: {
      question: 'Can you paint just one panel or touch up a chip?',
      answer:
        'Yes. We paint individual panels: bumper, fender, door, hood. Chips and scratches on a small area are fixed with spot repair: we paint only the damage and blend it in, not the whole panel. Small chip repair starts at {spotChip} GEL.',
    },
    colorMatch: {
      question: 'How do you match the color so the panel does not stand out?',
      answer:
        'We take the paint code from the VIN, do a test spray-out and compare it with your car in daylight. Paint fades over time, so the factory code alone is not enough: we adjust the shade to the actual color of the body.',
    },
    bodyRepair: {
      question: 'Do I need dent repair before painting?',
      answer:
        'If the panel has dents or rust, yes. Otherwise the paint goes over an uneven surface or bubbles over time. We do dent and body repair ourselves, on site: we pull, weld, fix geometry, treat for rust and paint right here in our shop. No need to drive the car between different garages.',
    },
    paintBooth: {
      question: 'Where do you paint? In a garage?',
      answer:
        'No, in our own paint booth with baking. The booth is dust-free and keeps the right temperature, so paint and clear coat go on smoothly, without specks or runs.',
    },
    photoEstimate: {
      question: 'Can I get a price from photos?',
      answer:
        'Yes, and it is free. Take a wide shot and close-ups of the damage and send them through the form on the site or via WhatsApp. We will reply with a preliminary estimate. The most accurate assessment is an inspection at our shop, which is also free: good light shows what a photo misses.',
    },
    duration: {
      question: 'How long does painting take?',
      answer:
        'We give the timeframe together with the estimate, after an inspection: it depends on the number of panels, the prep work and drying. We follow the process strictly: every coat of primer, paint and clear dries properly in the booth, and we do not rush it for speed.',
    },
    insurance: {
      question: 'Do you work with insurance after an accident?',
      answer:
        'Yes. After the repair we provide a certificate of completed work and a receipt, which you can use to claim from your insurer. We can help you prepare the documents for the claim.',
    },
    wheels: {
      question: 'Do you paint wheels and brake calipers?',
      answer:
        'Yes, we paint wheels, brake calipers, mirror covers and spoilers. Wheels start at {wheel} GEL each, calipers at {caliper}. We use liquid paint in the paint booth.',
    },
    polishing: {
      question: 'Is polishing included in the price?',
      answer:
        'Yes. After painting we polish the panel to remove fine marks and bring out the gloss. You do not pay extra for polishing after our paint job. A standalone body polish starts at {polishLight} GEL.',
    },
    foreignPlates: {
      question: 'Do you paint cars with foreign plates?',
      answer:
        'Yes, we work on cars with any plates: Georgian, Russian, Turkish, European. Plates make no difference to repair or painting.',
    },
    wheelColor: {
      question: 'What color can I paint my wheels?',
      answer:
        'Popular choices: black or graphite on a white car, graphite, bronze or silver on a black one, black or dark gray on a silver one. They can also match the body color. Clear coat can be gloss or matte. Send us a photo of your car and we will suggest options and do a test spray-out.',
    },
    wheelTires: {
      question: 'Do the tires have to come off to paint the wheels?',
      answer:
        'Yes. For a proper paint job the tire is removed from the wheel so paint covers the whole surface, including the rim lip. We handle everything: remove the wheels, take off the tires, paint and reassemble. Tire fitting is charged separately.',
    },
    polishScratches: {
      question: 'Will polishing remove scratches?',
      answer:
        'Fine ones, yes: car wash marks, swirls and holograms are only in the top layer of clear coat, and polishing removes them. If a scratch has gone through to the paint or primer, polishing will not fix it. It needs spot repair.',
    },
    paintCode: {
      question: 'Where do I find my car’s paint code?',
      answer:
        'Usually on a label in the driver’s door opening, under the hood or under the trunk floor. If you cannot find it, send us the VIN and we will look up the paint code ourselves.',
    },
    bodyRepairOnly: {
      question: 'Do you do body repair without painting?',
      answer:
        'We do body repair as preparation for painting. After dent repair and welding the metal is left bare, and it must be primed and painted or it will rust. So we quote and do everything together: we straighten, weld and paint right away in our own shop.',
    },
    fullStripMetal: {
      question: 'Do you strip the old paint down to bare metal?',
      answer:
        'Only where it is needed. Sound factory paint is the best base for new paint, so there is no reason to remove it. First we check it: with a thickness gauge, to make sure the panel has not been resprayed in a thick layer, and with solvent on a sanded spot, to make sure the old paint does not soften. If everything is fine, we scuff the clear coat with an abrasive so the new paint bonds well, and paint over it. We take it down to metal where the paint is blistered, peeling or has rust underneath.',
    },
    fullWorthIt: {
      question: 'Which is better value: a full respray or a few panels?',
      answer:
        'If two or three panels are damaged, painting just those is cheaper. A full respray makes sense when the whole body has faded or there is damage on every side: then the color is even across the car. We can quote both options from photos.',
    },
    fullColorChange: {
      question: 'Can I change my car’s color?',
      answer:
        'Yes, to any color. For a color change we also paint the door, hood and trunk openings, from {fullWithOpenings} GEL. Before painting, check whether the new color needs to be registered in the car’s documents.',
    },
    spotVisible: {
      question: 'Will the spot repair be visible?',
      answer:
        'With an accurate color match and a smooth blend, the edge does not catch the eye. Metallic and pearl are the hardest: on those we sometimes extend the blend across the neighboring area. We always check the color with a test spray-out before painting.',
    },
    spotChipRust: {
      question: 'Should I fix a small stone chip?',
      answer:
        'Yes, if the chip goes down to bare metal: rust will appear there and spread under the paint. Fixing a chip starts at {spotChip} GEL, which is cheaper than repainting the whole panel later.',
    },
    polishHowOften: {
      question: 'How often can a car be polished?',
      answer:
        'A light polish as often as needed: it removes almost no clear coat. A deep polish rarely: each time it takes off a thin layer of clear coat, and there is only so much of it. We will check the finish and tell you which polish you need.',
    },
    headlights: {
      question: 'Will polishing help cloudy headlights?',
      answer:
        'Yes, if the outer layer of plastic has gone cloudy: the headlights become clear again and shine better. If a headlight has condensation inside or is cracked, polishing will not help.',
    },
    bodyFrameWhen: {
      question: 'When does a car need frame straightening?',
      answer:
        'When after an impact the doors, hood or trunk close tightly or unevenly, the panel gaps differ and the car pulls to one side. On the frame jig we check the body geometry, pull it back into place and then paint.',
    },
    bodySillsRust: {
      question: 'Can rusty sills be repaired?',
      answer:
        'Yes. If the rust is on the surface, we clean it off, treat it against corrosion and paint. If the metal has rusted through, we cut it out and weld in new metal, then treat and paint it in the body color.',
    },
    wheelPowder: {
      question: 'Powder coating or liquid paint for wheels: what is the difference?',
      answer:
        'We paint wheels with liquid paint in the paint booth: primer, color and clear coat, just like the body. That means any color, including an exact match to your car, gloss or matte, and a small chip can later be touched up without repainting the whole wheel. Powder coating is baked in an oven: it is thicker and harder, but colors come from a fixed range and a chip cannot be touched up, only the whole wheel recoated. For both methods what matters most is prep: stripping, degreasing and primer. That is where we never cut corners.',
    },
    wheelCurb: {
      question: 'Can you fix curb rash?',
      answer:
        'Yes, it is the most common reason to paint wheels. We strip the old paint, smooth out the scuffs, prime and paint. Bent and cracked alloy wheels are straightened and welded: restoration starts at {wheelRestore} GEL.',
    },
    metallic: {
      question: 'Why do metallic and pearl colors cost more?',
      answer:
        'These paints contain particles that settle differently depending on how they are applied, and pearl and tri-coat colors have more layers. To make the panel match the ones next to it takes more material, test spray-outs and painter time, so we quote them separately.',
    },
    paintOrFilm: {
      question: 'Which is better: painting the car or wrapping it?',
      answer:
        'It depends on the state of the paint. Film protects an intact finish but does not hide chips, rust or dents: they show through clear film and print through colored film. So we repair and paint a damaged body first and apply film 20 days later, both in our shop. If the paint is fine and you want a different color, film is simpler: it can be removed to bring back the factory color.',
    },
    filmOnRepaint: {
      question: 'Can you put film on a repainted panel?',
      answer:
        'Yes, but not straight away. On fresh paint we apply film no sooner than 20 days later: the clear coat has to cure and release its solvents, or bubbles will form under the film. If the panel was painted long ago or at another shop, we measure it with a paint thickness gauge first: when removed, film can pull off a weak paint layer, and it is better to know that in advance.',
    },
    filmCare: {
      question: 'How should I look after the car after wrapping?',
      answer:
        'Do not wash the car for 5–7 days while the adhesive sets. After 10 days, come in for the required follow-up: we check the edges and re-stick anything that has lifted. After that, wash as usual, just keep pressure washer jets away from the film edges.',
    },
    fabricInterior: {
      question: 'Do you clean fabric interiors?',
      answer:
        'Right now we clean leather interiors: all seats from {leatherSeats} GEL, all the leather in the cabin from {leatherFull} GEL. For fabric interiors, message us and we will advise.',
    },
  },
} satisfies Content['faq']
