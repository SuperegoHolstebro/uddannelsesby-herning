import React from 'react'
import Heading from '../atoms/Heading'
import Paragraph from '../atoms/Paragraph'
import Section from './Section'
import {Button} from '../atoms/Button'
import Media from '@/components/organisms/Media'
import { clean } from '~/utils/sanitize'


/**
 * @returns: En sektion med en eller flere call-to-action elementer.
 * @example: <CallToActionSection />
 * @alias: CallToActionSection
 * @module: components/sections/CallToActionSection
 * @summary: Denne komponent bruges til at oprette en sektion med en eller flere call-to-action elementer.
 * @see: src/components/sections/CallToActionSection.tsx
 * @version: 1.0.0
 * @property: [section]
 * @author: Kasper Buchholtz
 **/

const CallToActionSection = ({ section }) => {
  return (
    <Section 
      variant={clean(section?.design?.color?.color || 'default')}
      id={clean(section?.SectionSettings?.anchor?.current)}
      paddingTop={clean(section?.design?.padding?.spacingTop)}
      paddingBottom={clean(section?.design?.padding?.spacingBottom)}

    >      
      {section?.callToActions.map((cta, index) => (
        <div key={index}
          className={`relative grid overflow-hidden group place-content-center rounded-xl after:pointer-events-none after:transition-all after:duration-500 after:block after:absolute after:z-0 after:top-0 after:right-0 after:h-full after:w-full after:bg-green/80 after:hover:bg-green 
              ${section.callToActions.length === 1 ? 'col-span-full h-screen/1.6' : 'col-span-4 xl:col-span-12 sm:col-span-8 md:col-span-6 h-96'}
              `}
        >
            <div className='absolute inset-0 size-full'>
              <Media data={cta?.MediaObject?.media} />
            </div>

            <div className="relative h-full z-10 w-full space-y-6 text-center md:text-left text-light-0 py-9 md:py-4.5 sm:px-20 md:px-24 px-9">
              <div className="space-y-4 text-center md:text-left">
                <Heading
                  text="balance"
                  spacing="none"
                  type="h3"
                  tag="h3"
                >
                  {cta.heading}
                </Heading>
                <Paragraph size="regular">{cta.subheading}</Paragraph>
              </div>
            </div>
          <Button className='absolute inset-0 z-20 h-full' variant="none" link={cta.link} key={index}>
            <span className='sr-only'>
              {cta.link.label}
            </span>
          </Button>
        </div>
      ))}
    </Section>
  )
}

export default CallToActionSection
