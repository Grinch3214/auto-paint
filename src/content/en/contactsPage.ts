import type { Content } from '@/types/content'

export default {
  seoTitle: 'Contacts — {BRAND}, car painting in Batumi',
  seoDescription:
    'Address, phone, opening hours and messengers of {BRAND} in Batumi: 35a Kakhaberi St. Call us or message on WhatsApp.',
  h1: 'Contacts',
  lead: 'Come in for a free inspection or send photos via messenger. We will give you a free estimate and arrange a time.',
  channels: {
    tape: 'contact',
    title: 'How to reach us',
    phone: 'Phone',
    phoneHint: 'calls during opening hours',
    whatsapp: 'WhatsApp',
    whatsappHint: 'photos of the damage and questions',
    email: 'Email',
    emailHint: 'for documents and invoices',
  },
  visit: {
    tape: 'getting here',
    title: 'Address and opening hours',
    hours: 'Opening hours',
    address: 'Address',
    route: 'Get directions',
    notes: [
      'You can drop in without an appointment during opening hours. Call ahead to avoid waiting.',
      'We work on cars with any plates: Georgian, Russian, Turkish, European.',
    ],
  },
  map: {
    title: 'Map',
    show: 'Show map',
    open: 'Open in Google Maps',
    frameTitle: 'Map: 35a Kakhaberi St, Batumi',
  },
} satisfies Content['contactsPage']
