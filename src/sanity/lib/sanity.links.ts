export function resolveHref(
  documentType?: string,
  slug?: string,
): string | undefined {
  switch (documentType) {
    case 'home':
      return '/'
    case 'page':
      return slug ? `/${slug}` : undefined
    case 'event':
      return slug ? `/begivenheder/${slug}` : undefined
    case 'article':
      return slug ? `/artikler/${slug}` : undefined
    case 'company':
      return slug ? `/karriere/${slug}` : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}
