
interface Env {
  TELEGRAM_BOT_TOKEN: string
  TELEGRAM_CHAT_ID: string
}

interface PagesContext {
  request: Request
  env: Env
}

const MAX_BODY = 8 * 1024 * 1024
const MAX_PHOTOS = 5
const MAX_PHOTO_SIZE = 3 * 1024 * 1024
const PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_TEXT = 800
const ALLOWED_ORIGINS = [
  /^https:\/\/autoatelier\.ge$/,
  /\.pages\.dev$/,
  /^http:\/\/localhost(:\d+)?$/,
]

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function whatsappDigits(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  return digits.length === 9 && digits.startsWith('5') ? `995${digits}` : digits
}

function buildCaption(phone: string, text: string, page: string, photos: number): string {
  const time = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Asia/Tbilisi',
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date())
  const wa = whatsappDigits(phone)
  const lines = [
    '🆕 <b>Заявка на оценку с сайта</b>',
    '',
    `📞 <b>${escapeHtml(phone)}</b>`,
    wa.length >= 9 ? `💬 <a href="https://wa.me/${wa}">Написать в WhatsApp</a>` : '',
    '',
    text ? `📝 ${escapeHtml(text)}` : '📝 —',
    '',
    `📷 Фото: ${photos}`,
    `🔗 autoatelier.ge${escapeHtml(page || '/')}`,
    `🕐 ${time}`,
  ]
  return lines.filter((l, i, a) => !(l === '' && a[i - 1] === '')).join('\n')
}

async function telegram(env: Env, method: string, body: FormData): Promise<boolean> {
  const res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`, {
    method: 'POST',
    body,
  })
  return res.ok
}

export const onRequestPost = async ({ request, env }: PagesContext): Promise<Response> => {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return json({ ok: false }, 500)

  const origin = request.headers.get('Origin')
  if (origin && !ALLOWED_ORIGINS.some((re) => re.test(origin))) return json({ ok: false }, 403)

  const length = Number(request.headers.get('Content-Length') ?? 0)
  if (length > MAX_BODY) return json({ ok: false, error: 'too_large' }, 413)

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return json({ ok: false }, 400)
  }

  // поле-ловушка: человек его не видит; бот заполнил — делаем вид, что всё хорошо
  if (String(form.get('website') ?? '').trim()) return json({ ok: true })

  const phone = String(form.get('phone') ?? '')
    .trim()
    .slice(0, 40)
  const text = String(form.get('text') ?? '')
    .trim()
    .slice(0, MAX_TEXT)
  const page = String(form.get('page') ?? '').slice(0, 120)
  const photos = form
    .getAll('photos')
    .filter((p): p is File => p instanceof File && p.size > 0)
    .slice(0, MAX_PHOTOS)

  if (phone.replace(/\D/g, '').length < 6) return json({ ok: false, error: 'phone' }, 400)
  if (!text && !photos.length) return json({ ok: false, error: 'empty' }, 400)
  if (photos.some((p) => p.size > MAX_PHOTO_SIZE || !PHOTO_TYPES.includes(p.type))) {
    return json({ ok: false, error: 'photo' }, 400)
  }

  const caption = buildCaption(phone, text, page, photos.length).slice(0, 1024)
  const out = new FormData()
  out.append('chat_id', env.TELEGRAM_CHAT_ID)

  let sent: boolean
  if (!photos.length) {
    out.append('text', caption)
    out.append('parse_mode', 'HTML')
    out.append('disable_web_page_preview', 'true')
    sent = await telegram(env, 'sendMessage', out)
  } else if (photos.length === 1) {
    out.append('photo', photos[0]!, 'photo-1.jpg')
    out.append('caption', caption)
    out.append('parse_mode', 'HTML')
    sent = await telegram(env, 'sendPhoto', out)
  } else {
    // альбом: подпись — у первого фото
    const media = photos.map((_, i) => ({
      type: 'photo',
      media: `attach://photo${i}`,
      ...(i === 0 && { caption, parse_mode: 'HTML' }),
    }))
    out.append('media', JSON.stringify(media))
    photos.forEach((p, i) => out.append(`photo${i}`, p, `photo-${i + 1}.jpg`))
    sent = await telegram(env, 'sendMediaGroup', out)
  }

  return sent ? json({ ok: true }) : json({ ok: false, error: 'telegram' }, 502)
}
