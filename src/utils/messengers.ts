/** phone — только цифры с кодом страны: 995… */
export function whatsappLink(phone: string, text?: string): string {
  return text ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}` : `https://wa.me/${phone}`
}

export function telegramShareLink(text: string): string {
  return `https://t.me/share/url?url=&text=${encodeURIComponent(text)}`
}

export const telegramLink = (username: string) => `https://t.me/${username}`

export const phoneLink = (phone: string) => `tel:+${phone}`

export const mailLink = (email: string) => `mailto:${email}`
