'use client'
import React, { useState } from 'react'
import Heading from '@/components/atoms/Heading'
import Media from '@/components/organisms/Media'
import Section from '@/components/sections/Section'
import Modal from '../molecules/Modal'
import Paragraph from '@/components/atoms/Paragraph'
import { AnimatePresence } from 'framer-motion'
import { clean } from '~/utils/sanitize'

/**
 *
 * @returns: En sektion med en hero.
 * @example: <Hero3 />
 * @alias: Hero3
 * @module: components/sections/Hero
 * @summary: Denne komponent bruges til at vise en hero.
 * @see: src/components/sections/Hero3.tsx
 * @version: 1.0.0
 * @property: [data]
 * @author: Emilie Hjøllund
 *
 **/

interface HeroProps {
  data?: any
}

const Hero3: React.FC<HeroProps> & { Content: React.FC<{ data: any }> } = ({
  data,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const OpenModal = () => {
    setIsOpen(!isOpen)
  }

  const AllNull =
    data.MediaObject?.media.imageObject == null &&
    data.MediaObject?.media.videoObject == null &&
    data.MediaObject?.media.vimeoObject == null

  const Colors =
    clean(data?.design?.color?.color) === 'mørk'
      ? 'bg-dark'
      : clean(data?.design?.color?.color) === 'lilla'
        ? 'bg-purple'
        : 'bg-green '

  return (
    <>
      <Section
        {...props}
        className="max-h-screen pt-40 md:pt-30"
        paddingTop="none"
        paddingBottom="none"
      >
        {/* Content Wrapper for Heading and Paragraph */}
        <Hero3.Content data={data} />

        {/* Background Color Setup */}
        <div
          className={` ${Colors} ${AllNull ? 'h-[calc(100vh/2.8)] sm:h-screen/3 md:h-[calc(100vh/2.8)] ' : 'h-screen/1.6 md:h-screen/1.5'} col-span-full absolute top-0 right-0 w-full`}
        />

        {AllNull ? (
          <></>
        ) : (
          <>
            <div className="relative col-span-full rounded-xl overflow-hidden h-screen/1.6 md:h-screen/1.3">
              <Media data={data?.MediaObject?.media} />
              {data?.MediaObject?.media.videoObject && (
                <button
                  onClick={OpenModal}
                  className="absolute z-40 text-white translate-x-1/2 -translate-y-1/2 top-1/2 right-1/2"
                >
                  Afspil video
                </button>
              )}
              {data?.MediaObject?.media && (
                <div className="absolute z-10 w-full h-full translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 right-1/2 bg-black/45" />
              )}
            </div>
            <AnimatePresence mode="sync">
              {isOpen && (
                <Modal openModal={OpenModal}>
                  <Media data={data?.MediaObject?.media} />
                </Modal>
              )}
            </AnimatePresence>
          </>
        )}
      </Section>
    </>
  )
}

export default Hero3
Hero3.Content = Content

function Content({ data }) {
  return (
    <div className="z-30 w-full text-lys col-span-full max-w-prose md:max-w-[80ch] prose-headings:text-signal-gul">
      <Paragraph spacing="small">{data?.subtitle}</Paragraph>
      <Heading spacing="small" tag="h1" type="h1" text="balance">
        {data.title}
      </Heading>
    </div>
  )
}
