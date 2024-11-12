import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Heading from '@/components/atoms/Heading'
import Paragraph from '@/components/atoms/Paragraph'
import { resolveHref } from '@/sanity/lib/sanity.links'
import { formatDate } from '@/utils/date'
import { urlFor } from '~/sanity/lib/sanity.image'

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

const EventCard = ({ event }) => {
  return (
    <>
      <div
        key={event?._key}
        className="relative overflow-hidden transition-all ease-in-out scale-100 h-fit event-card-item hover:scale-125 group isolation-auto"
      >
        <Link className="" href={resolveHref(event._type, event.slug) || '#'}>
          <EventCard.Portrait event={event} />
          <EventCard.Content event={event} />
        </Link>
      </div>
    </>
  )
}

export default EventCard

EventCard.Portrait = Portrait
EventCard.Content = Content

function Portrait({ event }) {
  return (
    <div className="aspect-w-4 aspect-h-6">
      {event.image && (
        <Image
          className="object-cover"
          src={urlFor(event.image).dpr(2).url()}
          alt={event.altText || 'Billede af ' + event.title}
          width={1920}
          height={1080}
          placeholder="blur"
          blurDataURL={urlFor(event.image).width(24).height(24).blur(10).url()}
          sizes="
                  (max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  40vw"
        />
      )}
    </div>
  )
}

function Content({ event }) {
  return (
    <div className="pt-8 ">
      <Heading text="wrap" type="h4" tag="h4" spacing="none" clamp={3}>
        {event?.title}
      </Heading>
      {event?.date && (
        <div className="text-green">
          <Paragraph>{formatDate(event.date)}</Paragraph>
        </div>
      )}
    </div>
  )
}
