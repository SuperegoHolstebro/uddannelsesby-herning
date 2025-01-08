import { groq } from 'next-sanity'
export const INFO_QUERY = groq`
  _type == "info" => {
    _type,
    heading,
    infomationGroup[] {
      title,
      number
    }
  }
`
