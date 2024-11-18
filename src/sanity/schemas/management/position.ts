export default {
  name: 'position',
  title: 'position',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Navn',
      description: 'Titel på afdelingen',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection: { title: any }) {
      const { title } = selection
      return {
        title: title,
      }
    },
  },
}
