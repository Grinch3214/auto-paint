import type { PriceGroup, PriceItem } from '@/types/prices'

/** 1 → '01' */
export function padNumber(value: number, length = 2): string {
  return String(value).padStart(length, '0')
}

/** 4500 → '4 500' (неразрывный пробел: число не переносится) */
export function formatNumber(value: number): string {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')
}

/** template — строка из словаря с {value}, например 'от {value}' */
export function formatPrice(value: number | undefined, template: string): string {
  return value === undefined ? '—' : template.replace('{value}', formatNumber(value))
}

/** Самая низкая цена детали: для текстов «от N лари» */
export function minPrice(item: PriceItem): number | undefined {
  const values = [item.fresh, item.used, item.single].filter((v) => v !== undefined)
  return values.length ? Math.min(...values) : undefined
}

/** Подставляет в текст цены из таблицы: '{hood}' → '490' */
export function fillPrices(text: string, groups: readonly PriceGroup[]): string {
  return text.replace(/\{(\w+)\}/g, (match, id: string) => {
    const item = groups.flatMap((g) => g.items).find((i) => i.id === id)
    const price = item && minPrice(item)
    return price === undefined ? match : formatNumber(price)
  })
}
export function fillVars(text: string, vars: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => vars[key] ?? match)
}

/** '{BRAND}' в тексте → название бренда */
export function fillBrand(text: string, brand: string): string {
  return text.replaceAll('{BRAND}', brand)
}
