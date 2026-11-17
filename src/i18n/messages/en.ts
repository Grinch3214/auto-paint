import type { Messages } from '@/types/i18n'

const en: Messages = {
  nav: {
    services: 'Services',
    colorMatch: 'Colour matching',
    prices: 'Prices',
    home: 'Home',
    cta: 'Message us',
    contacts: 'Contacts',
  },
  home: {
    seoTitle: 'Car Painting in Batumi — {BRAND}',
    seoDescription:
      'Car painting in Batumi: full and spot repaint, colour matching by VIN and by the actual panel. Photo estimate via WhatsApp or our website.',
    h1: 'Car painting in Batumi',
    lead: 'Site skeleton. The home page goes here.',
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
    address: '35a Kakhaberi St, Batumi',
    hoursWork: 'Mon–Sat 10:00–19:00',
    hoursOff: 'Sun — closed',
    whatsapp: 'Message on WhatsApp',
    maps: 'Open in Google Maps',
    call: 'Call',
  },
  contactDock: {
    title: 'Get in touch',
    whatsappHint: 'Message or call',
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
  menu: {
    open: 'Open menu',
    close: 'Close menu',
    services: 'Services',
  },
  langSwitcher: 'Language',
}

export default en
