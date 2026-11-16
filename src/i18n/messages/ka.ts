import type { Messages } from '@/types/i18n'

// ЧЕРНОВИК: перевод должен вычитать носитель языка
const ka: Messages = {
  nav: {
    services: 'სერვისები',
    colorMatch: 'ფერის შერჩევა',
    prices: 'ფასები',
    home: 'მთავარი',
    estimate: 'შეფასება ფოტოთი',
    cta: 'მოგვწერეთ',
    contacts: 'კონტაქტი',
  },
  home: {
    seoTitle: 'მანქანის შეღებვა ბათუმში — {BRAND}',
    seoDescription:
      'ავტომობილის შეღებვა ბათუმში: სრული და ლოკალური შეღებვა, ფერის შერჩევა VIN-კოდით. შეფასება ფოტოთი WhatsApp-სა და Telegram-ში.',
    h1: 'მანქანის შეღებვა ბათუმში',
    lead: 'საიტის კარკასი.',
  },
  notFound: {
    seoTitle: 'გვერდი ვერ მოიძებნა — {BRAND}',
    h1: 'გვერდი ვერ მოიძებნა',
    back: 'მთავარზე',
  },
  common: {
    priceFrom: '{value}-დან',
    /** в лари — для списков цен на страницах услуг */
    priceFromGel: '{value} ₾-დან',
  },
  lightbox: {
    label: 'ფოტოს ნახვა',
    prev: 'წინა ფოტო',
    next: 'შემდეგი ფოტო',
    close: 'დახურვა',
  },
  contactInfo: {
    address: 'კახაბერის ქ. 26ბ, ბათუმი',
    hoursWork: 'ორშ–შაბ 10:00–19:00',
    hoursOff: 'კვირა — დასვენება',
    whatsapp: 'მოგვწერეთ WhatsApp-ში',
    maps: 'გახსნა Google Maps-ში',
    call: 'დარეკვა',
  },
  contactDock: {
    title: 'დაგვიკავშირდით',
    whatsappHint: 'მოგვწერეთ ან დაგვირეკეთ',
    telegramHint: 'მოგვწერეთ Telegram-ში',
    route: 'მარშრუტი Google Maps-ში',
  },
  footer: {
    tagline: 'მანქანის შეღებვა ბათუმში',
    about:
      'მანქანის შეღებვა ბათუმში: სრული და ლოკალური შეღებვა, ფერის შერჩევა, თუნუქის სამუშაოები და ანტიკოროზია შეღებვამდე.',
    navTitle: 'განყოფილებები',
    hoursTitle: 'სამუშაო საათები',
    contactsTitle: 'კონტაქტები',
    note: 'საიტზე ფასები წინასწარია. საბოლოო თანხას ვასახელებთ მანქანის დათვალიერების შემდეგ და ვათანხმებთ სამუშაოს დაწყებამდე.',
    rights: 'ყველა უფლება დაცულია.',
  },
  langSwitcher: 'ენა',
}

export default ka
