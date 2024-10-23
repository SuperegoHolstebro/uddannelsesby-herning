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
      name: 'startDate',
      type: 'datetime',
      title: 'Startdato',
      description: 'Dato og tidspunkt for begivenhedens start',
      group: 'content',
      options: {
        dateFormat: 'DD-MM-YYYY',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(), // Ensure a start date is required
    }),
    defineField({
      name: 'isMultiDay',
      type: 'boolean',
      title: 'Er dette en flerdagsbegivenhed?',
      description: 'Slå til for at tilføje en slutdato til begivenheden',
      group: 'content',
      initialValue: false,
    }),
    defineField({
      name: 'endDate',
      type: 'datetime',
      title: 'Slutdato',
      description: 'Dato og tidspunkt for begivenhedens slut (valgfri)',
      group: 'content',
      hidden: ({ document }) => !document?.isMultiDay, // Only show if the toggle is enabled
      options: {
        dateFormat: 'DD-MM-YYYY',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
      validation: (Rule) =>
        Rule.custom((endDate, context) => {
          const startDate = context.document.startDate
          if (!context.document.isMultiDay || !endDate) return true
          return endDate >= startDate || 'Slutdato skal være efter startdatoen'
        }),
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
      startDate: 'startDate',
      endDate: 'endDate',
      isMultiDay: 'isMultiDay',
    },
    prepare(selection) {
      const { title, startDate, endDate, isMultiDay } = selection
      const formattedStart = new Date(startDate).toLocaleDateString('da-DK', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
      const formattedEnd =
        isMultiDay && endDate
          ? new Date(endDate).toLocaleDateString('da-DK', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })
          : null

      return {
        title: title,
        subtitle: formattedEnd
          ? `${formattedStart} - ${formattedEnd}`
          : formattedStart,
      }
    },
  },
})
