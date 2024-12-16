import groq from 'groq'

export const DiscountQuery = groq`
    _type == "DiscountsType" => {
      ...,
      _key,
      "discounts": *[_type == "discounts"] {
        ...,
        "icon": icon-> {
          ...
        },
        "tags": tags[]-> {
          ...
        }
      },
      "categories": *[_type == "discountsTag"] {
        ...,
      }
    }

`
