import React from 'react'
import Section from '@/components/sections/Section'
import { TextContainerProps } from '@/types/TextContainerProps'
import { clean } from '@/utils/sanitize'
import Heading from '../atoms/Heading'
import Paragraph from '../atoms/Paragraph'
import Image from 'next/image'
import Media from '@/components/organisms/Media'
import { AdvancedButton } from '../atoms/AdvancedButton'
import { Button } from '../atoms/Button'
import Symbol from '../atoms/Symbols'
import Icon from '../atoms/Icons'
import { FadeUp } from '../interactions/AnimateFadeIn'

/**
 *
 * @returns: En tekstcontainer.
 * @example: <TextContainer />
 * @alias: TextContainer
 * @module: components/sektions/TextContainer
 * @summary: Denne komponent bruges til at vise en tekstcontainer.
 * @see: src/components/sections/TextContainer.tsx
 * @version: 1.0.0
 * @property: [variant, children]
 * @todo: Tilføj en anden bedre måde at groq items på og tilføj en bedre måde at vise dem på.
 * @author: Emilie Hjøllund
 *
 **/

const Quote = ({ section }) => {
  return (
    <Section
      paddingX="left"
      className="px-0 xs:px-0 sm:px-0 md:pr-0 md:pl-[10rem] lg:pr- lg:pl-[9.5rem] xl:pl-[200px] 2xl:pl-[351px] bg-mørk text-lys relative overflow-x-clip"
      paddingTop={clean(section?.design?.padding?.spacingTop) || 'none'}
      paddingBottom={clean(section?.design?.padding?.spacingBottom) || 'none'}
    >
      <Symbol
        type="tlys"
        className="absolute z-10 hidden size-52 left-4 md:left-8 top-8 lg:block"
      />
      {/* Image in the last 12 columns */}
      <div className="relative h-full sm:row-start-1 col-span-full sm:col-start-4 sm:-col-end-1 xl:col-start-12 aspect-1">
        <span className="absolute z-[11] -right-1/4 xs:-right-20 -bottom-8 lg:hidden">
          <FadeUp>
            <Symbol type="tlys" />
          </FadeUp>
        </span>
        <FadeUp className="h-full *" delay={0.2}>
          <Media data={section.MediaObject?.media} />
        </FadeUp>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-mørk/50 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-mørk/20 z-10"></div>
      </div>

      {/* Quote in columns 4 to 14, overlapping the image slightly */}
      <div className="z-10 px-4 pt-8 pb-8 md:text-right sm:row-start-1 md:pt-14 col-span-full xs:px-4 sm:px-13 sm:pr-0 sm:col-span-6 sm:col-start-1 xl:col-start-4 xl:col-span-10 md:pl-0 xl:pt-0 xl:my-auto">
        <div className="relative">
          <span className="absolute z-10 translate-x-full translate-y-0 md:translate-y-full xl:translate-y-1/2 right-full md:translate-x-0 md:right-0 -top-1/2 md:-top-2/3">
            <FadeUp>
              <Icon type="quote" />
            </FadeUp>
          </span>
          <FadeUp delay={0.2}>
            <Heading type="h3" tag="h3" className="font-bold" spacing="none">
              {section?.quote}
            </Heading>
          </FadeUp>
        </div>
        <div className="mt-12 space-y-2 md:space-y-4">
          <FadeUp delay={0.4}>
            <Heading
              type="h4"
              tag="h4"
              className="font-semibold"
              spacing="none"
            >
              {section?.student}
            </Heading>
          </FadeUp>
          <FadeUp delay={0.6}>
            <Paragraph className="mt-0 uppercase first-of-type:mt-0">
              {section?.education}
            </Paragraph>
          </FadeUp>
        </div>
        {/* Button */}
        <div className="pt-8 pb-16 md:pt-16 xl:pb-8 xl:absolute xl:bottom-0 ">
          <FadeUp delay={0.8}>
            <Button
              link={section?.link}
              variant={'secondary'}
              className="relative"
            >
              {section?.link?.label}
            </Button>
          </FadeUp>
        </div>
      </div>
    </Section>
  )
}

export default Quote
