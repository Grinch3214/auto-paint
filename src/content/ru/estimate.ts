import type { Content } from '@/types/content'

export default {
  tape: 'оценка по фото',
  title: 'Что нужно покрасить?',
  lead: 'Оценка бесплатная и ни к чему не обязывает. Отметьте детали — мы подставим их в сообщение, фото прикрепите уже в чате.',
  parts: {
    hood: 'Капот',
    frontBumper: 'Передний бампер',
    rearBumper: 'Задний бампер',
    frontLeftFender: 'Крыло переднее левое',
    frontRightFender: 'Крыло переднее правое',
    frontLeftDoor: 'Дверь передняя левая',
    frontRightDoor: 'Дверь передняя правая',
    roof: 'Крыша',
    wholeCar: 'Вся машина',
  },
  message: 'Здравствуйте! Нужна оценка покраски: {parts}. Фото пришлю в этом чате.',
} satisfies Content['estimate']
