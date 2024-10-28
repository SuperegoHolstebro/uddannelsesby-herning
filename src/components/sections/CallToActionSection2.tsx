import React from 'react'
import Heading from '../atoms/Heading'
import Section from './Section'
import { Button } from '../atoms/Button'
import { clean } from '~/utils/sanitize'
import Media from '@/components/organisms/Media'

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
      variant={clean(section?.design?.color?.color || 'default')}
      id={clean(section?.SectionSettings?.anchor?.current)}
      paddingTop={clean(section?.design?.padding?.spacingTop)}
      paddingBottom={clean(section?.design?.padding?.spacingBottom)}
      className={section?.design?.color?.color === 'secondary' ? 'bg-mørk' : ''}
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
    </Section>
  )
}

export default CallToActionSection2
