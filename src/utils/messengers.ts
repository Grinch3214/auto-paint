/** phone — только цифры с кодом страны: 995… */
export function whatsappLink(phone: string, text?: string): string {
  return text ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}` : `https://wa.me/${phone}`
}

export const phoneLink = (phone: string) => `tel:+${phone}`

export const mailLink = (email: string) => `mailto:${email}`
