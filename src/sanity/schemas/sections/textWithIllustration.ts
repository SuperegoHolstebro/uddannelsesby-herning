import { TextAlignLeft } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'

export const textWithIllustration = defineType({
  name: 'textWithIllustration',
  type: 'object',
  icon: TextAlignLeft,
  title: 'Tekst og medie',
  description:
    'Blokken er en kombination af tekst og medie, der præsenterer information på en visuelt tiltalende måde ved at inkludere både ord og billede. Det giver besøgende en mere informativ og engagerende oplevelse af hjemmesiden. På længere sider anbefales det at anvende tekst- og medie-blokken i kombination med andre tekstopsætninger',
  groups: [
    { title: 'Indhold', name: 'content' },
    { title: 'Design', name: 'design' },
    { title: 'Medie', name: 'media' },
    { title: 'indstillinger', name: 'settings' },
  ],
  fields: [
    defineField({
      name: 'innerBlocks',
      type: 'innerBlocks',
      group: 'content',
    }),
    {
      group: 'media',
      name: 'MediaObject',
      title: 'Stort Medie',
      type: 'MediaObject',
    },
    {
      group: 'media',
      name: 'SmallMediaObject',
      title: 'Lille Medie',
      type: 'MediaObject',
    },
    {
      group: 'media',
      name: 'symbolPicker',
      title: 'Symbol',
      type: 'SymbolPicker',
    },
/*     {
      name: 'design',
      type: 'design',
      group: 'content',
    }, */
    defineField({
      type: "object",
      name: "design",
      title: "Design indstillinger",
      fields: [
        
        defineField({
        type: "object",
        name: "padding",
        title: "Padding",
        options: {
          columns: 2,
        },
        fields: [
          defineField({
            name: "spacingTop",
            type: "string",
            title: "Afstand til toppen",
            options: {
              layout: "radio",
              list: [
                { title: "Normal", value: "default" },
                { title: "Ingen", value: "none" },
              ],
            },
            initialValue: "default",
          }),
        ],
        preview: {
          select: {
            title: "title",
            subtitle: "subtitle",
          },
          prepare(selection) {
            const { title, subtitle } = selection;
            return {
              title: title,
              subtitle: subtitle,
            };
          },
        }
      }),
        defineField({
          name: "color",
          title: "Farve",
          type: "color",
        }),
      ],
    }),
    
    {
      group: 'settings',
      name: 'SectionSettings',
      title: 'Indstillinger',
      type: 'SectionSettings',
    },
  ],
  preview: {
    select: {
      title: 'innerBlocks.0.heading.heading',
      tagline: 'tagline',
      type: 'type',
      media: 'image',
    },
    prepare({ title, tagline, media }) {
      return {
        title: title,
        subtitle: 'Tekst og medie',
        media,
      }
    },
  },
})
