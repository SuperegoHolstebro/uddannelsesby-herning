'use client'
import React from 'react'
import Heading from '@/components/atoms/Heading'
import Paragraph from '@/components/atoms/Paragraph'
import Media from '@/components/organisms/Media'
import Section from '@/components/sections/Section'
import Modal from '../molecules/Modal'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Scene from '~/components/Scene'
import Text from '~/components/Text'

/**
 *
 * @returns: En sektion med en hero.
 * @example: <Hero />
 * @alias: Hero
 * @module: components/sections/Hero
 * @summary: Denne komponent bruges til at vise en hero.
 * @see: src/components/sections/Hero.tsx
 * @version: 1.0.0
 * @property: [title, image, video, altText, text, data]
 * @author: Kasper Buchholtz
 *
 **/

interface HeroProps {
  data?: any
}

const before =
  'before:bg-gradient-to-b before:from-mørk/0 before:to-mørk/60 before:absolute before:inset-0 before:z-10 '
const Hero: React.FC<HeroProps> = ({ data, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)

  const OpenModal = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <div className="flex items-center justify-center w-full h-screen">
        <Scene />
        <Text />
      </div>
    </>
  )
}

export default Hero
