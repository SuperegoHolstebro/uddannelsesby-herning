import groq from 'groq'
import { ImageQuery } from '../atoms/ImageQuery'

const All = groq`
view == "all" => *[_type == "company"] {
  _type,
  "slug": slug.current,
  contactPerson,
  description,
  email,
  phone,
  address,
  name,
  _id,
  image {
    ${ImageQuery}
  },
  logo {
    ${ImageQuery}
  },
  fields[]-> {
    _id,
    _rev,
    title
  }
}

`

export const companiesTypeQuery = groq`
  _type == "companiesType" => {
    _type,
    ...,
    "companies": select(
      ${All}
    ),
  }
`
