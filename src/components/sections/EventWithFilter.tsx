'use client'
import React, { useState } from 'react'
import Section from './Section'
import Heading from '../atoms/Heading'
import EventCardFilter from '../molecules/EventCardFilter'
import { clean } from '~/utils/sanitize'

/**
 *
 * @returns: A section displaying events in a grid with a filter.
 * @example: <EventWithFilter />
 * @alias: EventWithFilter
 * @module: components/sections/EventWithFilter
 * @summary: This component displays events in a grid layout with a category filter.
 * @see: src/components/sections/EventWithFilter.tsx
 * @version: 1.0.0
 * @author: Emilie Hjøllund
 *
 **/

const sanitizeString = (str: string) => {
  return str.replace(/[^\x20-\x7E]/g, '')
}

const EventWithFilter = ({ section }) => {
  const { events } = section

  return (
    <Section>
      {/* Filter */}
      <div className="col-span-full"></div>
      {/* cards */}
      <div className="col-span-full">
        <Section tag={'ul'} paddingX="none">
          {clean(section.view) === 'all' && (
            <>
              {section.events.map((event, index) => (
                <EventCardFilter key={index} event={event} />
              ))}
            </>
          )}
        </Section>
      </div>
    </Section>
  )
}

export default EventWithFilter
