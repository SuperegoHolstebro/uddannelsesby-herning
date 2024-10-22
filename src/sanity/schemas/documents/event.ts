import { CalendarUp } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Begivenhed',
  type: 'document',
  icon: CalendarUp,
  groups: [
    { name: 'content', title: 'Indhold' },
    { name: 'pageBuilder', title: 'Sideopbygning' },
    { name: 'registration', title: 'Tilmelding' }, // New group for registration
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // Existing fields for content and SEO
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Udvalgt billede',
      description:
        'Billedet der vises i "begivenheder" oversigten og på selve begivenheden',
      group: 'content',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Beskrivelse',
      description: 'En kort beskrivelse af begivenheden',
      group: 'content',
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      title: 'Dato',
      description: 'Dato og tidspunkt for begivenheden',
      group: 'content',
      options: {
        dateFormat: 'DD-MM-YYYY',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      group: 'pageBuilder',
      name: 'pageBuilder',
      title: 'Indhold',
      description: 'Indholdet på siden',
      type: 'pageBuilder',
    }),

    defineField({
      group: 'seo',
      title: 'SEO',
      description: 'SEO indstillinger',
      name: 'seoGroup',
      type: 'seoGroup',
    }),

    // New fields for sign-ups and external event handling
    defineField({
      name: 'maxAttendees',
      title: 'Maks antal deltagere',
      type: 'number',
      description: 'Maks antal personer, der kan tilmelde sig begivenheden',
      group: 'registration',
      validation: (Rule) => Rule.min(1).required(),
    }),
    defineField({
      name: 'attendees',
      title: 'Deltagere',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'attendee' }] }], // Expecting references
      description: 'De personer, der har tilmeldt sig begivenheden',
      group: 'registration',
    }),

    defineField({
      name: 'isFull',
      title: 'Begivenhed fyldt op',
      type: 'boolean',
      initialValue: false,
      description: 'Angiv om begivenheden er fyldt op',
      group: 'registration',
    }),
    defineField({
      name: 'isExternal',
      title: 'Ekstern begivenhed?',
      type: 'boolean',
      description:
        'Skal deltageren blive dirigeret til en ekstern side i stedet for tilmelding?',
      group: 'registration',
      initialValue: false,
    }),
    defineField({
      name: 'externalLink',
      title: 'Ekstern begivenhed link',
      type: 'url',
      description: 'Link til ekstern begivenhed eller betalingsside',
      group: 'registration',
      hidden: ({ document }) => !document?.isExternal, // Hide field if the event is not external
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      image: 'image',
    },
    prepare: ({ title, date, image }) => ({
      title: title,
      subtitle: date
        ? new Date(date).toLocaleDateString('da-DK', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
        : 'Ingen dato angivet',
      media: image,
    }),
  },
})
