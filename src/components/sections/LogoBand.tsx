import React from 'react'
import Photo from '../atoms/Photo'
import Section from './Section'

const LogoBand = ({ data }) => {
  return (
    <Section paddingBottom="none" paddingTop="none" className="bg-grå">
      <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-4 col-span-full ">
        {data.logos.map((logo, index) => (
          <div key={index} className="w-full aspect-w-16 aspect-h-9">
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
