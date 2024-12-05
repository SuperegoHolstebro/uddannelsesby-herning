'use client'
import Footer from '@/components/organisms/Footer'
import Header from '@/components/organisms/Header'
import { Lenis } from '~/components/Lenis'

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
        className="absolute z-[99999999] left-0 p-3 m-3 transition -translate-y-16 bg-signal-pink text-mørk focus-visible:translate-y-0 translate-x-1/2"
        href="#indhold"
      >
        Spring frem til indhold
      </a>
      <Header />
      <Lenis
        options={lenis}
        root={typeof document !== 'undefined' ? document.documentElement : null}
      />
      <main id="indhold" className={`debug-screens min-h-screen bg-lys`}>
        {children}
      </main>
      <Footer />
      {/*  <!-- Google Tag Manager (noscript) -->   */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-5KGNKC3B"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>
      {/*  <!-- End Google Tag Manager (noscript) -->   */}{' '}
    </>
  )
}
