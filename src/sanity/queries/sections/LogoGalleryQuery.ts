import groq from 'groq'
import { ImageQuery } from '../atoms/ImageQuery'
export const LogoGalleryQuery = groq`
    _type == 'LogoGallery' => {
    ...,
    images[]{
      ${ImageQuery}
    },
  }`
