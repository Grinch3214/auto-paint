// Бренд AutoAtelier, домен autoatelier.ge. Телефон — для звонков и WhatsApp; Telegram только как группа для заявок с сайта
const GEO = { latitude: 41.61517, longitude: 41.61976 } as const

// Карточка Google Business: CID — для ссылки и встроенной карты, Place ID — для маршрута.
// Маршрут по тексту адреса уводит к соседям (Okey Motors); формат api=1 понимает и приложение на телефоне
const GOOGLE_PLACE = {
  cid: '10854773661695640900',
  placeId: 'ChIJke80ECGPZ0ARRIWiXiLno5Y',
} as const

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
  mapsUrl: `https://maps.google.com/?cid=${GOOGLE_PLACE.cid}`,
  mapsRouteUrl: `https://www.google.com/maps/dir/?api=1&destination=AutoAtelier&destination_place_id=${GOOGLE_PLACE.placeId}`,
  /** встраиваемая карта без API-ключа; грузится только по кнопке на /kontakty */
  mapsEmbedUrl: `https://maps.google.com/maps?cid=${GOOGLE_PLACE.cid}&output=embed`,
  copyrightYear: 2026,
} as const
