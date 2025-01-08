// ./schemas/videoType.js

import { AcademicHat } from '@mynaui/icons-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const SchoolsType = defineType({
  title: 'Uddannelser',
  name: 'SchoolsType',
  icon: AcademicHat,
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'schools',
      type: 'array',
      title: 'Skoler',
      of: [
        defineArrayMember({
          name: 'school',
          title: 'Skole',
          type: 'reference',
          to: [{ type: 'school' }],
        }),
      ],
    }),
  ],
})
