import groq from 'groq'
import { ImageQuery } from '../atoms/ImageQuery'
export const videoObject = groq`
videoObject {
  ...,
  video {
    asset-> {
      _id,
      url,
      _type,
      altText,
      description,
      title
    }
  },
  thumbnail {
    ${ImageQuery}
  }
}
`
