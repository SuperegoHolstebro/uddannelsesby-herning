import groq from 'groq'
import { ImageQuery } from '../atoms/ImageQuery'
import { InnerBlocksQuery } from '../molecules/InnerBlocks.query'

export const TextAndCollageQuery = groq`
  _type == 'TextAndCollage' => {
    ...,
    ${InnerBlocksQuery},
    images[]{
      "image": {
        ${ImageQuery}
      }

    }
  }
`
