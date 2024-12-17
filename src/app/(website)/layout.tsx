import '@/styles/global.css'
import { VisualEditing } from 'next-sanity'
import { draftMode } from 'next/headers'
import { GoogleTagManager } from '@next/third-parties/google'
import { SanityLive } from '@/sanity/lib/sanity.live'
import { client } from '@/sanity/lib/sanity.client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/sanity.queries'
import Script from 'next/script'
import Appconfig from 'config'

export default async function RootLayout({
  params,
  children,
}: {
  params: { locale: string }
  children: React.ReactNode
}) {
  const locale = (await params).locale || Appconfig.i18n.defaultLocaleId

  const settings = await client.fetch(SITE_SETTINGS_QUERY, { locale })

  return (
    <html lang={locale}>
      <GoogleTagManager gtmId={settings?.googleTagManager?.id} />
      <body>
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
