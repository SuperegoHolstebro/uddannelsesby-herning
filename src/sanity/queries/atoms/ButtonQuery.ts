import groq from "groq";

export const ButtonQuery = groq`
link {
  ...,
  internalLink-> {
    _type,
    slug,
    title
  }
}
`;
  