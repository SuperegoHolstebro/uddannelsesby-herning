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
      paddingTop={clean(section?.design?.padding?.spacingTop) || 'none'}
      paddingBottom={clean(section?.design?.padding?.spacingBottom) || 'none'}
      className="bg-mørk text-lys relative"
      paddingX="left"
    >
      <div className="grid gap-4 grid-cols-24 col-span-full">
        {/* Image in the last 12 columns */}
        <div className="relative col-span-12 col-start-13 row-start-1 row-end-1">
          <Media data={section.MediaObject?.media} />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-mørk/50 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-mørk/20 z-10"></div>
        </div>

        {/* Quote in columns 4 to 14, overlapping the image slightly */}
        <div className="relative z-10 col-start-4 row-start-1 row-end-1 my-auto text-right bg-opacity-75 col-end-14">
          <Heading type="h3" tag="h3" className="text-2xl font-bold">
            {section?.quote}
          </Heading>
          <div className="mt-4">
            <Heading type="h4" tag="h4" className="text-lg font-semibold">
              {section?.student}
            </Heading>
            <Paragraph className="text-sm">{section?.education}</Paragraph>
          </div>
        </div>

        {/* Button */}
        <div className="col-start-4 mt-auto -col-end-1 text-left row-start-1 row-end-1 pb-12 bg-mørk/50">
          <Button link={section?.link} variant={'secondary'}>
            {section?.link?.label}
          </Button>
        </div>
      </div>
    </Section>
  )
}

export default Quote
