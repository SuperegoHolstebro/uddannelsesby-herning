import { defineArrayMember, defineField, defineType } from 'sanity'
import { ChartBarTwo } from '@mynaui/icons-react'

export const logoband = defineType({
  name: 'logoband',
  icon: ChartBarTwo,
  title: 'Logo bånd',
  type: 'object',
  fields: [
    defineField({
      type: 'array',
      name: 'logos',
      title: 'Logos',
      of: [
        defineArrayMember({
          type: 'image',
          name: 'logo',
          title: 'Logo',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      logos: 'logos',
    },
    prepare(logos: any) {
      return {
        title: `Logo bånd`,
        subtitle: `Antal logos: ${logos.length}`,
      }
    },
  },
})
