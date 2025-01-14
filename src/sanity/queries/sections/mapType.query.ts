import groq from 'groq'
import { ImageQuery } from '../atoms/ImageQuery'

export const mapTypeQuery = groq`
_type == "mapType" => {
  ...,
  "categoriesInUse": array::unique(*[_type == "page" && slug.current == $slug][0].pageBuilder[_type == "mapType"].hotspots[].category-> {
    title,
    "icon": icon.icon
  }),
  _key,
  hotspots[] {
    _key,
    _type,
    title,
    x,
    y,
    category-> {
      title,
      "icon": icon.icon
    }
  },
  featuredImage{
   ${ImageQuery}
  }
}

`
