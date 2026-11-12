/** phone — только цифры с кодом страны: 995… */
export function whatsappLink(phone: string, text: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}

export function telegramShareLink(text: string): string {
  return `https://t.me/share/url?url=&text=${encodeURIComponent(text)}`
}
