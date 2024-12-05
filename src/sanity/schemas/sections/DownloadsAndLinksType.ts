import { Download } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'

const DownloadsAndLinksType = defineType({
  name: 'DownloadsAndLinksType',
  title: 'Downloads og links',
  type: 'object',
  icon: Download,
  fields: [
    defineField({
      name: 'links',
      type: 'array',
      title: 'Links',
      description: 'Tiløj links til downloads eller andre sider',
      of: [
        {
          type: 'object',
          preview: {
            select: {
              title: 'title',
              icon: 'iconPicker.icon',
            },
            prepare(selection) {
              return {
                title: selection.title || 'Ingen titel',
                subtitle: `Ikon: ${selection.icon}` || 'Ingen ikon',
              }
            },
          },
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Link Title',
              description: 'Title for the link',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'iconPicker',
              title: 'Ikon',
              type: 'IconPicker',
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
              description: 'URL for the link',
              validation: (Rule) =>
                Rule.required().uri({
                  allowRelative: true, // Allows both relative and absolute URLs
                  scheme: ['http', 'https'], // Ensures the URL starts with http or https
                }),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1), // Ensure there's at least one link
    }),
    {
      name: 'design',
      type: 'design',
      title: 'Design',
    },
    {
      // group: "settings",
      name: 'SectionSettings',
      title: 'Indstillinger',
      type: 'SectionSettings',
    },
  ],
  preview: {
    select: {
      amount: 'links',
    },
    prepare(selection) {
      const { amount } = selection
      return {
        title: 'Downloads og links',
        amount: amount.length + ' links' || '0 links',
      }
    },
  },
})

export { DownloadsAndLinksType }
