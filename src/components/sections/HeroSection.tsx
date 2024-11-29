import React from 'react'
import Section from '@/components/sections/Section'
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

const Hero: React.FC<HeroProps> = ({ data, ...props }) => {
  return (
    <Section
      paddingBottom={'none'}
      paddingTop={'none'}
      paddingX={'none'}
      variant="lys"
      className="flex items-center justify-center w-full h-screen"
    >
      <Scene />
      <Text textContent={data.text} videoSrc={data.media} />
    </Section>
  )
}

export default Hero
