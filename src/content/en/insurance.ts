import type { Content } from '@/types/content'

export default {
  title: 'Documents for your insurer',
  docsBefore: 'After an accident we provide',
  docs: ['a certificate of completed work', 'a receipt'],
  docsJoiner: 'and',
  docsAfter: 'so your insurer can reimburse the repair.',
} satisfies Content['insurance']
