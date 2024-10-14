import groq from 'groq'
import { ButtonQuery } from '../atoms/ButtonQuery'
import { InnerBlocksQuery } from '../molecules/InnerBlocks.query'

export const textContainerQuery = groq`
    _type == "textContainer" => {
      ...,
    ${InnerBlocksQuery}
    }

`