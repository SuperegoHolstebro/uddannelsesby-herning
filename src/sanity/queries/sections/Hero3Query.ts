import groq from 'groq'
import { DesignQuery } from '../atoms/DesignQuery'
import { MediaObjectQuery } from '../molecules/MediaObjectQuery'
export const hero3Query = groq`
_type == "Hero3" => {
  title, 
  subtitle,
  _type,
  ${MediaObjectQuery},
  ${DesignQuery},
}
`