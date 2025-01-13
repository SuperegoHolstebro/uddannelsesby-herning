import { CalendarUp } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'
import { getDanishDate } from '~/utils/date'

export default defineType({
  name: 'event',
  title: 'Begivenhed',
  type: 'document',
  liveEdit: true,
  icon: CalendarUp,
  groups: [
    { name: 'content', title: 'Indhold' },
    { name: 'registration', title: 'Tilmelding' }, // New group for registration
    { name: 'details', title: 'Detaljer' }, // New group for details like time, location, price, and category
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
      type: 'blockContent',
      title: 'Beskrivelse Dansk',
      description: 'En kort beskrivelse af begivenheden',
      group: 'content',
    }),
    defineField({
      name: 'descriptionEN',
      type: 'blockContent',
      title: 'Beskrivelse Engelsk',
      description: 'En kort beskrivelse af begivenheden på engelsk',
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
      // initialValue = 2 days from startdate
      initialValue: () => {
        const startDate = new Date().toISOString()
        const endDate = new Date(startDate)
        endDate.setDate(endDate.getDate() + 2)
        return endDate.toISOString()
      },
    }),

    // New fields for price, category, and location
    defineField({
      name: 'price',
      type: 'number',
      title: 'Pris',
      description: 'Pris for deltagelse i begivenheden',
      group: 'details',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Lokation',
      description: 'Stedet hvor begivenheden finder sted',
      group: 'details',
    }),
    /*     defineField({
      name: 'category',
      type: 'string',
      title: 'Kategori',
      description: 'Kategorier relateret til begivenheden',
      group: 'details',
      options: {
        list: [
          { title: 'Oplevelser', value: 'oplevelser' },
          { title: 'Vandaktivitet', value: 'vandaktivitet' },
          { title: 'Sport', value: 'sport' },
          { title: 'Håndværk', value: 'håndværk' },
          { title: 'Foredrag og viden', value: 'foredrag-og-viden' },
          { title: 'I naturen', value: 'i-naturen' },
        ],
      },
    }), */
    defineField({
      name: 'category',
      type: 'reference',
      title: 'Kategori',
      group: 'details',
      description: 'Kategorier relateret til begivenheden',
      to: [{ type: 'eventCategory' }],
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
    // New fields for sign-ups and external event handling
    defineField({
      name: 'maxAttendees',
      title: 'Maks antal deltagere',
      type: 'number',
      description: 'Maks antal personer, der kan tilmelde sig begivenheden',
      group: 'registration',
      validation: (Rule) => Rule.min(1).required(),
      hidden: ({ document }) => !!document?.isExternal, // Hide field if the event is external
    }),

    // Store the list of attendees directly inside the event document
    defineField({
      name: 'attendees',
      title: 'Deltagere',
      type: 'array',
      hidden: ({ document }) => !!document?.isExternal, // Hide field if the event is external
      of: [
        defineField({
          name: 'attendee',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Navn',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'email',
              title: 'Email',
              type: 'string',
              validation: (Rule) => Rule.required().email(),
            }),
            defineField({
              name: 'phone',
              title: 'Telefon',
              type: 'string',
            }),
            defineField({
              name: 'school',
              title: 'Uddannelsesstedet',
              type: 'string',
            }),
            defineField({
              name: 'numberOfTickets',
              title: 'Antal billetter',
              type: 'number',
              validation: (Rule) => Rule.min(1).required(),
            }),
          ],
          // Add a preview for the attendee object
          preview: {
            select: {
              name: 'name',
              tickets: 'numberOfTickets',
            },
            prepare(selection) {
              const { name, tickets } = selection
              return {
                title: name,
                subtitle: `Billetter: ${tickets || 0}`,
              }
            },
          },
        }),
      ],
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
      group: 'seo',
      title: 'SEO',
      description: 'SEO indstillinger',
      name: 'seoGroup',
      type: 'seoGroup',
    }),
    /* test */
    defineField({
      name: 'open',
      title: 'Åbnes for tilmelding',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      startDate: 'startDate',
      attendeeCount: 'attendees',
      maxAttendees: 'maxAttendees',
    },
    prepare(selection) {
      const { title, attendeeCount, maxAttendees } = selection

      // Calculate the total tickets booked
      const totalTicketsBooked = attendeeCount
        ? attendeeCount.reduce(
            (sum, attendee) => sum + (attendee.numberOfTickets || 0),
            0,
          )
        : 0

      const ticketsAvailable = maxAttendees
        ? maxAttendees - totalTicketsBooked
        : '∞'
      const isEventFull = maxAttendees
        ? totalTicketsBooked >= maxAttendees
        : false

      return {
        title: title,
        subtitle: `${getDanishDate(selection.startDate)}`,
        description: `${totalTicketsBooked} billetter booket${isEventFull ? ' (Ikke flere pladser)' : ` (${ticketsAvailable} tilbage)`}`,
      }
    },
  },
})
