import React from 'react'
import Section from './Section'
import Heading from '../atoms/Heading'
import EventCard from '../molecules/EventCard'
import Carousel from '../organisms/Carousel'
import { clean } from '~/utils/sanitize'
/**
 *
 * @returns: En sektion med events.
 * @example: <EventSection />
 * @alias: EventSection
 * @module: components/sections/EventSection
 * @summary: Denne komponent bruges til at vise en sektion med events.
 * @see: src/components/sections/EventSection.tsx
 * @version: 1.0.0
 * @property: [section, amount]
 * @author: Emilie Hjøllund
 *
 **/

const sanitizeString = (str) => {
  return str.replace(/[^\x20-\x7E]/g, '')
}

const EventSection = ({ section, amount }) => {
  const { events } = section
  return (
    <>
      <Section
        paddingX="none"
        paddingTop={clean(section?.design?.padding?.spacingTop) || 'default'}
        paddingBottom={
          clean(section?.design?.padding?.spacingBottom) || 'default'
        }
        className={`relative overflow-hidden 
        ${clean(section?.design?.color?.color) === 'mørk' ? 'text-lys' : ''}`}
      >
        {clean(section?.design?.color?.color) === 'lys' ? (
          <div className="absolute bottom-0 right-0 w-full bg-lys col-span-full h-2/3" />
        ) : clean(section?.design?.color?.color) === 'mørk' ? (
          <div className="bg-mørk col-span-full h-3/5 absolute bottom-0 right-0 w-full" />
        ) : clean(section?.design?.color?.color) == 'lilla' ? (
          <div className="absolute bottom-0 right-0 w-full bg-signal-pink col-span-full h-2/3" />
        ) : (
          <div className="absolute bottom-0 right-0 w-full bg-signal-gul col-span-full h-2/3" />
        )}
        <Carousel
          slidesPerView={1.2}
          spaceBetween={32}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 1.1,
              spaceBetween: 16,
            },
            428: {
              slidesPerView: 1.08,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3.3,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 3.6,
              spaceBetween: 24,
            },
            1440: {
              slidesPerView: 3.9,
              spaceBetween: 24,
            },
            1920: {
              slidesPerView: 3.9,
              spaceBetween: 24,
            },
            2500: {
              slidesPerView: 4.7,
              spaceBetween: 24,
            },
          }}
        >
          <EventSection.All section={section} />
        </Carousel>
        <EventSection.Manual section={section} />
        <EventSection.Newest section={section} />
      </Section>
    </>
  )
}

export default EventSection

EventSection.Title = Title
EventSection.All = All
EventSection.Manual = Manual
EventSection.Newest = Newest

function Newest({ section }) {
  return (
    <>
      {clean(section.view) === 'newest' && (
        <>
          {section.events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </>
      )}
    </>
  )
}

function Manual({ section }) {
  return (
    <>
      {clean(section.view) === 'manual' && (
        <>
          {section.events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </>
      )}
    </>
  )
}

function All({ section }) {
  return (
    <>
      {clean(section.view) === 'all' && (
        <>
          {section.events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </>
      )}
    </>
  )
}

function Title({ section }) {
  return (
    <div className="col-span-full">
      <Heading size="h2">{section.heading}</Heading>
    </div>
  )
}
