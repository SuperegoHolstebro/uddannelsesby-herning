import groq from 'groq'
import { ImageQuery } from '../atoms/ImageQuery'

export const TextAndCollageQuery = groq`
  _type == 'TextAndCollage' => {
    ...,

    images[]{
      "image": {
        ${ImageQuery}
      }

    }
  }
`
