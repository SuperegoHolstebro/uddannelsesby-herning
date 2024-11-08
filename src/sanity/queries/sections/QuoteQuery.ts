import { groq } from 'next-sanity'
import { ImageQuery } from '@/sanity/queries/atoms/ImageQuery'

export const QUOTE_QUERY = groq`
  _type == "Quote" => {
   ...,
   quote,
    student,
    education,
    "image": {
        ${ImageQuery}
      }
  }
`
