import { defineField, defineType } from 'sanity'
import IconPickerInput from '@/components/sanity/IconPickerInput'

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
          description: 'Email address',
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
                input: IconPickerInput,
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
    {
      name: 'openingHours',
      title: 'Åbningstider',
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
              name: 'day',
              title: 'Dag',
              type: 'string',
              options: {
                list: [
                  { title: 'Mandag', value: 'mandag' },
                  { title: 'Tirsdag', value: 'tirsdag' },
                  { title: 'Onsdag', value: 'onsdag' },
                  { title: 'Torsdag', value: 'torsdag' },
                  { title: 'Fredag', value: 'fredag' },
                  { title: 'Lørdag', value: 'lørdag' },
                  { title: 'Søndag', value: 'søndag' },
                ],
              },
            }),
            defineField({
              name: 'hours',
              title: 'Åbningstider',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'day',
              subtitle: 'hours',
            },
          },
        },
      ],
    },
  ],
})
