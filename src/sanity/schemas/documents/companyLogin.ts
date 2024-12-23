import { defineField, defineType } from 'sanity'
import { User } from '@mynaui/icons-react'
import PasswordInput from '@/components/sanity/PasswordInput' // Path to your PasswordInput component

export default defineType({
  name: 'companyLogin',
  title: 'Virksomheds Login',
  type: 'document',
  icon: User,
  liveEdit: true,
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
      components: {
        input: PasswordInput,
      },
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
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
        title: `${selection.companyTitle}`,
        subtitle: selection.username,
      }
    },
  },
})
