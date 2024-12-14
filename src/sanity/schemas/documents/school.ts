import { File } from '@mynaui/icons-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'school',
  title: 'Uddannelsessted',
  type: 'document',
  description: 'Siderne på hjemmesiden',
  liveEdit: false,
  icon: File,
  groups: [
    { name: 'content', title: 'Indhold' },
    { name: 'pageBuilder', title: 'Sideopbygning' },
    { name: 'seo', title: 'SEO' },
    { name: 'infomation', title: 'Information' },
  ],
  fields: [
    defineField({
      name: 'infomation',
      type: 'object',
      title: 'Information',
      fields: [
        defineField({
          name: 'address',
          title: 'Adresse',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      description: 'Titlen på uddannelsesstedet',
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
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Udvalgt billede',
      type: 'image',
      description:
        'Billedet er det primære visuelle element, der repræsenterer indholdet på siden',
    }),
    defineField({
      group: 'pageBuilder',
      title: 'Indhold',
      description: 'Indholdet på siden (Sektioner / Blokke)',
      name: 'pageBuilder',
      type: 'pageBuilder',
    }),
    defineField({
      type: 'object',
      name: 'schoolInfo',
      title: 'Info om uddannelsesstedet',
      fields: [
        defineField({
          type: 'blockContent',
          name: 'description',
          title: 'Om uddannelsesstedet',
        }),
      ],
    }),
    defineField({
      type: 'object',
      name: 'educationInfo',
      title: 'Info om uddannelserne',
      fields: [
        defineField({
          type: 'blockContent',
          name: 'description',
          title: 'Om uddannelserne',
        }),
      ],
    }),
    defineField({
      name: 'CallToAction2',
      title: 'Call to action',
      type: 'CallToAction2',
      options: {
        collapsed: true,
        collapsible: true,
      },
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
    },
    prepare({ title, slug, media }) {
      return {
        title: title,
        subtitle: slug
          ? `/${slug.startsWith('/') ? slug.slice(1) : slug}`
          : 'Mangler slug',
        media: media,
      }
    },
  },
})
