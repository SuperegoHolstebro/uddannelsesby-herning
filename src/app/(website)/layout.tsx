import '@/styles/global.css'
import { VisualEditing } from 'next-sanity'
import { draftMode } from 'next/headers'
import { GoogleTagManager } from '@next/third-parties/google'
import { SanityLive } from '@/sanity/lib/sanity.live'
import { client } from '@/sanity/lib/sanity.client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/sanity.queries'
import Script from 'next/script'
import Appconfig from 'config'
import { PT_Serif, Outfit } from 'next/font/google'

const sans = Outfit({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
})

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
})

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ locale?: any } | string>
  children: React.ReactNode
}) {
  const resolvedParams = await params
  const locale =
    typeof resolvedParams === 'string'
      ? Appconfig.i18n.defaultLocaleId
      : resolvedParams.locale || Appconfig.i18n.defaultLocaleId

  const settings = await client.fetch(SITE_SETTINGS_QUERY, { locale })

  return (
    <html lang={locale || 'da'}>
      <GoogleTagManager gtmId={settings?.googleTagManager?.id} />
      <body className={`${sans.className} ${outfit.className}`}>
        <Script
          id="show-banner"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: settings?.headScripts,
          }}
        />
        {children}
        <SanityLive />
        {(await draftMode()).isEnabled && (
          <>
            <VisualEditing />
            <SanityLive />
          </>
        )}
      </body>
    </html>
  )
}
