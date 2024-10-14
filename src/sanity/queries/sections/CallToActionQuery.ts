import groq from "groq";
import { MediaObjectQuery } from "@/sanity/queries/molecules/MediaObjectQuery";
import { DesignQuery } from "@/sanity/queries/atoms/DesignQuery";
import { ButtonQuery } from "@/sanity/queries/atoms/ButtonQuery";
export const CallToActionQuery = groq`
  _type == 'CallToAction' => {
    ...,
    callToActions[] {
      ...,
      ${ButtonQuery},
      ${MediaObjectQuery},
    },
    ${DesignQuery},
  }
`;
