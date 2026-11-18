import type { CountryCode } from 'libphonenumber-js/min'
import type { PhoneCountry, PhoneCountryOption, PhoneValue } from '@/types/phone'

type PhoneLib = typeof import('libphonenumber-js/min')
type PhoneExamples = typeof import('libphonenumber-js/mobile/examples')

let libPromise: Promise<[PhoneLib, PhoneExamples]> | null = null

export function loadPhoneLib(): Promise<[PhoneLib, PhoneExamples]> {
  libPromise ??= Promise.all([
    import('libphonenumber-js/min'),
    import('libphonenumber-js/mobile/examples'),
  ])
  return libPromise
}

export function flagEmoji(code: string): string {
  return String.fromCodePoint(...[...code].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65))
}

export function countryName(code: string, lang: string): string {
  try {
    return new Intl.DisplayNames([lang], { type: 'region' }).of(code) ?? code
  } catch {
    return code
  }
}

export function rawPhoneValue(input: string, dial: string): PhoneValue {
  const digits = input.replace(/\D/g, '')
  const trimmed = input.trim()
  return {
    international: !digits ? '' : trimmed.startsWith('+') ? trimmed : `+${dial} ${trimmed}`,
    valid: digits.length >= 6,
  }
}

export function parsePhoneValue(lib: PhoneLib, input: string, country: CountryCode): PhoneValue {
  const parsed = lib.parsePhoneNumberFromString(input, country)
  if (!parsed) return { international: input.trim(), valid: false }
  return { international: parsed.formatInternational(), valid: parsed.isPossible() }
}

export function formatPhoneInput(
  lib: PhoneLib,
  raw: string,
  country: CountryCode,
  allowed: readonly CountryCode[],
): { text: string; country: CountryCode } {
  if (raw.trim().startsWith('+')) {
    const typer = new lib.AsYouType()
    const text = typer.input(raw)
    const detected = typer.getCountry()
    const national = typer.getNumber()?.formatNational()
    if (detected && allowed.includes(detected) && national) {
      return { text: new lib.AsYouType(detected).input(national), country: detected }
    }
    return { text, country }
  }
  return { text: new lib.AsYouType(country).input(raw.replace(/[^\d]/g, '')), country }
}

export function phoneExample(lib: PhoneLib, examples: PhoneExamples, country: CountryCode) {
  return lib.getExampleNumber(country, examples.default)?.formatNational() ?? ''
}

export function phoneCountryOptions(
  top: readonly PhoneCountry[],
  europe: readonly PhoneCountry[],
  lang: string,
): { top: PhoneCountryOption[]; europe: PhoneCountryOption[] } {
  const toOption = (c: PhoneCountry) => ({
    code: c.code,
    name: countryName(c.code, lang),
    label: `${flagEmoji(c.code)} ${countryName(c.code, lang)} +${c.dial}`,
  })
  const sorted = europe.map(toOption).sort((a, b) => a.name.localeCompare(b.name, lang))
  return { top: top.map(toOption), europe: sorted }
}
