import type { Messages } from '@/types/i18n'

const en: Messages = {
  nav: {
    home: 'Home',
    process: 'Our process',
    works: 'Our work',
    estimate: 'Photo estimate',
    cta: 'Message us',
    contacts: 'Contacts',
  },
  home: {
    seoTitle: 'Car Painting in Batumi — {BRAND}',
    seoDescription:
      'Car painting in Batumi: full and spot repaint, colour matching by VIN and by the actual panel. Photo estimate via WhatsApp and Telegram.',
    h1: 'Car painting in Batumi',
    lead: 'Site skeleton. The home page goes here.',
  },
  contacts: {
    seoTitle: 'Contacts — {BRAND}, car painting in Batumi',
    seoDescription: 'Address, phone, opening hours and messengers of {BRAND} in Batumi.',
    h1: 'Contacts',
    lead: 'Address, phone and messengers will be here.',
  },
  notFound: {
    seoTitle: 'Page not found — {BRAND}',
    h1: 'Page not found',
    back: 'Back to home',
  },
  common: {
    priceFrom: 'from {value}',
    /** в лари — для списков цен на страницах услуг */
    priceFromGel: 'from ₾{value}',
  },
  lightbox: {
    label: 'Photo viewer',
    prev: 'Previous photo',
    next: 'Next photo',
    close: 'Close',
  },
  contactInfo: {
    address: '26b Kakhaberi St, Batumi',
    hoursWork: 'Mon–Sat 10:00–19:00',
    hoursOff: 'Sun — closed',
    whatsapp: 'Message on WhatsApp',
    maps: 'Open in Google Maps',
    call: 'Call',
  },
  contactDock: {
    title: 'Get in touch',
    whatsappHint: 'Message or call',
    telegramHint: 'Message on Telegram',
    route: 'Directions in Google Maps',
  },
  footer: {
    tagline: 'car painting in Batumi',
    about:
      'Car painting in Batumi: full and partial respray, colour matching, body repair and rust treatment before painting.',
    navTitle: 'Sections',
    hoursTitle: 'Opening hours',
    contactsTitle: 'Contacts',
    note: 'Prices on the site are preliminary. We name the final amount after inspecting the car and agree it before work starts.',
    rights: 'All rights reserved.',
  },
  langSwitcher: 'Language',
}

export default en
