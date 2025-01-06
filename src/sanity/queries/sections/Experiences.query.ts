import { groq } from 'next-sanity'
import { ImageQuery } from '../atoms/ImageQuery'

const EventCardQuery = groq`
  title, 
  mainImage {
    ${ImageQuery},
  },
  _type,
`
const Manual = groq`
  view == "manual" => experiences[]->{
    ${EventCardQuery}
  }
`
const All = groq`
  view == "all" => *[_type == "experience"] {
    ${EventCardQuery}
  }
`

const Newest = groq`
  view == "newest" => *[_type == "experience"] | order(date desc)[0...(6)]{
    ${EventCardQuery}
  }
`

export const experience_QUERY = groq`
  _type == "experienceType" => {
    amount,
    ...,
    "experiences": select(
      ${All},
      ${Manual},
      ${Newest}
    )
  }
`
