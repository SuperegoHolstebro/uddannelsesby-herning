'use client'
import React from 'react'
import Image from 'next/image'
import Section from './Section'
import Heading from '@/components/atoms/Heading'
import { clean } from '~/utils/sanitize'
import Symbol from '../atoms/Symbols'
import { FadeUp } from '../interactions/AnimateFadeIn'
import Photo from '../atoms/Photo'

/**
 *
 * @returns: En Page Title.
 * @example: <PageTitle />
 * @alias: PageTitle
 * @module: components/sections/PageTitle
 * @summary: Denne komponent bruges som side titel.
 * @see: src/components/sections/PageTitle.tsx
 * @version: 1.0.0
 * @property: [data]
 * @author: Emilie Hjøllund
 *
 **/

const PageTitle = ({ data }) => {
  const imageStyles =
    data.images.length === 1
      ? 'w-full aspect-w-16 aspect-h-5'
      : data.images.length === 2
        ? 'w-full  aspect-w-6 aspect-h-2'
        : 'w-full aspect-1'

  return (
    <Section
      id={clean(data?.SectionSettings?.anchor?.current)}
      paddingTop="none"
      paddingBottom="none"
      className="bg-mørk text-lys pt-36 pb-0 sm:pt-44 pr-0 overflow-y-visible overflow-x-clip min-h-[90vh] md:min-h-max"
      paddingX="left"
    >
      <div className="flex flex-col justify-center col-start-1 md:col-start-2 -col-end-1 md:block">
        <div className="w-full pb-8 mt-auto sm:pb-12 sm:w-2/3 md:w-1/2 md:mt-0">
          <FadeUp delay={0.25}>
            <Heading
              type="h1"
              tag="h1"
              spacing="none"
              dangerouslySetInnerHTML={{ __html: data.title }}
            />
          </FadeUp>
        </div>

        <div className=" min-h-52 md:min-h-max mt-auto md:mt-0 relative w-full flex justify-start h-[inherit] md:h-auto max-w-3xl pr-0 ml-auto -mb-12 -mr-6 space-x-4 xs:-mr-12  sm:w-full flex-nowrap sm:h-auto sm:justify-end md:space-x-6 xl:max-w-6xl lg:max-w-4xl ">
          {data.images.map((image, index) => (
            <div
              className={`${imageStyles}  overflow-x-clip *:size-full`}
              key={index}
            >
              <FadeUp delay={index * 0.25}>
                <Photo className="shadow-lg" image={image} objectFit="cover" />
              </FadeUp>
            </div>
          ))}
          <span className="absolute right-0 -top-3/4 xs:right-5 sm:-top-24 sm:right-4 md:right-48">
            <FadeUp delay={0.625}>
              <Symbol
                type={data.symbolPickerRight?.icon}
                className="size-28 sm:size-36 md:size-44 opacity-30 md:opacity-100"
              />
            </FadeUp>
          </span>
          <span className="absolute bottom-40 opacity-30 md:opacity-100 -left-4 xs:bottom-40 xs:-left-12 md:-left-20">
            <FadeUp delay={0.725}>
              <Symbol
                type={data.symbolPickerLeft?.icon}
                className="size-20 sm:size-36 md:size-44"
              />
            </FadeUp>
          </span>
        </div>
      </div>
    </Section>
  )
}

export default PageTitle
