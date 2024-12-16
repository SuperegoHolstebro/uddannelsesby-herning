import Appconfig from '../config'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const searchParams = request.nextUrl.searchParams

  // Debug Appconfig structure
  if (!Appconfig || !Appconfig.i18n || !Appconfig.i18n.locales) {
    console.error('Appconfig or i18n configuration is missing or undefined')
    return NextResponse.next() // Proceed without rewriting
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = Appconfig.i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale?.id}/`) && pathname !== `/${locale?.id}`,
  )

  // Skip locale check for specific paths
  if (pathname.startsWith('/karriere')) {
    return NextResponse.next() // Do not apply locale rewrite for /karriere and sub-paths
  }

  if (pathname.startsWith('/begivenheder')) {
    return NextResponse.next() // Do not apply locale rewrite for /karriere and sub-paths
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

  return NextResponse.next() // Proceed without rewriting
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|studio|super-login|static|sitemap\\.xml).*)',
  ],
}
