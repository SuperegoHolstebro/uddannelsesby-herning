import groq from 'groq'
import { ImageQuery } from '../atoms/ImageQuery'
import { ButtonQuery } from '../atoms/ButtonQuery'

const EventCardQuery = groq`
  title, 
  "slug": slug.current,
  startDate,
  image {
    ${ImageQuery},
  },
  category->{
    title,
  },
  _type,
  price
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

export const EventTypeQuery = groq`
  _type == "EventType" => {
    amount,
    ...,
    ${ButtonQuery},
    "events": select(
      ${All},
      ${Manual},
      ${Newest}
    )
  }
`
