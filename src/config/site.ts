// Бренд AutoAtelier, домен autoatelier.ge. Телефон — для звонков и WhatsApp; Telegram только как группа для заявок с сайта
export const SITE = {
  url: 'https://autoatelier.ge', // без слэша на конце
  brand: 'AutoAtelier',
  /** только цифры с кодом страны — так его ждёт wa.me */
  phone: '995571285005',
  phoneDisplay: '+995 571 28 50 05',
  email: 'info@autoatelier.ge',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kakhaberi+St+26b+Batumi',
  mapsRouteUrl: 'https://www.google.com/maps/dir/?api=1&destination=Kakhaberi+St+26b+Batumi',
  /** встраиваемая карта без API-ключа; грузится только по кнопке на /kontakty */
  mapsEmbedUrl: 'https://www.google.com/maps?q=Kakhaberi+St+26b+Batumi&output=embed',
  /** год в копирайте: не берём из Date, иначе пререндер разойдётся с клиентом */
  copyrightYear: 2026,
} as const
