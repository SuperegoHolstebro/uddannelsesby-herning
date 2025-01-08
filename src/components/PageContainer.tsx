'use client'
import Footer from '@/components/organisms/Footer'
import Header from '@/components/organisms/Header'
import Link from 'next/link'
import { Lenis } from '~/components/Lenis'
import Popup from './molecules/Popup'

/**
 *
 * @returns: En container, der indeholder header, footer og børnekomponenter.
 * @example: <PageContainer />
 * @alias: PageContainer
 * @module: components/PageContainer
 * @summary: Denne komponent bruges til at vise en container, der indeholder header, footer og børnekomponenter.
 * @see: src/components/PageContainer.tsx
 * @version: 1.0.0
 * @property: [children]
 * @author: Kasper Buchholtz
 *
 **/

export default function PageContainer({
  locale,
  lenis = {
    lerp: 0.1,
    duration: 1.2,
    smoothTouch: false, //smooth scroll for touch devices
    smooth: true,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 2,
  },
  children,
}: {
  locale?: string
  lenis?: {
    lerp: number
    duration: number
    smoothTouch: boolean
    smooth: boolean
    easing: (t: number) => number
    orientation: string
    gestureOrientation: string
    smoothWheel: boolean
    touchMultiplier: number
  }
  children: React.ReactNode
}) {
  return (
    <>
      <a
        href="#indhold"
        className="absolute z-[999] px-4 py-2 text-white transition-transform -translate-y-full bg-blue-600 left-28 top-2 opacity-0  focus-visible:opacity-100  focus-visible:translate-y-0"
      >
        Gå til indhold
      </a>

      <Header locale={locale || 'da'} />
      <Lenis
        options={lenis}
        root={typeof document !== 'undefined' ? document.documentElement : null}
      />
      <main id="indhold" className={`debug-screens min-h-screen bg-lys`}>
        {children}
      </main>
      <Popup />
      <Footer locale={locale || 'da'} />
    </>
  )
}
