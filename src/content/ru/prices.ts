import type { Content } from '@/types/content'

export default {
  groups: {
    front: 'Передняя часть',
    side: 'Боковина',
    roof: 'Крыша и багажник',
    small: 'Мелкие детали',
  },
  items: {
    hood: 'Капот',
    bumper: 'Бампер',
    frontFender: 'Крыло переднее',
    door: 'Дверь',
    doorBothSides: 'Дверь снаружи и изнутри',
    rearFender: 'Крыло заднее',
    sillMetal: 'Порог металлический',
    sillPlastic: 'Порог пластиковый',
    upperPillar: 'Стойка верхняя',
    doorOpeningHalf: 'Дверной проём (половина)',
    roof: 'Крыша',
    trunkLid: 'Крышка багажника',
    trunkLidBothSides: 'Крышка багажника с изнанкой',
    doorHandle: 'Ручка двери',
    parkingSensors: 'Датчики парковки, 4 шт.',
    moldings: 'Накладки, молдинги',
    mirrorCover: 'Корпус зеркала',
    spoiler: 'Спойлер',
    wheel: 'Колёсный диск',
    caliper: 'Суппорт',
  },
  photoSteps: [
    'Сфотографируйте повреждение: 2–3 кадра, общий план и крупно',
    'Отправьте фото в WhatsApp или Telegram',
    'Получите предварительный расчёт',
  ],
  flow: ['Оцениваем', 'Составляем смету', 'Согласовываем с вами', 'Начинаем работу'],
} satisfies Content['prices']
