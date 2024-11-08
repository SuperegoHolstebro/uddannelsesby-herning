import { groq } from 'next-sanity'
import { ButtonQuery } from '../atoms/ButtonQuery'
export const QUICKLINKS_QUERY = groq`
_type == "QuickLinks" => {
  _type,
  ...,
  quickLinks[] {
    _key,
    _type,
    ...,
    internalLink-> {
      _type,
      slug,
      title
    }
  }
}

`
