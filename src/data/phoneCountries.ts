import type { CountryCode } from 'libphonenumber-js/min'
import type { PhoneCountry } from '@/types/phone'

export const DEFAULT_PHONE_COUNTRY: CountryCode = 'GE'

export const PHONE_COUNTRIES_TOP = [
  { code: 'GE', dial: '995' },
  { code: 'RU', dial: '7' },
  { code: 'UA', dial: '380' },
  { code: 'AM', dial: '374' },
  { code: 'AZ', dial: '994' },
  { code: 'BY', dial: '375' },
  { code: 'KZ', dial: '7' },
  { code: 'UZ', dial: '998' },
  { code: 'KG', dial: '996' },
  { code: 'TJ', dial: '992' },
  { code: 'TM', dial: '993' },
  { code: 'MD', dial: '373' },
  { code: 'TR', dial: '90' },
  { code: 'IL', dial: '972' },
] as const satisfies readonly PhoneCountry[]

export const PHONE_COUNTRIES_EUROPE = [
  { code: 'AT', dial: '43' },
  { code: 'BE', dial: '32' },
  { code: 'BG', dial: '359' },
  { code: 'HR', dial: '385' },
  { code: 'CY', dial: '357' },
  { code: 'CZ', dial: '420' },
  { code: 'DK', dial: '45' },
  { code: 'EE', dial: '372' },
  { code: 'FI', dial: '358' },
  { code: 'FR', dial: '33' },
  { code: 'DE', dial: '49' },
  { code: 'GR', dial: '30' },
  { code: 'HU', dial: '36' },
  { code: 'IE', dial: '353' },
  { code: 'IT', dial: '39' },
  { code: 'LV', dial: '371' },
  { code: 'LT', dial: '370' },
  { code: 'LU', dial: '352' },
  { code: 'MT', dial: '356' },
  { code: 'NL', dial: '31' },
  { code: 'PL', dial: '48' },
  { code: 'PT', dial: '351' },
  { code: 'RO', dial: '40' },
  { code: 'SK', dial: '421' },
  { code: 'SI', dial: '386' },
  { code: 'ES', dial: '34' },
  { code: 'SE', dial: '46' },
  { code: 'GB', dial: '44' },
  { code: 'CH', dial: '41' },
  { code: 'NO', dial: '47' },
] as const satisfies readonly PhoneCountry[]

export const PHONE_COUNTRIES: readonly PhoneCountry[] = [
  ...PHONE_COUNTRIES_TOP,
  ...PHONE_COUNTRIES_EUROPE,
]

export const PHONE_COUNTRY_CODES = PHONE_COUNTRIES.map((c) => c.code)
