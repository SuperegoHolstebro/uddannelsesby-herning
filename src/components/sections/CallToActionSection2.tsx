import React from 'react'
import Heading from '../atoms/Heading'
import Section from './Section'
import { Button } from '../atoms/Button'
import { clean } from '~/utils/sanitize'
import Media from '@/components/organisms/Media'
import { FadeUp } from '../interactions/AnimateFadeIn'
import Symbol from '../atoms/Symbols'

/**
 * @returns: En sektion med en eller flere call-to-action elementer.
 * @example: <CallToActionSection2 />
 * @alias: CallToActionSection2
 * @module: components/sections/CallToActionSection2
 * @summary: Denne komponent bruges til at oprette en sektion med en eller flere call-to-action elementer.
 * @see: src/components/sections/CallToActionSection2.tsx
 * @version: 1.0.0
 * @property: [section]
 * @author: Emilie Hjøllund
 **/

const CallToActionSection2 = ({ section }) => {
  return (
    <Section
      variant={'mørk'}
      id={clean(section?.SectionSettings?.anchor?.current)}
      paddingTop="none"
      paddingBottom="none"
      className="relative pb-0 pr-0 xs:pr-0 group sm:pr-13 md:pr-24 lg:pr-19 xl:pr-36 2xl:pr-52"
      paddingX="right"
    >
      <Button
        className="absolute inset-0 top-0 right-0 z-50 size-full"
        link={section?.link}
        showSvg={false}
        variant="none"
        title={section?.link?.label}
      >
        <span className="sr-only">{section?.link?.label}</span>
      </Button>
      <div className="relative order-2 overflow-hidden col-span-full sm:col-span-4 md:col-span-7 xl:col-span-12 md:-order-none">
        <div className="h-full transition-all ease-custom duration-735 group-hover:scale-110">
          <Media data={section.MediaObject?.media} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-mørk z-10"></div>
      </div>

      <Symbol
        type="e"
        className="absolute left-0 z-50 hidden h-20 md:h-40 md:-bottom-12 md:left-64 -bottom-64 md:block"
      />

      <div className="order-1 px-4 pt-16 pb-16 my-auto space-y-12 md:-order-none md:text-right xs:px-4 sm:px-13 md:px-0 col-span-full sm:col-span-4 md:col-span-5 xl:col-span-12 sm:pt-20 md:pt-24 lg:pt-32 xl:pt-40 2xl:pt-48 sm:pb-20 md:pb-24 lg:pb-32 xl:pb-40 2xl:pb-48">
        <FadeUp delay={0.3}>
          <Heading
            className="text-center md:text-right"
            text="balance"
            spacing="none"
            type="h2"
            tag="h2"
            dangerouslySetInnerHTML={{ __html: section?.heading }}
          ></Heading>
        </FadeUp>
        <FadeUp delay={0.5}>
          <Button
            className="justify-center w-full mx-auto md:justify-end"
            link={section?.link}
            variant={'secondary'}
            direction="left"
          >
            {section?.link?.label}
          </Button>
        </FadeUp>
      </div>
    </Section>
  )
}

export default CallToActionSection2
