import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Heading from '@/components/atoms/Heading'
import Paragraph from '@/components/atoms/Paragraph'
import { resolveHref } from '@/sanity/lib/sanity.links'
import { formatDateToNumber } from '@/utils/date'
import { urlFor } from '~/sanity/lib/sanity.image'
import { formatPrice } from '~/utils/price'
import { AnimatePresence, motion } from 'framer-motion'
import Photo from '../atoms/Photo'

/**
 *
 * @returns: En event card, der viser information om en begivenhed.
 * @example: <EventCard />
 * @alias: EventCard
 * @module: components/atoms/EventCard
 * @summary: Denne komponent bruges til at vise information om en begivenhed.
 * @see: src/components/atoms/EventCard.tsx
 * @version: 1.0.0
 * @property: [event]
 * @author: Kasper Buchholtz
 **/

const EventCard = ({
  event,
  isActive,
  onMouseEnter,
  onMouseLeave,
  isAnyActive,
}) => {
  return (
    <Link
      key={event?._key}
      className={` group/event-card relative block event-card-item w-full overflow-hidden transition-all ease-custom duration-735 ${isActive ? 'scale-110 z-10' : 'scale-100'}`}
      href={resolveHref(event._type, event.slug) || '#'}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="h-fit isolation-auto">
        <EventCard.Portrait event={event} />
        <EventCard.Content
          event={event}
          isActive={isActive}
          isAnyActive={isAnyActive}
        />
      </div>
    </Link>
  )
}

export default EventCard

EventCard.Portrait = Portrait
EventCard.Content = Content

function Portrait({ event }) {
  return (
    <div className="aspect-w-5 md:aspect-w-4 aspect-h-6">
      {event.image ? (
        <Photo image={event.image} objectFit="cover" />
      ) : (
        <img
          className="object-cover"
          src="./placeholder.svg"
          alt={event.title}
        />
      )}
    </div>
  )
}

function Content({ event, isActive, isAnyActive }) {
  return (
    <div className="pt-8 space-y-4 ">
      <Heading
        text="wrap"
        type="h4"
        tag="h4"
        spacing="none"
        clamp={3}
        className={`${isAnyActive && !isActive ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 group-hover/event-card:text-signal-pink`}
      >
        {event?.title}
      </Heading>

      <AnimatePresence presenceAffectsLayout>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.86, 0, 0.07, 1] }}
            className="flex items-center justify-between transition-opacity duration-300 opacity-100"
          >
            <Heading spacing="none" tag="p" type="h4">
              {formatDateToNumber(event.startDate)}
            </Heading>
            <Heading spacing="none" tag="p" type="h4">
              {formatPrice(Number(event.price))}
            </Heading>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
