import groq from 'groq'
import { ImageQuery } from '../atoms/ImageQuery'

const EventCardQuery = groq`
  title,
  category->{
    title,
  },
  "slug": slug.current,
  "date": {
    startDate,
    isMultiDay,
    endDate
  },
  _type,
  maxAttendees,
  isFull,
  location,
  price,
  isExternal,
  image {
    ${ImageQuery},
  },
  "attendeeCount": count(attendees),
  "totalTickets": count(attendees[].numberOfTickets[]),
`
const Manual = groq`
  view == "manual" => events[]->{
    ${EventCardQuery}
  }
`
const All = groq`
  view == "all" => *[_type == "event"] {
    ${EventCardQuery}
  }
`
const Newest = groq`
  view == "newest" => *[_type == "event"] | order(date desc)[0...(6)]{
    ${EventCardQuery}
  }
`

export const EventWithFilterQuery = groq`
_type == "EventWithFilterType" => {
  amount,
  "categoriesInUse": *[_type == "event" && defined(category)] {
    "category": category->.title,
    "icon": category->.icon.icon
  } | order(category asc),
  ...,
  "events": select(
    ${All}[date.startDate > now()] | order(date.startDate asc),
    ${Manual}[date.startDate > now()] | order(date.startDate asc),
    ${Newest}[date.startDate > now()] | order(date.startDate asc)
  )
}


`
