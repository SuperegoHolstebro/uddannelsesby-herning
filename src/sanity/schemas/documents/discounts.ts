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
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Link til rabatten (https://www.example.com)',
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
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: [{ type: 'discountsTag' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      discount: 'discount',
      media: 'mainImage',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.discount,
        media: selection.media,
      }
    },
  },
})
