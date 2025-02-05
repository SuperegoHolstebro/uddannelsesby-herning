import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Heading from '@/components/atoms/Heading'
import { urlFor } from '~/sanity/lib/sanity.image'
import { resolveHref, resolveHrefLang } from '~/sanity/lib/sanity.links'
import { formatNumberDate } from '~/utils/date'
import { formatPrice } from '~/utils/price'
import Badge from '../atoms/badge'
import Photo from '../atoms/Photo'

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

const EventCardFilter = ({ event, locale }) => {
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
    <li className="relative group col-span-full sm:col-span-4 xl:col-span-8  border-b-grå border-b pb-6 mb-6">
      <Link
        className={`flex flex-col h-full w-full group ${event.isFull === true ? 'opacity-50' : ''}`}
        href={resolveHrefLang(locale, event?._type, event?.slug)}
        title={event.name}
      >
        <EventCardFilterPortrait locale={locale} data={event} />
        <EventCardFilterInfo data={event} locale={locale} />
      </Link>
    </li>
  )
}
export default EventCardFilter

function EventCardFilterPortrait({ data, locale }) {
  return (
    <div className="relative object-cover w-full overflow-hidden">
      {data.image && (
        <div className="transition-all aspect-w-4 aspect-h-3 ease-custom duration-735 group-hover:scale-110">
          <Photo image={data.image} objectFit="cover" />
        </div>
      )}
      {/* maxAttendees match the attendeeCount */}
      {data.isFull == true && (
        <div className="absolute inset-0 size-full">
          <span className="absolute p-2 leading-none translate-x-1/2 -translate-y-1/2 rounded-full whitespace-nowrap top-1/2 right-1/2 bg-signal-gul">
            {locale === 'da' ? 'IKKE FLERE BILLETTER' : 'NO MORE TICKETS'}
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
function EventCardFilterInfo({ data, locale }) {
  return (
    <>
      {data.title && (
        <Heading spacing="none" type="h4" tag="h4" className="my-4">
          {data.title}
        </Heading>
      )}
      {data.category && (
        <>
          <Badge className="block mt-auto" variant="dark">
            {locale === 'da'
              ? data?.category?.title
              : data?.category?.titleEnglish}
          </Badge>
        </>
      )}
    </>
  )
}
