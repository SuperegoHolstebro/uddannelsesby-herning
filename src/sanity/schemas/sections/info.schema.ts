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
      name: 'infomationGroup',
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
    prepare() {
      return {
        title: `Tæller`,
        subtitle: 'Tæller med tal og titel',
      }
    },
  },
})
