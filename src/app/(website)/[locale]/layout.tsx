import '@/styles/global.css'
import { VisualEditing } from 'next-sanity'
import { draftMode } from 'next/headers'
import { GoogleTagManager, sendGTMEvent } from '@next/third-parties/google'
import { SanityLive } from '@/sanity/lib/sanity.live'
import { client } from '@/sanity/lib/sanity.client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/sanity.queries'
import Script from 'next/script'
import Appconfig from 'config'
import { Inter, PT_Serif } from 'next/font/google'

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const serif = PT_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  style: ['normal', 'italic'],
  weight: ['400', '700'],
})
export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>
  children: React.ReactNode
}) {
  const locale =
    (await params)?.locale || Appconfig.i18n.defaultLocaleId || 'da'

  return (
    <html lang={locale} className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  )
}
