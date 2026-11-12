import type { FaqEntry } from '@/types/faq'

/** JSON-LD FAQPage: вопросы и ответы те же, что видны на странице */
export function faqSchema(entries: readonly FaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((e) => ({
      '@type': 'Question',
      name: e.question,
      acceptedAnswer: { '@type': 'Answer', text: e.answer },
    })),
  }
}
