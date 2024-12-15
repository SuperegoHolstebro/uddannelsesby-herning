import { defineField, defineType } from 'sanity'
import { Map, Pin } from '@mynaui/icons-react'
export const mapType = defineType({
  name: 'mapType',
  type: 'object',
  icon: Map,
  title: 'Kort',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titel',
    }),
    defineField({
      name: 'featuredImage',
      type: 'image',
      title: 'Feature Image',
    }),
    defineField({
      name: `hotspots`,
      type: `array`,
      of: [
        defineField({
          icon: Pin,
          name: 'spot',
          type: 'object',
          fieldsets: [{ name: 'position', options: { columns: 2 } }],
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Title',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'category',
              type: 'reference',
              to: [{ type: 'MapCategory' }],
              title: 'Category',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'x',
              type: 'number',
              readOnly: true,
              fieldset: 'position',
              initialValue: 50,
              validation: (Rule) => Rule.required().min(0).max(100),
            },
            {
              name: 'y',
              type: 'number',
              readOnly: true,
              fieldset: 'position',
              initialValue: 50,
              validation: (Rule) => Rule.required().min(0).max(100),
            },
          ],
          preview: {
            select: {
              title: 'title',
              x: 'x',
              y: 'y',
            },
            prepare({ title, x, y }) {
              return {
                title,
                subtitle: x && y ? `${x}% x ${y}%` : `No position set`,
              }
            },
          },
        }),
      ],
      options: {
        /* @ts-ignore */
        imageHotspot: {
          imagePath: `featuredImage`,
        },
      },
    }),
  ],
  preview: {
    select: {
      hotspots: 'hotspots',
    },
    prepare(selection) {
      const { hotspots } = selection
      return {
        title: 'Kort',
        subtitle: hotspots
          ? `${hotspots.length} placeringer`
          : 'Ingen placeringer',
      }
    },
  },
})
