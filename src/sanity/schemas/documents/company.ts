import { defineField, defineType } from 'sanity'
import { Store } from '@mynaui/icons-react'

export default defineType({
  name: 'company',
  title: 'Virksomhed',
  type: 'document',
  icon: Store,
  groups: [
    { name: 'companyDetails', title: 'Virksomhedens detaljer' },
    { name: 'contactInfo', title: 'Kontaktinformation' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Virksomhedens navn',
      type: 'string',
      group: 'companyDetails',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Billede',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'companyDetails',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Om virksomheden',
      type: 'text',
      group: 'companyDetails',
      description: 'Kort beskrivelse af virksomheden',
    }),
    defineField({
      name: 'industry',
      title: 'Industri',
      type: 'string',
      group: 'companyDetails',
    }),
    defineField({
      name: 'availableInternships',
      title: 'Available Internships',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'companyDetails',
      description: 'List of available internships',
    }),
    defineField({
      name: 'contactPerson',
      title: 'Kontaktperson',
      type: 'string',
      group: 'contactInfo',
      description: 'Personen som skal kontaktes',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contactInfo',
      validation: (Rule) => Rule.email().error('Indtast en gyldig email'),
    }),
    defineField({
      name: 'phone',
      title: 'Tlf.',
      type: 'string',
      group: 'contactInfo',
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'string',
      group: 'contactInfo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      industry: 'industry',
      contactPerson: 'contactPerson',
      media: 'image',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `${selection.industry} - Contact: ${selection.contactPerson}`,
        media: selection.media,
      }
    },
  },
})
