import { defineArrayMember, defineField, defineType } from 'sanity'
import { PanelTopOpen } from '@mynaui/icons-react'

export const accordionType = defineType({
  name: 'accordion',
  type: 'object',
  icon: PanelTopOpen,

  title: 'Accordions',
  description:
    'Udfoldelige faner, som kan indeholde en overskrift og uddybende tekst. En accordion hjælper med at spare plads og gør hjemmesiden mere overskuelig og lettere at navigere i.',
  fields: [
    {
      name: 'accordions',
      title: 'Accordions',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Accordion',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            {
              name: 'body',
              title: 'Body',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'block',
                  title: 'Block',
                }),
              ],
            },
            defineField({
              name: 'unfloded',
              description:
                'Hvis denne er sat til "Ja", vil accordionen være udfoldet som standard.',
              title: 'Udfoldet',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              unfloded: 'unfloded',
            },
            prepare({ title, unfloded }) {
              return {
                title: title,
                subtitle: `Foldet ud: ${unfloded ? 'Ja' : 'Nej'}`,
              }
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'Accordion',
      subtitle: 'Accordions',
      accordions: 'accordions',
    },
    prepare({ title, accordions }) {
      return {
        title: 'Accordion',
        subtitle: `Der er ${accordions.length} accordions i denne sektion.`,
      }
    },
  },
})
