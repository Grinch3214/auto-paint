import type { Content } from '@/types/content'

export default {
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
