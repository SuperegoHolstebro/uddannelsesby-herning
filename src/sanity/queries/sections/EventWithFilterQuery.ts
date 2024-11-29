import groq from 'groq'
import { ImageQuery } from '../atoms/ImageQuery'

const EventCardQuery = groq`
  title, 
  "slug": slug.current,
  date,
  image {
    ${ImageQuery},
  },
  _type,
  description
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
    ...,
    "events": select(
      ${All},
      ${Manual},
      ${Newest}
    )
  }
`
