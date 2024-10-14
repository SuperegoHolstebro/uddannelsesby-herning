import { defineType } from 'sanity'
import { MediaIcon } from '@/components/sanity/PageBuilderIcons'

export const LogoGallery2 = defineType({
  name: 'LogoGallery2',
  type: 'object',
  icon: MediaIcon,
  title: 'Logo Galleri 2',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titel',
      description: 'Titel på logogalleriet',
    },

    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
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
        title: `Galleri med ${Object.keys(images).length} billeder`,
        subtitle: `Alt text: `,
        media: image,
      }
    },
  },
})
