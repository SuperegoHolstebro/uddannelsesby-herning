import '@/styles/global.css'
import { draftMode } from 'next/headers'
import { GoogleTagManager } from '@next/third-parties/google'
import { Inter, PT_Serif, Outfit } from 'next/font/google'
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

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="da"
      className={` ${serif.className} ${outfit.className} ${sans.className}`}
    >
      <GoogleTagManager gtmId="GTM-" />
      <body
        className={`selection:text-light-light selection:bg-green ${draftMode().isEnabled ? 'debug-screens' : ''}`}
      >
        {children}
      </body>
    </html>
  )
}
