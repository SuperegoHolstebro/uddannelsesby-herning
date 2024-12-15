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
        className={`px-4 xs:px-4 sm:px-13 md:px-0 fixed top-0 left-0 translate-x-0 w-full md:w-[100px] h-auto md:h-full bg-mørk z-[9999999999] transition-all flex flex-row md:flex-col-reverse justify-between items-center ${
          isScrolled ? '!bg-mørk' : ''
        }`}
      >
        <div className="flex items-center justify-between md:justify-center h-auto md:h-[300px] w-full">
          <Link className="text-lys md:rotate-90" href="/">
            <Logo className="w-40 md:w-[250px] group" />
          </Link>
        </div>

        <button
          aria-controls="menu"
          aria-label="Menu"
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-[999999999] md:mt-6 size-11.5 group"
        >
          <span
            className={`block absolute transition-all h-2.5 w-10 bg-signal-gul group-hover:bg-signal-gul transform ease-custom duration-735 ${isOpen ? 'rotate-0 !bg-signal-pink ' : '-translate-y-5  group-hover:translate-y-0'}`}
            aria-hidden="true"
          ></span>
          <span
            className={`block absolute transition-all h-2.5 w-10 bg-signal-gul group-hover:bg-signal-gul transform ease-custom duration-735 ${isOpen ? 'opacity-0  ' : ''}`}
            aria-hidden="true"
          ></span>
          <span
            className={`block absolute transition-all h-2.5 w-10 bg-signal-gul group-hover:bg-signal-gul transform ease-custom duration-735 ${isOpen ? '-rotate-0 !bg-signal-pink' : 'translate-y-5 group-hover:translate-y-0'}`}
            aria-hidden="true"
          ></span>
        </button>
      </header>
      <AnimatePresence mode="wait">
        {isOpen && <Navigation onClose={handleCloseNav} />}
      </AnimatePresence>
    </>
  )
}
