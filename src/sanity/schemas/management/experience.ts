import { List } from '@mynaui/icons-react'
import { defineField } from 'sanity'

export default {
  name: 'experience',
  title: 'Oplevelser',
  type: 'document',
  liveEdit: true,
  icon: List,
  fields: [
    defineField({
      name: 'title',
      title: 'Navn',
      description: 'Navnet på medarbejder',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Billede',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
  ],
}
