import { groq } from "next-sanity";
import { ButtonQuery } from "../atoms/ButtonQuery";

export const InnerBlocksQuery = groq`
      innerBlocks[]{
        ...,
        _type == "button" => {
          ${ButtonQuery}
        },
      }
`