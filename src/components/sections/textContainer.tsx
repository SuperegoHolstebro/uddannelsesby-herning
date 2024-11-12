import React from 'react'
import Section from '@/components/sections/Section'
import { TextContainerProps } from '@/types/TextContainerProps'
import { clean } from '@/utils/sanitize'
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
 
 * @author: Kasper Buchholtz
 *
**/

const TextContainer: React.FC<TextContainerProps> = ({
  variant,
  children,
  section,
}) => {
  return (
    <Section
      variant={variant}
      paddingTop={clean(section?.design?.padding?.spacingTop) || 'default'}
      paddingBottom={
        clean(section?.design?.padding?.spacingBottom) || 'default'
      }
    >
      <div className="col-start-1 -col-end-1 sm:col-start-2 sm:-col-end-2 lg:col-start-3 lg:-col-end-3 xl:col-start-6 xl:-col-end-6 2xl:col-start-6 2xl:-col-end-6">
        {children}
      </div>
    </Section>
  )
}

export default TextContainer
