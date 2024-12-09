import { defineField, defineType } from 'sanity'
import { UsersGroup } from '@mynaui/icons-react'

export const EmployeesType = defineType({
  name: 'EmployeesType',
  icon: UsersGroup,
  title: 'Medarbejdere',
  description: 'Viser en liste af medarbejdere',
  type: 'object',
  groups: [
    { title: 'Indhold', name: 'content' },
    { title: 'Design', name: 'design' },
    { title: 'indstillinger', name: 'settings' },
  ],
  fields: [
    defineField({
      group: 'content',
      name: 'heading',
      type: 'string',
    }),
    defineField({
      group: 'content',
      name: 'view',
      title: 'view',
      type: 'string',
      options: {
        list: [
          { title: 'Manual', value: 'manual' },
          { title: 'Afdeling', value: 'department' },
          { title: 'Alle', value: 'all' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'manual', // Set "public" as the default value
    }),
    {
      group: 'content',
      name: 'employees',
      type: 'array',
      hidden: ({ parent }) => parent?.view !== 'manual',
      of: [{ type: 'reference', to: [{ type: 'employee' }] }],
    },
    {
      group: 'content',
      name: 'department',
      type: 'array',
      hidden: ({ parent }) => parent?.view !== 'department',
      of: [{ type: 'reference', to: [{ type: 'position' }] }],
    },
    {
      name: 'design',
      type: 'design',
      group: 'content',
    },
    {
      group: 'settings',
      name: 'SectionSettings',
      title: 'Indstillinger',
      type: 'SectionSettings',
    },
  ],
})
