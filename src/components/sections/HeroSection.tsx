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
  locale?: any
}

const Hero: React.FC<HeroProps> = ({ data, locale, ...props }) => {
  return (
    <Section
      paddingBottom={'none'}
      paddingTop={'none'}
      paddingX={'none'}
      variant="lys"
      gap="secondary"
      className="items-center justify-center w-full min-h-screen gap-0 overflow-hidden"
    >
      <Text
        textContent={data.text}
        videoSrc={data.media}
        type={data.type}
        title={data.string}
        locale={locale}
      />
      <Scene type={data.type} />
    </Section>
  )
}

export default Hero
