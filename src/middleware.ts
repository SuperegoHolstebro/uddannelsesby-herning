import Appconfig from '../config'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const searchParams = request.nextUrl.searchParams

  // Debug Appconfig structure
  if (!Appconfig || !Appconfig.i18n || !Appconfig.i18n.locales) {
    console.error('Appconfig or i18n configuration is missing or undefined')
    return NextResponse.next()
  }

  // Handle the special case for "begivenheder"
  if (pathname.startsWith('/begivenheder')) {
    // Check if the pathname already contains a locale
    const hasLocale = Appconfig.i18n.locales.some(
      (locale) =>
        pathname.startsWith(`/${locale?.id}/`) || pathname === `/${locale?.id}`,
    )

    // If no locale is present, rewrite to add the default locale
    if (!hasLocale) {
      const searchString = searchParams.toString()
      return NextResponse.rewrite(
        new URL(
          `/${Appconfig.i18n.defaultLocaleId}${pathname}${searchString ? `?${searchString}` : ''}`,
          request.url,
        ),
      )
    }
    return NextResponse.next()
  }

  if (pathname.startsWith('/karriere')) {
    // Check if the pathname already contains a locale
    const hasLocale = Appconfig.i18n.locales.some(
      (locale) =>
        pathname.startsWith(`/${locale?.id}/`) || pathname === `/${locale?.id}`,
    )

    // If no locale is present, rewrite to add the default locale
    if (!hasLocale) {
      const searchString = searchParams.toString()
      return NextResponse.rewrite(
        new URL(
          `/${Appconfig.i18n.defaultLocaleId}${pathname}${searchString ? `?${searchString}` : ''}`,
          request.url,
        ),
      )
    }
    return NextResponse.next()
  }

  // Check if there is any supported locale in the pathname for other paths
  const pathnameIsMissingLocale = Appconfig.i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale?.id}/`) && pathname !== `/${locale?.id}`,
  )

  // Skip locale check for specific paths
  if (
    /*     pathname.startsWith('/uddannelsessteder') ||
     */ pathname.startsWith('/cookiepolitik') ||
    pathname.startsWith('/signin') ||
    pathname.includes('.') // exclude all files in the public folder
  ) {
    return NextResponse.next()
  }

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const searchString = searchParams.toString()
    return NextResponse.rewrite(
      new URL(
        `/${Appconfig.i18n.defaultLocaleId}${pathname}${searchString ? `?${searchString}` : ''}`,
        request.url,
      ),
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public/.*|studio|super-login|static|signin|sitemap\\.xml|cookiepolitik).*)',
  ],
}
