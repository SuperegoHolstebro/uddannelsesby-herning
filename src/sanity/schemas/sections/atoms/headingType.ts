import { Heading } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'

export const headingType = defineType({
  name: 'heading',
  type: 'object',
  icon: Heading,
  title: 'Overkrift',
  description:
    'Overskrifter bruges på hjemmesiden til at give brugeren en idé om emnet, og hjælper til at skabe et godt overblik, så det er let at finde det indhold, man leder efter ',
  fields: [
    {
      type: 'object',
      options: {
        collapsed: false,
        collapsible: true,
      },
      name: 'heading',
      title: 'Typografi',
      description:
        'Overskrift og størrelse. For at tilføje orddeling, skriv &shy; hvor ordet skal deles.',
      fields: [
        defineField({
          name: 'heading',
          title: 'Overskrift',
          type: 'string',
        }),
        defineField({
          name: 'tag',
          title: 'Størrelse',
          type: 'string',
          options: {
            layout: 'dropdown',
            list: [
              { title: 'H1', value: 'h1' },
              { title: 'H2', value: 'h2' },
              { title: 'H3', value: 'h3' },
              { title: 'H4', value: 'h4' },
              { title: 'H5', value: 'h5' },
              { title: 'H6', value: 'h6' },
              { title: 'Span', value: 'span' },
            ],
          },
          initialValue: 'h1',
        }),
      ],
    },
  ],
  preview: {
    select: {
      title: 'heading.heading',
      tag: 'heading.tag',
    },
    prepare({ title, tag }) {
      return {
        title: title,
        subtitle: `${tag}`,
      }
    },
  },
})
