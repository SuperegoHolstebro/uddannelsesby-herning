import '@/styles/global.css'
import { draftMode } from 'next/headers'
import { GoogleTagManager } from '@next/third-parties/google'
import { PT_Serif, Outfit } from 'next/font/google'

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

interface LayoutProps {
  params: {
    locale: string
  }
  children: React.ReactNode
}

export default async function Root({ params, children }: LayoutProps) {
  const isDraftMode = (await draftMode()).isEnabled

  return (
    <html
      lang={params.locale || 'da'}
      className={`${serif.className} ${outfit.className} ${sans.className}`}
    >
      <GoogleTagManager gtmId="GTM-" />
      <body
        className={`${serif.className} ${outfit.className} ${sans.className} selection:text-mørk selection:bg-signal-gul ${
          isDraftMode ? 'debug-screens' : ''
        }`}
      >
        {children}
      </body>
    </html>
  )
}
