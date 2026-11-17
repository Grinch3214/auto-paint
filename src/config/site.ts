// Бренд AutoAtelier, домен autoatelier.ge. Телефон — для звонков и WhatsApp; Telegram только как группа для заявок с сайта
const COORDS = '41.61514,41.61971'

export const SITE = {
  url: 'https://autoatelier.ge', // без слэша на конце
  brand: 'AutoAtelier',
  /** только цифры с кодом страны — так его ждёт wa.me */
  phone: '995571285005',
  phoneDisplay: '+995 571 28 50 05',
  email: 'info@autoatelier.ge',
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${COORDS}`,
  mapsRouteUrl: `https://www.google.com/maps/dir/?api=1&destination=${COORDS}`,
  /** встраиваемая карта без API-ключа; грузится только по кнопке на /kontakty */
  mapsEmbedUrl: `https://www.google.com/maps?q=${COORDS}&z=18&output=embed`,
  copyrightYear: 2026,
} as const
