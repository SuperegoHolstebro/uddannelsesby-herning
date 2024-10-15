import { defineField, defineType } from 'sanity'
import { User } from '@mynaui/icons-react'

export default defineType({
  name: 'companyLogin',
  title: 'Virksomheds Login',
  type: 'document',
  icon: User,
  groups: [
    { name: 'loginInfo', title: 'Login Information' },
    { name: 'companyInfo', title: 'Virksomheds Information' },
  ],
  fields: [
    defineField({
      name: 'username',
      title: 'Brugernavn',
      type: 'string',
      group: 'loginInfo',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'password',
      title: 'Password Hash',
      type: 'string',
      group: 'loginInfo',
      description: 'Hashed password for security.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyRef',
      title: 'Virksomhed Reference',
      type: 'reference',
      to: [{ type: 'company' }],
      group: 'companyInfo',
      description: "Link to the company's main document.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      username: 'username',
      companyTitle: 'companyRef.name',
    },
    prepare(selection) {
      return {
        title: selection.username,
        subtitle: `Company: ${selection.companyTitle}`,
      }
    },
  },
})
