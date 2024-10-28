import groq from 'groq'
import { ImageQuery } from '../atoms/ImageQuery'

export const TextAndImageQuery = groq`
  _type == 'TextAndImage' => {
    ...,

    images[]{
      "image": {
        ${ImageQuery}
      }

    }
  }
`
