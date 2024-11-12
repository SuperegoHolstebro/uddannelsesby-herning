import groq from 'groq'
import { ImageQuery } from '../atoms/ImageQuery'
export const PAGETITLE_QUERY = groq`
    _type == 'PageTitle' => {
    ...,
    images[]{
      ${ImageQuery}
    },
  }`
