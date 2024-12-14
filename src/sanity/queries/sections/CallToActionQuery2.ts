import groq from 'groq'
import { DesignQuery } from '@/sanity/queries/atoms/DesignQuery'
import { MediaObjectQuery } from '@/sanity/queries/molecules/MediaObjectQuery'
import { ButtonQuery } from '../atoms/ButtonQuery'
export const CallToActionQuery2 = groq`
  _type == 'CallToAction2' => {
    ...,
    ${ButtonQuery},
    ${DesignQuery},
    ${MediaObjectQuery},
  }
`
