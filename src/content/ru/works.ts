import type { Content } from '@/types/content'

export default {
  hoodGloss: { alt: 'Капот после лака в камере', tag: 'капот · лак' },
  sideGloss: { alt: 'Заднее крыло и дверь после лака', tag: 'крыло · лак' },
  sedanAfter: { alt: 'Белый седан после ремонта и покраски', tag: 'седан · готово' },
  partsGloss: { alt: 'Двери, крыло и бампер после лака', tag: 'детали · лак' },
  wingSpot: { alt: 'Локальная покраска крыла', tag: 'локальный ремонт' },
  crossoverBefore: { alt: 'Кроссовер до ремонта: снят бампер', tag: 'до ремонта' },
  sideBase: { alt: 'Крыло в грунте и базе', tag: 'грунт · база' },
  partsBase: { alt: 'Детали в базе перед лаком', tag: 'детали · база' },
} satisfies Content['works']
