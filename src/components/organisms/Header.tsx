'use client'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import * as React from 'react'
import { useEffect } from 'react'
import Search from '@/components/molecules/Search'
import Navigation from '@/components/organisms/Navigation'
import Logo from '../atoms/Logo'
import { getFooter } from './Footer'
import { FooterType } from '~/types/Footer.types'

/**
 *
 * @returns: En header, der indeholder logo og søgefunktion.
 * @example: <Header />
 * @alias: Header
 * @module: components/Header
 * @summary: Denne komponent bruges til at vise en header med logo og søgefunktion.
 * @see: src/components/Header.tsx
 * @version: 1.0.0
 * @property: []
 * @todo: Nogen gange er der er der en bug, hvor bruger menuen viser den forkerte state,
 * @author: Kasper Buchholtz
 *
 **/

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [footer, setFooter] = React.useState<FooterType[]>([])
  const [isScrolled, setIsScrolled] = React.useState(false)

  useEffect(() => {
    getFooter().then((nav) => setFooter(nav))
  }, [])

  const handleCloseNav = () => {
    setIsOpen(false)
  }
  const data = footer[0]

  const handleScroll = () => {
    if (typeof window !== 'undefined' && window.scrollY > 100) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  // if isOpen is true, make the screen unscrollable by setting the body to fixed
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])
  return (
    <>
      <header
        className={` fixed top-0 right-0 w-full py-4 se-grid z-[9999999999] h-20 transition-all ${
          isScrolled ? '!bg-lys' : ''
        }`}
      >
        <div className="col-span-2 col-start-1 md:col-span-6">
          <Link className="text-lys" href="/">
            <Logo className="w-full h-auto max-w-xs" />
          </Link>
        </div>
        <Search />
        <button
          aria-controls="menu"
          aria-label="Menu"
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-[999999999] -col-start-1 -col-end-1 size-11.5 group ring-0 focus-within:ring-signal-gul ring-offset-0 focus-within:ring-2 focus-within:ring-signal-gul focus-within:ring-offset-2"
        >
          <div className="relative w-full h-auto -translate-x-1/2 translate-y-1/2 -right-1/2">
            <span
              className={`block absolute transition-all h-0.5 w-12 bg-signal-gul group-hover:bg-signal-gul transform duration-500 ease-in-out ${isOpen ? 'rotate-45 ' : '-translate-y-1.5 group-hover:w-10'}`}
              aria-hidden="true"
            ></span>
            <span
              className={`block absolute transition-all h-0.5 w-12 bg-signal-gul group-hover:bg-signal-gul transform duration-500 ease-in-out ${isOpen ? 'opacity-0 ' : ''}`}
              aria-hidden="true"
            ></span>
            <span
              className={`block absolute transition-all h-0.5 w-12 bg-signal-gul group-hover:bg-signal-gul transform duration-500 ease-in-out ${isOpen ? '-rotate-45 ' : 'translate-y-1.5 group-hover:w-5'}`}
              aria-hidden="true"
            ></span>
          </div>
        </button>
      </header>
      <AnimatePresence mode="wait">
        {isOpen && <Navigation onClose={handleCloseNav} />}
      </AnimatePresence>
    </>
  )
}
