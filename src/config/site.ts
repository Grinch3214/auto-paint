// Бренд AutoAtelier, домен autoatelier.ge. Телефон — для звонков и WhatsApp; Telegram только как группа для заявок с сайта
/** точка на боксе (кадастр 05.32.27.302), проверена по Google Maps */
const GEO = { latitude: 41.61514, longitude: 41.61971 } as const
const COORDS = `${GEO.latitude},${GEO.longitude}`

export const SITE = {
  url: 'https://autoatelier.ge', // без слэша на конце
  brand: 'AutoAtelier',
  /** только цифры с кодом страны — так его ждёт wa.me */
  phone: '995571285005',
  phoneDisplay: '+995 571 28 50 05',
  email: 'info@autoatelier.ge',
  geo: GEO,
  /** адрес для разметки schema.org — латиницей, не зависит от языка страницы */
  schemaAddress: {
    streetAddress: '35a Kakhaberi St',
    addressLocality: 'Batumi',
    addressRegion: 'Adjara',
    postalCode: '6000',
    addressCountry: 'GE',
  },
  /** часы работы для разметки; текст для людей — в словарях (contactInfo) */
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '10:00',
    closes: '19:00',
  },
  /** картинка для превью ссылок (WhatsApp, Facebook, Telegram) */
  ogImage: '/og-image.png',
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${COORDS}`,
  mapsRouteUrl: `https://www.google.com/maps/dir/?api=1&destination=${COORDS}`,
  /** встраиваемая карта без API-ключа; грузится только по кнопке на /kontakty */
  mapsEmbedUrl: `https://www.google.com/maps?q=${COORDS}&z=18&output=embed`,
  copyrightYear: 2026,
} as const
