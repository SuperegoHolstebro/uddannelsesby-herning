/* import '@/styles/global.css'
import { VisualEditing } from 'next-sanity'
import { draftMode } from 'next/headers'
import AdminBar from '@/components/sanity/AdminBar'
import ScrollToTop from '@/components/atoms/ScrollToTop'
import { client } from '~/sanity/lib/sanity.client'
import Head from 'next/head'
import { SITE_SETTINGS_QUERY } from '~/sanity/lib/sanity.queries'
import { SanityLive } from '~/sanity/lib/sanity.live'
import FaviconToggler from '@/components/FaviconToggler' // Import the new component

import { PT_Serif, Outfit } from 'next/font/google'
import { GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script'

const sans = Outfit({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
})

const serif = PT_Serif({
  variable: '--font-serif',
  style: ['normal', 'italic'],
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

const settings = await client.fetch(SITE_SETTINGS_QUERY)
const headScripts = settings?.headScripts || ''
const metaTags = headScripts.match(/<meta[^>]*>/g) || [] // Only meta tags
const otherHeadContent = headScripts.replace(/<meta[^>]*>/g, '') // Other HTML elements

export default async function Root({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="da">
      <Head>
        <script
          id="CookieConsent"
          src="https://policy.app.cookieinformation.com/uc.js"
          data-culture="DA"
          data-gcm-version="2.0"
          type="text/javascript"
        ></script>
      </Head>
      <GoogleTagManager gtmId={settings?.googleTagManager?.id} />
      <body
        className={` ${serif.className} ${outfit.className} ${sans.className}`}
      >
        <Script
          id="show-banner"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: settings?.headScripts,
          }}
        />
        <FaviconToggler /> {/* Use the FaviconToggler component here */
/* {children}
        <SanityLive refreshOnFocus={false} />
        {(await draftMode()).isEnabled && (
          <>
            <VisualEditing />
            <AdminBar />
          </>
        )}
        {settings?.footerScripts && (
          <div
            style={{
              visibility: 'hidden',
              display: 'none',
              position: 'absolute',
              width: '0',
              height: '0',
            }}
            dangerouslySetInnerHTML={{ __html: settings.footerScripts }}
          />
        )}
      </body>
    </html>
  )
} */

import '@/styles/global.css'
import { VisualEditing } from 'next-sanity'
import { draftMode } from 'next/headers'
import { GoogleTagManager, sendGTMEvent } from '@next/third-parties/google'
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
