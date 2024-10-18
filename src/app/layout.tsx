import '@/styles/global.css'
import { draftMode } from 'next/headers'
import { GoogleTagManager } from '@next/third-parties/google'
import { Inter, PT_Serif, Outfit } from 'next/font/google'
const sans = Inter({
  variable: '--font-family-sans',
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  display: 'swap',
  preload: true,
})

const serif = PT_Serif({
  variable: '--font-family-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
})

const outfit = Outfit({
  variable: '--font-family-outfit',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
})

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <GoogleTagManager gtmId="GTM-" />
      <style>
        {`
          :root {
            --font-family-sans: ${sans.style.fontFamily};
            --font-family-serif: ${serif.style.fontFamily};
            --font-family-outfit: ${outfit.style.fontFamily};
          }
        `}
      </style>
      <body
        className={`selection:text-light-light selection:bg-green ${draftMode().isEnabled ? 'debug-screens' : ''} ${serif.className} ${outfit.className} ${sans.className}`}
      >
        {children}
      </body>
    </html>
  )
}
