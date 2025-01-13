import React from 'react'
import Photo from '../atoms/Photo'
import Section from './Section'

const LogoBand = ({ data }) => {
  return (
    <Section paddingBottom="none" paddingTop="none" className="bg-grå">
      <div className="grid grid-cols-1 gap-3 md:gap-8 xs:grid-cols-1 md:grid-cols-3 col-span-full ">
        {data.logos.map((logo, index) => (
          <div
            key={index}
            className="w-full aspect-w-16 aspect-h-3 md:aspect-h-10 lg:aspect-h-7 2xl:aspect-h-5"
          >
            <Photo
              objectFit="contain"
              image={logo}
              className="mx-auto max-w-52 md:max-w-64"
            />
          </div>
        ))}
      </div>
    </Section>
  )
}

export default LogoBand
