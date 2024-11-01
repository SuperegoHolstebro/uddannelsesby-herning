import React from 'react'
import Heading from '../atoms/Heading'
import Section from './Section'
import { Button } from '../atoms/Button'
import { clean } from '~/utils/sanitize'
import Media from '@/components/organisms/Media'
import { FadeUp } from '../interactions/AnimateFadeIn'

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
    /*     <Section
      variant={'mørk'}
      id={clean(section?.SectionSettings?.anchor?.current)}
      paddingTop={clean(section?.design?.padding?.spacingTop)}
      paddingBottom={clean(section?.design?.padding?.spacingBottom)}
      className="px-4 xs:px-4 sm:px-13 md:px-24 lg:px-19 xl:px-36 2xl:px-52"
      paddingX="none"
    >
      <div className="grid grid-cols-2 col-span-full">
        <div className="h-auto col-span-1">
          <Media data={section.MediaObject?.media} />
        </div>
        <div className="col-span-1 text-right bg-mørk text-lys h-full">
          <div className="pt-44 pb-24 pl-1.5">
            <Heading
              text="balance"
              spacing="none"
              type="h3"
              tag="h3"
              className="pb-24"
            >
              {section.heading}
            </Heading>
            <Button link={section?.link} variant={'secondary'}>
              {section?.link?.label}
            </Button>
          </div>
        </div>
      </div>
    </Section> */

    <Section
      variant={'mørk'}
      id={clean(section?.SectionSettings?.anchor?.current)}
      paddingTop="none"
      paddingBottom="none"
      className="pr-4 xs:pr-4 sm:pr-13 md:pr-24 lg:pr-19 xl:pr-36 2xl:pr-52"
      paddingX="none"
    >
      <div className="col-span-full md:col-span-6 xl:col-span-12 max-h-screen/1.6">
        <Media data={section.MediaObject?.media} />
      </div>
      <div className="mt-auto mb-20 space-y-24 text-right col-span-full md:col-span-6 xl:col-span-12">
        <FadeUp delay={0.3}>
          <Heading text="balance" spacing="none" type="h2" tag="h2">
            {section.heading}
          </Heading>
        </FadeUp>
        <FadeUp delay={0.5}>
          <Button link={section?.link} variant={'secondary'}>
            {section?.link?.label}
          </Button>
        </FadeUp>
      </div>
    </Section>
  )
}

export default CallToActionSection2
