// Плейсхолдеры до выбора бренда, домена и контактов Ильи
export const SITE = {
  url: 'https://example.ge', // без слэша на конце
  brand: '{BRAND}',
  /** только цифры с кодом страны — так его ждёт wa.me */
  phone: '995555123456',
  phoneDisplay: '+995 555 12 34 56',
  email: 'info@example.ge',
  telegram: 'example_batumi',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kakhaberi+St+26b+Batumi',
  mapsRouteUrl: 'https://www.google.com/maps/dir/?api=1&destination=Kakhaberi+St+26b+Batumi',
  /** встраиваемая карта без API-ключа; грузится только по кнопке на /kontakty */
  mapsEmbedUrl: 'https://www.google.com/maps?q=Kakhaberi+St+26b+Batumi&output=embed',
  /** год в копирайте: не берём из Date, иначе пререндер разойдётся с клиентом */
  copyrightYear: 2026,
} as const
