'use client'
import Link, { default as NextLink } from 'next/link'
import React, { useEffect, useState } from 'react'
import { client } from '@/sanity/lib/sanity.client'
import { Button } from '../atoms/Button'
import { AnimatePresence, motion } from 'framer-motion'
import { AdvancedButton } from '../atoms/AdvancedButton'
import Icon from '../atoms/Icons'
import { stegaClean } from '@sanity/client/stega'
import { FOOTER_QUERY, NAVIGATION_QUERY } from '~/sanity/lib/sanity.queries'
import Heading from '../atoms/Heading'
import { FadeUp } from '../interactions/AnimateFadeIn'

/**
 *
 * @returns: Navigationen for hjemmesiden.
 * @example: <Navigation />
 * @alias: Navigation
 * @module: components/Navigation
 * @summary: Denne komponent bruges til at vise navigationen for hjemmesiden.
 * @see: src/components/Navigation.tsx
 * @version: 1.0.0
 * @property: [onClose]
 * @author: Kasper Buchholtz
 *
 **/

export default function Navigation({ onClose }) {
  const useNavigationData = () => {
    const [data, setData] = useState(null)
    useEffect(() => {
      const fetchData = async () => {
        let result = await client.fetch(NAVIGATION_QUERY)
        result = await stegaClean(result)
        setData(result)
      }
      fetchData()
    }, [])
    return data
  }
  const useFooterData = () => {
    const [footer, setFooter] = useState(null)
    useEffect(() => {
      const fetchData = async () => {
        let result = await client.fetch(FOOTER_QUERY)
        result = await stegaClean(result)
        setFooter(result)
      }
      fetchData()
    }, [])
    return footer
  }

  const data = useNavigationData()
  const getFooter = useFooterData()
  const footer = getFooter
  return (
    <>
      <motion.nav
        data-lenis-prevent="true"
        initial={{ x: '-100%' }}
        transition={{ stiffness: 100, ease: 'easeInOut', duration: 0.3 }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        className="fixed z-[999] md:pl-[100px] top-0 left-0 w-full h-full overflow-auto bg-mørk flex flex-col justify-between"
      >
        <motion.ul
          initial={{ opacity: 0 }}
          transition={{
            stiffness: 100,
            ease: 'easeInOut',
            duration: 0.3,
            delay: 0.3,
          }}
          animate={{ opacity: 1 }}
          className="px-6 pt-20 pb-6 pl-8 my-auto space-y-6 overflow-auto md:h-fit navigation-items md:pl-16 xl:pl-20 md:px-24 lg:px-19 xl:px-16 sm:px-13 sm:pt-32 md:pt-0 lg:pt-28 text-lys"
        >
          {data?.links?.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </motion.ul>
        <BottomNavigation footer={footer} />
      </motion.nav>
    </>
  )
}

function MenuItem({ item }) {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
  const [showSvgOnClick, setShowSvgOnClick] = useState(false)

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen)
  }
  const clicked = () => {
    setShowSvgOnClick(!showSvgOnClick)
  }

  const doBoth = () => {
    clicked()
    toggleSubmenu()
  }

  return (
    <li
      className={`h-auto transition overflow-hidden text-huge navigation-item focus-within:text-signal-gul md:hover:pl-0 hover:pl-4  ${isSubmenuOpen ? 'pl-4 md:pl-0' : ''}`}
    >
      {item?.subLinks?.length > 0 ? (
        <>
          <AdvancedButton
            onClick={doBoth}
            className="relative flex items-start justify-between w-full px-0 py-0 pb-2 text-left group focus-within:text-signal-gul"
            variant="none"
          >
            <span
              className={`relative flex gap-4 font-bold focus-within:text-signal-gul hover:text-signal-gul ${isSubmenuOpen ? 'text-signal-gul' : ''}`}
            >
              <AnimatePresence mode="wait">
                {showSvgOnClick && (
                  <span className="absolute size-6 md:size-8 -left-[5%] md:-translate-x-full -translate-x-1/2 translate-y-1/2">
                    <motion.span
                      transition={{ stiffness: 100, duration: 0.5 }}
                      exit={{ scale: 0, opacity: 0 }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      <motion.svg
                        className="size-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          repeatType: 'loop',
                          ease: 'linear',
                        }}
                        width="64"
                        height="64"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M48.7538 38.9389L54.6271 54.6271L38.9389 48.7538L32 64L25.0611 48.7538L9.37294 54.6271L15.2462 38.9389L0 32L15.2462 25.0611L9.37294 9.37295L25.0611 15.2462L32 0L38.9389 15.2462L54.6271 9.37295L48.7538 25.0611L64 32L48.7538 38.9389Z"
                          fill="#D9FC00"
                        />
                      </motion.svg>
                    </motion.span>
                  </span>
                )}
              </AnimatePresence>
              <span dangerouslySetInnerHTML={{ __html: item.link.label }} />
            </span>
          </AdvancedButton>
          <AnimatePresence mode="popLayout" presenceAffectsLayout>
            {isSubmenuOpen && (
              <ul className="flex flex-row flex-wrap gap-0 gap-x-4 md:gap-4 text-medium">
                {item.subLinks.map((subItem, index) => (
                  <SubMenuItem index={index} key={index} item={subItem} />
                ))}
              </ul>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Button
          showSvg={false}
          className="relative block w-full h-auto px-0 py-0 pb-2 text-left focus-within:text-signal-gul hover:text-signal-gul"
          variant="none"
          link={item.link}
        >
          <span
            className="font-bold focus-within:text-signal-gul hover:text-signal-gul"
            dangerouslySetInnerHTML={{ __html: item.link.label }}
          />
        </Button>
      )}
    </li>
  )
}

function SubMenuItem({ item, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
      exit={{ opacity: 0, y: -20 }}
      className="h-auto text-lys"
    >
      <Button
        showSvg={false}
        className="relative block w-full px-0 py-0 pb-2 text-left"
        variant="none"
        link={item}
      >
        <span
          className="font-light hover:text-signal-gul focus-within:text-signal-gul *:overflow-visible"
          dangerouslySetInnerHTML={{ __html: item.label }}
        />
      </Button>
    </motion.li>
  )
}

const IconItem = ({ item }) => {
  return (
    <li>
      <Link
        className="fill-lys text-lys *:size-6 focus-within:fill-signal-gul hover:fill-signal-gul transition-colors w-full block"
        href={item.url}
        target="_blank"
        rel="noreferrer"
      >
        <Icon className="" type={item.platform} />
      </Link>
    </li>
  )
}

const BottomNavigation = ({ footer }) => {
  return (
    <div className="px-6 overflow-hidden h-fit navigation-items md:pl-16 xl:pl-20 md:px-24 lg:px-19 xl:px-16 sm:px-13 text-lys ">
      <FadeUp delay={0.5}>
        <div className="flex justify-between py-5 border-t border-lys">
          <Heading tag="h6" type="h6" spacing="none" className="!font-bold">
            <Link
              className="group"
              href="/signin"
              target=""
              rel="noreferrer"
              title="Virksomhedslogin"
            >
              Virksomhedslogin
            </Link>
          </Heading>
          <ul className="flex flex-wrap justify-center max-w-64 md:mx-0 gap-x-4 gap-y-2 md:justify-start">
            {footer?.social?.map(
              (item: { platform: string; url: string }, index: number) => (
                <IconItem key={index} item={item} />
              ),
            )}
          </ul>
        </div>
      </FadeUp>
    </div>
  )
}
