import { defineField, defineType } from 'sanity'
export const Color = defineType({
  type: 'object',
  name: 'color',
  title: 'Farve',
  fields: [
    defineField({
      name: 'color',
      type: 'string',
      title: 'Farve',
      options: {
        layout: 'radio',
        list: [
          { title: 'Lys', value: 'lys' },
          { title: 'Mørk', value: 'mørk' },
          { title: 'Lilla', value: 'lilla' },
        ],
      },
      initialValue: 'lys',
    }),
  ],
})
