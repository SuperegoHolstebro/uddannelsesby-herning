// export function formatPrice
// returns price with currency
// adds a space between the currency and the price
// adds a fallback text if no price is given

export function formatPrice(price: number | undefined, locale: string): string {
  if (!price) {
    return locale === 'da' ? 'GRATIS' : 'FREE'
  }
  return `${price} KR.`
}
