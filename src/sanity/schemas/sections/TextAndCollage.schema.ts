import { defineArrayMember, defineField, defineType } from 'sanity'

export const TextAndCollage = defineType({
  name: 'TextAndCollage',
  type: 'object',
  title: 'Tekst og Collage',
  groups: [{ title: 'indstillinger', name: 'settings' }],
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
    {
      group: 'settings',
      name: 'SectionSettings',
      title: 'Indstillinger',
      type: 'SectionSettings',
    },
  ],
  preview: {
    select: {
      images: 'images',
      image: 'images.0',
    },
    prepare(selection) {
      const { images, image } = selection

      return {
        // title from innerBlocks
        title: `Tekst og billede`,
        subtitle: `Tekst med ${Object.keys(images).length} billeder`,
        media: image,
      }
    },
  },
})