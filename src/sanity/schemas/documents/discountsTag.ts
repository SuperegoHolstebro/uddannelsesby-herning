import { defineField, defineType } from 'sanity'
import { Store } from '@mynaui/icons-react'

export default defineType({
  name: 'discountsTag',
  title: 'Studierabatter tag',
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
      name: 'icon',
      title: 'Ikon',
      type: 'IconPicker',
    }),
  ],
})