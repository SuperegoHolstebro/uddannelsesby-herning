// ./schemas/videoType.js

import { defineArrayMember, defineField, defineType } from 'sanity'
import { ChartBarTwo } from '@mynaui/icons-react'

export const info = defineType({
  name: 'info',
  icon: ChartBarTwo,
  title: 'Tæller',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'infomation',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'info',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
            }),
            defineField({
              name: 'number',
              type: 'number',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare(selection) {
      return {
        title: `Tæller`,
        subtitle: `Info-banner`,
      }
    },
  },
})
