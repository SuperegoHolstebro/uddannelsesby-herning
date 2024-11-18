import { defineField, defineType } from 'sanity'

export const SymbolPicker = defineType({
  title: 'Ikoner',
  name: 'SymbolPicker',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Ikoner',

      options: {
        layout: 'dropdown',
        list: [
          { title: 'F', value: 'f' },
          { title: 'R', value: 'r' },
          { title: 'G', value: 'g' },
          { title: 'T', value: 't' },
          { title: 'D', value: 'd' },
        ],
      },
      initialValue: 'f',
    }),
  ],
  preview: {
    select: {
      icon: 'icon',
    },
    prepare(selection) {
      return {
        title: selection.icon.charAt(0).toUpperCase() + selection.icon.slice(1),
      }
    },
  },
})
