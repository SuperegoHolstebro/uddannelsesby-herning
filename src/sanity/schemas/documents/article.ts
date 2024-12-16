/* import { AutoPreviewPane } from '~/components/sanity/auto-preivew-pane.component' */
import { File } from '@mynaui/icons-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: File,
  groups: [
    { name: 'content', title: 'Indhold' },
    { name: 'pageBuilder', title: 'Sideopbygning' },
    { name: 'settings', title: 'SideIndstillinger' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'settings',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'settings',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
        // slugify: input => `begivenheder/${input.toLowerCase().replace(/\s+/g, '-').slice(0, 96)}`,
      },
    }),
    {
      type: 'reference',
      name: 'author',
      group: 'settings',
      description: 'Vælg en forfatter',
      title: 'Forfatter',
      to: [{ type: 'employee' }],
    },
    {
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      description: 'Vælg en kategori',
      to: [{ type: 'category' }],
      group: 'settings',
    },

    defineField({
      name: 'image',
      title: 'Udvalgt billede',
      type: 'image',
      group: 'settings',
      description:
        'Billedet er det primære visuelle element, der repræsenterer indholdet på siden',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'date',
      title: 'Udgivelsesdato',
      type: 'datetime',
      group: 'settings',
      initialValue: () => new Date().toISOString(),
    }),
    {
      name: 'body',
      title: 'Tekst',
      group: 'content',
      description: 'Sidens Tekst indhold',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          title: 'blockContent',
        }),
      ],
    },

    defineField({
      group: 'seo',
      name: 'seoGroup',
      title: 'SEO',
      description: 'SEO indstillinger',
      type: 'seoGroup',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.title',
      date: 'date',
      image: 'image',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `Af: ${selection.author}`,
        description: `Udgivet: ${new Date(selection.date).toLocaleDateString()}`,
        imageUrl: selection.image?.asset?.url,
      }
    },
  },
})
