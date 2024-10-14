'use client'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'
import Section from '@/components/sections/Section'
import { clean } from '~/utils/sanitize'

/**
 *
 * @returns: En sektion med media.
 * @example: <Media />
 * @alias: Media
 * @module: components/sections/Media
 * @summary: Denne komponent bruges til at vise en sektion med media.
 * @see: src/components/sections/Media.tsx
 * @version: 1.0.0
 * @property: [section, index]
 * @todo: Tilføj flere mediatyper
 * @author: Kasper Buchholtz
 *
 **/

const Media = ({ data, index }) => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false)

  const handleButtonClick = () => {
    setIsPopupOpen(!isPopupOpen) // Toggle the value of isPopupOpen
  }

  switch (data.select) {
    case 'image':
      return (
        <Section
        id={clean(data?.SectionSettings?.anchor?.current)}
        paddingTop={clean(data.design.padding.spacingTop)}
        paddingBottom={clean(data.design.padding.spacingBottom)}

          key={index}
        >
          <div className="col-span-full relative h-screen/1.2">
            <Image
              src={data.imageObject.image}
              alt="image"
              className="col-span-full "
              objectFit={data.imageObject.objectFit}
              width={data.imageObject.width || 800}
              height={data.imageObject.height || 600}
            />
          </div>
        </Section>
      )
    case 'video':
      return (
        <>
          <Section
            paddingX={data.videoObject.size}
            paddingBottom={data.design?.padding?.spacingBottom}
            paddingTop={data.design?.padding?.spacingTop}
            variant={data.design?.color?.color}
            key={index}
          >
            <div className=" group overflow-hidden transition-all relative col-span-full h-screen/1.2">
              {data?.videoObject?.thumbnail && (
                <Image
                  src={data?.videoObject?.thumbnail}
                  alt="image"
                  className="transition-transform col-span-full group-hover:scale-110"
                  objectFit="cover"
                  width={data?.videoObject?.width || 800}
                  height={data?.videoObject?.height || 600}
                />
              )}

              <button
                className="absolute translate-x-1/2 -translate-y-1/2 size-full top-1/2 right-1/2"
                onClick={handleButtonClick}
              >
                <svg
                  className="m-auto"
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2"
                    y="2"
                    width="96"
                    height="96"
                    rx="48"
                    stroke="#3BE086"
                    strokeWidth="4"
                  />
                  <path
                    d="M69.245 48.2984C70.5104 49.0799 70.5104 50.9201 69.245 51.7016L41.051 69.1156C39.7185 69.9385 38 68.9801 38 67.414L38 32.586C38 31.0199 39.7185 30.0615 41.051 30.8844L69.245 48.2984Z"
                    fill="#3BE086"
                  />
                </svg>
              </button>
            </div>
            <AnimatePresence mode="wait">
              {isPopupOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="fixed z-[9999999999] grid w-full h-full translate-x-1/2 -translate-y-1/2 top-1/2 right-1/2 place-content-center"
                >
                  <button
                    onClick={handleButtonClick}
                    className="absolute inset-0 size-full bg-dark/70"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    transition={{ duration: 0.5 }}
                    className="relative h-auto max-w-6xl mx-auto my-auto isolate"
                  >
                    <video autoPlay loop className="w-full h-auto">
                      <source src={data?.videoObject?.video} />
                      Your browser does not support the video tag.
                    </video>
                    <button
                      onClick={handleButtonClick}
                      className="absolute top-4 right-4"
                    >
                      luk {/* //TODO - Tilføj icon */}
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </Section>
        </>
      )
    case 'vimeo':
      return (
        <Section
          paddingX={data.vimeoObject?.size}
          paddingBottom={data.design?.padding?.spacingBottom}
          paddingTop={data.design?.padding?.spacingTop}
          variant={data.design?.color?.color}
          key={index}
        >
          <div className="relative h-screen/1.2 col-span-full">
            <iframe
              src={`${data.vimeoObject?.vimeo}`}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </Section>
      )
    default:
      return null
  }
}

export default Media
