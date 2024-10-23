import groq from 'groq'

export const heroQuery = groq`
_type == "hero" => {
  text, 
  _type,
  "media": Video.asset->url,
}
`
