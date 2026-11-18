import type { Content } from '@/types/content'

export default {
  title: 'Документы для страховой',
  docsBefore: 'После ДТП выдаём',
  docs: ['акт выполненных работ', 'чек'],
  docsJoiner: 'и',
  docsAfter: '— с ними страховая компенсирует затраты на ремонт.',
} satisfies Content['insurance']
