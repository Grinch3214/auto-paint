/** 1 → '01' */
export function padNumber(value: number, length = 2): string {
  return String(value).padStart(length, '0')
}

/** template — строка из словаря с {value}, например 'от {value}' */
export function formatPrice(value: number | undefined, template: string): string {
  return value === undefined ? '—' : template.replace('{value}', String(value))
}
