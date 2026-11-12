// Эталонный словарь: его форма = тип Messages для остальных языков
const ru = {
  nav: {
    home: 'Главная',
    contacts: 'Контакты',
  },
  home: {
    seoTitle: 'Покраска авто в Батуми — {BRAND}',
    seoDescription:
      'Покраска автомобилей в Батуми: полная и локальная покраска, подбор цвета по VIN и по детали. Оценка по фото в WhatsApp и Telegram.',
    h1: 'Покраска авто в Батуми',
    lead: 'Каркас сайта. Здесь будет главная.',
  },
  contacts: {
    seoTitle: 'Контакты — {BRAND}, покраска авто в Батуми',
    seoDescription: 'Адрес, телефон, часы работы и мессенджеры {BRAND} в Батуми.',
    h1: 'Контакты',
    lead: 'Адрес, телефон и мессенджеры появятся здесь.',
  },
  notFound: {
    seoTitle: 'Страница не найдена — {BRAND}',
    h1: 'Страница не найдена',
    back: 'На главную',
  },
  langSwitcher: 'Язык',
}

export type Messages = typeof ru
export default ru
