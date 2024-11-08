import React from 'react'
import Section from '@/components/sections/Section'
import { TextContainerProps } from '@/types/TextContainerProps'
import { clean } from '@/utils/sanitize'
import Heading from '../atoms/Heading'
import Paragraph from '../atoms/Paragraph'
import Image from 'next/image'

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
      className="bg-mørk text-lys"
    >
      <div className="col-span-full">
        <Heading type="h3" tag="h3">
          {section?.quote}
        </Heading>
        <Heading type="h4" tag="h4">
          {section?.student}
        </Heading>
        <Paragraph>{section?.education}</Paragraph>
      </div>

      <div className="col-span-full">
        <Image src={section?.image} alt={section?.alt} />
      </div>
    </Section>
  )
}

export default Quote
