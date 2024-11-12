import React from 'react'
import Image from 'next/image'
import Section from './Section'
import Heading from '@/components/atoms/Heading'
import { clean } from '~/utils/sanitize'

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
  return (
    <Section
      id={clean(data?.SectionSettings?.anchor?.current)}
      paddingTop="none"
      paddingBottom="none"
      className="bg-mørk text-lys pt-52 pr-0"
      paddingX="left"
    >
      <div className="col-span-full">
        <Heading type="h1" tag="h1" spacing="none" className="w-1/2 pb-12">
          {data.title}
        </Heading>
        <div className="flex justify-end pr-0 -mb-12 -mr-12 space-x-6">
          {data.images.map((image, index) => (
            <div className=" w-96 h-96" key={index}>
              <Image
                width={image.width || 800}
                height={image.height || 800}
                key={index}
                objectFit="cover"
                src={image.asset.url || ''}
                alt={image.alt || ''}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default PageTitle
