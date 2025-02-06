import groq from 'groq'
import { ImageQuery } from '../atoms/ImageQuery'

export const SchoolsTypeQuery = groq`
    _type == "SchoolsType" => {
      _type,
      schools[]-> {
        title,
        locale,
        _type,
        slug,
        infomation{
            amountOfEducations
        },
        mainImage {
            ${ImageQuery},
        },
      }
    }
`
