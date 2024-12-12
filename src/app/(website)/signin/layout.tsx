'use client'
import { SessionProvider } from 'next-auth/react'
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

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body
        className={`${serif.className} ${outfit.className} ${sans.className}`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
