import groq from 'groq'
export const ContactFormTypeQuery = groq`
_type == "contactFormType" => {
  "heading": heading->heading,
  ...,
  array[] {
    _key,
    required,
    fieldName,
    placeholder,
    inputType,
    fieldId {
      current,
      _type
    }
  }
}
`
