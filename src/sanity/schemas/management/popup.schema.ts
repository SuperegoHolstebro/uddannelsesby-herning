import { defineField, defineType } from 'sanity'

export default {
  name: 'popup',
  title: 'popup',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Navn',
      description: 'Kun til intern brug',
      type: 'string',
    }),
    defineField({
      name: 'active',
      title: 'Aktiv',
      description: 'Vis popup',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'type',
      title: 'Type',
      description: 'Type af popup',
      type: 'string',
      options: {
        list: [
          { title: 'Tilpasset', value: 'custom' },
          { title: 'Vælg en begivenhed', value: 'select' },
        ],
      },
    }),
    defineField({
      name: 'event',
      title: 'Begivenhed',
      description: 'Vælg en begivenhed',
      type: 'reference',
      to: [{ type: 'event' }],
      hidden: ({ document }: any) => document.type !== 'select',
    }),
    defineField({
      name: 'custom',
      title: 'Tilpasset',
      description: 'Indhold til popup',
      type: 'object',
      hidden: ({ document }: any) => document.type !== 'custom',
      fields: [
        defineField({
          name: 'title',
          title: 'Titel',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Beskrivelse',
          type: 'string',
        }),
        defineField({
          name: 'link',
          type: 'link',
          title: 'Link',
        }),
        defineField({
          name: 'image',
          title: 'Billede',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection: { title: any }) {
      const { title } = selection
      return {
        title: title,
      }
    },
  },
}
