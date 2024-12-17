import groq from 'groq'

export const heroQuery = groq`
_type == "hero" => {
  text, 
  _type,
  type,
  "media": Video.asset->url,
}
`
