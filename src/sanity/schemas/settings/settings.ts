import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Indstillinger',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Sidetitel',
      type: 'string',
      description: 'Sidens titel',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Sidebeskrivelse',
      type: 'text',
      description: 'Beskrivelse af siden',
    }),
    // field for custom scripts in the head
    defineField({
      name: 'headScripts',
      title: 'Head Scripts',
      type: 'text',
      description:
        "Her kan du indsætte scripts, der skal placeres i head-sektionen på alle sider.",
    }),
    defineField({
      name: 'headMeta',
      title: 'Head Meta',
      type: 'text',
      description:
        "Her kan du indsætte meta tags, der skal placeres i head-sektionen på alle sider.",
    }),
    // field for custom scripts in the footer
    defineField({
      name: 'footerScripts',
      title: 'Footer Scripts',
      type: 'text',
      description:
        "Her kan du indsætte scripts, der skal placeres i footer-sektionen på alle sider.",
    }),
    defineField({
      hidden: true,
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Sideindstillinger',
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
})
