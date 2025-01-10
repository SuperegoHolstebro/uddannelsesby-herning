import { TextAlignLeft } from '@mynaui/icons-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const TextAndCollage = defineType({
  name: 'TextAndCollage',
  type: 'object',
  title: 'Tekst og Collage',
  icon: TextAlignLeft,
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
      description: 'Skal indeholde 3 billeder',
      validation: (Rule) => Rule.required().max(3).min(3),
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
  /*   preview: {
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
 */
  preview: {
    select: {
      title: 'innerBlocks.0.heading.heading',
      image: 'images.0',
      images: 'images',
    },
    prepare({ title, images }) {
      return {
        title: title,
        subtitle: `Tekst og billede med ${Object.keys(images).length} billeder`,
      }
    },
  },
})
