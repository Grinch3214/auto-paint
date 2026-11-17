import { computed } from 'vue'
import { PRICE_GROUPS } from '@/data/prices'
import { useContent, useI18n } from '@/i18n'
import { formatPrice, minPrice } from '@/utils/format'
import type { PriceItemId, PriceRow } from '@/types/prices'

/** Строки цен «от … ₾» по id из общей таблицы — цифры не расходятся с главной и FAQ */
export function usePriceRows(ids: () => readonly PriceItemId[]) {
  const { t } = useI18n()
  const content = useContent()

  return computed<PriceRow[]>(() => {
    const all = PRICE_GROUPS.flatMap((g) => g.items)
    return ids().flatMap((id) => {
      const item = all.find((i) => i.id === id)
      if (!item) return []
      const value = item.ask ? undefined : minPrice(item)
      return [
        {
          id,
          name: content.value.prices.items[id],
          price:
            value === undefined
              ? content.value.prices.ask
              : formatPrice(
                  value,
                  t((m) => m.common.priceFromGel),
                ),
          ask: value === undefined,
        },
      ]
    })
  })
}
