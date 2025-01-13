import { groq } from 'next-sanity'
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
