import { defineField, defineType } from 'sanity'
import { Store } from '@mynaui/icons-react'

export default defineType({
  name: 'discounts',
  title: 'Rabatter',
  type: 'document',
  liveEdit: true,
  icon: Store,
  groups: [
    { name: 'companyDetails', title: 'Virksomhedens detaljer' },
    { name: 'contactInfo', title: 'Kontaktinformation' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'discount',
      title: 'Rabat',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Hovedbillede',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'icon',
      title: 'Ikon',
      type: 'reference',
      to: [{ type: 'discountsTag' }],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Rabat:',
      }
    },
  },
})
