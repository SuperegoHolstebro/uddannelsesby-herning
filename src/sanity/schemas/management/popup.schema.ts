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

      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (value) {
            const client = context.getClient({ apiVersion: '2021-06-07' })
            const query = `*[_type == "popup" && active == true && _id != $currentId][0]`
            const params = { currentId: context.document._id }
            const existingActivePopup = await client.fetch(query, params)

            if (existingActivePopup) {
              return 'Kun én popup kan være aktiv ad gangen.'
            }
          }
          return true
        }),

      
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
