import React from 'react'
import Section from '@/components/sections/Section'
import { TextContainerProps } from '@/types/TextContainerProps'
import InnerBlocks from '../molecules/InnerBlocks'
import { clean } from '~/utils/sanitize'

/**
 *
 * @returns: En tekstcontainer.
 * @example: <TextContainer data={data} /> || <TextContainer data={data} asChild>Children</TextContainer>
 * @alias: TextContainer
 * @summary: Denne komponent bruges til at vise en tekstcontainer.
 * @version: 2.0.0
 * @property: [data, children, asChild]
 * @author: Kasper Buchholtz
 *
 **/

const TextContainer: React.FC<TextContainerProps> = ({
  data,
  asChild = false,
  children,
  paddingX,
  paddingTop,
  paddingBottom,
}) => {
  function placement(data) {
    switch (data?.placement) {
      case 'left':
        return 'col-start-1 -col-end-1 sm:col-start-2 sm:-col-end-2 lg:col-start-1 lg:-col-end-6 xl:col-start-1 xl:-col-end-14 2xl:col-start-1 2xl:-col-end-14'
      case 'center':
        return 'col-start-1 -col-end-1 sm:col-start-2 sm:-col-end-2 lg:col-start-3 lg:-col-end-3 xl:col-start-6 xl:-col-end-6 2xl:col-start-6 2xl:-col-end-6'
      case 'right':
        return 'col-start-1 -col-end-1 sm:col-start-2 sm:-col-end-2 lg:col-start-6 lg:-col-end-1 xl:col-start-12 xl:-col-end-1 2xl:col-start-12 2xl:-col-end-1'
      default:
        return 'col-start-1 -col-end-1 sm:col-start-2 sm:-col-end-2 lg:col-start-3 lg:-col-end-3 xl:col-start-6 xl:-col-end-6 2xl:col-start-6 2xl:-col-end-6'
    }
  }
  return (
    <Section
      data={data}
      paddingX={paddingX}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
    >
      <div className={clean(placement(data))}>
        {asChild ? (
          <div>{children}</div>
        ) : (
          <InnerBlocks index={12} blocks={data?.innerBlocks} />
        )}
      </div>
    </Section>
  )
}

export default TextContainer
