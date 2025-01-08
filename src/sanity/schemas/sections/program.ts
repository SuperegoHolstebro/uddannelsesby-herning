import { defineArrayMember, defineField, defineType } from 'sanity'
import { List } from '@mynaui/icons-react'

export const timeOptions = [
  '08.00',
  '08.15',
  '08.30',
  '08.45',
  '09.00',
  '09.15',
  '09.30',
  '09.45',
  '10.00',
  '10.15',
  '10.30',
  '10.45',
  '11.00',
  '11.15',
  '11.30',
  '11.45',
  '12.00',
  '12.15',
  '12.30',
  '12.45',
  '13.00',
  '13.15',
  '13.30',
  '13.45',
  '14.00',
  '14.15',
  '14.30',
  '14.45',
  '15.00',
  '15.15',
  '15.30',
  '15.45',
  '16.00',
  '16.15',
  '16.30',
  '16.45',
  '17.00',
  '17.15',
  '17.30',
  '17.45',
  '18.00',
  '18.15',
  '18.30',
  '18.45',
  '19.00',
  '19.15',
  '19.30',
  '19.45',
  '20.00',
  '20.15',
  '20.30',
]

export const programType = defineType({
  name: 'programType',
  title: 'Program for åben hus ',
  type: 'object',
  icon: List,

  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titel',
    }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Punkter',
      of: [
        defineArrayMember({
          name: 'objectItem',
          type: 'object',
          preview: {
            select: {
              title: 'title',
              start: 'time.start',
              end: 'time.end',
            },
            prepare({ title, start, end }) {
              return {
                title: title,
                subtitle: `${start} - ${end}`,
              }
            },
          },
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Titel',
            }),
            defineField({
              name: 'description',
              title: 'Beskrivelse',
              type: 'blockContent',
            }),
            defineField({
              name: 'time',
              type: 'object',
              title: 'Tid',
              fields: [
                defineField({
                  name: 'start',
                  type: 'string',
                  title: 'Start',
                  options: {
                    list: [...timeOptions],
                  },
                }),
                defineField({
                  name: 'end',
                  type: 'string',
                  title: 'Slut',
                  options: {
                    list: [...timeOptions],
                  },
                }),
              ],
            }),
            defineField({
              name: 'mainImage',
              type: 'image',
              options: {
                hotspot: true,
              },
              title: 'Billede',
            }),
            defineField({
              name: 'edducation',
              type: 'reference',
              to: [{ type: 'school' }],
              title: 'Uddannelsessted',
            }),
          ],
        }),
      ],
    }),
  ],
})
