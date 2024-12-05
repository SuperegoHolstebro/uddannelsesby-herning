import { defineField, defineType } from 'sanity'
import { FileText } from '@mynaui/icons-react'

export const textContainerType = defineType({
  name: 'textContainer',
  type: 'object',
  icon: FileText,
  title: 'Indholdsblok',
  groups: [
    { title: 'Indhold', name: 'content' },
    { title: 'Design', name: 'design' },
    { title: 'indstillinger', name: 'settings' },
  ],
  fields: [
    defineField({
      name: 'innerBlocks',
      type: 'innerBlocks',
      title: 'Indhold',
      group: 'content',
    }),
    defineField({
      name: 'design',
      type: 'design',
      group: 'design',
    }),
    defineField({
      name: 'placement',
      type: 'string',
      title: 'Placering',
      description:
        'Vælg om indholdet skal vises til venstre, højre eller i midten',
      options: {
        list: [
          { title: 'Venstre', value: 'left' },
          { title: 'Højre', value: 'right' },
          { title: 'Midten', value: 'center' },
        ],
        layout: 'radio',
      },
      initialValue: 'center',
    }),
    defineField({
      group: 'settings',
      name: 'SectionSettings',
      title: 'Indstillinger',
      type: 'SectionSettings',
    }),
  ],
  preview: {
    select: {
      heading: 'innerBlocks.0.heading.heading',
      title: 'title',
      placement: 'placement',
    },
    prepare({ heading, title, placement }) {
      return {
        title: heading || title,
        subtitle: `Indholdsblok - Placering: ${placement === 'center' ? 'Midten' : placement === 'left' ? 'Venstre' : 'Højre'}`,
      }
    },
  },
})

/*   preview: {
    select: {
      title: 'title.heading',
      tagline: 'tagline',
      type: 'type',
      media: 'image',
      placement: 'placement',
    },
    prepare({ media, placement }) {
      return {
        title: 'Indholdsblok',
        type: 'Indholdsblok',
        subtitle: 'Indholdsblok',
        media,
      }
    },
  },
}) */
