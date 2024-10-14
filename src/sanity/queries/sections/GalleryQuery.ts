import groq from 'groq'
export const GalleryQuery = groq`
    _type == 'Gallery' => {
    ...,
    images[]{
      _key,
      "image": asset->url,
      alt,
    },
  }`
