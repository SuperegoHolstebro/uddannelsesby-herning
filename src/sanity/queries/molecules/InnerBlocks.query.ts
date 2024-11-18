import { groq } from 'next-sanity'
import { ButtonQuery } from '../atoms/ButtonQuery'
import { DownloadsAndLinksQuery } from '../sections/DownloadsAndLinksQuery'

export const InnerBlocksQuery = groq`
      innerBlocks[]{
        ...,
        _type == "button" => {
          ${ButtonQuery}
        },
          ${DownloadsAndLinksQuery}
      }
`
