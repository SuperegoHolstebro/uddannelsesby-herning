'use client'

import { stegaClean } from 'next-sanity'
import React, { useState, useEffect } from 'react'
import { client } from '~/sanity/lib/sanity.client'
import { POPUP_QUERY } from '~/sanity/lib/sanity.queries'
import Paragraph from '../atoms/Paragraph'
import Heading from '../atoms/Heading'
import Photo from '../atoms/Photo'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from '../atoms/Icons'
import { Button } from '../atoms/Button'
import { clean } from '~/utils/sanitize'
import { formatDateToNumber } from '~/utils/date'
import Badge from '../atoms/badge'
import { formatPrice } from '~/utils/price'
import { AdvancedButton } from '../atoms/AdvancedButton'
import Link from 'next/link'
import { resolveHref } from '~/sanity/lib/sanity.links'

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasCheckedLocalStorage, setHasCheckedLocalStorage] = useState(false)

  const usePopupData = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
      const fetchData = async () => {
        let result = await client.fetch(POPUP_QUERY)
        result = await stegaClean(result)
        setData(result)
      }
      fetchData()
    }, [])

    return data
  }

  const data = usePopupData()

  useEffect(() => {
    // Check if the popup has already been shown
    const hasSeenPopup = localStorage.getItem('hasSeenPopup')
    if (!hasSeenPopup) {
      // Delay opening the popup
      const timer = setTimeout(() => {
        setIsOpen(true)
        localStorage.setItem('hasSeenPopup', 'true') // Mark as seen
      }, 1000)

      return () => clearTimeout(timer)
    } else {
      setHasCheckedLocalStorage(true) // Mark check as complete
    }
  }, [])

  // Prevent rendering popup until local storage is checked
  useEffect(() => {
    if (!isOpen) {
      setHasCheckedLocalStorage(true)
    }
  }, [isOpen])

  const togglePopup = () => {
    setIsOpen(false)
  }

  return (
    <div>
      {hasCheckedLocalStorage && clean(data?.type) === 'custom' && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: 100,
                transition: { duration: 0.5, ease: [0.86, 0, 0.07, 1] },
              }}
              transition={{ duration: 1, delay: 1, ease: [0.86, 0, 0.07, 1] }}
              className="fixed bottom-0 right-0 z-[calc(infinity+1)]"
            >
              <div className="flex flex-col-reverse w-full max-w-3xl gap-3 shadow-md md:gap-12 md:flex-row bg-lys">
                <div className="p-8 pt-6 pr-0 space-y-8 md:pt-12 md:space-y-6 md:p-12 md:basis-1/2">
                  {data?.custom?.title && (
                    <Heading tag="h6" type="h4" spacing="none">
                      {data?.custom?.title}
                    </Heading>
                  )}
                  {data?.custom?.description && (
                    <Paragraph spacing="none">
                      {data?.custom?.description}
                    </Paragraph>
                  )}
                  {data?.custom?.link && (
                    <Button link={data?.custom?.link}>
                      {data?.custom?.link?.label}
                    </Button>
                  )}
                </div>
                <div className="relative p-8 pb-0 md:p-0 md:basis-1/2 aspect-1">
                  {data?.custom?.image?.asset && (
                    <Photo image={data?.custom?.image} className="aspect-1" />
                  )}
                  <button
                    onClick={togglePopup}
                    className="absolute top-12 right-12 group "
                  >
                    <Icon
                      className="transition-all scale-105 text-signal-pink size-6 group-hover:rotate-180 duration-735 ease-custom group-hover:text-dark"
                      type="x"
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

export default Popup
