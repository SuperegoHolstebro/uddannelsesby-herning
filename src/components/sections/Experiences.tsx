'use client'
import React, { useState } from 'react'
import Section from './Section'
import Heading from '../atoms/Heading'
import EventCard from '../molecules/EventCard'
import Carousel from '../organisms/Carousel'
import { clean } from '~/utils/sanitize'
import ExperienceCard from '../molecules/ExperienceCard'
/**
 *
 * @returns: En sektion med oplevelser.
 * @example: <Experiences />
 * @alias: Experiences
 * @module: components/sections/Experiences
 * @summary: Denne komponent bruges til at vise en sektion med Oplevelser.
 * @see: src/components/sections/Experiences.tsx
 * @version: 1.0.0
 * @property: [section, amount]
 * @author: Emilie Hjøllund
 *
 **/

const Experiences = ({ section, amount }) => {
  const { experiences } = section
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <Section
      paddingX="none"
      paddingTop={clean(section?.design?.padding?.spacingTop) || 'default'}
      paddingBottom={
        clean(section?.design?.padding?.spacingBottom) || 'default'
      }
      className="relative"
    >
      {clean(section?.design?.color?.color) === 'lys' ? (
        <div className="absolute bottom-0 right-0 hidden w-full bg-lys md:block col-span-full h-2/3" />
      ) : clean(section?.design?.color?.color) === 'mørk' ? (
        <div className="bg-mørk col-span-full h-3/5 hidden md:block absolute bottom-0 right-0 w-full" />
      ) : clean(section?.design?.color?.color) == 'lilla' ? (
        <div className="absolute bottom-0 right-0 hidden w-full md:block bg-signal-pink col-span-full h-2/3" />
      ) : (
        <div className="absolute bottom-0 hidden md:block right-0 w-full bg-mørk col-span-full h-2/3" />
      )}
      <div className="col-span-full px-4 xs:px-4 sm:px-13 md:pr-24 md:pl-[10rem] lg:pr-19 lg:pl-[9.5rem] xl:pl-[200px]">
        <Heading
          className="lg:max-w-[22ch]"
          tag="h2"
          type="h2"
          dangerouslySetInnerHTML={{ __html: section.heading }}
        />
      </div>
      <Carousel
        slidesPerView={1.2}
        spaceBetween={32}
        loop={experiences.length > 5}
        hideNavigation={activeIndex !== null} // Modify this line to hide navigation when hover
        breakpoints={{
          0: { slidesPerView: 1.5, spaceBetween: 16 },
          428: { slidesPerView: 1.5, spaceBetween: 20 },
          768: { slidesPerView: 2.5, spaceBetween: 20 },
          1024: { slidesPerView: 3.3, spaceBetween: 24 },
          1280: { slidesPerView: 3.6, spaceBetween: 24 },
          1440: { slidesPerView: 4.9, spaceBetween: 24 },
          1920: { slidesPerView: 4.9, spaceBetween: 24 },
          2500: { slidesPerView: 4.7, spaceBetween: 24 },
        }}
      >
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={index}
            experience={experience}
            isActive={activeIndex === index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            isAnyActive={activeIndex !== null}
          />
        ))}
      </Carousel>
    </Section>
  )
}

export default Experiences
