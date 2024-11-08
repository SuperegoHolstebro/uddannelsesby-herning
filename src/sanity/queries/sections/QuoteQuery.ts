import { groq } from 'next-sanity'
import { MediaObjectQuery } from '@/sanity/queries/molecules/MediaObjectQuery'

export const QUOTE_QUERY = groq`
  _type == "Quote" => {
   ...,
   quote,
    student,
    education,
    ${MediaObjectQuery},
    
  }
`
