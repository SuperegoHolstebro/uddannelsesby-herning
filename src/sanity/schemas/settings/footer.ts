import { defineField, defineType } from 'sanity'
import LogoPickerInput from '@/components/sanity/LogoPickerInput'

export default defineType({
  name: 'footer',
  title: 'Indstillinger',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
      initialValue: 'Footer',
    }),
    defineField({
      // should match 'languageField' plugin configuration setting, if customized
      name: 'locale',
      type: 'string',
      readOnly: true,
      // hidden: true,
    }),

    {
      name: 'object',
      type: 'object',
      description: 'Kontakt oplysninger',
      title: 'Kontakt oplysninger',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: 'companyName',
          title: 'Virksomhedsnavn',
          type: 'string',
        }),
        defineField({
          name: 'address',
          title: 'Addresse',
          type: 'string',
        }),
        defineField({
          name: 'telephone',
          type: 'string',
          title: 'Telefon',
          description: 'Telefonnummer',
        }),
        defineField({
          name: 'email',
          type: 'email',
          title: 'Email',
          description: 'Email adresse',
        }),
        defineField({
          name: 'cvr',
          type: 'string',
          title: 'CVR',
          description: 'CVR nummer for virksomheden eks. 12345678',
        }),
      ],
    },
    {
      name: 'social',
      title: 'Sociale medier',
      description: 'Tilføj links til sociale medier',
      type: 'array',
      options: {
        collapsible: true,
        collapsed: true,
      },
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              type: 'string',
              title: '',

              components: {
                input: LogoPickerInput,
              },
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Github', value: 'github' },
                  { title: 'Google', value: 'google' },
                  { title: 'Youtube', value: 'youtube' },
                  { title: 'Apple', value: 'apple' },
                  { title: 'Snapchat', value: 'snapchat' },
                  { title: 'Pinterest', value: 'pinterest' },
                  { title: 'Figma', value: 'figma' },
                  { title: 'Dribble', value: 'dribble' },
                  { title: 'Reddit', value: 'reddit' },
                  { title: 'Discord', value: 'discord' },
                  { title: 'Tiktok', value: 'tiktok' },
                  { title: 'Clubhouse', value: 'clubhouse' },
                  { title: 'Slack', value: 'slack' },
                ],
              },
            }),
            defineField({
              name: 'url',
              hidden: ({ parent }) => !parent?.platform,
              type: 'url',
              title: 'URL',
              description: 'URL for the selected social media platform',
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        },
      ],
    },
  ],
})
