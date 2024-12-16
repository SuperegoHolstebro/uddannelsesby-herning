import { File } from '@mynaui/icons-react'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { isUniqueOtherThanLanguage } from '~/utils/isUniqueOtherThanLanguage'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  description: 'Siderne på hjemmesiden',
  liveEdit: false,
  icon: File,
  groups: [
    { name: 'content', title: 'Indhold' },
    { name: 'pageBuilder', title: 'Sideopbygning' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      description: 'Titlen på siden',
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'Dette er en unik adresse, der refererer til den sidste del af sidens URL.',
      group: 'content',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: isUniqueOtherThanLanguage,
      },
    }),
    defineField({
      // should match 'languageField' plugin configuration setting, if customized
      name: 'locale',
      type: 'string',
      readOnly: true,
      // hidden: true,
    }),

    defineField({
      name: 'mainImage',
      title: 'Udvalgt billede',
      description:
        'Billedet er det primære visuelle element, der repræsenterer indholdet på siden',
      type: 'image',
    }),
    defineField({
      group: 'pageBuilder',
      title: 'Indhold',
      description: 'Indholdet på siden (Sektioner / Blokke)',
      name: 'pageBuilder',
      type: 'pageBuilder',
    }),

    defineField({
      group: 'seo',
      title: 'SEO',
      description: 'SEO indstillinger',
      name: 'seoGroup',
      type: 'seoGroup',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      media: 'mainImage',
      locale: 'locale',
    },
    prepare({ title, slug, media, locale }) {
      return {
        title: title,
        subtitle: slug
          ? `${locale} /${slug.startsWith('/') ? slug.slice(1) : slug}`
          : 'Mangler slug',
        media: media,
      }
    },
  },
})
