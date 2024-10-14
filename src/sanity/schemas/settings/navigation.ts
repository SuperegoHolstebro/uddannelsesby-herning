import { defineField } from 'sanity'

export default {
  name: 'navigation',
  title: 'Indstillinger',
  type: 'document',
  fields: [
    defineField({
      hidden: true,
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Navigation',
    }),
    defineField({
      name: 'links',
      title: 'Menupunkter',
      type: 'array',
      of: [
        {
          name: 'links',
          title: 'Menupunkt',
          type: 'object',
          preview: {
            select: {
              title: 'link.label',
              subtitle: 'subLinks',
              url: 'link',
              icon: 'link.icon',
            },
            prepare(selection) {
              const { title, subtitle, url } = selection
              return {
                title,
                subtitle:
                  subtitle && subtitle.length > 0
                    ? `Antal underpunkter: ${subtitle.length}`
                    : url && url.internalLink
                      ? url.internalLink._ref
                      : '',
                media: selection.icon,
              }
            },
          },
          fields: [
            {
              name: 'link',
              title: 'Link',
              type: 'link',
            },
            {
              name: 'subLinks',
              title: 'Underpunkter',
              type: 'array',
              of: [
                {
                  name: 'link',
                  title: 'Sublink',
                  type: 'link',
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
}
