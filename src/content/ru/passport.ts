import type { Content } from '@/types/content'

export default {
  tape: 'технический паспорт',
  title: 'Коротко о работе',
  label: 'BATUMI · PAINT',
  rows: [
    { term: 'Мастера', value: 'маляры и рихтовщики, опыт от 12 лет' },
    { term: 'Материалы', value: 'Sikkens · PPG · Standox · Roberlo' },
    { term: 'Код цвета', value: 'по VIN → сверка по детали' },
    { term: 'Камера', value: 'покраска + сушка, 1 машина' },
    { term: 'Оценка', value: 'бесплатно: по фото в WhatsApp / Telegram или на осмотре' },
  ],
} satisfies Content['passport']
