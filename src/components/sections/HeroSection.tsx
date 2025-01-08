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
      className="items-center justify-center block w-full min-h-screen overflow-hidden"
    >
      <Text
        textContent={data.text}
        videoSrc={data.media}
        type={data.type}
        title={data.string}
      />
      <Scene /* type={data.type} */ />
    </Section>
  )
}

export default Hero
