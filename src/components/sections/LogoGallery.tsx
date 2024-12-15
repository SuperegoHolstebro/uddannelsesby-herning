import React from 'react'
import Image from 'next/image'
import Section from './Section'
import Heading from '@/components/atoms/Heading'
import { clean } from '~/utils/sanitize'
import Photo from '../atoms/Photo'

/**
 *
 * @returns: En sektion med en logo galleri.
 * @example: <LogoGallery />
 * @alias: LogoGallery
 * @module: components/sections/LogoGallery
 * @summary: Denne komponent bruges til at vise et galleri med logoer
 * @see: src/components/sections/LogoGallery.tsx
 * @version: 1.0.0
 * @property: [data]
 * @author: Emilie Hjøllund
 *
 **/

const LogoGallery = ({ data }) => {
  return (
    <Section
      id={clean(data?.SectionSettings?.anchor?.current)}
      paddingTop={clean(data?.design?.padding?.spacingTop)}
      paddingBottom={clean(data?.design?.padding?.spacingBottom)}
      className="bg-green"
    >
      <div className="col-span-full">
        <Heading size="h2" className="mb-4">
          {data.title}
        </Heading>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 bg-white shadow-lg col-span-full sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 md:p-12 md:flex-row rounded-2xl">
        {data.images.map((image, index) => (
          <div className="aspect-w-7 aspect-h-5" key={index}>
            <Photo image={image} objectFit="contain" />
          </div>
        ))}
      </div>
    </Section>
  )
}

export default LogoGallery
