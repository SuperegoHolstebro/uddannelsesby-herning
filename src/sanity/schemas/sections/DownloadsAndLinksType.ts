import { defineArrayMember, defineField, defineType } from 'sanity'

const DownloadsAndLinksType = defineType({
  name: 'DownloadsAndLinksType',
  title: 'Downloads og links',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Title of the link list section',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'A brief description for the link list section',
    }),
    defineField({
      name: 'links',
      type: 'array',
      title: 'Links',
      description: 'Add links to resources or pages',
      of: [
        {
          type: 'object',
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
})

export { DownloadsAndLinksType }
