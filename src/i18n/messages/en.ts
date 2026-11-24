import type { Messages } from '@/types/i18n'

const en: Messages = {
  nav: {
    services: 'Services',
    colorMatch: 'Color matching',
    prices: 'Prices',
    home: 'Home',
    cta: 'Message us',
    contacts: 'Contacts',
  },
  home: {
    seoTitle: 'Car Painting in Batumi — {BRAND}',
    seoDescription:
      'Car painting in Batumi: full respray and spot repair, dent repair and rustproofing before painting, color matching by VIN and to your car. Free photo estimate on the website, via WhatsApp or at an inspection.',
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
    mapTitle: 'Map: AutoAtelier, 35a Kakhaberi St, Batumi',
  },
  contactDock: {
    title: 'Get in touch',
    whatsappHint: 'Message or call',
    route: 'Directions in Google Maps',
  },
  footer: {
    tagline: 'car painting in Batumi',
    about:
      'Full-cycle car painting in Batumi: from dent and body repair to clear coat and polishing, all under one roof.',
    navTitle: 'Sections',
    hoursTitle: 'Opening hours',
    contactsTitle: 'Contacts',
    note: 'Prices on the site are preliminary. We name the final amount after inspecting the car and agree it before work starts.',
    rights: 'All rights reserved.',
    privacy: 'Privacy policy',
  },
  menu: {
    open: 'Open menu',
    close: 'Close menu',
    services: 'Services',
  },
  langSwitcher: 'Language',
}

export default en
