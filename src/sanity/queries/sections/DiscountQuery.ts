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
        "tags": icon-> {
          ...
        }
      },
      "categories": *[_type == "discountsTag"] {
        ...,
      }
    }

`
