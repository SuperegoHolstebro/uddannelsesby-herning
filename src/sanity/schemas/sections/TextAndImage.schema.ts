import { defineArrayMember, defineField, defineType } from 'sanity'

export const TextAndImage = defineType({
  name: 'TextAndImage',
  type: 'object',
  title: 'TextAndImage',
  fields: [
    defineField({
      name: 'innerBlocks',
      type: 'innerBlocks',
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Billeder',
      validation: (Rule) => Rule.required().max(3).min(1),
      of: [
        defineArrayMember({
          name: 'image',
          type: 'image',
          title: 'Billede',
        }),
      ],
    }),
  ],
})
