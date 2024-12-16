import groq from 'groq'
import { ImageQuery } from '../atoms/ImageQuery'
export const programType_QUERY = groq`
_type == "programType" => {
  ...,
  items[] {
    title,
    time {
      start,
      end
    },
    mainImage {
      ${ImageQuery}
    },
    description[] {
      ...
    },
    edducation-> {
      title,
      infomation {
        address
      }
    }
  }
}
`
