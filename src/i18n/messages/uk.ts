import type { Messages } from '@/types/i18n'

// ЧЕРНОВИК: перевод должен вычитать носитель языка
const uk: Messages = {
  nav: {
    home: 'Головна',
    process: 'Як фарбуємо',
    works: 'Роботи',
    estimate: 'Оцінка за фото',
    cta: 'Написати',
    contacts: 'Контакти',
  },
  home: {
    seoTitle: 'Фарбування авто в Батумі — {BRAND}',
    seoDescription:
      'Фарбування автомобілів у Батумі: повне та локальне фарбування, підбір кольору за VIN і за деталлю. Оцінка за фото у WhatsApp і Telegram.',
    h1: 'Фарбування авто в Батумі',
    lead: 'Каркас сайту. Тут буде головна.',
  },
  contacts: {
    seoTitle: 'Контакти — {BRAND}, фарбування авто в Батумі',
    seoDescription: 'Адреса, телефон, години роботи та месенджери {BRAND} у Батумі.',
    h1: 'Контакти',
    lead: 'Адреса, телефон і месенджери з’являться тут.',
  },
  notFound: {
    seoTitle: 'Сторінку не знайдено — {BRAND}',
    h1: 'Сторінку не знайдено',
    back: 'На головну',
  },
  common: {
    priceFrom: 'від {value}',
  },
  footer: {
    tagline: 'фарбування авто в Батумі',
  },
  langSwitcher: 'Мова',
}

export default uk
