import React from 'react'
import Carousel from '../organisms/Carousel'
import Section from './Section'
import Photo from '../atoms/Photo'

/**
 *
 * @returns: En sektion med galleri.
 * @example: <GallerySection />
 * @alias: GallerySection
 * @module: components/sections/GallerySection
 * @summary: Denne komponent bruges til at oprette en ny sektion med galleri.
 * @see: src/components/sections/GallerySection.tsx
 * @version: 1.0.0
 * @property: [section]
 * @author: Kasper Buchholtz
 *
 **/

const GallerySection = ({ section }) => {
  return (
    <Section paddingX="left">
      <Carousel
        slidesPerView={1.2}
        spaceBetween={32}
        loop={true}
        breakpoints={{
          428: {
            slidesPerView: 1.08,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 32,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1440: {
            slidesPerView: 2.5,
            spaceBetween: 24,
          },
          1920: {
            slidesPerView: 2.2,
            spaceBetween: 24,
          },
          2500: {
            slidesPerView: 2.5,
            spaceBetween: 24,
          },
        }}
      >
        {section.images.map((image, index) => (
          <div key={index} className="aspect-w-16 aspect-h-12">
            <Photo image={image} objectFit="cover" />
          </div>
        ))}
      </Carousel>
    </Section>
  )
}

export default GallerySection
