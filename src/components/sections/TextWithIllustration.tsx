import React from 'react'
import InnerBlocks from '@/components/molecules/InnerBlocks'
import Section from '@/components/sections/Section'
import { TextAndCollageProps } from '@/types/TextWithIllustrationProps'
import Media from '@/components/organisms/Media'
import { clean } from '~/utils/sanitize'
import Symbol from '../atoms/Symbols'
import { FadeUp } from '../interactions/AnimateFadeIn'

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
const TextWithIllustration = ({ data, popup }: TextAndCollageProps) => {
  return (
    <Section
      id={clean(data?.SectionSettings?.anchor?.current)}
      paddingTop={clean(data.design.padding.spacingTop)}
      paddingBottom={'default'}
      className="overflow-hidden"
      variant={clean(data?.design?.color?.color)}
    >
      <div className="-mx-4 md:-mr-3 md:mx-0 md:-ml-24 md:-mt-16 md:-mb-20 2xl:-ml-52 xl:-ml-36 relative h-screen/2 md:h-screen/1.6 block col-start-1 -col-end-1 md:col-start-1 md:flex md:-col-end-7 xl:col-start-1 xl:col-end-11 2xl:col-start-1 2xl:col-end-13">
        {/* Large image container */}
        <div className="relative w-full h-full">
          {data?.MediaObject?.media && (
            <Media popup data={data?.MediaObject?.media} />
          )}
          {/* Small image overlay in the bottom-right corner */}
          <div className="absolute -bottom-8 -right-16">
            <FadeUp delay={0.325}>
              {data.SmallMediaObject?.media && (
                <div className="*:hidden *:md:block size-64 shadow-none md:shadow-lg">
                  <Media data={data?.SmallMediaObject?.media} />
                </div>
              )}
            </FadeUp>
            <div className="absolute !block -bottom-4 md:-bottom-16 left-12 md:-left-16">
              <FadeUp delay={0.625}>
                <Symbol
                  type={data.symbolPicker?.icon}
                  className="my-auto mt-auto size-36 md:size-40"
                />
              </FadeUp>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col justify-center col-start-1 pt-10 md:pt-0 -col-end-1 md:-col-start-1 md:flex md:col-end-8 lg:-col-start-1 xl:-col-end-12 ">
        <InnerBlocks blocks={data.innerBlocks} index={0} />
      </div>
    </Section>
  )
}

export default TextWithIllustration
