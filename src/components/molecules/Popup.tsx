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
    <>
      {hasCheckedLocalStorage && clean(data?.type) === 'custom' && (
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: 100,
                  transition: { duration: 0.5, ease: [0.86, 0, 0.07, 1] },
                }}
                transition={{ duration: 1, delay: 1, ease: [0.86, 0, 0.07, 1] }}
                className="fixed bottom-0 right-0 z-[calc(infinity+1)] h-full flex items-end pointer-events-none"
              >
                <div className="flex flex-col-reverse w-full h-auto max-w-3xl gap-3 pb-8 shadow-md pointer-events-auto md:gap-12 md:flex-row bg-lys md:pb-0">
                  <div className="w-full px-4 pt-3 pr-0 space-y-3 md:space-y-8 md:p-8 md:pt-6 md:pt-12 md:space-y-6 md:p-12 md:w-1/2">
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
                  <div className="relative w-full p-4 pb-0 md:p-0 md:w-1/2">
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
            </>
          )}
        </AnimatePresence>
      )}

      {/* select */}
      {hasCheckedLocalStorage && clean(data?.type) === 'select' && (
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
              className="fixed bottom-0 right-0 z-[calc(infinity+1)] h-full flex items-end pointer-events-none"
            >
              <div className="flex flex-col-reverse w-full max-w-3xl gap-3 shadow-[0px_24px_40px_-10px_rgba(15,_28,_51,_0.16)] md:gap-12 md:flex-row bg-lys pb-8 md:pb-0 pointer-events-auto">
                <div className="flex flex-col justify-between w-full p-8 pt-6 pr-0 md:pt-12 md:p-12 md:w-1/2">
                  <div className="space-y-5 md:space-y-6">
                    {data?.event?.title && (
                      <Heading tag="h6" type="h4" spacing="none">
                        {data?.event?.title}
                      </Heading>
                    )}
                    <div className="flex gap-3">
                      {data?.event?.startDate && (
                        <Badge variant="pink">
                          {formatDateToNumber(data?.event?.startDate)}
                        </Badge>
                      )}
                      {data?.event?.price && (
                        <Badge variant="pink">
                          {formatPrice(data.event.price)}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="pt-6 mt-auto md:pt-0">
                    <AdvancedButton variant="primary">
                      <Link
                        className="text-increased"
                        href={resolveHref('event', data?.event?.slug)}
                        // href="#signup"
                      >
                        SE MERE
                        <span className="overflow-hidden">
                          <span
                            className={`block mr-auto w-10 overflow-hidden transition-all ease-custom duration-735 group-hover/button:w-full`}
                          >
                            <svg
                              className="w-full"
                              preserveAspectRatio="xMinYMin meet"
                              height="6"
                              viewBox="0 0 30 6"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 4.71024L4.16667 2.85512C6.81894 1.67425 9.84772 1.67425 12.5 2.85512V2.85512C15.1523 4.03599 18.1811 4.03599 20.8333 2.85512V2.85512C23.4856 1.67425 26.5144 1.67425 29.1667 2.85512V2.85512C31.8189 4.03599 34.8477 4.03599 37.5 2.85512V2.85512C40.1523 1.67425 43.1811 1.67425 45.8333 2.85512V2.85512C48.4856 4.03599 51.5144 4.03599 54.1667 2.85512V2.85512C56.8189 1.67425 59.8477 1.67425 62.5 2.85512V2.85512C65.1523 4.03599 68.1811 4.03599 70.8333 2.85512V2.85512C73.4856 1.67425 76.5144 1.67425 79.1667 2.85512V2.85512C81.8189 4.03599 84.8477 4.03599 87.5 2.85512V2.85512C90.1523 1.67425 93.1811 1.67425 95.8333 2.85512V2.85512C98.4856 4.03599 101.514 4.03599 104.167 2.85512V2.85512C106.819 1.67425 109.848 1.67425 112.5 2.85512V2.85512C115.152 4.03599 118.181 4.03599 120.833 2.85512V2.85512C123.486 1.67425 126.514 1.67425 129.167 2.85512V2.85512C131.819 4.03599 134.848 4.03599 137.5 2.85512V2.85512C140.152 1.67425 143.181 1.67425 145.833 2.85512V2.85512C148.486 4.03599 151.514 4.03599 154.167 2.85512V2.85512C156.819 1.67425 159.848 1.67425 162.5 2.85512V2.85512C165.152 4.03599 168.181 4.03599 170.833 2.85512V2.85512C173.486 1.67425 176.514 1.67425 179.167 2.85512V2.85512C181.819 4.03599 184.848 4.03599 187.5 2.85512V2.85512C190.152 1.67425 193.181 1.67425 195.833 2.85512V2.85512C198.486 4.03599 201.514 4.03599 204.167 2.85512V2.85512C206.819 1.67425 209.848 1.67425 212.5 2.85512V2.85512C215.152 4.03599 218.181 4.03599 220.833 2.85512V2.85512C223.486 1.67425 226.514 1.67425 229.167 2.85512V2.85512C231.819 4.03599 234.848 4.03599 237.5 2.85512V2.85512C240.152 1.67425 243.181 1.67425 245.833 2.85512V2.85512C248.486 4.03599 251.514 4.03599 254.167 2.85512V2.85512C256.819 1.67425 259.848 1.67425 262.5 2.85512V2.85512C265.152 4.03599 268.181 4.03599 270.833 2.85512V2.85512C273.486 1.67425 276.514 1.67425 279.167 2.85512V2.85512C281.819 4.03599 284.848 4.03599 287.5 2.85512V2.85512C290.152 1.67425 293.181 1.67425 295.833 2.85511L300 4.71024"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                            </svg>
                          </span>
                        </span>
                      </Link>
                    </AdvancedButton>
                  </div>
                </div>
                <div className="relative w-full p-8 pb-0 md:p-0 md:w-1/2 aspect-1">
                  {data?.event?.image?.asset && (
                    <Photo image={data?.event?.image} className="aspect-1" />
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
    </>
  )
}

export default Popup
