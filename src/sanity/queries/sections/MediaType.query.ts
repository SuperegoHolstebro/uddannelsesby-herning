import groq from 'groq'
import { MediaObjectQuery } from '../molecules/MediaObjectQuery'

export const MediaTypeQuery = groq`
 _type == "MediaType" => {
    _type,_key,
    ${MediaObjectQuery},      
}
`
