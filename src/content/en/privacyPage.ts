import type { Content } from '@/types/content'

export default {
  seoTitle: 'Privacy Policy — {BRAND}',
  seoDescription:
    'How {BRAND} processes personal data of website users: data collected, purposes and legal grounds, recipients, retention periods and data subject rights.',
  h1: 'Privacy policy',
  lead: 'This policy explains what personal data {BRAND} receives through the {SITE} website, why and on what legal basis it is processed, who it is shared with, how long it is kept and what rights users have.',
  updated: 'Effective from 24 November 2026',
  sections: [
    {
      title: '1. General provisions',
      paragraphs: [
        'This Privacy Policy (the “Policy”) sets out how personal data of users of the {SITE} website (the “Website”) is processed in accordance with the Law of Georgia on Personal Data Protection of 14 June 2023 (the “Law”).',
        'By submitting a request through the form on the Website, the user confirms that they have read this Policy.',
      ],
    },
    {
      title: '2. Data controller',
      paragraphs: [
        'The personal data controller is the {BRAND} car service (the “Service”, “we”), located at {ADDRESS}.',
        'For questions about personal data processing: {EMAIL}, phone and WhatsApp {PHONE}.',
      ],
    },
    {
      title: '3. Data we process',
      paragraphs: ['We only process data that the user submits through the request form:'],
      items: [
        'phone or WhatsApp number;',
        'a description of the damage and any other information given in the request;',
        'photos of the car, including the license plate if it is in the frame;',
        'the Website page the request was sent from and the time it was sent.',
      ],
    },
    {
      title: '4. Purposes and legal grounds',
      items: [
        'Reviewing the request, preparing a preliminary cost estimate, contacting the user and arranging a visit, under Article 5(1)(b) and (j) of the Law: taking steps at the request of the data subject prior to entering into a contract, and reviewing their application.',
        'Ensuring the operation and security of the Website, under Article 5(1)(i) of the Law: the legitimate interest of the controller.',
      ],
      after: [
        'We do not use the data for mailings or advertising and do not make decisions based solely on automated processing.',
      ],
    },
    {
      title: '5. Provision of data',
      paragraphs: [
        'Providing data is voluntary. Without a phone number we cannot reply to a request. In that case you can contact us by phone or WhatsApp.',
      ],
    },
    {
      title: '6. Recipients and cross-border transfers',
      paragraphs: [
        'Requests are accessible only to Service staff who need them for their work. To run the Website and receive requests we use the following services:',
      ],
      items: [
        'Cloudflare, Inc. (USA): Website hosting and request delivery. Requests are not stored on Cloudflare servers;',
        'Telegram: a private work chat where requests are delivered;',
        'Google LLC (USA): the Google Maps map embedded on the Website pages;',
        'WhatsApp (Meta Platforms): if the user messages us there.',
      ],
      after: [
        'The servers of these services may be located outside Georgia. Data is transferred only to the extent necessary for the purposes above, under the data protection terms of these services. We do not sell personal data or share it with third parties for advertising. Data may be disclosed to public authorities only where required by Georgian law.',
      ],
    },
    {
      title: '7. Retention periods',
      items: [
        'Requests that did not lead to agreed work are kept for no more than 12 months from receipt and then deleted.',
        'Data on completed work is kept as long as it is needed for questions about the repair and for insurance documents, and for the periods required by Georgian law for accounting records.',
      ],
      after: [
        'At the user’s request, data is deleted earlier unless retention is required by law.',
      ],
    },
    {
      title: '8. Cookies',
      paragraphs: [
        "The Website does not use advertising or analytics cookies or similar tracking technologies. A Google Maps map is embedded on the Website pages: when it loads, Google receives the visitor's IP address and browser data and may set its own cookies under Google's rules (policies.google.com/privacy). The hosting provider processes technical data (IP address, browser and device type) needed to run the Website and protect it from attacks. If we start using analytics tools, this Policy will be updated before they are enabled.",
      ],
    },
    {
      title: '9. User rights',
      paragraphs: ['Under Chapter III of the Law, the user has the right to:'],
      items: [
        'receive information about the processing of their data;',
        'access their data and obtain a copy;',
        'request correction or updating of inaccurate data;',
        'request that processing stop and that the data be erased or destroyed;',
        'request that the data be blocked;',
        'lodge a complaint about the controller with the State Audit Office of Georgia or a court.',
      ],
      after: [
        'Requests can be sent to {EMAIL} or via WhatsApp {PHONE}. We reply within the time limits set by the Law: no later than 10 working days from receipt of the request.',
      ],
    },
    {
      title: '10. Data security',
      paragraphs: [
        'We take organizational and technical measures to protect data: access to requests is limited to Service staff, and data is transmitted over a secure connection (HTTPS).',
      ],
    },
    {
      title: '11. Changes to this Policy',
      paragraphs: [
        'We may update this Policy. The current version is always published on this page, with its effective date shown at the top.',
      ],
    },
  ],
} satisfies Content['privacyPage']
