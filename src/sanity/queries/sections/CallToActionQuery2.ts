import groq from 'groq'
import { DesignQuery } from '@/sanity/queries/atoms/DesignQuery'
import { MediaObjectQuery } from '@/sanity/queries/molecules/MediaObjectQuery'
export const CallToActionQuery2 = groq`
  _type == 'CallToAction2' => {
    ...,
      links[] {

    url,
    "url": internalLink->slug.current,
    blank,
    _type,
    label,
    type,
  },
    ${DesignQuery},
    ${MediaObjectQuery},
  }
`
