import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'attendee',
  title: 'Person',
  type: 'document',
  fields: [
    defineField({
      name: 'navn', // "name" in Danish
      title: 'Navn',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'skole', // "school" in Danish
      title: 'Skole',
      type: 'string',
      options: {
        list: [
          { title: 'Skole 1', value: 'Skole 1' },
          { title: 'Skole 2', value: 'Skole 2' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
