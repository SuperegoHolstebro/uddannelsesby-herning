import groq from 'groq'
import { ImageQuery } from '../atoms/ImageQuery'
import { videoObject } from '../atoms/videoObject'
import { vimeoObject } from '../atoms/vimeoObject'

export const MediaObjectQuery = groq`
MediaObject {
  media {
    select,
    imageObject {
      image{
      ${ImageQuery}
      },
    },
    ${videoObject},
    ${vimeoObject}
  }
}

  `