import { Tag } from '@mynaui/icons-react'
import { Icon } from 'next/dist/lib/metadata/types/metadata-types'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'eventCategory',
  title: 'Begivenhedskategori',
  type: 'document',
  liveEdit: true,
  icon: Tag,
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
    }),
    defineField({
      name: 'titleEnglish',
      title: 'Titel - engelsk',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Ikon',
      type: 'IconPicker',
    }),
  ],
})
