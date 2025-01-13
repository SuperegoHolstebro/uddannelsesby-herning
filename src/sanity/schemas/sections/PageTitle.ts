import { defineType } from 'sanity'
import { PanelTop } from '@mynaui/icons-react'

export const PageTitle = defineType({
  name: 'PageTitle',
  type: 'object',
  icon: PanelTop,
  title: 'Side titel',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titel',
      description: 'Titel på siden',
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
    {
      name: 'symbolPickerLeft',
      title: 'Symbol Venstre',
      type: 'SymbolPicker',
    },
    {
      name: 'symbolPickerRight',
      title: 'Symbol Højre',
      type: 'SymbolPicker',
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
        title: `Side titel med ${Object.keys(images).length} billeder`,
        subtitle: `Alt text: `,
        media: image,
      }
    },
  },
})
