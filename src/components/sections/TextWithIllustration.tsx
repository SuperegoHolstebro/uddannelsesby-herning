import React from 'react'
import InnerBlocks from '@/components/molecules/InnerBlocks'
import Section from '@/components/sections/Section'
import { TextAndImageProps } from '@/types/TextWithIllustrationProps'
import Media from '@/components/organisms/Media'
import { clean } from '~/utils/sanitize'

/**
 *
 * @returns: En sektion med tekst og illustration.
 * @example: <TextWithIllustration />
 * @alias: TextWithIllustration
 * @module: components/sections/TextWithIllustration
 * @summary: Denne komponent bruges til at vise en sektion med tekst og illustration.
 * @see: src/components/sections/TextWithIllustration.tsx
 * @version: 1.0.0
 * @property: [data]
 * @todo: implementer bedre håndtering af innerBlocks
 * @author: Kasper Buchholtz
 *
 **/
const TextWithIllustration = ({
  data,
  popup,
  flip = false,
}: TextAndImageProps) => {
  const marginOne =
    '-mx-4 md:-mr-3 md:mx-0 md:-ml-24 md:-mt-16 md:-mb-20 2xl:-ml-52 xl:-ml-36 '
  const marginTwo =
    '-mx-4 md:mx-0 md:-mr-24 md:-mt-16 md:-mb-20 md:-ml-3 xl:-mr-36 2xl:-mr-52'
  return (
    <>
      {data?.flip ? (
        <Section
          id={clean(data?.SectionSettings?.anchor?.current)}
          paddingTop={clean(data.design.padding.spacingTop)}
          paddingBottom={clean(data.design.padding.spacingBottom)}
          className="overflow-hidden"
          variant={clean(data?.design?.color?.color)}
        >
          <div
            className={`${marginOne} relative h-screen/2 md:h-screen/1.6 block col-start-1 -col-end-1 md:col-start-1 md:flex md:-col-end-7 xl:col-start-1 xl:col-end-13 2xl:col-start-1 2xl:col-end-13  ${flip ? '' : ''}`}
          >
            <Media popup data={data?.MediaObject?.media} />
          </div>
          <div className="col-start-1 -col-end-1 md:-col-start-1 md:flex md:col-end-8 lg:-col-start-1 xl:-col-end-12 ">
            <InnerBlocks blocks={data.innerBlocks} />
            {JSON.stringify(data, null, 2)}
          </div>
        </Section>
      ) : (
        <Section
          id={clean(data?.SectionSettings?.anchor?.current)}
          paddingTop={clean(data.design.padding.spacingTop)}
          paddingBottom={clean(data.design.padding.spacingBottom)}
          className="overflow-hidden"
          variant={data?.design?.color?.color}
        >
          <div
            className={` ${marginTwo} relative h-screen/2 md:h-screen/1.6 block col-start-1 -col-end-1 md:-col-start-1 md:flex md:col-end-7 xl:-col-start-1 xl:-col-end-13 2xl:-col-start-1 2xl:-col-end-13 ${flip ? 'md:flex-row-reverse' : ''}`}
          >
            <Media popup data={data?.MediaObject?.media} />
          </div>
          <div className="col-start-1 -col-end-1 md:col-start-1 md:row-start-1 md:flex md:col-end-6 lg:col-start-1 xl:col-end-12">
            <InnerBlocks blocks={data.innerBlocks} />
          </div>
        </Section>
      )}
    </>
  )
}

export default TextWithIllustration
