import groq from 'groq'

export const mapTypeQuery = groq`
    _type == "mapType" => {
      ...,
      _key,
      title,
      mapArrayField[] {
        _key,
        title,
        category,
        ...,
        x,
        y
      }
    }

`
