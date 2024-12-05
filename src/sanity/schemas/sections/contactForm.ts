import { Envelope } from '@mynaui/icons-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

const contactFormType = defineType({
  name: 'contactFormType',
  title: 'Kontaktformular',
  icon: Envelope,
  type: 'object',
  // {title: 'indstillinger', name: 'settings'}
  fields: [
    defineField({
      name: 'heading',
      type: 'heading',
    }),
    defineField({
      name: 'array',
      type: 'array',
      title: 'Feltyper',
      of: [
        {
          type: 'object',
          name: 'formFields',
          title: 'Form Fields',
          fields: [
            defineField({
              name: 'required',
              title: 'Required',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'fieldName',
              title: 'Field Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'placeholder',
              title: 'Placeholder',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'fieldId',
              title: 'Field ID',
              type: 'slug',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'inputType',
              title: 'Input Type',
              type: 'string',
              initialValue: 'text',
              options: {
                layout: 'dropdown',
                list: [
                  { value: 'text', title: 'Text input' },
                  { value: 'email', title: 'Email' },
                  { value: 'phone', title: 'Phone number' },
                  { value: 'textArea', title: 'Text area' },
                  { value: 'file', title: 'File upload' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
    {
      name: 'design',
      type: 'design',
      title: 'Design',
    },

    {
      // group: "settings",
      name: 'SectionSettings',
      title: 'Indstillinger',
      type: 'SectionSettings',
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'Form Fields',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title.heading.heading,
        subtitle: subtitle,
      }
    },
  },
})

export { contactFormType }
