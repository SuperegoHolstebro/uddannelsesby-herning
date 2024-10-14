import groq from 'groq'
import { DesignQuery } from '../atoms/DesignQuery'
import { MediaObjectQuery } from '../molecules/MediaObjectQuery'
export const hero2Query = groq`
_type == "Hero2" => {
  title, 
  _type,
  ${MediaObjectQuery},
  ${DesignQuery},
}
`