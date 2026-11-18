import type { Content } from '@/types/content'

export default {
  title: 'How to get an exact price',
  photo: {
    tape: 'quick and free',
    title: 'From photos',
    steps: [
      'Take 2–3 photos of the damage: one wide shot and close-ups',
      'Send them through the form on the site or via WhatsApp',
      'Get a preliminary estimate',
    ],
    cta: 'Send photos',
  },
  onSite: {
    tape: 'free and most accurate',
    title: 'In person',
    text: 'Come to our shop: a painter will look at the car in good light and under inspection lamps. That shows what a photo misses: hidden damage, old repairs, paint thickness. You get an exact amount straight away.',
    cta: 'Address and hours',
  },
  flowTitle: 'Estimate first, work second',
  flow: ['We assess', 'We write an estimate', 'You approve it', 'We start work'],
  flowNote:
    'We only start once you have approved the estimate. We keep you updated at every stage: if we find hidden damage while taking the car apart, we agree it with you first and only then continue. The price never changes without your approval.',
} satisfies Content['howto']
