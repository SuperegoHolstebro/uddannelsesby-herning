import { ImageRectangle } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'

export const MediaType = defineType({
  name: 'MediaType',
  type: 'object',
  icon: ImageRectangle,
  description: 'En medie blok til billeder og video.',
  title: 'Medie',
  groups: [
    { title: 'Medie', name: 'media' },
    { title: 'Design', name: 'design' },
    { title: 'indstillinger', name: 'settings' },
  ],
  fields: [
    defineField({
      group: 'media',
      name: 'select',
      type: 'string',
      title: 'Vælg medie',
      options: {
        layout: 'dropdown',
        list: [
          { title: 'Billede', value: 'image' },
          { title: 'Video', value: 'video' },
          { title: 'Vimeo', value: 'vimeo' },
        ],
      },
      initialValue: 'image',
    }),
    /* imageObject */
    {
      name: 'imageObject',
      group: 'media',
      title: 'Billede',
      description: 'Vælg et billede',
      type: 'object',
      validation: (Rule) => Rule.required(),
      hidden: ({ parent }) => parent?.select !== 'image',
      fields: [
        {
          name: 'image',
          type: 'image',
          title: 'Billede',
        },
        {
          name: 'size',
          title: 'Størrelse',
          description: 'Vælg billedets størrelse',
          type: 'string',
          options: {
            list: [
              { title: 'Bred', value: 'none' },
              { title: 'Normal', value: 'default' },
            ],
            initialValue: 'default',
          },
        },
        {
          name: 'aspectRatio',
          title: 'Billedformat',
          description: 'Vælg billedets format',
          type: 'string',
          options: {
            list: [
              { title: 'Auto', value: 'auto' },
              { title: '1:1', value: '1:1' },
              { title: '16:9', value: '16:9' },
              { title: '4:3', value: '4:3' },
              { title: '3:2', value: '3:2' },
              { title: '3:4', value: '3:4' },
              { title: '2:3', value: '2:3' },
            ],
          },
          initialValue: 'auto',
        },
        {
          name: 'objectFit',
          title: 'Tilpasning',
          description: 'Vælg hvordan billedet skal tilpasses',
          type: 'string',
          options: {
            list: [
              { title: 'Tilpas', value: 'contain' },
              { title: 'Dæk', value: 'cover' },
            ],
          },
          initialValue: 'cover',
        },
      ],
    },
    /* videoObject */
    {
      name: 'videoObject',
      group: 'media',
      title: 'Billede',
      description: 'Vælg et billede',
      type: 'object',
      hidden: ({ parent }) => parent?.select !== 'video',
      fields: [
        {
          name: 'video',
          type: 'file',
          title: 'Video',
        },
        {
          name: 'thumbnail',
          type: 'image',
          title: 'Billede',
        },
        {
          name: 'size',
          title: 'Størrelse',
          description: 'Vælg billedets størrelse',
          type: 'string',
          options: {
            list: [
              { title: 'Bred', value: 'none' },
              { title: 'Normal', value: 'default' },
            ],
            initialValue: 'default',
          },
        },
      ],
    },
    /* vimeoObject */
    {
      name: 'vimeoObject',
      group: 'media',
      title: 'Vimeo',
      description: 'Vælg en Vimeo video',
      type: 'object',
      hidden: ({ parent }) => parent?.select !== 'vimeo',
      fields: [
        {
          name: 'vimeo',
          type: 'url',
          title: 'Vimeo',
          validation: (Rule) =>
            Rule.required().uri({
              scheme: ['http', 'https'],
              allowRelative: false,
            }),
        },
        {
          name: 'size',
          title: 'Størrelse',
          description: 'Vælg billedets størrelse',
          type: 'string',
          options: {
            list: [
              { title: 'Bred', value: 'none' },
              { title: 'Normal', value: 'default' },
            ],
            initialValue: 'default',
          },
        },
      ],
    },

    /* Design */
    {
      name: 'design',
      type: 'design',
      group: 'design',
    },
    {
      group: 'settings',
      name: 'SectionSettings',
      title: 'Indstillinger',
      type: 'SectionSettings',
    },
  ],
  preview: {
    select: {
      title: 'select',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title:
          title === 'image' ? 'Billede' : title === 'video' ? 'Video' : 'Vimeo',
        media,
      }
    },
  },
})
