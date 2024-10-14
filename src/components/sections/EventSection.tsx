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
 * @author: Kasper Buchholtz
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
        paddingTop={clean(section?.design?.padding?.spacingTop) || 'default'}
        paddingBottom={clean(section?.design?.padding?.spacingBottom) || 'default'}
        variant={clean(section?.design?.color?.color)}
      >
        {section.design.padding.spacingBottom}
        <EventSection.Title section={section} />
        <div className="grid grid-cols-4 gap-4 col-span-full xs:grid-cols-4 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-24 2xl:grid-cols-24 xs:gap-4 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-6 2xl:gap-6">
          <EventSection.All section={section} />
          <EventSection.Manual section={section} />
          <EventSection.Newest section={section} />
        </div>
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
      <Heading size="h2">
        {section.heading}
      </Heading>
    </div>
  )
}
