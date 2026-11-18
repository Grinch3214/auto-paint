import type { CountryCode } from 'libphonenumber-js/min'

export interface PhoneCountry {
  code: CountryCode
  dial: string
}

export interface PhoneCountryOption {
  code: CountryCode
  label: string
}

export interface PhoneValue {
  international: string
  valid: boolean
}
