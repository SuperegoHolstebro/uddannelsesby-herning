import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'field',
  title: 'Fagområde',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Fagområde titel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEnglish',
      title: 'Fagområde titel - engelsk',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
