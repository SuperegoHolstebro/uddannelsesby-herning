import { defineField, defineType } from 'sanity'

export const Quote = defineType({
  name: 'Quote',
  title: 'Citat',
  description: 'Beskrivelse',
  type: 'object',
  groups: [
    { title: 'Indhold', name: 'content' },
    { title: 'indstillinger', name: 'settings' },
    { title: 'Medie', name: 'medie' },
  ],
  fields: [
    {
      group: 'medie',
      name: 'MediaObject',
      title: 'Medie',
      type: 'MediaObject',
    },
    defineField({
      name: 'quote',
      title: 'Citat',
      type: 'string',
    }),
    defineField({
      name: 'student',
      title: 'Studerende',
      type: 'string',
    }),
    defineField({
      name: 'education',
      title: 'Uddannelse',
      type: 'string',
    }),

    defineField({
      name: 'image',
      title: 'Billede',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'link',
      title: 'Knap',
      type: 'link',
      validation: (Rule) => Rule.required(),
    }),

    {
      group: 'settings',
      name: 'SectionSettings',
      title: 'Indstillinger',
      type: 'SectionSettings',
    },
  ],
  preview: {
    prepare({ media }) {
      return {
        title: 'Citat',
        media: media,
      }
    },
  },
})
