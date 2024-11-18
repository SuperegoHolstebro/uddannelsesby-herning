import groq from 'groq'
import { ButtonQuery } from '../atoms/ButtonQuery'

const DonwloadQurey = groq`
_type == "download" => {
  title,
  files[] {
    title,
    file {
      asset-> {
        _id,
        url,
        _type,
        size,
        extension,
      }
    }
  }
}
`
const LinkQuery = groq`
_type == "link" => {
  title,
  _type,
  links[] {
    webAddress,
    _type,
    ${ButtonQuery},
  }
}
`

export const DownloadsAndLinksQuery = groq`
_type == "DownloadsAndLinksType" => {
    _type,
    description,
    title,
    downloads[] {
        ${DonwloadQurey},
        ${LinkQuery}
    },
    ...,
}
`
