'use client'
import React from 'react'
import Image from 'next/image'
import Section from './Section'
import Heading from '@/components/atoms/Heading'
import { clean } from '~/utils/sanitize'
import Symbol from '../atoms/Symbols'
import { motion } from 'framer-motion'
import { FadeUp } from '../interactions/AnimateFadeIn'

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
      className="bg-mørk text-lys pt-52 pr-0 overflow-y-visible overflow-x-clip"
      paddingX="left"
    >
      <div className="col-span-full">
        <Heading
          type="h1"
          tag="h1"
          spacing="none"
          className="pb-8 sm:pb-12 sm:w-1/2"
        >
          {data.title}
        </Heading>

        <div className="relative flex justify-end w-full max-w-3xl pr-0 ml-auto -mb-12 -mr-12 space-x-6 xl:max-w-5xl lg:max-w-4xl ">
          {data.images.map((image, index) => (
            <div className={imageStyles} key={index}>
              <Image
                width={image.width || 800}
                height={image.height || 800}
                objectFit="cover"
                src={image.asset.url || ''}
                alt={image.alt || ''}
                className="object-cover w-full h-full max-h-screen/1.6"
              />
            </div>
          ))}

          <Symbol
            type={data.symbolPickerRight?.icon}
            className="absolute -top-24 right-48"
          />
          <Symbol
            type={data.symbolPickerLeft?.icon}
            className="absolute bottom-24 -left-20"
          />
        </div>
      </div>
    </Section>
  )
}

export default PageTitle
