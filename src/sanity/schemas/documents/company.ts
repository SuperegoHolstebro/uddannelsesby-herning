import { defineField, defineType } from 'sanity'
import { BuildingOne } from '@mynaui/icons-react'

export default defineType({
  name: 'company',
  title: 'Virksomhed',
  type: 'document',
  icon: BuildingOne,
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
      name: 'fields',
      title: 'Fagområder',
      type: 'array',
      group: 'companyDetails',
      of: [
        {
          type: 'reference',
          to: [{ type: 'field' }],
        },
      ],
      description:
        'Vælg et eller flere kompetenceområder, hvor virksomheden kunne bruge hjælp fra en studerende',
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
    defineField({
      name: 'website',
      title: 'Hjemmeside',
      type: 'string',
      group: 'contactInfo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      updatedAt: '_updatedAt', // Fetch the _updatedAt field for preview
    },
    prepare(selection) {
      const { title, media, updatedAt } = selection
      const formattedDate = new Date(updatedAt).toLocaleDateString('da-DK', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
      return {
        title: title,
        subtitle: `Sidst ændret: ${formattedDate}`, // Show the formatted date as the subtitle
        media: media,
      }
    },
  },
})
