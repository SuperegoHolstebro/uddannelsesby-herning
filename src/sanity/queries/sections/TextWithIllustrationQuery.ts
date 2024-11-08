import groq from 'groq'
import { MediaObjectQuery } from '@/sanity/queries/molecules/MediaObjectQuery'
import { InnerBlocksQuery } from '../molecules/InnerBlocks.query'
import { ImageQuery } from '../atoms/ImageQuery'
import { videoObject } from '../atoms/videoObject'
import { vimeoObject } from '../atoms/vimeoObject'

export const textWithIllustrationQuery = groq`
  _type == 'textWithIllustration' => {
    _type,
    _key,
    flip,
    ${MediaObjectQuery},
    design{...,},
    ${InnerBlocksQuery},
    SectionSettings{...,},
    SmallMediaObject{
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
  }
`
