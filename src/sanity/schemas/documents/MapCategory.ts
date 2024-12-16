import { Map } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'MapCategory',
  title: 'Kortkategori',
  type: 'document',
  liveEdit: true,
  icon: Map,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Ikon',
      type: 'IconPicker',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
