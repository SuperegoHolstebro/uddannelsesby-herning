import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Indstillinger',
  groups: [
    { title: 'Scripts', name: 'scripts' },
    { title: 'Meta + GTM', name: 'meta' },
  ],
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Sidetitel',
      type: 'string',
      description: 'Sidens titel',
    }),
    defineField({
      // should match 'languageField' plugin configuration setting, if customized
      name: 'locale',
      type: 'string',
      readOnly: true,
      // hidden: true,
    }),
    defineField({
      name: 'siteDescription',
      title: 'Sidebeskrivelse',
      type: 'text',
      description: 'Beskrivelse af siden',
    }),
    defineField({
      name: 'headScripts',
      title: 'Head Scripts',
      type: 'text',
      description:
        'Her kan du indsætte scripts, der skal placeres i head-sektionen på alle sider.',
      group: 'scripts',
    }),
    defineField({
      name: 'bodyScripts',
      title: 'Body Scripts',
      type: 'text',
      description:
        'Her kan du indsætte scripts, der skal placeres i body-sektionen på alle sider.',
    }),
    defineField({
      name: 'footerScripts',
      title: 'Footer Scripts',
      type: 'text',
      description:
        'Her kan du indsætte scripts, der skal placeres i footer-sektionen på alle sider.',
      group: 'scripts',
    }),
    defineField({
      type: 'object',
      name: 'googleTagManager',
      title: 'Google Tag Manager',
      options: {
        columns: 2,
      },
      fields: [
        defineField({
          name: 'id',
          title: 'ID',
          type: 'string',
          description: 'Indsæt Google Tag Manager ID (GTM-XXXXXX)',
          validation: (Rule) =>
            Rule.info('Indsæt Google Tag Manager ID (GTM-XXXXXX)'),
        }),
        defineField({
          name: 'verification',
          title: 'Verifikation',
          type: 'string',
          description:
            'Indsæt Google Search Console verifikationskode (xxxxxxxxxxx-xxxx)',
        }),
      ],
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
