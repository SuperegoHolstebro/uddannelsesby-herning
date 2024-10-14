import { Card, Flex, Stack, Text, TextInput } from '@sanity/ui'



// Adds markup and invokes renderDefault()
  /**
   * Renders a custom link component.
   *
   * @param {Object} props - The component props.
   * @returns {JSX.Element} The rendered custom link component.
   * @example defineField({})components: {field: customLink},})
   * @extends 
   */
  export const customLink = (props) => {
    const { elementProps, value = '' } = props

    return (
      <Stack space={2}>
        <TextInput {...elementProps} />
        <Text>Characters: {value.length}</Text>
      </Stack>
    )
  }

export default customLink 