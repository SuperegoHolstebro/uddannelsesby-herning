// export function formatPrice
// returns price with currency
// adds a space between the currency and the price
// adds a fallback text if no price is given

export function formatPrice(price: number | undefined): string {
  if (!price) {
    return 'GRATIS'
  }
  return `${price} KR.`
}
