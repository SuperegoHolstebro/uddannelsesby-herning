import groq from 'groq'
import { ImageQuery } from '../atoms/ImageQuery'
export const LogoBandQuery = groq`
    _type == 'logoband' => {
    ...,
        logos[] {
                ${ImageQuery}
        }
    }`
