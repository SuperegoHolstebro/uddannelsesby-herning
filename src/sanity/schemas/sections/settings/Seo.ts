// ./schemas/formType.js

import { defineField, defineType } from 'sanity'

export const Seo = defineType({
  name: 'seoGroup',
  type: 'object',
  title: 'SEO & Social',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'seoTitle',
      title: 'Titel til SEO & Social deling',
      description:
        'Gør det så lokkende som muligt for at konvertere brugere i sociale feeds og Google-søgninger. Ideelt set 15-70 tegn.',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Beskrivelse',
      description:
        'Valgfrit, men stærkt anbefalet, da det vil hjælpe dig med at konvertere flere besøgende fra Google og sociale medier. Ideelt set 70-160 tegn.',
      type: 'text',
    }),
    defineField({
      name: 'seoImage',
      title: 'SEO Billede',
      options: {
        hotspot: true,
      },
      description:
        'Dette billede vil blive brugt, når denne side deles på sociale medier og i søgeresultater.',
      type: 'image',
    }),
    defineField({
      name: 'radioField',
      title: 'Offentliggørelsesstatus',
      description: 'Dette vil bestemme, om siden er live eller ej',
      type: 'string',
      options: {
        list: [
          { title: 'Offentlig (Denne side er live!)', value: 'public' },
          {
            title: 'Privat (kun tilgængelig i forhåndsvisningstilstand)',
            value: 'private',
          },
          {
            title:
              'Skjult (Google kan ikke finde den, men den kan stadig tilgås via URL)',
            value: 'hidden',
          },
        ],
        layout: 'radio',
      },
    }),
  ],
})
