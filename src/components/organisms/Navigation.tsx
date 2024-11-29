'use client'
import { default as NextLink } from 'next/link'
import React, { useEffect, useState } from 'react'
import { client } from '@/sanity/lib/sanity.client'
import { Button } from '../atoms/Button'
import { AnimatePresence, motion } from 'framer-motion'
import { AdvancedButton } from '../atoms/AdvancedButton'
import Icon from '../atoms/Icons'
import { stegaClean } from '@sanity/client/stega'
import { NAVIGATION_QUERY } from '~/sanity/lib/sanity.queries'

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
  const data = useNavigationData()

  return (
    <>
      <motion.nav
        data-lenis-prevent="true"
        initial={{ x: '-100%' }}
        transition={{ stiffness: 100 }}
        animate={{ x: 0 }}
        exit={{ x: '-100%', opacity: 0 }}
        className="fixed z-[999] top-0 left-[100px] w-screen h-screen sm:w-[50vw] md:w-[50vw] lg:w-[33vw] overflow-auto bg-lys"
      >
        <ul className="h-full px-6 pb-6 space-y-6 overflow-auto md:px-24 lg:px-19 xl:px-16 sm:px-13 pt-44 sm:pt-32 md:pt-28 lg:pt-28">
          {data?.links?.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </ul>
      </motion.nav>
      <motion.button
        title="Luk menu"
        className="fixed z-[998] top-0 right-0 w-screen h-screen bg-mørk/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, stiffness: 100 }}
        onClick={onClose}
      />
    </>
  )
}

function MenuItem({ item }) {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen)
  }
  return (
    <li className={`h-auto border-b border-mørk text-medium `}>
      {item?.subLinks?.length > 0 ? (
        <>
          <AdvancedButton
            onClick={toggleSubmenu}
            className="relative flex items-start justify-between w-full px-0 py-0 pb-2 text-left "
            variant="none"
          >
            {item.link.label}
            <Icon
              type={'chevronUp'}
              className={`size-6 transition-all transform fill-mørk ${isSubmenuOpen ? 'rotate-0' : 'rotate-180'}`}
            />
          </AdvancedButton>
          <AnimatePresence>
            {isSubmenuOpen && (
              <motion.ul
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
                {item.subLinks.map((subItem, index) => (
                  <SubMenuItem key={index} item={subItem} />
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Button
          showSvg={false}
          className="relative block w-full h-auto px-0 py-0 pb-2 text-left "
          variant="none"
          link={item.link}
        >
          {item.link.label}
        </Button>
      )}
    </li>
  )
}

function SubMenuItem({ item }) {
  return (
    <li className="h-auto border-b last-of-type:border-b-0 border-mørk last-of-type:mb-6">
      <Button
        showSvg={false}
        className="relative block w-full px-0 py-0 pb-2 text-left "
        variant="none"
        link={item}
      >
        {item.label}
      </Button>
    </li>
  )
}
