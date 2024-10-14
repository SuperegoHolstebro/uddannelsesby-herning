import { Link } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'redirect',
  title: 'Indstillinger',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Redirects',
      hidden: true,
    }),
    {
      name: 'subLinks',
      title: 'Redirects',
      type: 'array',
      of: [
        {
          type: 'object',
          icon: Link,
          preview: {
            select: {
              title: 'source.title',
              subtitle: 'destinationPage.title',
              sourceUrl: 'sourceUrl.current',
              destinationUrl: 'destinationUrl.current',
            },
            prepare({ title, subtitle, sourceUrl, destinationUrl }) {
              return {
                title: `Fra: ${title || sourceUrl}`,
                subtitle: `Til: ${subtitle || destinationUrl}`,
              }
            },
          },
          fields: [
            {
              name: 'source',
              title: 'Kilde',
              type: 'reference',
              description: 'Siden du ønsker at viderestille fra',
              to: [{ type: 'page' }],
              hidden: ({ parent }) => parent?.isInternal, // Hide if external
            },
            defineField({
              name: 'sourceUrl',
              title: 'Kilde URL',
              type: 'slug',
              description:
                'Hvis ekstern URL, den URL du ønsker at viderestille fra (eksempelvis /gamle-side)',
              hidden: ({ parent }) => !parent?.isInternal, // Hide if internal
            }),
            defineField({
              name: 'isInternal',
              title: 'Ekstern link',
              type: 'boolean',
              description: 'Skift mellem intern og ekstern URL',
              initialValue: false,
            }),
            defineField({
              name: 'destinationUrl',
              title: 'Destination URL',
              type: 'slug',
              description:
                'Hvis ekstern URL, den URL du ønsker at viderestille til (eksempelvis /ny-side)',
              hidden: ({ parent }) => !parent?.isInternal, // Hide if internal
            }),
            {
              name: 'destinationPage',
              title: 'Destination',
              type: 'reference',
              description: 'Siden du ønsker at viderestille til ',
              to: [{ type: 'page' }],
              hidden: ({ parent }) => parent?.isInternal, // Hide if external
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
      }
    },
  }
})
