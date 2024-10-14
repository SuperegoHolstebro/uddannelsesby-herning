import groq from "groq";
export const ImageQuery = groq`
asset-> {
  _id,
  url,
  _type,
  altText,
  description,
  title,
  metadata {
    blurHash,
    dimensions
  }
}
`;