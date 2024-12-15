import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Heading from '@/components/atoms/Heading'
import { urlFor } from '~/sanity/lib/sanity.image'
import { resolveHref } from '~/sanity/lib/sanity.links'
import { formatNumberDate } from '~/utils/date'
import { formatPrice } from '~/utils/price'
import Badge from '../atoms/badge'

/**
 *
 * @returns: En eventCard komponent
 * @example: <eventCard />
 * @alias: eventCard
 * @summary: Denne komponent bruges til at vise information om en virksomhed.
 * @version: 1.0.0
 * @property: [event]
 * @author: Emilie Hjøllund
 *
 **/

const EventCardFilter = ({ event }) => {
  const maxAttendees = event.maxAttendees || 0
  const bookedTickets =
    event.attendees?.reduce(
      (
        sum,
        attendee: {
          name: string
          email: string
          phone: string
          school: string
          numberOfTickets: number
        },
      ) => sum + (attendee.numberOfTickets || 0),
      0,
    ) || 0
  const ticketsLeft = maxAttendees - bookedTickets

  return (
    <div className="relative col-span-full sm:col-span-4 xl:col-span-8  border-b-grå border-b pb-6 mb-6">
      <Link
        className={`block w-full group ${event.isFull === true ? 'opacity-50' : ''}`}
        href={resolveHref(event._type, event.slug)}
        title={event.name}
      >
        <EventCardFilterPortrait data={event} />
        <EventCardFilterInfo data={event} />
      </Link>
    </div>
  )
}
export default EventCardFilter

function EventCardFilterPortrait({ data }) {
  return (
    <div className="relative object-cover w-full overflow-hidden">
      {data.image && (
        <div className="aspect-w-4 aspect-h-3">
          <Image
            className="object-cover transition-all ease-custom duration-735 group-hover:scale-110 group-focus-within:scale-110"
            src={urlFor(data.image).dpr(2).url()}
            alt={data.altText || 'Billede af ' + data.title}
            width={1920}
            height={1080}
            placeholder="blur"
            blurDataURL={urlFor(data.image).width(24).height(24).blur(10).url()}
            sizes="
            (max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            40vw"
          />
        </div>
      )}
      {/* maxAttendees match the attendeeCount */}
      {data.isFull == true && (
        <div className="absolute inset-0 size-full">
          <span className="absolute p-2 leading-none translate-x-1/2 -translate-y-1/2 rounded-full whitespace-nowrap top-1/2 right-1/2 bg-signal-gul">
            IKKE FLERE BILLETTER
          </span>
        </div>
      )}
      {data?.date.startDate && (
        <Badge variant="pink" className="absolute left-3 top-3">
          <time>{formatNumberDate(data.date.startDate)}</time>
        </Badge>
      )}
      <Badge variant="pink" className="absolute right-3 top-3">
        {formatPrice(data.price)}
      </Badge>
    </div>
  )
}
function EventCardFilterInfo({ data }) {
  return (
    <div className="mt-4 space-y-5">
      {data.title && (
        <Heading spacing="none" type="h4" tag="h4">
          {data.title}
        </Heading>
      )}
      {data.category && (
        <>
          <Badge className="block" variant="dark">
            {data?.category?.title}
          </Badge>
        </>
      )}
    </div>
  )
}
